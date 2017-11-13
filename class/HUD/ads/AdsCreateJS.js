(function () {
	var global = (1, eval)('this');
	var AdsCreateJS = function (options) {
		this.initialize(options);
		this.initializeEventsFromOptions(options);
		this.createContainer();
		this.start();
	};

	var p = AdsCreateJS.prototype = new global.Ads;

	global.AdsCreateJS = AdsCreateJS
}());