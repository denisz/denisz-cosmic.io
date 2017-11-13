(function () {
	var global 	= (1,eval)('this'),
		Game 	= function () {
			assert(!Game.instance,"Game cannot be instantiated");
			this.resources 			= global.Resources.getInstance();
			this.app 				= global.App.getInstance();
            Game.instance 			= this;

			this.app.focusPaused && this.detectFocus();
		};

	var p = Game.prototype = {};

	Game.instance = null;

	Game.getInstance = function () {
		assert(Game.instance !== null, "Game class has not been created");
		return Game.instance;
	};

	p.preInitialize = function () {
		if (!this._preInitialized) {
			this._setSize();
			this.createLayerGame();
			this.createLayerHUD();
			this.initializeSfxService();
			this._preInitialized = true;
		}
	};

	p.initialize = p.init = function () {
		if (!this.isInitialized()) {
			this.preInitialize();
			this.loadScheme();

			//Initialize game service
			this.initializeTilesService();
			this.initializeGameObjectsService();
			this.initializeAnimationsService();
			this.initializeStageService();
			this.initializeInputService();


			this.initialized();
		}
	};

	p.parse = function (string) {
		try{
            return JSON.parse(string);
		}catch(e){
			console.log(e);
			return false
		}
	};

	p.loadScheme = function (scheme) {
		scheme = scheme || this.parse(this.resources.getResult('scheme').result);
        assert(scheme,'Scheme is not valid');
		this.scheme = scheme.game;
	};


	p._initialized = false;
	p._preInitialized = false;

	p.initialized = function () {
		this.stageService = global.StageService.getInstance();
		this._initialized = true;
	};


	p.isInitialized = function () {
		return this._initialized;
	};

	/**
	 * Wrapper for game layers
	 */
	p.createLayerGame = function () {
		var stageCanvas	= this.app.stageCanvas;
		this.layerGame = new createjs.Container();
		stageCanvas.addChild(this.layerGame);
	};

	p.createLayerHUD = function () {
		var stageCanvas	= this.app.stageCanvas;
		this.layerHUD = new createjs.Container();
		stageCanvas.addChild(this.layerHUD);
	};

	p.initializeTilesService = function () {
		try{
			new global.TilesService(this.scheme.tilesets);
		}catch(e){
			console.log(e.message);
		}
	};

	p.initializeSfxService = function () {
		try{
			new global.SfxService();
		}catch(e){
			console.log(e.message);
		}
	};

	p.initializeStageService = function () {
		try{
			new global.StageService(this.scheme.stages);
		}catch(e){
			console.log(e.message);
		}
	};

	p.initializeGameObjectsService = function () {
		try{
			new global.GameObjectsService(this.scheme.gObjects);
		} catch(e){
			console.log(e.message);
		}
	};

	p.initializeInputService = function () {
		try{
			new global.InputHandler(this.app.useTouch);
		}catch(e){
			console.log(e.message);
		}
	};

	p.initializeAnimationsService = function () {
		try{
			new global.AnimationsService(this.scheme.animations);
		}catch(e){
			console.log(e.message);
		}
	};

	p._setSize = function () {
		this.size = new global.Size( this.app.width,  this.app.height );
	};

	p.getSize = function (){
		return this.size;
	};

	p.update = function (time) {
		if(this.isInitialized()){
			global.InputHandler.instance.update(time);
			global.GameInput.instance.update(time);
			this.stageService.update(time);
		}
	};

	p.__focused = true;

	p.focused = function (value){
		this.__focused = value;
		this.stageService.onFocused(value);
	};

	p.isFocused = function (){
		return this.__focused;
	};

	p.detectFocus = function (){
		function onFocus() {
			this.focused(true);
		}

		function onBlur()  {
			this.focused(false);
		}

		window.onfocus	= onFocus.bind(this);
		window.onblur 	= onBlur.bind(this);

		function getHiddenProp(){
			var prefixes = ['webkit','moz','ms','o'];

			// if 'hidden' is natively supported just return it
			if ('hidden' in document) return 'hidden';

			// otherwise loop over all the known prefixes until we find one
			for (var i = 0, l = prefixes.length; i < l; i++){
				if ((prefixes[i] + 'Hidden') in document)
					return prefixes[i] + 'Hidden';
			}

			// otherwise it's not supported
			return null;
		}

		function isHidden() {
			var prop = getHiddenProp();
			if (!prop) return false;

			return document[prop];
		}

		var visProp = getHiddenProp();
		if (visProp) {
			var to 		= this,
				evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';

			document.addEventListener(evtname, function () {
				if (isHidden()) {
					onBlur.apply(to);
				} else {
					onFocus.apply(to);
				}
			});

		}
	};

	global.Game = Game;
}());