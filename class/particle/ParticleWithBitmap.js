(function(){
	var global = (1,eval)('this');
	var ParticleWithBitmap = function(config){
		this.totalParticles = 0;
		this.bitmap 		= config.bitmap;
		this.width          = 100;
		this.height         = 100;

		this.Container_initialize();
		_.recursiveExtend(this, config, ['bitmap']);
		this.initialize();
	};
	var p = ParticleWithBitmap.prototype = new createjs.Container;

	p.Container_initialize = p.initialize;

	p.initialize = function () {
		var par, bitmaps, len;

		len = this.bitmap.length;
		bitmaps = this.bitmap;

		for (var i=0; i < this.totalParticles; i++) {
			par = new createjs.Bitmap(bitmaps[randomRangeInt(0,len)]);
            par.x = lerp(0,this.width, Math.random());
            par.y = lerp(0,this.height, Math.random());
			par.velocityX = 0.5 * -Math.random();
			par.velocityY = (Math.random() - Math.random())*0.5;
            par.velocityRotate = random11() * Math.random();
//            par.scaleY = par.scaleX = Math.random();
            par.rotation = lerp(0,360,Math.random());
			par.created = Date.now();
			par.life = Math.random()*10;
			this.addChild(par);
		}
	};

	p.createParticle = function () {
		var par, bitmaps, len;

		len = this.bitmap.length;
		bitmaps = this.bitmap;

		par = new createjs.Bitmap(bitmaps[randomRangeInt(0,len)]);
		par.x = lerp(0,this.width, Math.random());
		par.y = lerp(0,this.height, Math.random());
		par.velocityX = 0.5 * -Math.random();
		par.velocityY = (Math.random() - Math.random())*0.5;
        par.velocityRotate = random11() * Math.random();
        par.rotation = lerp(0,360,Math.random());
//        par.scaleY = par.scaleX = Math.random();
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

            children[j].rotation += children[j].velocityRotate;

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

	global.ParticleWithBitmap = ParticleWithBitmap;
}());