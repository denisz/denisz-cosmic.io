/**
 * @module Events
 */
(function () {
	var global = (1,eval)('this');

	var Events = function(context){
		this.init(context);
	};

	Events.prototype = {};

	var p = Events.prototype;

	p.init = function(context){
		this.context   = context;
		this.locked    = [];
		this.events    = {};
		this.actions   = {};
		this.readyList = {};
	};

	p.exists = function (name) {
		var array = this.events[this.removeOn( name )];
		return !!(array && array.length);
	};

	/**
	 * @param {String} name
	 * @param {Function} callback
	 * @return Boolean
	 */
	p.add = function (name, callback) {
		this.run( 'addOne', name, callback );
		return this;
	};

	/**
	 * @param {String} name
	 * @param {Function} [callback]
	 * @return Boolean
	 */
	p.remove = function (name, callback) {
		if (typeof name == 'string' && !callback) {
			this.removeAll( name );
		} else {
			this.run( 'removeOne', name, callback );
		}
		return this;
	};

	/**
	 * @param {String} name
	 * @param {Array} args
	 * @return atom.Events
	 */
	p.fire=  function (name, args) {
		args = args ? slice.call( args ) : [];
		name = this.removeOn( name );

		this.locked.push(name);
		var i = 0, l, events = this.events[name];
		if (events) for (l = events.length; i < l; i++) {
			events[i].apply( this.context, args );
		}
		this.unlock( name );
		return this;
	};

	/**
	 * @param {String} name
	 * @param {Array} [args=null]
	 * @return atom.Events
	 */
	p.ready = function (name, args) {
		name = this.removeOn( name );
		this.locked.push(name);
		if (name in this.readyList) {
			throw new Error( 'Event «'+name+'» is ready' );
		}
		this.readyList[name] = args;
		this.fire(name, args);
		this.removeAll(name);
		this.unlock( name );
		return this;
	};

	// only private are below

	/** @private */
	p.context= null;
	/** @private */
	p.events= {};
	/** @private */
	p.readyList= {};
	/** @private */
	p.locked= [];
	/** @private */
	p.actions= {};

	/** @private */
	p.removeOn= function (name) {
		return (name || '').replace(/^on([A-Z])/, function(full, first){
			return first.toLowerCase();
		});
	};

	/** @private */
	p.removeAll= function (name) {
		var events = this.events[name];
		if (events) for (var i = events.length; i--;) {
			this.removeOne( name, events[i] );
		}
	};

	/** @private */
	p.unlock= function (name) {
		var action,
			all    = this.actions[name],
			index  = this.locked.indexOf( name );

		this.locked.splice(index, 1);

		if (all) for (index = 0; index < all.length; index++) {
			action = all[index];

			this[action.method]( name, action.callback );
		}
	};

	/** @private */
	p.run = function (method, name, callback) {
		var i = 0, l = 0;

		if (Array.isArray(name)) {
			for (i = 0, l = name.length; i < l; i++) {
				this[method](name[i], callback);
			}
		} else if (typeof name == 'object') {
			for (i in name) {
				this[method](i, name[i]);
			}
		} else if (typeof name == 'string') {
			this[method](name, callback);
		} else {
			throw new TypeError( 'Wrong arguments in Events.' + method );
		}
	};

	/** @private */
	p.register= function (name, method, callback) {
		var actions = this.actions;
		if (!actions[name]) {
			actions[name] = [];
		}
		actions[name].push({ method: method, callback: callback })
	};

	/** @private */
	p.addOne= function (name, callback) {
		var events, ready, context;

		name = this.removeOn( name );

		if (this.locked.indexOf(name) == -1) {
			ready = this.readyList[name];
			if (ready) {
				context = this.context;
				setTimeout(function () {
					callback.apply(context, ready);
				}, 0);
				return this;
			} else {
				events = this.events;
				if (!events[name]) {
					events[name] = [callback];
				} else {
					events[name].push(callback);
				}
			}
		} else {
			this.register(name, 'addOne', callback);
		}
	};

	/** @private */
	p.removeOne= function (name, callback) {
		name = this.removeOn( name );

		if (this.locked.indexOf(name) == -1) {
			var events = this.events[name], i = events.length;
			while (i--) if (events[i] == callback) {
				events.splice(i, 1);
			}
		} else {
			this.register(name, 'removeOne', callback);
		}
	};

	global.Events = Events;
})();