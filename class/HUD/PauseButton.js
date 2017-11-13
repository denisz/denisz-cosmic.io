(function () {
	var global = (1,eval)('this');
	var STYLES = {
		'standart' : {
			image : 'button_pause',
			x 	  : 100,
			y     : 100
		}
	};
	var PauseButton = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this.styles  	= STYLES[this.options.style || 'standart'];
		this.resources 	= global.Resources.getInstance();
		this.createButton();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);
	};

	var p = PauseButton.prototype = new global.HUD();

	p.createButton = function () {
		this.container = new global.ButtonFromBitmap(this.resources.getResult(this.styles.image).result);
		this.container.addEventListener('click',function () {
			this.dispatchEvent({type : 'onClick'})
		}.bind(this));
		this.container.initHelper();
		this.addToLayer(this.container);
	};

	p.HUD_desroy = p.destroy;

	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;
		this.removeFromLayer(this.container);
		this.HUD_desroy();
		delete this.container;
	};

	global.PauseButton = PauseButton;
}());