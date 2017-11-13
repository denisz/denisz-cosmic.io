(function () {
	var global = (1, eval)('this'),
		App = function () {
			assert(!App.instance, "Game cannot be instantiated");
			this.version = '1.0.0';
			this.build = '501';
			this.fps = 30;
			this.width = 960;
			this.height = 768;
			this.dpr    = 1;
			this.debug =  !this.tryDebug();
			this.debugKeyboard = false;
			this.debugFPS = true;
			this.debugMouse = false;
			this.debugCamera = false;
			this.useTouch = this.isTouchDevice();
			this.useRAF = true;
			this.musicVolume = 0;
			this.sfxVolume = 0;
			this.musicEnabled = true;
			this.focusPaused = false;
			this.debugPhysics = false;
			this.snapToPixel = true;
			this.stageFile = 'server__temp';
			this.skipToStage = 'stage_2';
			this.bookmarkBubble = false;
			this.detectOrientation = true;

			App.instance = this;
			this.getURLOptions();
			this.init();
		};

	var urlParams = {};
	(function () {
		var match,
			pl = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) {
				return decodeURIComponent(s.replace(pl, " "));
			},
			query = window.location.search.substring(1);

		while (match = search.exec(query))
			urlParams[decode(match[1])] = decode(match[2]);
	})();

	App.prototype = {};

	/**
	 * static
	 * @type {null}
	 */
	App.instance = null;

	/**
	 * static
	 * @return {*}
	 */
	App.getInstance = function () {
		assert(App.instance !== null, "App class has not been created");

		return App.instance;
	};

	var p = App.prototype;

	var appStates = {
		kStateLoading : 1,
		kStateInGame  : 2,
		kStateInMenu  : 3,
		kStateInMap	  : 4,
		kStateInAds   : 5
	};

	/**
	 * Test is debug 
	 * @return {[type]}
	 */
    p.tryDebug = function () {
        return this.isTouchDevice() || this.isNativeApp()
    };

	/**
	 * @constructor
	 * @return {[type]}
	 */
	p.init = function () {
		this.states = appStates;

		var statesList = [
			appStates.kStateLoading   ,  global.App_FSM.LoadingResourcesState,
			appStates.kStateInGame    ,  global.App_FSM.InGameState,
			appStates.kStateInMenu    ,  global.App_FSM.InMenuState,
			appStates.kStateInMap     ,  global.App_FSM.InMap,
			appStates.kStateInAds     ,  global.App_FSM.InAds
		];

		this.resources 	= new global.Resources();
		this.game 		= new global.Game();
		this.fsm 		= new global.FSM(this, statesList);

		this.$container = document.getElementById('container');
		this.$game 		= document.getElementById('content');

		this.setSizeApp();

        if (!window.Modernizr.isNativeApp) {
            this.createCanvasTag();
        }

		this.initStageCanvas();

        if (window.Modernizr.isNativeApp) {
            this.initStageCanvasNative();
        }

		if (this.debug) {
			this.debugKeyboard 	&& this.drawDebugKeyboard();
			this.debugFPS 		&& this.drawDebugFPS();
			this.debugMouse 	&& this.drawDebugMouse();
			this.debugCamera 	&& this.drawDebugCamera();
		}

		this.initTicker();
		this.game.preInitialize();

		this.loadingPrimaryResources();
		this.fsm.enter(appStates.kStateLoading);

		this.bookmarkBubble && this.showBookmarkBubble();
		this.detectOrientation && this.bindOrientation();
	};

    p.initStageCanvasNative = function () {
		this.stageCanvas.scaleX     = .5;
        this.stageCanvas.scaleY     = .5;

        canvas.retinaResolutionEnabled = true;
        canvas.MSAAEnabled = true;
        canvas.MSAASamples = 4;
        this.stageCanvas.rotation   = 90;
		this.rotate90();
    };

	p.rotate270 = function () {
		this.stageCanvas.x 			= 0;
		this.stageCanvas.y 			= this.width >> 1;
		this.stageCanvas.rotation 	= 270;
		this.stageCanvas.alpha 		= 0.1;
		this.orientation 			= 270;
		createjs.Tween.get(this.stageCanvas).to({alpha : 1}, 500);
	};

	p.rotate90 = function () {
		this.stageCanvas.x 			= this.height >> 1;
		this.stageCanvas.y 			= 0;
		this.stageCanvas.rotation 	= 90;
		this.stageCanvas.alpha 		= 0.1;
		this.orientation 			= 90;
		createjs.Tween.get(this.stageCanvas).to({alpha : 1}, 500);
	};

	p.orientation = 90;

	p.bindOrientation = function () {
        if (window.Modernizr.isNativeApp) {
			var that = this;
//			window.addEventListener("deviceorientation", _.throttle(function( event ) {
//				//alpha: rotation around z-axis
////				var rotateDegrees = event.alpha;
////				//gamma: left to right
////				var leftToRight = event.gamma;
////				//beta: front back motion
////				var frontToBack = event.beta;
//				var isChange = false;
//
////				if (frontToBack < -1.5) {
////					if (that.orientation !== 90){
////						isChange = 90;
////					}
////				} else if(frontToBack > 1.5){
////					if (that.orientation !== 270){
////						isChange = 270;
////					}
////				}
////
////				if (270 == isChange) {
////					that.rotate270();
////				} else if (90 == isChange) {
////					that.rotate90();
////				}
//
//			}, 300), false);
        } else {

        }
	};

	p.createLoading = function () {
		if (!window.Modernizr.mobile && !window.Modernizr.isNativeApp) {
			var loading = new global.LoadingProgressBarHTML(this);
			loading.appendTo(this.$game);
			loading.onFinish = function(){
				this.$container.classList.add('animate');
			}.bind(this);
			return loading;
		} else {
			return new global.LoadingProgressBarCanvas(this);
		}
	};

	/**
	 * Show bubble windows for add to home
	 */
	p.showBookmarkBubble = function () {
		if (window.google && window.Modernizr.ios && !window.Modernizr.isNativeApp) {
			window.setTimeout(function () {
				var bubble = new google.bookmarkbubble.Bubble();
				bubble.TIME_UNTIL_AUTO_DESTRUCT = 15000;
				bubble.hasHashParameter = function () {
					return !1
				};
				bubble.setHashParameter = function () {
				};
				bubble.iconUrl_ = "apple-touch-icon-precomposed.png";
				bubble.innerHTML = '<b>\'Add to Home Screen\'</b> for a Cosmic Story!';
				bubble.showIfAllowed();
			}, 0);
		}
	};

	p.setSizeApp = function () {
        this.dpr = window.devicePixelRatio;
        var ratio = window.devicePixelRatio;

		if (window.Modernizr.isNativeApp) {
            this.height  = ratio * window.screen.availWidth;
            this.width   = ratio * window.screen.availHeight;
        }else if (window.Modernizr.android) {
			this.width  = ratio * window.innerWidth;
			this.height = ratio * window.innerHeight;
		} else if (window.Modernizr.ios) {
			//safari mobile
			if (window.Modernizr.ipad) {
				this.width =  1024;
				this.height =  768;
			} else {
				this.width  = window.innerWidth;
				this.height = window.innerHeight;
			}
		} else if (!window.Modernizr.mobile) {
			this.width  = window.innerWidth;
			// this.height = window.innerHeight;

			if (window.screen.height >= 1080 && window.screen.width >= 1280) {
				// this.width = 1280;
				this.height = 720;
			} else {
				// this.width = 1024;
				this.height = 640;
			}

			this.$game.style['width']      = this.width + 'px';
			this.$game.style['height']     = this.height + 'px';
			this.$game.style['marginTop']  = (-this.height >> 1 | 0) + 'px';
			this.$game.style['marginLeft'] = (-this.width >> 1 | 0) + 'px';
		}
	};

	p.createCanvasTag = function () {
        var canvases = ['canvas'];

		if (this.debug) {
			canvases.push('canvasDebug');
		}

		if (this.debugPhysics) {
			canvases.push('canvasDebugMovement');
		}

		var ratio = 1;

		for (var i = 0 , l = canvases.length; i < l; i++) {
			var canvas = document.createElement('canvas');
            canvas.setAttribute('width',this.width);
			canvas.setAttribute('height',this.height);
			canvas.setAttribute('id',canvases[i]);
			canvas.style['width'] =  this.width / ratio + 'px';
			canvas.style['height'] =  this.height / ratio  + 'px';
//			canvas.style['zIndex'] =  -i;

			this.$game.appendChild(canvas);
		}
	};

	/**
	 * Primary resource game
	 */
	p._isLoadedPrimaryResources = false;
	p.loadingPrimaryResources = function () {
		var resources = global.PreloaderResources || [];
		resources.push({src : './assets/atlas/' + this.stageFile, id : "scheme"});
		this.resources.setCallback(function(){
			this._isLoadedPrimaryResources = true;
		}.bind(this), 'complete');
		this.resources.loadManifest(resources);
	};

	p.isTouchDevice = function () {
		return window.Modernizr.mobile;
	};

    p.isNativeApp = function () {
        return window.Modernizr.isNativeApp;
    };

	p.initTicker = function () {
		createjs.Ticker.setFPS(this.fps);
		createjs.Ticker.useRAF = this.useRAF;
		createjs.Ticker.addListener(this);
	};

	p.initStageCanvas = function () {
		this.canvas = document.getElementById("canvas");
		this.stageCanvas = new createjs.Stage(this.canvas);
		this.stageCanvas.snapToPixelEnabled = this.snapToPixel;

		if (this.debug) {
			var canvasDebug = document.getElementById("canvasDebug");
			this.stageCanvasDebug = new createjs.Stage(canvasDebug);
		}

		if (this.stageCanvas.updateViewport) {
			this.stageCanvas.updateViewport(this.width, this.height);
		}

		if (this.isTouchDevice()) {
			createjs.Touch.enable(this.stageCanvas);
		}

        this.stageCanvas.enableMouseOver(20);
	};

	p.drawDebugCamera = function () {
		this._textCamera = new createjs.Text('', "12px Arial", "black");
		this.stageCanvasDebug.addChild(this._textCamera);
		this._textCamera.x = 10;
		this._textCamera.y = 22;
	};

	p.drawDebugMouse = function () {
		this._textMouse = new createjs.Text('', "12px Arial", "black");
		this.stageCanvasDebug.addChild(this._textMouse);
		this._textMouse.x = 10;
		this._textMouse.y = 10;
	};

	p.drawDebugFPS = function () {
		this._textFPS = new createjs.Text('', "12px Arial", "black");
		this.stageCanvasDebug.addChild(this._textFPS);
		this._textFPS.x = this.stageCanvas.canvas.width - 50;
		this._textFPS.y = 10;
	};

	p.drawDebugKeyboard = function () {
		this._textKeyBoard = new createjs.Text('', "12px Arial", "black");
		this.stageCanvasDebug.addChild(this._textKeyBoard);
		this._textKeyBoard.x = 100;
		this._textKeyBoard.y = 10;
	};

	p.updateDebug = function (time) {
		if (this.debugKeyboard) {
			var inp = global.GameInput.instance;
			var str = '';
			if (inp) {
				for (var b in inp.buttons) {
					if (inp.buttons[b].down) {
						str += _.substitute(' {name}:{timePressed} ', inp.buttons[b]);
					}
				}
				this._textKeyBoard.text = str;
			}
		}

		this.debugFPS && (this._textFPS.text = _.substitute('fps:{fps}', {fps : createjs.Ticker.getMeasuredFPS().toFixed(1)}));
		this.debugMouse && (this._textMouse.text = _.substitute('{mouseX},{mouseY}', this.stageCanvas));

	};

	p.tick = function (time, paused) {
		this.fsm.update(time);
        this.stageCanvas.update(time);

        if (this.debug) {
            this.updateDebug(time);
            this.stageCanvasDebug.update(time);
        }

	};

	p.getURLOptions = function () {
		this.urlParams = urlParams;

		if ('debug' in this.urlParams) {
			this.debug = true;
			console.log('debug ON');
		}

		if ("nomusic" in this.urlParams) {
			this.musicEnabled = false;
		}

		if ('debugPhysics' in this.urlParams) {
			this.debugPhysics = true;
			console.log('debugPhysics ON');
		}

		if ('hd' in this.urlParams) {
			this.fullHD = true;
			console.log('fullHD ON');
		}

		if ("stageFile" in this.urlParams) {
			this.stageFile = this.urlParams.stageFile;
			console.log('stageFile ' + this.stageFile);
		}

		if ("stage" in this.urlParams) {
			this.skipToStage = this.urlParams.stage;
			console.log('stage ' + this.skipToStage);
		}

	};

	global.App = App;
})();