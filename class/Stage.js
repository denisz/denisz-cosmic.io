/**
 * if (typeof obj['x'] !== 'undefined') {}
 */
(function () {
	var global = (1, eval)('this');

	var stageStates = {
		kStateInLoadingStage:1,
		kStateInPassageStage:2,
		kStateCompleteStage	:3,
		kStateInPausedStage :4
	};

	var Stage = function (scheme, callbacks) {
		this.callbacks 		= callbacks;
		this.stageStates 	= stageStates;
		this.init(scheme);
	};

	Stage.prototype = {};

	var p = Stage.prototype;

	p.isLoaded = false;

	p.init = function (scheme) {
		assert(scheme, 'Scheme level incorrect');

		this.scheme 			= scheme;
		this.layers 			= [];
		this.tilelayers 		= this.scheme.tilelayers || [];
		this.shapes 			= [];	//ground
		this.triggers 			= [];	//??
		this.gObjects			= [];	//gameObjects
		this.name 				= scheme.name;
		this.startTime  		= createjs.Ticker.getTime();
		this.timeSinceStart 	= 0;

		//Services
		this.resources  		= global.Resources.getInstance();
		this.tilesService 		= global.TilesService.getInstance();
        this.animationsService  = global.AnimationsService.getInstance();
		this.gameObjectsService	= global.GameObjectsService.getInstance();
		this.hudService 		= new global.HUDService(this);

		var statesList = [
			stageStates.kStateInLoadingStage, global.InLoadingStage,
			stageStates.kStateInPassageStage, global.InPassageStage,
			stageStates.kStateCompleteStage,  global.InCompleteStage,
			stageStates.kStateInPausedStage,  global.InPausedStage
		];

		this.fsm 		= new global.FSM(this, statesList);
		this.app 		= global.App.getInstance();
		this.game		= global.Game.getInstance();

		this.stageInitialize();
		this.loadStage();
		this.fsm.enter(stageStates.kStateInLoadingStage);
		this.createLayers();
		this.initializeInput();
		this.createWorld();
        this.setSize();
		this.createCamera();
	};

	p.loadStage = function () {
        var manifest,
			that 				= this,
            stageManifest   	= this.scheme.manifest || [],
            manifestTileSets 	= [],
            tileLayers      	= this.getTileLayers()
			usedTileSets 		= [];

        for (var i = 0, l = tileLayers.length; i < l ;  i++) {
            if (tileLayers[i].useTileSets) {
                usedTileSets = usedTileSets.concat(tileLayers[i].useTileSets)
            }
        }

        var layers = this.getLayersOrigins();

        for (var i = 0 , l = layers.length; i < l; i++) {
            if (layers[i].useTileSets) {
                usedTileSets = usedTileSets.concat(layers[i].useTileSets)
            }
        }

        if (this.scheme.useTileSets) {
			usedTileSets = usedTileSets.concat(this.scheme.useTileSets);
		}

        //Loadinig tileSets
        usedTileSets = this.tilesService.getTilesSetByName(_.union(usedTileSets));

        for(var i =0 , l = usedTileSets.length; i < l ; i ++){
            if(usedTileSets[i].manifest){
                manifestTileSets.push(usedTileSets[i].manifest);
            }
        }

        manifest = manifestTileSets.concat(stageManifest);

		console.log(manifest);


//		var urlScripts 	= '/class/scripts/actors/',
//			scripts 	= this.game.scheme.scripts;
//
//		for (var i = 0, l = scripts.length; i < l ; i++){
//			manifest.push({
//				id : 'script_' 	+ scripts[i],
//				src: urlScripts + scripts[i] + '.js'
//			})
//		}

		this.scripts && this.scripts.publish('load',manifest);

		this._loadResources(manifest, function () {
            this.createObjects();
			this.stageOnLoad();
			this.world.setPaused(false);
			setTimeout(function(){
				that.isLoaded = true;
			}, 100);
		}.bind(this));
	};

    p.stageOnLoad = function () {
		this.gameInput.show();
		this.scripts && this.scripts.publish('onLoad');
	};

	p.stageInitialize = function () {
		var stage = this.scheme;

		if (stage.behaviors) {
			if (stage.behaviors.screenEffectable) {
				this.screenEffectable = new global.ScreenEffects(this, stage.behaviors.screenEffectable);
			}

			if( stage.behaviors.scripts ) {
				this.scripts = new global.ScriptsService(this, stage.scriptsFile);
			}
		}

		this.scripts && this.scripts.publish('initialize');
	};

    p.getPercentCameraRan = function(){
        var camera      = this.getCamera(),
            sizeGame    = this.getSizeGame(),
            size        = this.getSizeStage();

        return {
            x : camera.x / (size.width  - sizeGame.width),
            y : camera.y / (size.height - sizeGame.height )
        }
    };

	p.createCamera = function () {
		this.camera = new global.Camera(this);
	};

	p.createWorld = function () {
		var params = this.scheme.world;
		this.world = new global.World(
			this,
            params.gravity,
            params.doSleep,
            this.getSizeStage(),
            this.getLayersByTypeInHash('gameObject')
        );
        this.world.createGround({
            type: 'static',
            x	: 0,
            y	: 0
        });
		this.world.setPaused(true);

        this.fillingGroundWorld();
	};

    p.fillingGroundWorld = function(){
        var cacheCreateObject   = this.createObject.bind(this),
            cacheBankTile       = this.tilesService,
            tl                  = this.getTileLayers();

        var fixtureTranslate = function(fixture, x, y){
            if (_.isArray(fixture)) {
                var transformed = [],result;
                for (var i = 0 , l = fixture.length; i < l ; i++) {
                    result = fixtureTranslate(fixture[i], x, y);
                    result && transformed.push(result);
                }
                return transformed;
            }else{
                var shape,shapeOrigin = fixture.shape;
                if (shapeOrigin.type === 'rectangle') {
                    shape =  {
                        x       : shapeOrigin.x + x,
                        y       : shapeOrigin.y + y,
                        width   : shapeOrigin.width,
                        height  : shapeOrigin.height,
                        type    :'rectangle'

                    }
                }else if (shapeOrigin.type === 'circle') {
                    shape = {
                        x       : shapeOrigin.x + x,
                        y       : shapeOrigin.y + y,
                        radius  : shapeOrigin.radius,
                        type    :'circle'
                    }
                }else if (shapeOrigin.type === 'polygon') {
                    shape = {
                        points  :_.map(shapeOrigin.points , function(num){  return num % 2 ?  num + x : num + y; }),
                        type    :'polygon'
                    }
                }

                if(shape){
                    return {
                        density     : fixture.density,
                        friction    : fixture.friction,
                        restitution : fixture.restitution,
						categoryBits: fixture.categoryBits,
						maskBits	: fixture.maskBits,
                        shape       : shape
                    }
                }

            }

            return null;
        };

        for (var i = 0, l = tl.length; i < l ; i++) {

            var data        = tl[i].data,
                cellWidth   = tl[i].cellWidth,
                cellHeight  = tl[i].cellHeight,
                layout      = tl[i].layout;

            if (data) {
                for (var w = 0 , wl = tl[i].width; w < wl; w++) {
                    for (var h = 0 , hl = tl[i].height; h < hl; h++) {
                        if (data[w][h] !== -1) {
                            var tile;

                            if (layout === 'table') {
                                tile = cacheBankTile.getTileOrigin(data[w][h]);
                                if (tile && tile.fixture) {
                                    cacheCreateObject({
                                        entity      : 'ground',
                                        fixtureDef  : fixtureTranslate(tile.fixture, w * cellWidth, h * cellHeight )
                                    });
                                }

                                continue;
                            }

                            if (layout === 'absolute') {
                                var cell = data[w][h];
                                for (var c = 0 , cl = cell.length; c < cl ; c++) {
									if (cell[c][3] === 2) continue;

                                    tile = cacheBankTile.getTileOrigin(cell[c][2]);
                                    if (tile && tile.fixture) {
                                        cacheCreateObject({
                                            entity      : 'ground',
                                            fixtureDef  : fixtureTranslate(tile.fixture, cell[c][0], cell[c][1] )
                                        });
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }


    };

	/**
	 * @return {*}
	 */
	p.createLayers = function () {
		var layers 		    = this.scheme.layers;
		var layersSortable  = this.sortLayers(layers);

	    for (var i =0 , l = layersSortable.length; i<l; i++ ) {
            this.createLayer(layersSortable[i]);
        }

		this.layerHUD = this.createLayer({
			type 		: 'hud',
			name 		: 'hud',
			transform 	: 0
		});

    	return this;
	};

	p.initializeInput = function () {
		this.gameInput = global.GameInput.getInstance();
		if (typeof this.gameInput.setLayer === 'function') {
			this.gameInput.setLayer(this.layerHUD);
		}
		this.gameInput.releaseAll();
	};

	/**
	 *
	 * @param options
	 */
    p.createLayer = function(options){
        var wrapper	= this.game.layerGame,
            layer   = null;

		if (options.type === 'tile') {
			layer = new global.LayerSpriteTile(options,this.getTilesLayerByLayer(options.name), this);
		} else if (options.type === 'gameObject') {
			layer = new global.LayerGameObjects(options);
		} else if (options.type === 'hud') {
			layer = new global.LayerGameHUD(options);
		}

		if (layer) {
			this.layers.push(layer);
			wrapper.addChild(layer);
		}
		return layer;
    };

    p.getLayerByName = function(name){
        var layers = this.layers;

        for(var i = 0, l = layers.length; i < l ; i++){
            if(layers[i].name === name){
                return layers[i];
            }
        }
        return false;
    };

	/**
	 * @returns {*}
	 */
	p.getLayerHUD = function () {
		return this.layerHUD;
	};

	p.getLayerHUDGame = function () {
		return this.game.layerHUD;
	};

    p.getObjectLayers = function(){
        return this.objectLayer;
    };

	p.getLayersByType = function (type) {
		var result = [],
			layers = this.layers;

		for ( var i = 0 , l = layers.length ; i < l ; i++) {
			if ( layers[i].type === type ) {
				result.push(layers[i]);
			}
		}
		return result;
	};

	p.getLayersByTypeInHash = function (type) {
		var result = {},
			layers = this.layers;

		for ( var i = 0 , l = layers.length ; i < l ; i++) {
			if ( layers[i].type === type ) {
				result[layers[i].name] = layers[i];
			}
		}
		return result;
	};

	p.getLayersByTypesInHash = function (types) {
		var result = {},
			layers = this.layers;

		for ( var i = 0 , l = layers.length ; i < l ; i++) {
			if ( types.indexOf(layers[i].type) !== -1 ) {
				result[layers[i].name] = layers[i];
			}
		}
	};

	p.size = null;

	p.getSizeStage = function () {
		return this.size;
	};

	p.getCamera = function (){
		return this.camera.camera;
	};

    p.getCameraConstraint = function () {
        return this.camera.cameraConstraint;
    };

	p.getSizeGame = function (){
		return this.game.getSize()
	};

	/**
	 * create gameObject
	 */
	p.createObjects = function () {
		var objectLayers	= this.scheme.gameObjectlayers || [],
			gObjects  		= this.gObjects;

		this.world.setPaused(true);

		for (var i = 0, l = objectLayers.length; i < l; i++) {
			gObjects.push(this.createObject(objectLayers[i]));
		}

		this.scheme.focus && this.camera.setFocusObject(this.world.getActorByUid(this.scheme.focus));
		this.world.setPaused(false);
	};

	p.applyFilters = function () {

	};

	p._paused = false;

	p.onFocused = function (value) {
		this._paused = !value;
		this.fsm.update();
	};

	p.isPaused = function () {
		return this._paused;
	};

	p.scale = 1;

	p.getScale = function (){
		return this.scale;
	};

	p.setScale = function (value) {
		this.scale = value;
		this.world.setScale(value);
	};

	p.getWidth = function () {
		return this.app.width / this.scale;
	};

	p.getHeight = function () {
		return this.app.height / this.scale;
	};

	p.pause = function () {
		this.world.setPaused(true);
		this._paused = true;
	};

	p.play = function () {
		this.world.setPaused(false);
		this._paused = false;
	};

	p.freezeLayers = function(stop){
		if (stop) {
			this.game.layerGame.uncache();
		} else {
			this.game.layerGame.cache(0,0, this.getWidth(), this.getHeight(), 1);
		}
	};

	/**
	 * @param filter
	 * @param layer
	 * @param noUpdate
	 */
	p.addFilterToLayer = function (filter, layer, noUpdate) {
		layer = layer || this.game.layerGame;

		if (!layer.filters){
			layer.filters = []
		}

		layer.filters.push(filter);
		!noUpdate && setTimeout(function(){
			layer.updateCache()
		},100);
	};

	/**
	 *
	 * @param filter
	 * @param layer
	 * @param noUpdate
	 */
	p.removeFilterToLayer = function (filter, layer, noUpdate) {
		layer = layer || this.game.layerGame;

		if (layer.filters) {
			layer.filters.splice(layer.filters.indexOf(filter),1);
			!noUpdate && setTimeout(function(){
				layer.updateCache()
			},100);
		}
	};

	/**
	 * sort layer
	 * @param layers
	 * @return {*}
	 */
	p.sortLayers = function (layers) {
		return layers.sort(function(a, b) {
			if (a.depth > b.depth) return 1;
			else if (a.depth < b.depth) return -1;
			return 0;
		});
	};

	/**
	 *устанавливаем размеры уровня
	 */
	p.setSize = function() {
        var size = this.scheme.size || {};
        this.size = new global.Size( size.width || 1000, size.height  || 1000);
		return this;
	};

	p.getNameLayer = function (name) {
        var layers = this.layers;
        for(var i = 0, l = layers.length; i<l; i++ ) {
            if(layers[i].name == name)
                return layers[i];
        }
        return false;
	};

	p.getNameTileLayers = function (name) {
        var tileLayers = this.tilelayers;

        for(var i = 0, l = tileLayers.length; i<l; i++ ) {
            if(tileLayers[i].name === name)
                return tileLayers[i];
        }
        return false;
	};

    p.getTileLayers = function(){
        return this.tilelayers || [];
    };

    p.getLayers = function () {
        return this.layers;
    };

    p.getLayersOrigins = function () {
        return this.scheme.layers;
    };

    p.getTilesLayerByLayer = function (layer) {
        var tiles = [],
            tileLayers = this.tilelayers;

        for(var i = 0, l = tileLayers.length; i<l; i++ ) {
            if(tileLayers[i].layer == layer){
                tiles.push(tileLayers[i]);
            }
        }

        return tiles.sort(function (a, b) {
			if (a.depth > b.depth) return 1;
			else if (a.depth < b.depth) return -1;
			return 0;
		})
    };

	/**
     * @param params
     * @return {*}
     */
	p.createObject = function (params) {
		var actor;

		switch (params.entity) {
			case 'ground':
				actor = this.world.addGround(params.fixtureDef);
				return actor;
				break;
            case 'trigger':
                actor = new global.Trigger(this, params);
				break;
            case 'gObject':
			default:
				actor = new global.EntityGame(this, params);
		}

		actor.onCreate(params.uid);

		return actor;
	};

	p.setupStage = function (setup) {

	};

	p._loadResources = function (manifest, preloaderCallback) {
		this.resources.setCallback(preloaderCallback, 'complete');
		this.resources.loadManifest(manifest);
	};

	p.isPassed = function () {

	};

	p.hasPassed = function () {

	};

	p.noTransformLayers = false;

	/**
	 * @param time
	 */
	p.update = function (time) {
		if (this.destroyed) return;

        if(!this.isLoaded){
            this.fsm.update(time);
            return;
        }

        this.timeSinceStart += time;

		this.camera.update();
		!this.noTransformLayers && this.updateLayers();

		this.fsm	.update(time);
        this.world	.update(time);
		this.scripts && this.scripts.publish('update', time);
	};

	/**
	 *
	 */
	p.updateLayers = function () {
		var camera 			= this.camera.camera,
			cameraTransform = this.camera.cameraTransform;

		//обновляем только у игровых слоев
		for (var i = 0, l = this.layers.length; i < l; i++) {
			if (this.layers[i].options.transform) {

				//проверить а нужно ли нам его изменять
				// пригодня для статических обьектов на жкране
				// (например листья падающие или ветер или еще чтонибудь)

				this.layers[i].setTransform(
					camera.x + cameraTransform.regX,
					camera.y + cameraTransform.regY,
					cameraTransform.scaleX,
					cameraTransform.scaleY,
					cameraTransform.rotation,
					cameraTransform.skewX,
					cameraTransform.skewY,
					cameraTransform.regX,
					cameraTransform.regY)
			}
		}
	};

	p.completed= false;

	/**
	 * событие
	 * Уровень завершен
	 */
	p.complete = function (result) {
		if (this.completed) return;
		this.completed = result;
		this.fsm.setState(this.stageStates.kStateCompleteStage);
		this.callbacks.onCompleteStage && this.callbacks.onCompleteStage();
	};

	/**
	 *
	 * @param name
	 * @returns {*}
	 */
	p.addEffect = function (name) {
		if (this.screenEffectable) {
			return this.screenEffectable.addEffect(name);
		}
		return false;
	};

	p.removeEffect = function (name) {
		if (this.screenEffectable) {
			this.screenEffectable.removeEffect(name);
			return true;
		}
		return false;
	};

	/**
	 * Рестарт уровня
	 * пока под бльшим вопросом как его сделать
	 */
	p.restart = function () {
		this._animateExit(function(){
			typeof this.callbacks.onReload === 'function' && this.callbacks.onReload();
		}.bind(this));
	};

	p.exit = function () {
		this._animateExit(function(){
			typeof this.callbacks.onExit === 'function' && this.callbacks.onExit();
		}.bind(this));
	};

	p._loading = null;

	p._animateExit = function (callback) {
		this._destroyLoading();
		this._loading = this._createLoading('close',  callback);
	};

	p._createLoading = function (positionOrLabel, callback) {
		var size 		= this.getSizeGame(),
			w 			= size.width,
			h 			= size.height,
			loading 	= new lib.loading();

		loading.x = (w - 1280) >> 1 ;
		loading.y = (h - 900) >> 1;

		loading.onAnimationEnd = function () {
			typeof callback === 'function' && setTimeout(callback, 100);
		};

		if (positionOrLabel) {
			loading.gotoAndPlay(positionOrLabel);
		}

		var layer = this.getLayerHUDGame();
		layer && layer.addChild(loading);

		return loading;
	};

	p._destroyLoading = function () {
		if (this._loading && this._loading.parent) {
			this._loading.parent.removeChild(this._loading);
		}
		this._loading = null;
	};

	p.nextStage = function () {
		this.callbacks.onNextStage && this.callbacks.onNextStage();
	};

	p.destroyed = false;

	/**
	 * уничтожение
	 * удаляем все слои и все обьекты
	 */
	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;

		this.world.destroy();
		this.fsm.destroy();
		this.camera.destroy();
		this.hudService.destroy();
		this.game.layerGame.removeAllChildren();

		this._destroyLoading();

		this.freezeLayers(true);

		this.gameInput.destroy();
		this.tilesService.reset();

		delete this.tilesService;
		delete this.animationsService;
		delete this.gameObjectsService;
		delete this.gameInput;
		delete this.layers;
		delete this.shapes;
		delete this.triggers;
		delete this.gObjects;
		delete this.tilelayers;
		delete this.hudService;
		delete this.camera;
		delete this.scheme;
		delete this.fsm;
		delete this.world;
		delete this.app;
	};

	Stage.COMPLETE = {
		DEFEAT	: 1,
		WIN		: 2
	};

	global.Stage = Stage;
}());