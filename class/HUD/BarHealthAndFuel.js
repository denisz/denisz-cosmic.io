(function(){
	var global = (1,eval)('this');

	var Styles = {
		'fuel'  : {
			mask  		: 'bar_fuel_mask',
			maskStart 	: 'bar_fuel_maskStart',
			thumb 		: 'bar_fuel_thumb',
			track 		: 'bar_fuel_track'
		},
		'health': {
			mask  		: 'bar_health_mask',
			maskStart 	: 'bar_fuel_maskStart',
			thumb 		: 'bar_health_thumb',
			track 		: 'bar_health_track'
		}
	};

	var BarHealthAndFuel = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this.value 	  = 0;
		this.progress = Math.max(this.options.startProgress || 0,0);

		this.styles = Styles[this.options.type];
		this.createSkeleton();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);

	};

	var p = BarHealthAndFuel.prototype = new global.HUD;

	p.setValue = function (value) {
		this.value = value;
	};

	p.setProgress = function (progress) {
		this.progress = progress;
		this.updateMask();
	};

	p.updateMask = function () {
		this.mask.width  = Math.max(this.width * this.progress,1);
		this.mask.height = this.height;

		this.maskCtx.drawImage(this.maskImageStart,0,0);
		this.maskCtx.drawImage(this.maskImage,this.width * (this.progress - 1),0);

		this.track.updateCache();
	};

	p.createSkeleton = function () {
		this.createContainer();
		this.createThumb();
		this.createTrack();
		this.createMask();
	};

	p.createMask = function () {
		this.maskImage = this.resources.getResult(this.styles.mask).result;
		this.maskImageStart = this.resources.getResult(this.styles.maskStart).result;

		this.mask = document.createElement("canvas");
		this.maskCtx = this.mask.getContext('2d');

		this.maskFilter = new createjs.AlphaMaskFilter(this.mask);
		this.track.filters = [this.maskFilter];
		this.track.cache(0,0,this.width,this.height);

		this.updateMask();
	};

	p.createThumb = function () {
		var thumb = this.styles.thumb;
		this.thumb = new createjs.Bitmap(this.resources.getResult(thumb).result);
		this.container.addChild(this.thumb);
	};

	p.createTrack = function () {
		var track = this.resources.getResult(this.styles.track).result;
		this.track = new createjs.Bitmap(track);
		this.container.addChild(this.track);
		this.width  = track.width;
		this.height = track.height;
	};

	p.createContainer = function () {
		this.container = new createjs.Container();
		this.addToLayer(this.container);
	};

	p.show = function () {

	};

	p.hide = function () {

	};

	p.destroyed = false;

	p.HUD_destroy = p.destroy;

	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;
		this.container.removeAllChildren();
		this.removeFromLayer(this.container);

		delete this.thumb;
		delete this.mask;
		delete this.track;
		delete this.container;
		this.HUD_destroy();
	};

	global.BarHealthAndFuel = BarHealthAndFuel;
}());