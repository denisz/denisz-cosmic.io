(function(){
	var global = (1,eval)('this');
	var Settings = function (service, options) {
		this.initialize(service, options);
		this.createContainer();
		this.addToLayer();
	};

	var p = Settings.prototype = new global.BaseMenu;

	p.transition = global.MenuService.TRANSITION.RIGHT;

	p.createButtons = function () {
		var size   		= this.service.game.getSize(),
			height      = size.height;

		var buttons = [
			{
				callback : function(){},
				point    : [20 ,height - 91],
				image    : 'menu_main_buttons',
				sourceRect     : {x:324,y:0,width:80,height:81},
				name     : 'settings'
			},
		];

		this.buttons = [];

		for (var i = 0, l = buttons.length; i < l; i++) {
			this.createButton(buttons[i]);
		}

	};


	/**
	 * @param buttonProto
	 */
	p.createButton 	   = function (buttonProto) {
		var buttonMovieClip = new global.ButtonFromBitmap(this.resources.getResult(buttonProto.image).result, buttonProto.sourceRect);
		buttonMovieClip.setPositionInCenter(buttonProto.point[0], buttonProto.point[1]);
		buttonMovieClip.addEventListener('click',buttonProto.callback.bind(this));
		buttonMovieClip.sourceRect = buttonProto.sourceRect;
		var button = new createjs.ButtonHelper(buttonMovieClip, "out", "over", "down", true);
		this.container.addChild(buttonMovieClip);
		this.buttons.push(button);
	};

	p.BaseMenu_destroy = p.destroy;

	p.destroy = function () {
		this.buttons.length = 0;
		this.BaseMenu_destroy();
	};

	global.MenuItems[global.MenuService.ITEMS.SETTINGS] = Settings;

}());