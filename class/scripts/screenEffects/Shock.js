(function(){
	var global = (1,eval)('this');
	global.scriptsEffect.Shock = {
		initialize : function  (manager, options){
			var stage 		= manager.stage,
				layer 		= stage.getLayerHUD(),
				size 		= stage.getSizeGame(),
				width 		= size.width,
				height 		= size.height,
				resources 	= stage.resources,
				image 		= resources.getResult('effect_lowHealth').result;

			this.bitmap = new createjs.Bitmap(image);
			this.bitmap.alpha = 0;
			this.bitmap.scaleX = width / image.width;
			this.bitmap.scaleY = height/ image.height;
			layer.addChild(this.bitmap);

			var that = this;

			if (options.styles) {
				for (var i in options.styles) {
					this.bitmap[i] = options.styles[i];
				}
			}

			createjs.Tween
				.get(this.bitmap)
				.to({alpha : 1},300,createjs.Ease.sineOut)
				.to({alpha : 0},300,createjs.Ease.sineIn)
				.call(function(){
					manager.rmEffect(that);
				});
		},
		remove  :function (manager) {
			if (this.bitmap) {
				var layer = manager.stage.getLayerHUD();
				layer.removeChild(this.bitmap);
			}
		}
	};
}());