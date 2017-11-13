(function(){
	var global = (1,eval)('this');
	var ParticleWithShape = function(config){
		this.totalParticles = 0;
		this.color 			= 'rgb(0,0,0)';
		this.width          = 100;
		this.height         = 100;

		this.Container_initialize();
		_.recursiveExtend(this, config);
		this.initialize();
	};
	var p = ParticleWithShape.prototype = new createjs.Container;

	p.Container_initialize = p.initialize;

	p.initialize = function () {
		var particle, par, width, height;
		width = this.width;
		height= this.height;

		for (var i=0; i < this.totalParticles; i++) {
			particle = new createjs.Graphics().beginFill(this.color).drawCircle(
                Math.random()*width*2 | 0,
                Math.random()*height | 0,
                0.6 + 0.6*Math.random()
            );
			par = new createjs.Shape(particle);
			par.velocityX = 0.5 * -Math.random();
			par.velocityY = (Math.random() - Math.random())*0.5;
			par.created = Date.now();
			par.life = Math.random()*10;
			this.addChild(par);
		}
	};

	p.createParticle = function () {
		var particle, par;
		particle = new createjs.Graphics().beginFill(this.color ).drawCircle(
            Math.random()*this.width*2 - this.width*0.7 | 0,
            Math.random()*this.height | 0,
            0.6 + 0.6*Math.random());
		par = new createjs.Shape(particle);
		par.velocityX = 0.5 * -Math.random();
		par.velocityY = (Math.random() - Math.random())*0.5;
		par.created = Date.now();
		par.life = Math.random()*9;
		par.alpha = 0.2;
		this.addChild(par);
	};

	p._tick = function () {
		var children = this.children;

		for (var j = 0, l = children.length; j < l; j++) {
			//the current time
			var now = Date.now();
			//particle movement
			children[j].x += children[j].velocityX;
			children[j].y += children[j].velocityY;

			//destroying particles
			if ((now - children[j].created) / 1000 > children[j].life) {
				children[j].alpha = children[j].alpha - 0.02;
			}
			if (children[j].alpha < 0) {
				this.removeChild(children[j]);
				this.createParticle();
			}
			if ((children[j].alpha < 1) && children[j].life > (now - children[j].created) / 1000) {
				children[j].alpha += 0.02;
			}

		}
	};

	global.ParticleWithShape = ParticleWithShape;
}());