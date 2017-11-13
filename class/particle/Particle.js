(function (){
	var global = (1,eval)('this');
	var Particle = function () {
		this.pos = {
			x: 0,
			y: 0
		};
		this.setVelocity(0, 0);
		this.life = 0;
	};

	var p = Particle.prototype = {};

	p.setVelocity = function(angle, speed) {
		this.vel = {
			x: Math.cos(toRad(angle))  * speed,
			y: -Math.sin(toRad(angle)) * speed
		};
	};

	global.Particle = Particle;
}());

