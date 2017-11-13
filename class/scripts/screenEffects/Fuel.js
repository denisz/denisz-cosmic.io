(function(){
	var global = (1,eval)('this');
	global.scriptsEffect.Fuel = {
		initialize : function  (manager, options){
			this.manager 	= manager;
			var stage 		= manager.stage,
				layer 		= stage.getLayerHUD(),
				width 		= stage.getWidth(),
				height 		= stage.getHeight(),
				resources 	= stage.resources,
				image 		= resources.getResult('effect_outOfControl').result;

			this.bitmap = new createjs.Bitmap(image);
			this.bitmap.alpha = 0;
			this.bitmap.scaleX = width / image.width;
			this.bitmap.scaleY = height/ image.height;
			layer.addChild(this.bitmap);

			if (options.styles) {
				for (var i in options.styles) {
					this.bitmap[i] = options.styles[i];
				}
			}

			createjs.Tween
				.get(this.bitmap)
				.to({alpha : 1},300,createjs.Ease.sineOut);
		},
		hide : function () {
			var that = this;
			createjs.Tween
				.get(this.bitmap)
				.to({alpha : 0},300,createjs.Ease.sineIn)
				.call(function(){
					that.manager.rmEffect(that);
				});
		},
		remove  :function (manager) {
			if (this.bitmap) {
				var layer = manager.stage.getLayerHUD();
				layer.removeChild(this.bitmap);
			}
			delete this.manager;
		}
	};
}());