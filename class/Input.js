(function () {
	var global = (1, eval)('this');
	var Buttons = {
		up    : 0,
		down  : 1,
		left  : 2,
		right : 3,
		jump  : 4,
		esc   : 5
	};

	var InputHandler = function (useTouch) {
		assert(!InputHandler.instance, "InputHandler cannot be instantiated");
		InputHandler.instance = this;
		this.useTouch = useTouch;

		this.init(global, useTouch);
	};
	InputHandler.prototype = {};
	InputHandler.instance = null;
	InputHandler.getInstance = function () {
		assert(InputHandler.instance !== null, 'InputHandler class has not been created');
		return InputHandler.instance;
	};
	InputHandler.prototype.init = function (wrapper, useTouch) {
		var Button = function () {
			this.down = false;

			this.press = function () {
				this.down = true;
			};

			this.release = function () {
				this.down = false;
			};
		};

		var Keyboard = function () {
			this.keys = [];
			for (var k = 0; k < 255; k++) {
				this.keys[k] = new Button();
			}

			this.press = function (key) {
				this.keys[key].press();
			};

			this.release = function (key) {
				this.keys[key].release();
			};

			this.anyKeysDown = function () {
				for (var k = 0; k < 255; k++) {
					if (this.keys[k].down)return true;
				}
				return false;
			};
		};
		this.keyboard = new Keyboard();
		this.bufferedInput = [];

		this.SetWrapper(wrapper);

		if (!useTouch) {
			this.SetEventsKeyBoard();
		} else {
			this.SetEventsTouch();
		}

		new GameInput(useTouch);
	};
	InputHandler.prototype.SetWrapper = function (wrapper) {
		this.$wrapper = wrapper;
	};
	InputHandler.prototype.SetEventsKeyBoard = function () {
		var _this = this;
		// Keyboard

		var blockList = [27, 32, 37, 38, 39, 40]; // Esc, Space and Arrow keys
		window.onkeydown = function (e) {
			for (var i = 0; i < blockList.length; i++) {
				if (blockList[i] === e.keyCode) {
					e.preventDefault();
					break;
				}
			}
			_this.bufferedInput.push(function () {
				_this.keyboard.press(e.keyCode);
			});
		};

		window.onkeyup = function (e) {
			for (var i = 0; i < blockList.length; i++) {
				if (blockList[i] === e.keyCode) {
					e.preventDefault();
					break;
				}
			}
			_this.bufferedInput.push(function () {
				_this.keyboard.release(e.keyCode);
			});
		};
	};
	InputHandler.prototype.SetEventsTouch = function () {
		if (!this.$wrapper)
			throw 'Wrapper no valid'
	};
	InputHandler.prototype.update = function () {

		for (var i = 0 , l = this.bufferedInput.length; i < l; i++) {
			this.bufferedInput[i]();
		}

		this.bufferedInput = [];
	};

	/******************************************/
	/**
	 * prototype manipulate
	 * @constructor
	 */
	var GameInputProto = function () {
		this.init();
	};
	GameInputProto.prototype 					= {};
	GameInputProto.prototype.init 				= function () {
		var kMaxPressedLength = 0.25;
		var kMaxReleasedLength = 0.25;

		var GameButton = function (name) {
			this.name = name;
			this.down = false;
			this.downLast = false;
			this.doubleTap = false;
			this.validFirst = false;

			this.timePressed = 0;
			this.timeSinceReleased = 0;

			this.pressed = function () {
				return (this.down && !this.downLast);
			};

			this.released = function () {
				return (!this.down && this.downLast);
			};

			this.doubleTap = function () {
				return  !!this.doubleTap
			};

			this.press = function () {
				this.down = true;
				this.timePressed = 0;
				if (this.validFirst) {
					if (this.timeSinceReleased < kMaxReleasedLength) {
						this.doubleTap = true;
					}
					else {
						this.validFirst = false;
					}
				}
			};

			this.release = function () {
				this.down = false;
				this.timeSinceReleased = 0;
				if (this.doubleTap) {
					this.validFirst = false;
				}
				else if (!this.validFirst) {
					if (this.timePressed < kMaxPressedLength) {
						this.validFirst = true;
					}
				}
				this.doubleTap = false;

			};

			this.update = function (dt) {

				if (this.down) {
					this.timePressed += parseInt(dt);
				} else {
					this.timeSinceReleased += parseInt(dt);
				}
				this.downLast = this.down;
			};
		};

		this.buttons = {};

		for (var name in Buttons) {
			if (Buttons.hasOwnProperty(name)) {
				this.buttons[Buttons[name]] = new GameButton(name);
			}
		}
	};
	GameInputProto.prototype.hold 				= function (btn) {
		return this._enabled && this.buttons[btn].down;
	};
	GameInputProto.prototype.pressed 			= function (btn) {
		return this._enabled && this.buttons[btn].down && !this.buttons[btn].downLast;
	};
	GameInputProto.prototype.timePressed 		= function (btn) {
		return  this._enabled && this.buttons[btn].down && this.buttons[btn].timePressed;
	};
	GameInputProto.prototype.timePressedAndReset = function (btn) {
		var time = this.buttons[btn].down && this.buttons[btn].timePressed;
		this.buttons[btn].timePressed = 0;
		return  time;
	};
	GameInputProto.prototype.update 			= function (dt) {
		if (!this._enabled) return;

		for (var name in Buttons) {
			if (Buttons.hasOwnProperty(name)) {
				this.buttons[Buttons[name]].update(dt);
			}
		}
	};
	GameInputProto.prototype._enabled 			= true;
	GameInputProto.prototype.disabled 			= function () {
		this.releaseAll();
		this._enabled = false;
	};
	GameInputProto.prototype.enabled 			= function () {
		this._enabled = true;
	};
	GameInputProto.prototype.destroy 			= function () {};
	GameInputProto.prototype.show 				= function () {};
	GameInputProto.prototype.hdie 				= function () {};
	GameInputProto.prototype.releaseAll 		= function () {
		var buttons = this.buttons;
		for (var b = 0, l = buttons.length; b < l; b++) {
			buttons[b].down = false;
		}
	};

	/************************************************/
	/**
	 * Keyboard manipulate
	 * @constructor
	 */
	var GameInputKeyboard = function () {
		this.init()
	};
	GameInputKeyboard.prototype = new GameInputProto;
	GameInputKeyboard.prototype.init = function () {
		this.keyTrans = {
			27 : Buttons.esc,
			37 : Buttons.left,
			38 : Buttons.up,
			39 : Buttons.right,
			40 : Buttons.down,
			32 : Buttons.jump
		};
		this.invertKeyTrans = {
			'esc'   : 27,
			'left'  : 37,
			'up'    : 38,
			'right' : 39,
			'down'  : 40,
			'jump'  : 32
		};

		for (var key in this.keyTrans) {
			if (this.keyTrans.hasOwnProperty(key)) {
				this.buttons[this.keyTrans[key]].keyCode = Number(key);
			}
		}
	};
	GameInputKeyboard.prototype.update = function (dt) {
		if (!this._enabled) return;
		GameInputProto.prototype.update.call(this, dt);

		var input = InputHandler.instance;

		for (var k in this.keyTrans) {
			if (this.keyTrans.hasOwnProperty(k)) {
				var key = input.keyboard.keys[Number(k)];
				var btn = this.buttons[this.keyTrans[k]];

				if (key.down && !btn.down) {
					btn.press();
				}
				else if (!key.down && btn.down) {
					btn.release();
				}
			}
		}
	};
	GameInputKeyboard.prototype.anyKeysDown = function () {
		for (var b = 0, l = this.buttons.length; b < l; b++) {
			var button = this.buttons[b];
			if (button != null && button.down) return true;
		}
		return false;
	};

	/***********************************************/
	/**
	 * virtual Input
	 * @constructor
	 */
	var GameInputVirtual = function (buttons) {
		this.init(buttons || Buttons);
	};
	GameInputVirtual.prototype 				= new GameInputProto;
	GameInputVirtual.prototype.init 		= function (buttons) {
		this.buttons = {};

		for (var name in buttons) {
			if (buttons.hasOwnProperty(name)) {
				this.buttons[buttons[name]] = {
					down : false,
					name : name
				}
			}
		}

	};
	GameInputVirtual.prototype.hold 		= function (name) {
		return this._enabled && this.buttons[name].down
	};
	GameInputVirtual.prototype.update 		= function (dt) {
	};
	GameInputVirtual.prototype._pressTimeOutId 	= null;
	GameInputVirtual.prototype.press 			= function (name) {
		if (this._pressTimeOutId) {
			clearTimeout(this._pressTimeOutId);
		}
		this.buttons[name].down = true;
	};
	GameInputVirtual.prototype.pressTimeout 	= function (name, time, callback) {
		if (this._pressTimeOutId) {
			clearTimeout(this._pressTimeOutId);
		}

		this._pressTimeOutId = setTimeout(function () {
			this.buttons[name].down = false;
			typeof callback === 'function' && callback();
		}.bind(this), time);

		this.buttons[name].down = true;
	};
	GameInputVirtual.prototype.releaseAll 	= function () {
		var buttons = this.buttons;
		for(var i in buttons) {
			buttons[i].down = false;
		}
	};
	GameInputVirtual.prototype.release	  	= function (name) {
		this.buttons[name].down = false;
	};
	GameInputVirtual.prototype.pressed 			= function (name) {
		return this._enabled && this.buttons[name].down
	};


	/***********************************************/
	/**
	 * Touch manipulate
	 * @constructor
	 */
	var GameInputTouch = function () {
		this.init();
		this.generateGUICircle();
	};
	GameInputTouch.prototype = new GameInputProto;
	GameInputTouch.prototype.init 				= function () {
		GameInputKeyboard.prototype.init.apply(this, arguments);
	};
	GameInputTouch.prototype.update 			= function () {
		if (!this._enabled) return;
		GameInputKeyboard.prototype.update.apply(this, arguments);
	};
	GameInputTouch.prototype.generateGUICircle 	= function () {
		var controls  = {},
			game      = global.Game.getInstance(),
			sizeGame  = game.getSize(),
			size      = window.Modernizr.ipad ? new global.Size(100,100) : new global.Size(162,136),
			padding   = [100, 50],
			hWidth    = size.width >> 1,
			hHeight   = size.height,
			keyTrans  = this.invertKeyTrans,
			res		  = global.Resources.getInstance(),
			y 		  = sizeGame.height - padding[1] - hHeight,
			_this 	  = InputHandler.getInstance();

		var protoControls = [
			{
				name   : 'left',
				src    : 'left',
				points : [padding[0], y],
				hit    : [162,136]
			},
			{
				name   : 'right',
				src    : 'right',
				points : [padding[0] * 2 + hWidth, y],
				hit    : [162,136]
			},
			{
				name   : 'jump',
				src	   : 'jump',
				points : [sizeGame.width - hWidth - padding[0], y],
				hit    : [139,158]
			}
		];

		for (var i = 0, l = protoControls.length; i < l; i++) {
			var points = protoControls[i].points, control;
			var bitmap = res.getResult(protoControls[i].src).result;

			control = controls[protoControls[i].name] =  new global.ButtonFromBitmap( bitmap, size );

			control.setPositionInCenter(points[0], points[1]);
			control.initHelper();
			control.keyCode = keyTrans[protoControls[i].name];

			var hit = new createjs.Shape();
			hit.graphics.beginFill("#000").drawRect(0, 0, protoControls[i].hit[0], protoControls[i].hit[1]);

			control.hitArea = hit;

			control.addEventListener( 'mousedown', function (evt) {
				var keyCode = this.keyCode;
				_this.bufferedInput.push(function () {
					_this.keyboard.press(keyCode);
				});

				evt.onMouseUp =  function () {
					_this.bufferedInput.push(function () {
						_this.keyboard.release(keyCode);
					});
				};

			}.bind(control));
		}

		this.HUDs = controls;
	};
	GameInputTouch.prototype.addToLayer 		= function () {
		var HUDs 	= this.HUDs,
			layer   = this._layer;

		if (layer) {
			for (var i in HUDs) {
				if (HUDs.hasOwnProperty(i)) {
					layer.addChild(HUDs[i]);
				}
			}
		}
	};
	GameInputTouch.prototype._layer 			= null;
	GameInputTouch.prototype.setLayer 			= function (layer) {
		this._layer = layer;
		this.addToLayer();
		this.hide(false);
	};
	GameInputTouch.prototype.removeFromLayer 	= function () {
		var HUDs 	= this.HUDs;

		for (var i  in HUDs) {
			if (HUDs.hasOwnProperty(i)) {
				var parent = HUDs[i].parent;
				if (parent) {
					parent.removeChild(HUDs[i]);
				}
			}
		}
	};
	GameInputTouch.prototype.show 		= function () {
		this.hide(true);
	};
	GameInputTouch.prototype.hide	 	= function (show) {
		var HUDs 	= this.HUDs;

		for (var i in HUDs) {
			if (HUDs.hasOwnProperty(i)) {
				HUDs[i].visible = show;
			}
		}
	};
	GameInputTouch.prototype.disabled 	= function () {
		this._enabled = false;
	};
	GameInputTouch.prototype.enabled 	= function () {
		this._enabled = true;
	};
	GameInputTouch.prototype.destroy 	= function () {
		this.removeFromLayer();
	};


	/***********************************************/
	var GameInput = function (useTouch) {
		assert(!GameInput.instance, "GameInput cannot be instantiated");
		GameInput.instance = useTouch ? new GameInputTouch() : new GameInputKeyboard();
	};
	GameInput.getInstance = function () {
		assert(GameInput.instance !== null, "GameInput class has not been created");
		return GameInput.instance;
	};
	GameInput.instance = null;

	global.Buttons = Buttons;
	global.InputHandler = InputHandler;
	global.GameInput = GameInput;
	global.GameInputKeyboard = GameInputKeyboard;
	global.GameInputTouch = GameInputTouch;
	global.GameInputVirtual = GameInputVirtual;
}());