(function(){
	var global = (1,eval)('this');
	/**
	 * @param {Object} options
	 * @property  {Object} animations
	 * 		@property {number} varTime
	 * 		@property {callback} propsFunc
	 * 		@property {callback} ease
	 * @property {number} typeDraw
	 * @property {string} background
	 * @property {string} bitmap
	 * @property {boolean} autorelease
	 * @property {number} autoreleaseTimeRelease
	 *
	 * @constructor
	 * @class SamplingDisplay
	 * @constructor
	 */
	var SamplingDisplay = function (options) {
		this.options 	= options || {};
		this.typeDraw 	= this.options.typeDraw || SamplingDisplay.DRAW.CIRCLE;
		this.initialize();
	};

	/**
	 * @type {{CIRCLE: number, RECT: number}}
	 */
	SamplingDisplay.DRAW = {
		CIRCLE : 1,
		RECT   : 2
	};

	var p = SamplingDisplay.prototype = new createjs.Container;

	/**
	 *
	 * @param sampling
	 */
	p.setSampling = function (sampling) {
		this.sampling = sampling;
	};

	/**
	 *
	 * @private
	 */
	p._createShapes = function () {
		var points = this.sampling.points;
		this.shapes = [];

		if (this.typeDraw === SamplingDisplay.DRAW.CIRCLE) {
			this._createShapeCircle(points);
		} else if (this.typeDraw === SamplingDisplay.DRAW.RECT) {
			this._createShapeRect(points);
		}
	};

	/**
	 *
	 * @param sampling
	 */
	p.initWithSampling = function (sampling) {
		if (this.destroyed) return;
		if (sampling) {
			this.setSampling(sampling);
		}

		if (!this.sampling) return;

		if (this.options.background) {
			this._createBackground();
		}

		this._createShapes();

		if (this.options.bitmap) {
			this._createBitmap(this.options.bitmap);
		}

		if (this.options.animation) {
			this.animation();
		}
	};

	/**
	 *
	 * @param img
	 * @private
	 */
	p._createBitmap = function (img) {
		var bitmap = new createjs.Bitmap(img);
		bitmap.compositeOperation = 'source-in';
		this.addChild(bitmap);
	};

	/**
	 *
	 * @private
	 */
	p._createBackground = function () {
		var w = this.sampling.width,
			h = this.sampling.height,
			back = new createjs.Shape();

		back.graphics.beginFill(this.options.background).rect(0, 0, w, h);
		this.addChild(back);
	};

	/**
	 *
	 * @param points
	 * @private
	 */
	p._createShapeCircle = function (points) {
		var radius 		= this.sampling.minDistance << 1,
			maxRadius	= radius + this.sampling.minDistance,
			transform   = this.options.transform || {},
			isTransformFunc = typeof transform === 'function',
			color 		= this.options.color;

		for(var i = 0, l = points.length; i <l; i++) {
			var shape = new createjs.Shape();
			shape.graphics.beginFill(color).drawCircle(0,0, randomRangeInt(radius,maxRadius)).endFill();

			shape._x = points[i].x;
			shape._y = points[i].y;

			if (isTransformFunc) {
				shape.set(transform(shape, i))
			} else {
				shape.x = shape._x;
				shape.y = shape._y;
				shape.set(transform)
			}

			this.addChild(shape);
			this.shapes.push(shape);
		}
	};

	/**
	 *
	 * @param points
	 * @private
	 */
	p._createShapeRect = function (points) {
		var radius 		= this.sampling.minDistance << 1,
			maxRadius	= radius + this.sampling.minDistance,
			color 		= this.options.color,
			transform   = this.options.transform || {},
			isTransformFunc = typeof transform === 'function';

		for(var i = 0, l = points.length; i <l; i++) {
			var shape = new createjs.Shape(),
				w = randomRangeInt(radius,maxRadius),
				h = randomRangeInt(radius,maxRadius);

			shape.graphics.beginFill(color).rect(0, 0, w, h).endFill();

			shape._x = points[i].x;
			shape._y = points[i].y;

			if (isTransformFunc) {
				shape.set(transform(shape, i))
			} else {
				shape.x = shape._x;
				shape.y = shape._y;
				shape.set(transform)
			}

			shape.regX = w >> 1;
			shape.regY = h >> 1;

			shape.scaleX 	= transform.scaleX || 1;
			shape.scaleY 	= transform.scaleY || 1;
			shape.alpha 	= transform.alpha  || 1;

			this.addChild(shape);
			this.shapes.push(shape);
		}
	};

	p.destroyed = false;

	/**
	 *
	 */
	p.destroy = function () {
		if (this.destroyed) return;

		if (this.parent) {
			this.parent.removeChild(this);
		}

		this.destroyed = true;

		this.shapes.length = 0;
		this.removeAllChildren();
		delete this.shapes;
		delete this.sampling;
	};

	/**
	 * @type {function}
	 */
	p.onHide = null;

	/**
	 *
	 */
	p.hide = function () {
		typeof this.options.onHide === 'function' && this.options.onHide();
		this.destroy();
	};

	/**
	 *
	 */
	p.animation = function () {
		var props, time, varTime, ease, i, l,
			shapes 		= this.shapes || [],
			func		= this.options.animation.func,
			isPropsFunc = typeof func === 'function';

		if (isPropsFunc) {
			for(i = 0 , l = shapes.length; i < l; i++) {
				func(shapes[i], i);
			}
		} else {
			props 		= this.options.animation.props || {scaleX : 0, scaleY: 0, alpha : 0};
			time 		= this.options.animation.time;
			varTime 	= time + (this.options.animation.varTime || 0);
			ease		= this.options.animation.ease;

			for(i = 0 , l = shapes.length; i < l; i++) {
				createjs.Tween.get(shapes[i]).to(props, randomRangeInt(time, varTime), ease);
			}
		}

		if (this.options.autorelease) {
			setTimeout(this.hide.bind(this) , this.options.autoreleaseTimeRelease)
		}
	};

	global.SamplingDisplay = SamplingDisplay;
}());