(function(){
	var global  = (1,eval)('this');

	var Point2 = function(x,y){
		this.initialize(x,y);
	};

	var p = Point2.prototype = new createjs.Point();

	p.initialize_Point = p.initialize;

	p.initialize = function(x,y){
		this.initialize_Point(x,y);
	};

	p.MagnitudeSquared = function () {
		return this.x * this.x + this.y * this.y;
	};

	p.Magnitude = function () {
		return Math.sqrt(this.MagnitudeSquared());
	};

	p.add = function (v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	};

	p.addNew = function (v) {
		return new Point2(this.x + v.x, this.y + v.y);
	};

	p.sub = function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	p.subNew = function (v) {
		return new Point2(this.x - v.x, this.y - v.y);
	};

	p.mul = function (f) {
		this.x *= f;
		this.y *= f;
		return this;
	};

	p.mulNew = function (f) {
		return new Point2(this.x * f, this.y * f);
	};

	p.div = function (f) {
		this.x /= f;
		this.y /= f;
		return this;
	};

	p.eq = function (v) {
		return this.x === v.x && this.y === v.y;
	};

	p.neq = function (v) {
		return this.x !== v.x || this.y !== v.y;
	};

	p.copy = function (){
		return new Point2(this.x, this.y);
	};

	global.Point2 = Point2;
}());