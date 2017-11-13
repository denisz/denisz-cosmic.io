(function () {
	var global = (1,eval)('this');

	var Pause = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this._buttons = [{
			point 		: [62,390],
			name  		: 'Levels',
			image 		: 'dialog_pause_button_levels',
			callback 	: 'onClickOnLevels'
		},{
			point 		: [175,390],
			name 		: 'Restart',
			image 		: 'dialog_pause_button_restart',
			callback	: 'onClickOnRestart'
		},{
			point 		: [150,175],
			name  		: 'Play',
			image 		: 'dialog_pause_button_play',
			callback 	: 'onClickOnPlay'
		},{
			point 		: [288,390],
			name  		: 'Menu',
			image 		: 'dialog_pause_button_menu',
			callback 	: 'onClickOnMenu'
		}];

		if (this.options.position) {
			var position = this.options.position(this);
			this.options.transform.x = position[0];
			this.options.transform.y = position[1];
		}

		this.createContainer();
		this.createGradient();
		this.createGroup();
		this.createStars();
		this.createBackground();
		this.createButtons();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);

		this.show();
	};

	Pause.POSITIONS = {
		CENTER : function(dialog){
			var x, y = 0;
			var w = dialog.size.width,
				h = dialog.size.height;

			x = (w >> 1) - (468 >> 1);
			y = (h >> 1) - (545 >> 1);
			return [x, y]
		}
	};

	var p = Pause.prototype = new global.HUD;

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
		var pattern = this.resources.getResult('dialog_pause_gradient').result;
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
		var bitmap = this.resources.getResult('dialog_pause_frame').result;
		this.background = new createjs.Bitmap(bitmap);
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
		var buttonMovieClip = new global.ButtonFromBitmap(this.resources.getResult(buttonProto.image).result);
		buttonMovieClip.setPositionInCenter(buttonProto.point[0], buttonProto.point[1]);
		buttonMovieClip.addEventListener('click',this.onAction.bind(this,buttonProto.callback));
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
	p.onClickOnPlay	  = function () {
		!this.action && this.dispatchEvent({type:"onClickOnPlay"});
		this.action = true;
	};
	p.onClickOnRestart= function () {
		!this.action && this.dispatchEvent({type:"onClickOnRestart"});
		this.action = true;
	};

	p.onAction = function (action) {
		!this.action && setTimeout(function(){
			this.dispatchEvent({type:action}, this);
		}.bind(this), 100);
		this.action = action;
	};

	p.show = function () {
		this.dispatchEvent({type:"onShow"});
		this.animateBackground();

		this.group.alpha = 0;
		this.group.scaleX = 2;
		this.group.scaleY = 2;
		createjs.Tween.get(this.group).to({alpha : 1, scaleX:1, scaleY:1}, 300, createjs.Ease.linear);
	};

	p.animateBackground = function () {
		this.gradient.alpha = 0;
		createjs.Tween.get(this.gradient).to({alpha : 1}, 250,  createjs.Ease.linear);
	};

	p.hide = function (callback) {
		var that = this;
		that.dispatchEvent({type:"onHide"});
		createjs.Tween.get(this.group).to({alpha : 0, scaleX :.1, scaleY :.1}, 300, createjs.Ease.linear).call(function(){
			typeof callback === 'function' && callback();
		});
		createjs.Tween.get(this.gradient).to({alpha : 0}, 250,  createjs.Ease.linear);
		this.container.removeChild(this.stars);
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

	global.DialogPause = Pause;
}());