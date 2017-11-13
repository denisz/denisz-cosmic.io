(function(){
	var global = (1,eval)('this');
	var Hittable = function (host, options) {
		this.host 	 	= host;
		this.options 	= options;
		this.initialize();
	};
	var p = Hittable.prototype = {};

	p.initialize = function () {
		this._hits 		= {};
	};

	p.setHitPoints = function (property, value) {
		var hit = this._hits[property];
		hit.currentValue =  Math.max(Math.min(value,hit.maxValue), 0);

		var actualValue = value, i, l;

		for(i = 0,l = hit.modifier.length; i < l; i++) {
			if ( hit.modifier[i].unit === '+') {
				actualValue  += hit.modifier[i].value;
			} else {
				actualValue  *= hit.modifier[i].value;
			}
		}

		hit.actualValue = Math.max(Math.min(actualValue,hit.maxValue), 0);

		for (i = 0, l = hit.observers.length; i < l ; i++) {
			hit.observers[i](hit);
		}
	};

	p.incrementHitPoints = function (property, value) {
		var hit = this._hits[property];
		this.setHitPoints(property, hit.currentValue + value);
	};

	p.getHitPoints = function (property) {
		return this._hits[property];
	};

	p.getActualHitPoints = function (property) {
		return this._hits[property].actualValue;
	};

	p.setMaxHitPoints = function (property, max) {
		var hit = this._hits[property];
		hit.maxValue = max;
	};

	p.reset = function (property){
	};

	p.removeHit = function (property){
		var hit = this._hits[property];
		typeof hit.remove === 'function' && hit.remove();
		delete this._hits[property];
	};

	p.removeAllHits = function () {
		for (var i in this._hits) {
			if (this._hits.hasOwnProperty(i)) {
				this._hits[i].remove();
			}
		}
		this._hits = {};
	};

	p.addHit = function (hit) {
		if (this._hits[hit.property]) {
			this.removeHit(hit.property);
		}

		var obj = this._hits[hit.property] 	= {
			origin 			: hit,
			observers 		: [],
			modifier  		: [],
			maxValue 		: hit.maxValue || 0,
			currentValue 	: hit.defaultValue,
			actualValue		: hit.defaultValue,
			regenerate      : hit.regenerate,
			regenerateCount : hit.regenerateCount|| 0,
			regenerateTime  : hit.regenerateTime || 1000,
			regenerateUnit  : hit.regenerateUnit || '+'
		};

		typeof hit.create === 'function' && hit.create(obj);

		if (typeof hit.update === 'function') {
			this.addObserver(hit.property, hit.update);
		}
	};

	p.addHits = function (hits) {
		for (var i = 0 , l = hits.length; i < l; i++) {
			this.addHit(hits[i]);
		}
	};

	p.addModifier = function (property,obj) {
		var hit = this._hits[property];
		hit.modifier.push(obj);
	};

	p.removeModifier = function (property,fn) {
		var hit = this._hits[property];
		var index = hit.modifier.indexOf(fn);
		if (index !== -1) {
			hit.modifier.splice(index ,1);
		}
	};

	p.addRegeneration = function (property,regen,unit) {
		var hit 			= this._hits[property];
		hit.regenerate 		= 1;
		hit.regenerateCount = regen;
		hit.regenerateUnit 	= unit || '+'
	};

	p.removeRegeneration = function (property) {
		var hit = this._hits[property];
		hit.regenerate 		= 0;
	};

	p.pauseRegeneration = function (property) {
		var hit = this._hits[property];
		hit.regenerate = 0;
	};

	p.playRegeneration = function (property) {
		var hit = this._hits[property];
		hit.regenerate = 1;
	};

	p.addObserver = function (property, fn) {
		var hit = this._hits[property];
		hit.observers.push(fn);
	};

	p.removeObserver = function (property, fn) {
		var hit 	= this._hits[property];
		var index 	= hit.observers.indexOf(fn);
		if (index !== -1) {
			hit.observers.splice(index ,1);
		}
	};

	p.lastUpdate = 0;

	/**
	 * regeneration per second
	 * @param dt
	 */
	p.update = function (dt) {
		for (var i in this._hits) {
			if (this._hits.hasOwnProperty(i)) {
				var hit =  this._hits[i];

				if ((hit.lastUpdate = hit.lastUpdate + dt, hit.lastUpdate) < hit.regenerateTime) {
					continue;
				}
				hit.lastUpdate = 0;

				if (hit.regenerate && hit.currentValue < hit.maxValue) {
					if ( hit.regenerateUnit === '%' ) {
						this.setHitPoints(i,hit.currentValue * hit.regenerateCount);
					} else {
						this.setHitPoints(i,hit.currentValue + hit.regenerateCount);
					}
				}
			}
		}
	};

	p.release = function () {
		this.removeAllHits();
		delete this.host;
	};

	global.Hittable = Hittable;
}());