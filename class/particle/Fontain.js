//fountain particles
(function (){
	var global = (1,eval)('this');

	var ParticlesFountain = function (config) {
		this.totalParticles = 0;
		this.color 			= 'rgb(0,0,0)';
		this.charge = 2;

		_.recursiveExtend(this, config);
		this.initialize();
	};

	var p = ParticlesFountain.prototype = new createjs.Container;

	p.createParticleFountain = function (color) {
		var particle, par;
		particle 		= new createjs.Graphics().beginFill(color || this.color).drawCircle(0, 0, 0.7 + 0.6*Math.random());
		par 			= new createjs.Shape(particle);

		if (this.charge === 2) {
			par.velocityY = -1+ (- Math.random())*1.5;
		} else if (this.charge === 1) {
			par.velocityY = -0.4 + (-1+ (- Math.random())*1.5)/2;
		}

		par.velocityX 	= (Math.random() - Math.random())*0.2;
		par.created 	= Date.now();
		par.life 		= Math.random()*9;
		par.alpha 		= 0.2;
		par.x 			= this.x;
		par.y 			= this.y;

		this.addChild(par);
	};

	//overload _tick
	p._tick = function () {
		var children = this.children;

		//the current time
		var now = Date.now();

		for (var j = 0; j < this.totalParticles; j++) {
			if (!children[j]) {
				this.createParticleFountain('rgba(0,0,0,0)');
			}
			//particle movement
			children[j].x += children[j].velocityX;
			children[j].y += children[j].velocityY;
			//destroying particlesFountain
			if ((now - children[j].created) / 1000 > children[j].life) {
				children[j].alpha = children[j].alpha - 0.02;
			}
			if (children[j].alpha < 0) {
				this.removeChild(children[j]);
				this.createParticleFountain();
			}
			if ((children[j].alpha < 1) && children[j].life > (now - children[j].created) / 1000) {
				children[j].alpha += 0.02;
			}
			//gravity
			children[j].velocityY += 0.014;

			if (children[j].velocityX > 0.4) {
				children[j].velocityX -= Math.random()*0.2;
			}
			if (children[j].velocityX < -0.4) {
				children[j].velocityX += Math.random()*0.2;
			}

		}
	};

	global.ParticlesFountain = ParticlesFountain;
}());