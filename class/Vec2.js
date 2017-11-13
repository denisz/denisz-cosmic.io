(function(){
	var global = (1,eval)(this);

	var Vec2 = function(x,y){
		this.initialize(x,y);
	};

	var p = Vec2.prototype = new global.Point2();

	p.initialize_Point2 = p.initialize;

	p.initialize = function(x,y){
		this.initialize_Point2(x,y)
	};

	p.Zero = function(){
		return new Vec2(0, 0);
	};

	p.Dot = function (arg) {
	    return this.x * arg.x + this.y * arg.y;
	};

	p.Cross = function (arg) {
	    return this.x * arg.y - this.y * arg.x;
	};

	p.Normalize = function () {
	    var inv = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
	    this.x *= inv;
	    this.y *= inv;

	    return this;
	};

	p.clone = function () {
	    return new Vec2(this.x, this.y);
	};

	global.Vec2 = Vec2;
}());