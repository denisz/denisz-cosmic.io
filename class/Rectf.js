(function () {
	var global 	= (1,eval)('this'),
		Vec2 	= global.Vec2,
		Point2 	= global.Point2;

	/**
	 * creates a rectangle
	 *
	 * @param x is value in pixels
	 * @param y is value in pixels
	 * @param x1 is value in pixels
	 * @param y1 is value in pixels
	 * @returns {Rectf}
	 */
	var Rectf = function (x, y, x1, y1) {
	    this.x = x;
	    this.y = y;
	    this.x1 = x1;
	    this.y1 = y1;
	    this.width = x1 - x + 1;
	    this.height = y1 - y + 1;
	};

	Rectf.prototype = new Rectangle();

	/**
	 * gives the center of rectangle
	 *
	 * @returns Vec2 instance
	 */
	Rectf.prototype.center = function() {
	    return new Vec2((this.x1 + this.x + 1) / 2.0, (this.y1 + this.y + 1) / 2.0);
	};

	/**
	 * inverts the rectangle along one of the axes
	 *
	 * @param axe true means over x, false - y
	 */
	Rectf.prototype.invert = function(axe) {
	    assert(axe != null);
	    if (axe) {
	        return new Rectf(-this.x1, this.y, -this.x, this.y1);
	    } else {
	        return new Rectf(this.x, -this.y1, this.x1, -this.y);
	    }
	};

	/**
	 * moves rectangle by a vector
	 *
	 * @param ox is a number of Vec2
	 * @param oy is a number or undefined if ox is a Vec2
	 * @returns Rectf instance
	 */
	Rectf.prototype.offset = function(ox, oy) {
	    if (ox instanceof Vec2 || ox instanceof Point2) {
	        assert(oy === undefined);
	        oy = ox.y;
	        ox = ox.x;
	    }
	    assert(ox != null && oy != null);
	    return new Rectf(this.x + ox, this.y + oy, this.x1 + ox, this.y1 + oy);
	};

	/**
	 * expands rectangle
	 *
	 * @param w is a number or Vec2
	 * @param h is a number or undefined is w is a Vec2
	 */
	Rectf.prototype.expand = function(w, h) {
	    if (w instanceof Vec2 || w instanceof Point2) {
	        assert(h === undefined);
	        h = w.y;
	        w = w.x;
	    }
	    assert(w != null && h != null);
	    return new Rectf(this.x - w, this.y - h, this.x1 + w, this.y1 + h);
	};

	/**
	 * checks for containment (including border)
	 *
	 * @param x is either a number, Vec2 or Rectf
	 * @param y is a number in case if x is, and must be undefined otherwise
	 */
	Rectf.prototype.contains = function(x, y) {
	    var o = x;
	    if (x instanceof Vec2 || x instanceof Point2) {
	        assert(y === undefined);
	        return this.x <= o.x && this.y <= o.y && o.x <= this.x1 && o.y <= this.y1;
	    } else if (x instanceof Rectf) {
	        assert(y === undefined);
	        return this.x <= o.x && this.y <= o.y && o.x1 <= this.x1 && o.y1 <= this.y1;
	    } else {
	        assert(x != null && y != null);
	        return this.x <= x && this.y <= y && x <= this.x1 && y <= this.y1;
	    }
	};

	/**
	 * checks containment of circle or rectangle inside this rectangle
	 *
	 * @param shape is either Rectf or Circle
	 * @param ox is a number, Vec2 or undefined
	 * @param oy is a number if ox is a number, or undefined otherwise
	 * @returns boolean
	 */
	Rectf.prototype.overlaps = function(shape, ox, oy) {
	    var r, x, y;
	    if (ox === undefined) {
	        assert(oy === undefined);
	        ox = 0;
	        oy = 0;
	    } else if (ox instanceof Vec2 || ox instanceof Point2) {
	        assert(oy === undefined);
	        oy = ox.y;
	        ox = ox.x;
	    }
	    assert(ox != null && oy != null);
	    if (shape instanceof Circle) {
	        r = shape.r;
	        x = shape.c.x + ox;
	        y = shape.c.y + oy;
	        return this.x - r <= x && this.y - r <= y && x <= this.x1 + r && y <= this.y1 + r;
	    } else if (shape instanceof Rectf) {
	        return !(this.x > shape.x1 + ox || this.x1 < shape.x + ox ||
	                 this.y > shape.y1 + oy || this.y1 < shape.y + oy);
	    } else {
	        assert(false);
	    }
	};

	/**
	 * Clips a vector to the rect
	 *
	 * @param {Vec2} v
	 * @returns {Vec2}
	 */
	Rectf.prototype.clip = function (v) {
		return new Vec2(Math.max(this.x, Math.min(this.x1, v.x)), Math.max(this.y, Math.min(this.y1, v.y)));
	};

	/**
	 * Clips a vector to the rect set
	 *
	 *
	 * @param {Vec2} v
	 * @returns {Vec2}
	 */
	Rectf.prototype.clipSet = function (v) {
		v.x = Math.max(this.x, Math.min(this.x1, v.x));
		v.y = Math.max(this.y, Math.min(this.y1, v.y));
		return v;
	};

	/**
	 * Copy the rect, instantiating a new one
	 *
	 * @returns {Rectf}
	 */
	Rectf.prototype.copy = function () {
		return new Rectf(this.x, this.y, this.x1, this.y1);
	};

	Rectf.prototype.include = function (x, y) {
	    this.x = Math.min(this.x, x);
	    this.y = Math.min(this.y, y);
	    this.x1 = Math.max(this.x1, x);
	    this.y1 = Math.max(this.y1, y);
		this.width = this.x1 - this.x + 1;
		this.height = this.y1 - this.y + 1;
	};

	global.Rectf = Rectf;
}());
