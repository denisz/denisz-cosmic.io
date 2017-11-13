(function(){
	var global = (1,eval)('this');
	var Complete = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this._buttons = [{
			point 		: [58,260],
			name  		: 'Levels',
			image 		: 'dialog_pause_button_levels',
			callback 	: 'onClickOnLevels'
		},{
			point 		: [177,260],
			name  		: 'Menu',
			image 		: 'dialog_buttons',
			sourceRect  : {
				x : 100,
				y:  0,
				width: 100,
				height: 100
			},
			callback 	: 'onClickOnMenu'
		},{
			point 		: [295,260],
			name 		: 'Next',
			image 		: 'dialog_buttons',
			sourceRect  : {
				x : 300,
				y : 0,
				width : 100,
				height: 100
			},
			callback	: 'onClickOnNext'
		}];

		if (this.options.position) {
			var position = this.options.position(this);
			this.options.transform.x = position[0];
			this.options.transform.y = position[1];
		}

		this.createContainer();
		this.createGroup();
		this.createGradient();
		this.createStars();
		this.createBackground();
		this.createButtons();
		this.createText();
		this.createIcon();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);

		this.show();
	};

	Complete.POSITIONS = {
		CENTER : function(dialog){
			var x, y;

			var w = dialog.size.width,
				h = dialog.size.height;

			x = (w >> 1) - (468 >> 1);
			y = (h >> 1) - (448 >> 1);
			return [x, y]
		}
	};

	var p = Complete.prototype = new global.HUD;

	p.createText = function () {
		var text = new createjs.Bitmap(this.resources.getResult('dialog_complete_text').result);
		text.x = 120;
		text.y = 50;
		this.group.addChild(text);
	};

	p.createIcon = function () {
		var icon = new createjs.Bitmap(this.resources.getResult('dialog_complete_icon').result);
		icon.x = 20;
		icon.y = 0;
		var glow = new lib.glowWin();
		glow.x = -70;
		glow.y = -80;
		this.group.addChild(glow);
		this.group.addChild(icon);
	};

	var drawBackContainer = function(dialog, pattern, ctx, ignoreCache){
		this.DisplayObject_draw(ctx, ignoreCache);
		ctx.drawImage(pattern, 0,0,  dialog.size.width, dialog.size.height);
	};

	p.alpha = 0;

	p.createContainer = function () {
		this.container = new createjs.Container();
		this.addToLayer(this.container);
	};

	p.createGroup = function () {
		this.group = new createjs.Container();
		this.group.x = this.group.regX = (this.size.width >> 1) - this.options.transform.x;
		this.group.y = this.group.regY = (this.size.height >> 1) - this.options.transform.y;
		this.container.addChild(this.group);
	};

	p.createGradient = function () {
		var pattern = this.resources.getResult('dialog_complete_gradient').result;
		this.gradient = new createjs.DisplayObject();
		this.gradient.DisplayObject_draw = this.gradient.draw;
		this.gradient.x = -this.options.transform.x >> 0;
		this.gradient.y = -this.options.transform.y >> 0;
		this.gradient.draw =  drawBackContainer.bind(this.gradient, this, pattern);
		this.container.addChildAt(this.gradient, 0);
	};

	/**
	 *
	 */
	p.createStars = function () {
		this.stars = new global.ParticleWithShape({
			color 			: 'rgba(242,194,154,1)',
			totalParticles	: 250,
			width 			: this.size.width,
			height			: this.size.height
		});
		this.stars.x = -this.options.transform.x >> 0;
		this.stars.y = -this.options.transform.y >> 0;
		this.container.addChildAt(this.stars, 1);
	};

	p.createBackground = function () {
		this.background = new createjs.Bitmap(this.resources.getResult('dialog_complete_frame').result);
		this.group.addChild(this.background);
	};

	p.createButtons = function () {
		for (var i = 0, l = this._buttons.length; i < l; i++) {
			this.createButton(this._buttons[i]);
		}
	};

	/**
	 * @param buttonProto
	 */
	p.createButton 	   = function (buttonProto) {
		var buttonMovieClip = new global.ButtonFromBitmap(this.resources.getResult(buttonProto.image).result,  buttonProto.sourceRect);
		buttonMovieClip.setPositionInCenter(buttonProto.point[0], buttonProto.point[1]);
		buttonMovieClip.addEventListener('click',this.onAction.bind(this,buttonProto.callback));
		buttonMovieClip.sourceRect = buttonProto.sourceRect;
		buttonMovieClip.getHelper();
		this.group.addChild(buttonMovieClip);
	};

	p.action = false;

	p.onClickOnLevels = function () {
		!this.action && this.dispatchEvent({type:"onClickOnLevels"});
		this.action = true;
	};
	p.onClickOnMenu	  = function () {
		!this.action && this.dispatchEvent({type:"onClickOnMenu"});
		this.action = true;
	};
	p.onClickOnNext= function () {
		!this.action && this.dispatchEvent({type:"onClickOnNext"});
		this.action = true;
	};

	p.onAction = function (action) {
		!this.action && setTimeout(function(){
			this.dispatchEvent({type:action})
		}.bind(this), 100);
		this.action = action;
	};

	p.show = function () {
		this.dispatchEvent({type:"onShow"});

		this.animateBackground();
		this.group.alpha = 0;
		this.group.scaleX = 2;
		this.group.scaleY = 2;
		createjs.Tween.get(this.group).to({alpha : 1, scaleX:1, scaleY:1}, 300);
	};

	p.animateBackground = function () {
		createjs.Tween.get(this.gradient).to({alpha : 1}, 1000,  createjs.Ease.linear);
	};

	p.hide = function () {
		this.dispatchEvent({type:"onHide"});

		this.destroy();
	};

	p.destroyed = false;

	p.HUD_destroy = p.destroy;

	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;
		this.container.removeAllChildren();
		this.removeFromLayer(this.container);

		delete this.stars;
		delete this.gradient;
		delete this.group;
		delete this.container;
		this.HUD_destroy();
	};

	global.DialogComplete = Complete;
}());