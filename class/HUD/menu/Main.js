(function(){
	var global = (1,eval)('this');
	var Main = function (service, options) {
		this.initialize(service, options);
		this.createContainer();
		this.createLogo();
		this.createButtons();
		this.addToLayer();
	};

	var p = Main.prototype = new global.BaseMenu;

	p.transition = global.MenuService.TRANSITION.RIGHT;

	p.createLogo    = function () {
		var img			= this.resources.getResult('logo').result,
			bitmap  	= new createjs.Bitmap(img),
			size   		= this.service.game.getSize(),
			width  		= size.width;

		bitmap.x = (width >> 1) - (img.width >> 1) ;
		bitmap.y = 30;
		this.container.addChild(bitmap);
	};

	p.createButtons = function () {
		var size   		= this.service.game.getSize(),
			width  		= size.width,
			height      = size.height,
			wb 			= 122,
			padding     = [30, 190, 0.441 * height | 0];

		var buttons = [
			{
				callback : function(){},
				point    : [padding[0],padding[2]],
				image    : 'menu_main_buttons',
				sourceRect     : {x:0,y:0,width:wb,height:wb},
				name     : 'leaderboard'
			},
			{
				callback : function(){},
				point    : [padding[1],padding[2]],
				image    : 'menu_main_buttons',
				sourceRect     : {x:wb,y:0,width:wb,height:wb},
				name     : 'rating'
			},
			{
				callback : function(){
					var service = this.service,
						app 	= service.app;

					service.exit(function(){
						app.fsm.setState(app.states.kStateInGame);
					});
				},
				point    : [(width >> 1) - (147 >> 1),padding[2] - 10],
				image    : 'dialog_pause_button_play',
				name     : 'play'
			},
			{
				callback : function(){

				},
				point    : [width - 141,height - 144],
				image    : 'menu_main_buttons',
				sourceRect : {x:wb * 4,y:0,width:wb - 4,height:wb},
				name     : 'settings'
			},
			{
				callback : function(){},
				point    : [width - wb - padding[0],padding[2]],
				image    : 'menu_main_buttons',
				sourceRect : {x:wb * 2,y:0,width:wb,height:wb},
				name     : 'shareVK'
			},
			{
				callback : function(){},
				point    : [width - wb - padding[1],padding[2]],
				image    : 'menu_main_buttons',
				sourceRect     : {x:wb * 3,y:0,width:wb,height:wb},
				name     : 'shareFB'
			}
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
		buttonMovieClip.set({
			scaleY  : window.Modernizr.mobile ? 1 : .8,
			scaleX  : window.Modernizr.mobile ? 1 : .8,
			_scaleY : window.Modernizr.mobile ? 1 : .8,
			_scaleX : window.Modernizr.mobile ? 1 : .8
		});
		buttonMovieClip.setPositionInCenter(buttonProto.point[0], buttonProto.point[1]);
		buttonMovieClip.addEventListener('click',buttonProto.callback.bind(this));
		buttonMovieClip.sourceRect = buttonProto.sourceRect;
		this.container.addChild(buttonMovieClip);
		this.buttons.push(buttonMovieClip.getHelper());
	};

	p.BaseMenu_destroy = p.destroy;

	p.destroy = function () {
		this.buttons.length = 0;
		this.BaseMenu_destroy();
	};

	global.MenuItems[global.MenuService.ITEMS.MAIN] = Main;
}());