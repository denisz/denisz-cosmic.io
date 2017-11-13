(function () {
	var global = (1,eval)('this');
	var Body = function (x, y, width, height, angle) {
		this.x 		= x;
		this.y 		= y;
		this.angle 	= angle;
		this.width 	= width;
		this.height = height;
	};
	var p = Body.prototype = {};

	p.getAngle = function () {
		return this.angle
	};

	p.SetUserData = function (data) {
		this._userData = data;
	};

	p.SetPosition = function (vec) {
		this.x = vec.x;
		this.y = vec.y;


	};

	p.GetFixtureList = function () {};

	//this.m_sweep.c.x Добавить для полной совместимости

	p.GetWorldCenter = function () {
		return {
			x	: this.x,
			y	: this.y
		};
	};

	global.Body = Body;
}());