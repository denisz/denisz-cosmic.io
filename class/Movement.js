(function () {
	var global  = (1,eval)('this');

	/**
	 * @param host
	 * @param params
	 * @constructor
	 */
	var Movement = function (host, params) {
		this.host 	 = host;
		this.body 	 = host.body;
		this.isBox2d = this.body instanceof b2Body;
	};

	var p = Movement.prototype = {};

	/**
	 * Math.cos	(degrees * (Math.PI / 180)) * power,
	 * Math.sin	(degrees * (Math.PI / 180)) * power
	 * @param x
	 * @param y
	 * @return {*}
	 */
	p.applyImpulse  = function (x, y){
		var body = this.body;
		body && body.ApplyImpulse(new b2Vec2(x, y), body.GetWorldCenter());
		return this;
	};

	/**
	 * @param x
	 * @param y
	 * @return {*}
	 */
	p.applyForce    = function (x, y) {
		var body = this.body;
		body && body.ApplyForce(new b2Vec2(x, y),body.GetWorldCenter());
		return this;
	};

	p.setTransform  = function (x, y, a){
		var body = this.body;
		body && body.SetTransform(new b2Vec2(x,y), a);
		return this;
	};

	p.getTransform 	= function () {
		var body = this.body;
		return body && body.GetTransform();
	};

	p.setFriction   = function (friction){
		var body = this.body;
		body && body.GetFixtureList().SetFriction(friction);
	};

	p.setLinearVelocity = function (x, y){
		var body = this.body;
		body && body.SetLinearVelocity(new b2Vec2(x,y));
		return this;
	};

	p.getLinearVelocity = function () {
		var body = this.body;
		return body && body.GetLinearVelocity();
	};

	p.setFixedRotation = function (bool){
		var body = this.body;
		body && body.SetFixedRotation(bool);
		return this;
	};

	p.setType = function (type) {
		this.body.SetType(type);
	};

	p.release = function () {
		delete this.host;
		delete this.body;
	};

	global.Movement = Movement;
}());