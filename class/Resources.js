(function () {
	var global = (1,eval)('this'),
		Resources = function () {
			assert(Resources.instance === null, 'Resources is instance');

			this.maxConnections = 6;
			this.useXHR = false;

			this.init();
		};

	Resources.prototype = {};

	Resources.instance = null;

	Resources.getInstance = function () {
		assert(Resources.instance !== null, "Resources class has not been created");
		return Resources.instance;
	};

	var p = Resources.prototype;

	p.init = function () {
		this.preloaderJS 			= new createjs.LoadQueue(this.useXHR);
		this.preloaderJS.addEventListener('progress',createjs.proxy(this.handleProgress, this));
		this.preloaderJS.addEventListener('complete',createjs.proxy(this.handleFileComplete, this));
		this.preloaderJS.addEventListener('error',createjs.proxy(this.handleFileError, this));
		this.preloaderJS.installPlugin(createjs.Sound);

		this.preloaderJS.setMaxConnections(this.maxConnections);

		Resources.instance = this;

		this.resetCallbacks();
	};

	p.handleProgress = function (event) {
		this._calbackOnProgress && this._calbackOnProgress(event,this);
	};

	p.handleFileError = function (event) {
		this._calbackOnError && this._calbackOnError(event,this);
	};

	var head = document.head;

	p.handleFileComplete = function (event) {
//		var loaded = event.target._loadedItemsBySrc;
//		for (var i in loaded) {
//			if (loaded[i].type === 'javascript' && !loaded[i].isEval) {
//				head.appendChild(loaded[i].result);
//				loaded[i].isEval = true;
//			}
//		}

		this._callbackOnComplete && this._callbackOnComplete(event,this);
	};

	p._loadManifestResources = function (manifest) {
		this.preloaderJS.loadManifest(manifest, true);
		return this;
	};

	p.loadManifest = function (manifest) {
//		this.detectAlreadyLoaded(manifest)
		return this._loadManifestResources(manifest);
	};

	p.detectAlreadyLoaded = function (manifest) {
		var loadedItems = this.preloaderJS._loadedItemsById;
		for(var i in manifest) {
			if (loadedItems[manifest[i].id]) {
				delete manifest[i];
			}
		}
	};

	p.loadFile = function (file) {
		this.preloaderJS.loadFile(file, true);
		return this;
	};

	p.getResult = function (id) {
		return {
			result : this.preloaderJS.getResult(id)
		};
	};

	p.getProgress = function () {
		return this.preloaderJS.progress;
	};

	p.resetCallbacks= function () {
		this._calbackOnError = null;
		this._calbackOnProgress = null;
		this._callbackOnComplete = null;
		return this;
	};

    p.unsubscribe = function(type){
        this.resetCallbacks();
    };

	p.setCallback = function (callback, type) {

		if (type === 'error') {
			this._calbackOnError = callback;
		} else if (type === 'progress') {
			this._calbackOnProgress = callback;
		} else {
			this._callbackOnComplete = callback;
		}

		return this;
	};

	global.Resources = Resources;
}());