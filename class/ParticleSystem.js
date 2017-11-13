(function () {
	var global = (1,eval)('this');

	var bufferCache = {};

	/*
	 * Utility method to create a canvas the same size as the passed in texture (which is
	 * an Image element). Used for _renderParticleTexture
	 */
	function getBuffer(texture) {
		var size = '' + texture.width + 'x' + texture.height;

		var canvas = bufferCache[size];

		if(!canvas) {
			canvas = document.createElement('canvas');
			canvas.width = texture.width;
			canvas.height = texture.height;
			bufferCache[size] = canvas;
		}

		return canvas;
	}

	var ParticleSystem = function (system) {
		this.emitter = new global.Emitter(system);

		if (system.textureEnabled) {
			this.initializeTexture(system.texture);
		} else  if (system.bitmapEnabled) {
			this.initializeBitmap(system.bitmap);
		}

		this.initialize();
	};

	var p = ParticleSystem.prototype = new createjs.DisplayObject;


	p.initializeTexture = function (texture) {
		this.texture 		= texture;
		this.buffer  		= createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
		this.buffer.width  	= texture.width;
		this.buffer.height 	= texture.height;
		this.bufferContext 	= this.buffer.getContext('2d');
	};

	p.initializeBitmap = function (bitmap) {
		this.bitmap = bitmap;
	};

	p.updateAndMove = function (dt, x, y) {
		if (!this.emitter) return;
		this.emitter.pos.x = x;
		this.emitter.pos.y = y;
		this.emitter.update(dt/1000);
	};

	p.onTick = p.update = function (dt) {
		if (!this.emitter) return;
		this.emitter.update(dt/1000);
	};

	p.texture = null;
	p.bufferContext = null;
	p.bitmap = null;

	/**
	 * Render Particle system
	 * @param ctx
	 * @param ignoreCache
	 */
	p.DisplayObject_draw = p.draw;
	p.draw = function (ctx, ignoreCache) {
		if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

		if (!this.emitter) return false;

		var emitter 		= this.emitter,
			bufferContext	= this.bufferContext,
			texture 		= this.texture,
			particles 		= emitter.particles;

		var saveGlobalCompositeOperation = ctx.globalCompositeOperation;

		for (var i = 0, l = particles.length; i < l; ++i) {
			var p = particles[i];

			if(p.life > 0) {
				if(emitter.textureAdditive) {
					ctx.globalCompositeOperation = 'lighter';
				} else {
					ctx.globalCompositeOperation = 'source-over';
				}

				if (emitter.textureEnabled && p.color) {
					var w = (texture.width * p.scale) | 0,
						h = (texture.height * p.scale) | 0,
						x = p.pos.x - w / 2,
						y = p.pos.y - h / 2;

					bufferContext.clearRect(0, 0, texture.width, texture.height);
					bufferContext.globalAlpha = p.color[3];
					bufferContext.drawImage(texture, 0, 0);
					bufferContext.globalCompositeOperation = "source-atop";
					bufferContext.fillStyle = colorArrayToString(p.color, 1);
					bufferContext.fillRect(0, 0, p.buffer.width, p.buffer.height);
					bufferContext.globalCompositeOperation = "source-over";
					bufferContext.globalAlpha = 1;
					ctx.drawImage(texture, 0, 0, texture.width, texture.height, x, y, w, h);
				} else if (emitter.bitmapEnabled) {
					if (p.bitmap.rect) {
						ctx.drawImage(p.bitmap.image,
							p.bitmap.rect[0],
							p.bitmap.rect[1],
							p.bitmap.rect[2],
							p.bitmap.rect[3],
							p.pos.x, p.pos.y,
							p.bitmap.rect[2] * p.scale,
							p.bitmap.rect[3] * p.scale
						);
					} else {
						ctx.drawImage(p.bitmap, p.pos.x, p.pos.y);
					}
				} else if (p.color){
					ctx.fillStyle = colorArrayToString(p.color);
					ctx.beginPath();
					ctx.arc(p.pos.x, p.pos.y, p.radius * p.scale, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();
				}
			}
		}

		ctx.globalCompositeOperation = saveGlobalCompositeOperation;
		return true;
	};

	p.release = function () {
		this.emitter._particlePool.length = 0;
		delete this.emitter;
	};

	global.ParticleSystem = ParticleSystem;
}());