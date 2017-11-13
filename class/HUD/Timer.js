(function () {
	var global = (1,eval)('this'),
		STYLES = {
			'standart' :{
				number : 'timer_number',
				glow   : 'timer_number_glow'
			}
		},
		SIZE = [256,170];

	var Timer = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this.styles  	= STYLES[this.options.style || 'standart'];
		this.resources 	= global.Resources.getInstance();
		this.createContainer();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);
		this.setTime(options.time);
	};

	var p = Timer.prototype = new global.HUD;

	p.createContainer = function () {
		this.container = new TimerNumber(this.resources.getResult(this.styles.number).result, 0);
		this.hide();
		this.addToLayer(this.container);
	};

	p._intervalID = 0;

	p.initTimer = function (stop) {
		if (stop) {
			clearInterval(this._intervalID);
			this._interval = 0;
		} else if (!this._intervalID){
			this._intervalID = setInterval(this.check.bind(this),1000);
		}
	};

	p.check = function () {
		if (this.time > 0) {
			this.container.visible = true;
			this.container.setNumber(this.time);

			createjs.Tween.get(this.container).to({scaleX:1,scaleY:1}, 400).wait(350).to({scaleX :.6,scaleY :.6}, 200);

			this.time--;
		} else {
			this.stop();
		}
	};

	p.stop = function () {
		this.dispatchEvent({type : 'onEnd'});
		this.destroy();
	};

	/**
	 * @param time
	 */
	p.setTime = function (time) {
		this.time = time >> 0;
		this.initTimer();
	};

	p.show = function () {
		this.container.visible = true;
	};

	p.hide = function () {
		this.container.visible = false;
	};

	p.HUD_desroy = p.destroy;

	p.destroy = function () {
		if (this.destroyed) return;
		this.initTimer(true);
		this.destroyed = true;
		this.removeFromLayer(this.container);
		this.HUD_desroy();
		delete this.container;
	};

	var CHARS 	= ['0','1','2','3','4','5','6','7','8','9'],
		PADDING = -150;

	var TimerNumber = function (img, number){
		this.initialize(img);
		this.generateSheet();
		this.setNumber(number || '0');
	};

	TimerNumber.prototype = new createjs.Bitmap;

	TimerNumber.prototype.generateSheet = function () {
		this.chars = {};

		for (var i = 0 , l = CHARS.length; i < l; i++) {
			this.chars[CHARS[i]] = [(i % 4) * SIZE[0], Math.floor(i / 4) * SIZE[1] ,SIZE[0], SIZE[1]];
		}
	};

	TimerNumber.prototype._number = '0';

	/**
	 * add cast number after to string
	 * @param number
	 */
	TimerNumber.prototype.setNumber = function (number) {
		if (_.isNumber(number)) {
			this._number = (number >> 0) + '';
			this.regX = this._number.length * SIZE[0] >> 1;
			this.regY = SIZE[1] >> 1;
		}
	};

	TimerNumber.prototype.draw = function (ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

		for (var i = 0 , l = this._number.length; i < l ; i++) {
			var rect = this.chars[this._number[i]];
			if (rect) {
				ctx.drawImage(this.image, rect[0], rect[1], rect[2], rect[3], i * (rect[2] + PADDING), 0, rect[2], rect[3]);
			}
		}
		return true;
	};

	global.Timer = Timer;
}());