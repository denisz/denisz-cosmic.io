(function(){
	var global = (1,eval)('this');

	/**
	 *
	 * @type {{kStateIdle: number, kStateTransition: number, kStateHide: number, kStateShowFromLoading: number, kStateShowFromGame: number}}
	 */
	var States = {
		kStateIdle  			: 1,
		kStateTransition 		: 2,
		kStateHide 				: 3,
		kStateShowFromLoading	: 4,
		kStateShowFromGame		: 5
	};

	/**
	 *
	 * @type {Array}
	 */
	var statesList = [
		States.kStateIdle,  				global.FSM_Menu.IdleState,
		States.kStateTransition, 			global.FSM_Menu.TransitionState,
		States.kStateHide, 					global.FSM_Menu.HideState,
		States.kStateShowFromLoading, 		global.FSM_Menu.ShowFromLoadingState,
		States.kStateShowFromGame, 			global.FSM_Menu.ShowFromGameState,
	];

	/**
	 *
	 * @constructor
	 */
	var MenuService = function () {
		this.app 			= global.App.getInstance();
		this.layer 			= this.app.game.layerHUD;
		this.game 			= this.app.game;
		this.resources 		= global.Resources.getInstance();
		this.sfxService 	= global.SfxService.getInstance();
		this.states 		= States;
		this.fsm 			= new global.FSM(this, statesList);
		this.menus 			= [];
		this._currentMenu 	= null;

		this.setSize();
	};

	var p = MenuService.prototype = {};

	p.createBackground = function () {
		var back        = new lib.MenuBack();
		var plants      = new lib.MenuPlants();

		plants.x = this.size.width - back.nominalBounds.width;

		var w = this.size.width,
			h = this.size.height,
			b1 = this.resources.getResult('oduvan1').result,
			b2 = this.resources.getResult('oduvan2').result;

		var stars = new global.ParticleSystem({
			totalParticles: 5,
			emissionRate :30,
			pos: {
				x : w >> 1,
				y : h
			},
			posVar : {
				x : w >> 1,
				y : 0
			},
			gravity: {
				x: 0,
				y: -10
			},
			angle: 51,
			angleVar: 21,
			speed: 36,
			speedVar: 5,
			life: 15,
			lifeVar: 20,
			radialAccel: 0,
			radialAccelVar: 0,
			tangentialAccel: 14,
			tangentialAccelVar: 0,
			textureEnabled: false,
			textureAdditive: false,
			bitmapEnabled : true,
			bitmap : [b1, b2],
			radius: 3,
			radiusVar: 1,
			startScale :.8,
			endScale:1.1,
			startColor: null,
			startColorVar: null,
			endColor: null,
			active: true,
			duration: Infinity
		});

        this.back_menu_obj = [];
        this.back_menu_obj.push(back);
        this.back_menu_obj.push(stars);
        this.back_menu_obj.push(plants);

		this.layer.addChildAt(back,0);
		this.layer.addChildAt(stars,1);
		this.layer.addChildAt(plants,2);

		this.parallaxBackgroundLikeios7(back, window.Modernizr.isNativeApp);

		this.addVersionBlock();
	};


	p.addVersionBlock = function () {
		var text 	= new createjs.Text(_.substitute('Version {version}({build})',this.app), "12px Arial", '#FFD600'),
			shadow = new createjs.Shadow("#000000", 1, 1, 2),
			h 		= this.size.height;

		text.shadow = shadow;
		text.y = h - 15;
		text.x = 10;
		this.version = text;
		this.layer.addChild(text);
	};

	p.parallaxBackgroundLikeios7 = function (back, full) {
		var maxW   	= Math.max(back.nominalBounds.width - this.size.width, 0),
			maxH  	= Math.max(back.nominalBounds.height - this.size.height, 0),
			dHMax 	= maxH << 1,
			m 		= Math;

		this._parallaxHandler = function(eventData) {
			// Retrieving the front/back tilting of the device and moves the
			// background in the opposite way of the tilt

			var yTilt = m.round((-eventData.beta + 90) * (maxW/180) - maxW);

			// Retrieve the side to side tilting of the device and move the
			// background the opposite direction.

			var xTilt = m.round((-eventData.alpha + 90) * (maxH/180) - maxH);

//			// Thi 'if' statement checks if the phone is upside down and corrects
//			// the value that is returned.
			if (xTilt > 0) {
				xTilt = -xTilt;
			} else if (xTilt < -maxH) {
				xTilt = -(xTilt + dHMax);
			}

			if (full) {
				back.y = m.min(xTilt, 0);
				back.x = m.min(yTilt, 0);
			} else {
				back.x = m.min(yTilt, 0);
			}

		};
		window.addEventListener('deviceorientation',this._parallaxHandler, false);
	};

	p.removeParallax= function () {
		window.removeEventListener('deviceorientation',this._parallaxHandler);
		delete this._parallaxHandler;
	};

	p.setSize = function () {
		this.size = this.game.getSize();
	};

	p.playSfx = function () {
		this.sfxService.playMusic('sound_menu');
	};

	/**
	 *
	 * @private
	 */
	p._startAnimation = function () {
		if (!window.Modernizr.mobile) {return}

		var w 			= this.size.width,
			h 			= this.size.height,
			sampling 	= new global.Sampling({
				width 		: w,
				height		: h,
				frequency 	: 10,
				minDistance	: 50,
				algorithm 	:  global.Sampling.ALGORITHM.POISSON
			});

		var samplingDisplay = new global.SamplingDisplay({
			color 		: '#000',
			typeDraw    : global.SamplingDisplay.DRAW.CIRCLE,
			transform   : {
				scaleX: 1,
				scaleY: 1,
				alpha : 1
			},
			autorelease : true,
			autoreleaseTimeRelease : 2000,
			animation   : {
				func    : function(shape){
					createjs.Tween.get(shape).to({
						scaleX: 0,
						scaleY: 0,
						alpha : 1,
						x : randomBool() ? shape.x : interpolates(-240,w,shape.x),
						y : randomBool() ? interpolates(-240,h,shape.y) : shape.y
					}, randomRangeInt(1000, 1300))
				}
			}
		});

		samplingDisplay.initWithSampling(sampling);

		this.layer.addChild(samplingDisplay);
	};

	p.exit = function (callback) {
		this._animateExit(callback);
	};

	p._animateExit = function (callback) {
		this._destroyLoading();
		this._loading = this._createLoading('close', callback);
	};

	p._createLoading = function (positionOrLabel, callback) {
		var w 			= this.size.width,
			h 			= this.size.height,
			loading 	= new lib.loading();

		loading.x = (w - 1280) >> 1 ;
		loading.y = (h - 900) >> 1;

		loading.onAnimationEnd = function () {
			if (callback === 'autorelease') {
				if (loading.parent) {
					loading.parent.removeChild(loading);
					loading.onAnimationEnd = null;
				}
			} else {
				typeof callback === 'function' && setTimeout(callback, 100);
			}
		};
		loading.gotoAndPlay(positionOrLabel);

		this.layer.addChild(loading);

		return loading;
	};


	p._destroyLoading = function () {
		if (this._loading && this._loading.parent) {
			this._loading.parent.removeChild(this._loading);
		}
		this._loading = null;
	};


	p.showMenuByType = function (type) {
		if (
			!this.fsm.hasState(this.states.kStateIdle) &&
			!this.fsm.hasState(this.states.kStateShowFromLoading) &&
			!this.fsm.hasState(this.states.kStateShowFromGame)
			)return;

		var menu, isHasMenu = this.hasMenuByType(type);


		if (!isHasMenu) {
			assert(global.MenuItems[type],'This menu is not found');
			menu 		= new global.MenuItems[type](this);
			menu.type 	= type;
		} else {
			menu = 	isHasMenu;
		}

		this.menus.push(menu);
		this.transition (menu, this._currentMenu);
		this._currentMenu = menu;
	};


	p.transition = function (newMenu, oldMenu) {
		if (!oldMenu || !newMenu) return;

		this.fsm.setState(this.states.kStateTransition);

		newMenu.show();

		var that		= this,
			transition 	= newMenu.transition || MenuService.TRANSITION.LEFT,
			size   		= this.game.getSize(),
			width  		= size.width,
			height 		= size.height,
			posNew 		= [0,0],
			posOld 		= [0,0];

		switch(transition){
			case MenuService.TRANSITION.LEFT:
				posNew = [width,  0];
				posOld = [-width ,0];
				break;
			case MenuService.TRANSITION.RIGHT:
				posNew = [-width,  0];
				posOld = [width ,0];
				break;
			case MenuService.TRANSITION.TOP:
				posNew = [0, height];
				posOld = [0 ,-height];
				break;
			case MenuService.TRANSITION.BOTTOM:
				posNew = [0, -height];
				posOld = [0 ,height];
				break;
		}

		newMenu.alpha = 0;
		newMenu.x = posNew[0];
		newMenu.y = posNew[1];

		createjs.Tween.get(newMenu).to({x: 0,y: 0, alpha:1}, 500, createjs.Ease.backOut).call(function(){
			that.fsm.setState(that.states.kStateIdle);
		});

		createjs.Tween.get(oldMenu).to({x:posOld[0],y:posOld[1],alpha:0}, 500, createjs.Ease.backOut).call(function (){
			oldMenu.hide();

		});
	};

	p.backTo = function () {

	};


	p.hasMenuByType = function (type) {
		var menus = this.menus;

		for(var i = 0 , l = menus.length; i < l; i++) {
			if (menus[i].type === type) {
				return menus[i];
			}
		}
		return false;
	};


	p.getCurrentMenu = function () {
		return this._currentMenu;
	};


	p.hide = function () {
		this.fsm.setState(this.states.kStateHide);
	};


	p.destroyed = false;


	p.destroy = function () {
		if (this.destroyed) return;

        this.destroyed = true;
		var menus = this.menus, i, l;

		for(i = 0 , l = menus.length; i < l; i++) {
			menus[i].destroy();
		}

		this.menus.length = 0;
		this.fsm.destroy();
		this.removeParallax();

        for(i = 0 , l = this.back_menu_obj.length; i <l; i++) {
            this.layer.removeChild(this.back_menu_obj[i]);
        }

		this.layer.removeChild(this.version);

		this._destroyLoading();

		delete this.version;
        delete this.back_menu_obj;
		delete this.states;
		delete this.fsm;
		delete this.layer;
		delete this.app;
		delete this.resources;
		delete this.game;

	};

	MenuService.TRANSITION = {
		TOP   : 1,
		LEFT  : 2,
		RIGHT : 3,
		BOTTOM: 4
	};

	MenuService.ITEMS = {
		MAIN 		: 1,
		SETTINGS 	: 2,
		CREDITS     : 3

	};

	global.MenuService = MenuService;
	global.MenuItems = {};
}());