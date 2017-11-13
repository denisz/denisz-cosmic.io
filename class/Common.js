(function () {
	var substituteRE = /\\?\{([^{}]+)\}/g;

	_.substitute = function (string, object, regexp) {
			return string.replace(regexp || substituteRE, function(match, name){
				return (match[0] == '\\') ? match.slice(1) : (object[name] == null ? '' : object[name]);
			});
		};

	_.begins = function (string, w, caseInsensitive) {
			return (!caseInsensitive) ? w == string.substr(0, w.length) :
				w.toLowerCase() == string.substr(0, w.length).toLowerCase();
		};

	_.ucfirst = function (string) {
			return string[0].toUpperCase() + string.substr(1);
		};

	_.lcfirst = function (string) {
			return string[0].toLowerCase() + string.substr(1);
		};

	_.trim = ''.trim || function (string) {
			return string.trimLeft().trimRight();
		};

	_.trimLeft = ''.trimLeft || function (string) {
			return string.replace(/^\s+/, '');
		};

	_.trimRight = ''.trimRight || function (string) {
			return string.replace(/\s+$/, '');
		};

	_.recursiveExtend =  function (obj, config, exceptions) {
			exceptions = exceptions || [];
			for (var prop in config) {
				if (config.hasOwnProperty(prop)) {
					if (exceptions.indexOf(prop) > - 1) {
						obj[prop] = config[prop];
					} else {
						if (typeof config[prop] === 'object') {
							_.recursiveExtend(obj[prop], config[prop], exceptions);
						} else {
							obj[prop] = config[prop];
						}
					}
				}
			}
		}
}());

(function (console) {

	var i,
		global  = this,
		fnProto = Function.prototype,
		fnApply = fnProto.apply,
		fnBind  = fnProto.bind,
		bind    = function (context, fn) {
			return fnBind ?
				fnBind.call( fn, context ) :
				function () {
					return fnApply.call( fn, context, arguments );
				};
		},
		methods = 'assert count debug dir dirxml error group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd trace warn'.split(' '),
		emptyFn = function(){},
		empty   = {},
		timeCounters;

	for (i = methods.length; i--;) empty[methods[i]] = emptyFn;

	if (console) {

		if (!console.time) {
			console.timeCounters = timeCounters = {};

			console.time = function(name, reset){
				if (name) {
					var time = +new Date, key = "KEY" + name.toString();
					if (reset || !timeCounters[key]) timeCounters[key] = time;
				}
			};

			console.timeEnd = function(name){
				var diff,
					time = +new Date,
					key = "KEY" + name.toString(),
					timeCounter = timeCounters[key];

				if (timeCounter) {
					diff  = time - timeCounter;
					console.info( name + ": " + diff + "ms" );
					delete timeCounters[key];
				}
				return diff;
			};
		}

		for (i = methods.length; i--;) {
			console[methods[i]] = methods[i] in console ?
				bind(console, console[methods[i]]) : emptyFn;
		}
		console.disable = function () { global.console = empty;   };
		  empty.enable  = function () { global.console = console; };

		empty.disable = console.enable = emptyFn;

	} else {
		console = global.console = empty;
		console.disable = console.enable = emptyFn;
	}

})( typeof console === 'undefined' ? null : console );

/**
* clamp the given value based on given parameters
*
* @param {number} min Minimum value
* @param {number} val Value to be clamped
* @param {number} max Maximum value
* @returns {number}
*/
function clamp(min, val, max) {
	if (val < min) {
		return min;
	}
	else if (val > max) {
		return max;
	}

	return val;
}

function smoothstep (min, max, value) {
	return Math.max(0, Math.min(1, (value-min)/(max-min)));
}

function interpolates(from, to, value) {
	if (Math.min(value/to, 1) < .5) {
		return from
	}
	return to;
}
/**
 *
 * @param from
 * @param to
 * @param t
 * @returns {number}
 */
function lerp(from, to, t) {
	return from + t * (to - from);
}


/**
 * Randomizes a number in the specifed range.
 *
 * @param {number} l lower limit of the range.
 * @param {number} h higher limit of the range.
 * @returns {number}
 */
function randomRange(l, h){
	return l + Math.random() * (h-l);
}

/**
 * Randomizes a number in the specifed range.
 *
 * @param {number} l lower limit of the range.
 * @param {number} h higher limit of the range.
 * @returns {number}
 */
function randomRangeInt(l, h){
	return randomRange(l, h) | 0;
}

/**
 * Randomizes a boolean.
 *
 * @returns {Boolean}
 */
function randomBool(){
	return Math.random() >= 0.5;
}

/**
 * Copies all properties from the source to the destination.
 *
 * @param {Object} source the source.
 * @param {Object} destination the destination.
 */
function copy(source, destination) {
	for ( var k in source) {
		if (source.hasOwnProperty(k)) destination[k] = source[k];
	}
}

function random11() {
	return randomRange(-1,1);
}

/**
 * deg to radian
 * @param deg
 * @return {Number}
 */
function toRad(deg) {
	return Math.PI * deg / 180;
}

/*
 * Given an array with four channels (r, g, b and a),
 * returns a css rgba string compatible with Canvas.
 * Optionally provide an override alpha value that will be used
 * in place of the actual alpha (useful for texture rendering)
 */
function colorArrayToString(array, overrideAlpha) {
	var r = array[0] | 0;
	var g = array[1] | 0;
	var b = array[2] | 0;
	var a = overrideAlpha || array[3];

	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

/**
 * Creates a callback function with the correct "this".
 *
 * @param {Function} callback the callback function to be called.
 * @param {Object} that the wanted "this".
 * @returns {Function} a proper callback function.
 */
function createCallback(callback, that) {
	return function() {
		callback.apply(that, arguments);
	};
}

/**
 * Creates a callback function with the correct "this".
 * Takes additiional arguments that will be added to the beginning of the
 * argument list that will be sent to the callback.
 *
 * @param {Function} callback the callback function to be called.
 * @param {Object} that the wanted "this".
 * @returns {Function} a proper callback function.
 */
function createCallbackWithArgs(callback, that) {
	var arg = arguments;
	delete arg[0];
	delete arg[1];
	return function() {
		callback.apply(that, arg.concat(arguments));
	};
}

/**
 * Base exception class
 */
RuntimeException = function () {};
RuntimeException.prototype = new Error();
/**
 *
 * @param message
 */
RuntimeException.prototype.assign = function(message) {
	if (message === undefined) {
		this.message = "";
	} else {
		this.message = message;
	}
};


/**
 * AssertionError stands for an assertion failure
 *
 * @param message is an optional message
 * @class {AssertionError}
 */
AssertionError = function (message) {
	this.assign(message);
};
AssertionError.prototype = new RuntimeException();


/**
 * asserts on a condition
 *
 * @param condition is a boolean value
 * @param message is an optional error description
 */
function assert(condition, message) {
	if (!condition) {
		throw new AssertionError(message);
	}
}