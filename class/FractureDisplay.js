(function(){
	var global = (1,eval)('this');
	var FractureDisplay = function (options) {
		this.options = options;
		var image = options.image;
		this.initialize(image)
	};

	var p = FractureDisplay.prototype = new createjs.Bitmap;

	p.Bitmap_draw = p.draw;
	p.draw = function (ctx, ignoreCtx) {
		this.Bitmap_draw(ctx, ignoreCtx);
	};

	global.FractureDisplay = FractureDisplay;
}());