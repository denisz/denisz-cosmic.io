(function(){
	var global = (1,eval)('this');
	var ButtonFromBitmap = function (image, size) {

		this.initialize(image);

		if (size) {
			this.width  = size.width;
			this.height = size.height;
		} else {
			this.width 	= image.width;
			this.height = image.height;
		}

		this.scaleX = 1;
		this.scaleY = 1;
	};

	var p = ButtonFromBitmap.prototype = new createjs.Bitmap;

	p.cursor = 'pointer';

	p._over = function (){
		var currentX = this._scaleX || 1,
			currentY = this._scaleY || 1;

		createjs.Tween.get(this).to({scaleX:currentX + .04, scaleY: currentY + .04}, 100);
	};

	p._down = function () {
		var currentX = this._scaleX || 1,
			currentY = this._scaleY || 1;

		createjs.Tween.get(this).to({scaleX:currentX -.05, scaleY: currentY -.05}, 100);
	};

	p._out = function () {
		var currentX = this._scaleX || 1,
			currentY = this._scaleY || 1;
		createjs.Tween.get(this).to({scaleX:currentX, scaleY: currentY}, 100);
	};

	/**
	 *
	 * @type {Function}
	 */
	p.gotoAndStop = p.gotoAndPlay = function(label){
		if (this['_' + label]) {
			this['_' + label]();
		} else {
			this['_out']();
		}
	};

	p.initHelper = p.getHelper = function () {
		return new createjs.ButtonHelper(this, "out", "over", "down", true);
	};

	p.setPositionInCenter = function (x, y) {
		this.x = x + (this.width  >> 1);
		this.y = y + (this.height >> 1);
		this.regX = this.width >> 1;
		this.regY = this.height >> 1;
	};

	p.setPosition = function (x, y) {
		this.x = x;
		this.y = y;
	};

	global.ButtonFromBitmap = ButtonFromBitmap;
}());