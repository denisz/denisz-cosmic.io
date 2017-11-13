(function () {
	var global = (1,eval)('this');

	var TilesService = function (scheme) {
		this.loadedTiles = [];
		this.setTileSets(scheme);
		this.resources = global.Resources.getInstance();
		TilesService.instance = this;
	};

	TilesService.instance = null;

	TilesService.getInstance = function () {
		assert(TilesService.instance !== null,"TilesService class has not been created");
		return TilesService.instance;
	};

	var p = TilesService.prototype = {};

	p.setTileSets = function (tileSets) {
		this.tileSets = tileSets;
	};

	p.getTileByIndex = p.getTile = function (index) {
		if (index == -1) return null;
		var t = this.loadedTiles[index];

		if (t !== undefined) return t;

		t = this.loadTile(index);
		this.loadedTiles[index] = t;
		return t;
	};

	/**
	 * @deprecated
	 * @param name
	 */
	p.getTileByName = function (name) {};

	p.getTileSetByName = function(name){
        var ts = this.tileSets;
        for(var i = 0, l = ts.length; i < l ; i++){
            if(ts[i].name === name)
                return ts[i];
        }
        return false;
    };

    p.getTilesSetByName = function(arrNames){
        assert(_.isArray(arrNames),'Argument should be an array');

        arrNames = _.uniq(arrNames);

        var tileSets = [],
            ts 		 = this.tileSets;

        for(var i = 0, l = arrNames.length; i < l ; i++ ){
            for(var j = 0, l2 = ts.length; j < l2 ; j++){
                if(ts[j].name === arrNames[i]){
                    tileSets.push(ts[j]);
                    break;
                }
            }
        }

        return tileSets;
    };

	p.loadTile = function (index) {
		var ts = null;
		for (var i in this.tileSets) {
			if (this.tileSets.hasOwnProperty(i)) {
				var tsl = this.tileSets[i];
				if (tsl.startid <= index && index < tsl.startid + tsl.numTiles) {
					ts = tsl;
					break;
				}
			}
		}

        if(!ts) return null;

		var img = this.resources.getResult(ts.source);

		var t = ts.tiles[index - ts.startid];

		return {
			image 	: {
				image	: img,
				x	    : t.rect[0],
				y	    : t.rect[1],
				width	: t.rect[2],
				height	: t.rect[3]
			},
			color	: t.color,
			fixture : t.fixture,
			name	: t.name,
			index 	: index - ts.startid
		};
	};

    /**
     *
     * @param index
     * @return {*}
     */
    p.getTileOrigin = function(index){
        var ts = null;
        for (var i in this.tileSets) {
            if (this.tileSets.hasOwnProperty(i)) {
                var tsl = this.tileSets[i];
                if (tsl.startid <= index && index < tsl.startid + tsl.numTiles) {
                    ts = tsl;
                    break;
                }
            }
        }

        if(!ts) return null;

        return ts.tiles[index - ts.startid];
    };

    /**
     * Сброс кеша изображений
     */
    p.reset = function(){
        this.loadedTiles.length = 0;
    };

	p.release = function (){
		this.tileSets = [];
	};

	global.TilesService = TilesService;

}());