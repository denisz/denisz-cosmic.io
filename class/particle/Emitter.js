/**
 * http://www.github.com
 * https://github.com/city41/particle.js/tree/faa204072c83923cddb6bb7462fe48d17913df74
 */
(function () {
	var global = (1,eval)('this');

	function normalize(vector) {
		var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

		vector.x /= length;
		vector.y /= length;
	}

	function isNumber (i) {
		return typeof i === 'number';
	}

	function isInteger (num) {
		return num === (num | 0);
	}

	function randomRange (num) {
		return Math.floor(Math.random() * num)
	}

	var Emitter = function (system) {
		this._baseSystem 	 = system;
		this.reconfigure(system);
	};

	Emitter.prototype = {
		/*
		 * completely reconfigures the particle system. First applies all
		 * the defaults, then overlays everything found in config
		 */
		reconfigure: function(config) {
			this._totalParticles = 0;
			this.emissionRate = 0;

			this.active = false;
			this.duration = 0;

			this.pos = this.pos || {};
			this.pos.x = 0;
			this.pos.y = 0;

			this.posVar = this.posVar || {};
			this.posVar.x = 0;
			this.posVar.y = 0;

			this.speed = 0;
			this.speedVar = 0;

			this.angle = 0;
			this.angleVar = 0;

			this.life = 0;
			this.lifeVar = 0;

			this.radius = 0;
			this.radiusVar = 0;

			this.texture = null;
			this.textureEnabled = false;
			this.textureAdditive = false;

			this.startScale = 0;
			this.startScaleVar = 0;
			this.endScale = 0;
			this.endScaleVar = 0;

			this.startColor = this.startColor || [];
			this.startColor[0] = 0;
			this.startColor[1] = 0;
			this.startColor[2] = 0;
			this.startColor[3] = 0;

			this.startColorVar = this.startColorVar || [];
			this.startColorVar[0] = 0;
			this.startColorVar[1] = 0;
			this.startColorVar[2] = 0;
			this.startColorVar[3] = 0;

			this.endColor = this.endColor || [];
			this.endColor[0] = 0;
			this.endColor[1] = 0;
			this.endColor[2] = 0;
			this.endColor[3] = 0;

			this.endColorVar = this.endColorVar || [];
			this.endColorVar[0] = 0;
			this.endColorVar[1] = 0;
			this.endColorVar[2] = 0;
			this.endColorVar[3] = 0;

			this.gravity = this.gravity || {};
			this.gravity.x = 0;
			this.gravity.y = 0;

			this.radialAccel = 0;
			this.radialAccelVar = 0;
			this.tangentialAccel = 0;
			this.tangentialAccelVar = 0;

			_.recursiveExtend(this, config, ['texture','bitmap']);

			this.restart();
		},

		/*
		 * flushes out the particle pool and starts the system over
		 * from the beginning. Replacing all the particles with new ones
		 * is a bit nuclear, but gets the job done
		 */
		restart: function() {
			this._particlePool = [];

			for (var i = 0; i < this._totalParticles; ++i) {
				this._particlePool.push(new global.Particle());
			}

			this._particleCount = 0;
			this._particleIndex = 0;
			this._elapsed = 0;
			this._emitCounter = 0;
		},

		reset: function() {
			this.reconfigure(this._baseSystem);
		},

		/*
		 * Returns whether all the particles in the pool are currently active
		 */
		_isFull: function() {
			return this._particleCount === this._totalParticles;
		},

		/*
		 * Takes a dormant particle out of the pool and makes it active.
		 * Does nothing if there is no free particle availabe
		 */
		_addParticle: function() {
			if (this._isFull()) {
				return false;
			}

			var p = this._particlePool[this._particleCount];
			this._initParticle(p); ++this._particleCount;

			return true;
		},

		/*
		 * Initializes the particle based on the current settings
		 * of the particle system
		 */
		_initParticle: function(particle) {
			particle.pos.x = this.pos.x + this.posVar.x * random11();
			particle.pos.y = this.pos.y + this.posVar.y * random11();

			var angle = this.angle + this.angleVar * random11();
			var speed = this.speed + this.speedVar * random11();

			if (this.bitmapEnabled && this.bitmap) {
				particle.bitmap =  this.bitmap[randomRangeInt(0,this.bitmap.length)]
			}

			// it's easier to set speed and angle at this level
			// but once the particle is active and being updated, it's easier
			// to use a vector to indicate speed and angle. So particle.setVelocity
			// converts the angle and speed values to a velocity vector
			particle.setVelocity(angle, speed);

			particle.radialAccel = this.radialAccel + this.radialAccelVar * random11() || 0;
			particle.tangentialAccel = this.tangentialAccel + this.tangentialAccelVar * random11() || 0;

			var life = this.life + this.lifeVar * random11() || 0;
			particle.life = Math.max(0, life);

			particle.scale = isNumber(this.startScale) ? this.startScale: 1;
			particle.deltaScale = isNumber(this.endScale) ? (this.endScale - this.startScale) : 0;
			particle.deltaScale /= particle.life;

			particle.radius = isNumber(this.radius) ? this.radius + (this.radiusVar || 0) * random11() : 0;

			//todo rotate



			// color
			// note that colors are stored as arrays => [r,g,b,a],
			// this makes it easier to tweak the color every frame in _updateParticle
			// The renderer will take this array and turn it into a css rgba string
			if (this.startColor) {
				var startColor = [
					this.startColor[0] + this.startColorVar[0] * random11(), this.startColor[1] + this.startColorVar[1] * random11(), this.startColor[2] + this.startColorVar[2] * random11(), this.startColor[3] + this.startColorVar[3] * random11()];

				// if there is no endColor, then the particle will end up staying at startColor the whole time
				var endColor = startColor;
				if (this.endColor) {
					endColor = [
						this.endColor[0] + this.endColorVar[0] * random11(), this.endColor[1] + this.endColorVar[1] * random11(), this.endColor[2] + this.endColorVar[2] * random11(), this.endColor[3] + this.endColorVar[3] * random11()];
				}

				particle.color = startColor;
				particle.deltaColor = [(endColor[0] - startColor[0]) / particle.life, (endColor[1] - startColor[1]) / particle.life, (endColor[2] - startColor[2]) / particle.life, (endColor[3] - startColor[3]) / particle.life];
			}
		},

		/*
		 * Updates a particle based on how much time has passed in delta
		 * Moves the particle using its velocity and all forces acting on it (gravity,
		 * radial and tangential acceleration), and updates all the properties of the
		 * particle like its size, color, etc
		 */
		_updateParticle: function(p, delta, i) {
			if (p.life > 0) {

				// these vectors are stored on the particle so we can reuse them, avoids
				// generating lots of unnecessary objects each frame
				p.forces = p.forces || {
					x: 0,
					y: 0
				};
				p.forces.x = 0;
				p.forces.y = 0;

				p.radial = p.radial || {
					x: 0,
					y: 0
				};
				p.radial.x = 0;
				p.radial.y = 0;

				// dont apply radial forces until moved away from the emitter
				if ((p.pos.x !== this.pos.x || p.pos.y !== this.pos.y) && (p.radialAccel || p.tangentialAccel)) {
					p.radial.x = p.pos.x - this.pos.x;
					p.radial.y = p.pos.y - this.pos.y;

					normalize(p.radial);
				}

				p.tangential = p.tangential || {
					x: 0,
					y: 0
				};
				p.tangential.x = p.radial.x;
				p.tangential.y = p.radial.y;

				p.radial.x *= p.radialAccel;
				p.radial.y *= p.radialAccel;

				var newy = p.tangential.x;
				p.tangential.x = - p.tangential.y;
				p.tangential.y = newy;

				p.tangential.x *= p.tangentialAccel;
				p.tangential.y *= p.tangentialAccel;

				p.forces.x = p.radial.x + p.tangential.x + this.gravity.x;
				p.forces.y = p.radial.y + p.tangential.y + this.gravity.y;

				p.forces.x *= delta;
				p.forces.y *= delta;

				p.vel.x += p.forces.x;
				p.vel.y += p.forces.y;

				p.pos.x += p.vel.x * delta;
				p.pos.y += p.vel.y * delta;

				p.life -= delta;

				p.scale += p.deltaScale * delta;



				if (p.color) {
					p.color[0] += p.deltaColor[0] * delta;
					p.color[1] += p.deltaColor[1] * delta;
					p.color[2] += p.deltaColor[2] * delta;
					p.color[3] += p.deltaColor[3] * delta;
				}

				++this._particleIndex;
			} else {
				// the particle has died, time to return it to the particle pool
				// take the particle at the current index
				var temp = this._particlePool[i];

				// and move it to the end of the active particles, keeping all alive particles pushed
				// up to the front of the pool
				this._particlePool[i] = this._particlePool[this._particleCount - 1];
				this._particlePool[this._particleCount - 1] = temp;

				// decrease the count to indicate that one less particle in the pool is active.
				--this._particleCount;
			}
		},

		update: function(delta) {
			this._elapsed += delta;
			this.active = this._elapsed < this.duration;

			if (!this.active) {
				return;
			}

			if (this.emissionRate) {
				while (!this._isFull()) {
					this._addParticle();
				}
			}

			this._particleIndex = 0;

			while (this._particleIndex < this._particleCount) {
				var p = this._particlePool[this._particleIndex];
				this._updateParticle(p, delta, this._particleIndex);
			}
		}
	};

	Object.defineProperty(Emitter.prototype, 'particles', {
		get: function() {
			return this._particlePool;
		}
	});

	Object.defineProperty(Emitter.prototype, 'totalParticles', {
		get: function() {
			return this._totalParticles;
		},
		set: function(tp) {
			tp = tp | 0;
			if(tp !== this._totalParticles) {
				this._totalParticles = tp;
				this.restart();
			}
		}
	});

	global.Emitter = Emitter;
}());
