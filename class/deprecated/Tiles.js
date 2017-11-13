(function () {
	var global = (1,eval)('this');

	var Tiles = function (scheme) {
		this.loadedTiles = [];
		this.loadTiles(scheme);
		this.resources = global.Resources.getInstance();
		Tiles.instance = this;
	};

	Tiles.instance = null;

	Tiles.getInstance = function () {
		assert(Tiles.instance !== null,"Tiles class has not been created");
		return Tiles.instance;
	};

	var p = Tiles.prototype = {};

	p.loadTiles = function (tileSets) {
		this.tileSets = tileSets;
	};

	p.getTile = function (index) {
		if (index == -1) return null;
		var t = this.loadedTiles[index];
		if (t !== undefined) return t;

		t = this.loadTile(index);
		this.loadedTiles[index] = t;
		return t;
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

		assert(ts,'Tiles set not found');

		var img = this.resources.getResult(ts.source);

		var t = ts.tiles[index - ts.startid];

		return {
			image 	: {
				image	: img,
				xOffset	: t.rect[0],
				yOffset	: t.rect[1],
				width	: t.rect[2],
				height	: t.rect[3]
			},
			color	: t.color,
			shapes 	: t.shapes,
			name	: t.name,
			index 	: index - ts.startid
		};
	};

	global.Tiles = Tiles;

}());