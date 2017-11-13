(function () {
	var global = (1,eval)('this');

	var LayerSpriteTile = function (options, tileLayers, stage) {
        this.options        = options;
		this.name           = options.name  || 'unknown';
		this.depth          = options.depth || 0;
		this.type			= options.type;
        this.tileLayers     = tileLayers;
        this.stage          = stage;
		this.debug 			= false;
        this.tilesService   = global.TilesService.getInstance();
		this.initialize();
		this.mouseEnabled = false;
	};

	var p = LayerSpriteTile.prototype = new createjs.DisplayObject();

	p.DisplayObject_draw = p.draw;

	p.draw = function (ctx, ignoreCache) {
        if(!this.stage.isLoaded || this.destroyed) { return false; }

		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

		if(this.options.backgroundImage) {
			this.drawBackground(ctx);
		}

        var tileLayers = this.tileLayers;

        for (var i = 0 , l = tileLayers.length; i < l ; i++) {
            this.drawLayer(tileLayers[i], ctx);
        }

		return false;
	};

    p.createCachePattern = function(){
        if(this.options.backgroundImage){
            var imageObj = this.tilesService.getTile(this.options.backgroundImage);
			if (!imageObj.image.image.result) {
				return;
			}

            this._cachePattern = imageObj.image;
        }
    };

    p.drawBackground  = function (ctx) {
		if (!this._cachePattern) {
			this.createCachePattern();
		}

		if (!this._cachePattern) return;

		var camera 			= this.stage.getCamera(),
			x				= -camera.x,
			y				= -camera.y;


		if (this.options.backgroundParallax) {
			var	constraint  = this.stage.getCameraConstraint(),
				size		= this.stage.getSizeGame(),
				widthImage 	= this._cachePattern.width,
				heightImage = this._cachePattern.height,
				widthCamera = size.width,
				heightCamera= size.height,
				width 		= constraint.width,
				height 		= constraint.height;

			x -= (x 	* (widthImage - widthCamera)) 	/ width;
			y -= (y 	* (heightImage - heightCamera))	 / height;

			constraint = null;

		}

		ctx.drawImage(this._cachePattern.image.result, x, y);

		camera 		= null;
    };

    p._paint = function (ctx, tileLayer, data, col, row, offsetX, offsetY, width, height, zoom, startCol, startRow){
        var tile, cellContent = data[col][row];

        switch(tileLayer.layout){
            case 'table' :
                tile = this.tilesService.getTile(cellContent);

                if(tile && tile.image.image.result){

                    ctx.drawImage(
                        tile.image.image.result,
                        tile.image.x,
                        tile.image.y,
                        tile.image.width,
                        tile.image.height,
						col * width  - offsetX,
						row * height - offsetY,
                        tile.image.width * zoom,
                        tile.image.height * zoom
                    )
                }
                break;
            case 'absolute' :

                for(var i = 0 , l = cellContent.length; i < l ; i++){
					if (cellContent[i][3] === 2) {
						if (col !== startCol && row !== startRow) {
							continue;
						}
						if (col === startCol && row !== startRow && row > cellContent[i][5]){
							continue
						}
						if(row === startRow && col !== startCol && col > cellContent[i][4]) {
							continue
						}
					}

					tile = this.tilesService.getTile(cellContent[i][2]);

                    if(tile && tile.image.image.result){

                        ctx.drawImage(
                            tile.image.image.result,
                            tile.image.x  +.5,
                            tile.image.y  +.5,
                            tile.image.width    -.5,
                            tile.image.height   -.5,
							cellContent[i][0] * zoom - offsetX,
							cellContent[i][1] * zoom - offsetY,
                            tile.image.width * zoom,
                            tile.image.height * zoom
                        )
                    }
                }
                break;
        }
		tile = null;
    };

    p.drawLayer = function (tileLayer, ctx) {
		var camera 			= this.stage.getCamera(),
            zoom			= this.stage.getScale(),
            clientSize  	= this.stage.getSizeGame(),
            stageSize 		= this.stage.getSizeStage(),
            isDebug         = this.debug,//tileLayer.name === 'plants',//
			data 			= tileLayer.data,
            top				= -camera.y,
            left			= -camera.x,
            clientHeight 	= clientSize.height / zoom,
            clientWidth 	= clientSize.width 	/ zoom,
            stageHeight		= stageSize.height,
            stageWidth		= stageSize.width,
            tileHeight		= tileLayer.cellHeight 	* zoom,
            tileWidth		= tileLayer.cellWidth	* zoom,
            extraX          = 0,//tileLayer.layout === 'table' ? 0 : 2,
            extraY          = 0;//tileLayer.layout === 'table' ? 0 : 2;

		if (!data) return;

		var parallaxX 	= 0;
		var parallaxY 	= 0;

		if (tileLayer.parallax) {

			if (tileLayer.parallaxX) {
				if (tileLayer.parallaxUnit === '%') {
					parallaxX = left * tileLayer.parallaxX;
				} else {
					parallaxX = left / tileLayer.parallaxX;
				}
			}

			if (tileLayer.parallaxY) {
				if (tileLayer.parallaxUnit === '%') {
					parallaxY = top * tileLayer.parallaxY;
				} else {
					parallaxY = top / tileLayer.parallaxY;
				}
			}

		}

		left += parallaxX;
		top  += parallaxY;

		camera 		= null;
		clientSize 	= null;
		stageSize 	= null;

        var startRow = Math.max(Math.floor(top / tileHeight) - extraX, 0);
        var startCol = Math.max(Math.floor(left / tileWidth) - extraY, 0);

        var maxRows = (stageHeight * zoom) / tileHeight;
        var maxCols = (stageWidth * zoom) / tileWidth;

        var startTop 	= top  >= 0 ? -top  % tileHeight : -top;
        var startLeft 	= left >= 0 ? -left % tileWidth  : -left;

        var rows = Math.floor(clientHeight / tileHeight);

        if ((top % tileHeight) > 0) {
            rows += 1;
        }

        if ((startTop + (rows * tileHeight)) < clientHeight) {
            rows += 1;
        }

        var cols = Math.floor(clientWidth / tileWidth);

        if ((left % tileWidth) > 0) {
            cols += 1;
        }

        if ((startLeft + (cols * tileWidth)) < clientWidth) {
            cols += 1;
        }

        rows = Math.min(rows + extraX, maxRows - startRow);
        cols = Math.min(cols + extraY, maxCols - startCol);

        for (var row = startRow, l = (rows + startRow); row < l; row++) {
            for (var col = startCol, l2 = (cols + startCol); col < l2; col++) {

                if (data[col] && data[col][row] && data[col][row] !== -1) {
					this._paint(ctx, tileLayer, data, col, row, parallaxX, parallaxY, tileWidth, tileHeight, zoom,  startCol, startRow);
                }

				if(isDebug){
					this.drawDebug(ctx, col, row, parallaxX, parallaxY, tileWidth, tileHeight, zoom)
				}
            }
        }
    };

    p.drawDebug = function(context, row, col, left, top, width, height, zoom){
        context.fillStyle = row%2 + col%2 > 0 ? "rgba(86, 223, 235, 0.3)" : "rgba(255,255,255,0.3)";
        context.fillRect(row * width, col * height, width, height);

        context.fillStyle = "black";
        context.font = (14 * zoom).toFixed(2) + 'px Arial';

        context.fillText(row + "," + col, row * width + (6 * zoom),  col * height + (18 * zoom));
    };

	p.destroyed = false;

	p.destroy = function () {
		this.destroyed = true;

		delete this.options;
		delete this.tileLayers;
		delete this.stage;
		delete this.tilesService;
	};

    global.LayerSpriteTile = LayerSpriteTile;
}());