(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Front) { return; }

	var STYLES = {
		'forest_green' : {
			size : [128,128],
			id: 'forest_green'
		},
		'forest_orange' : {
			size : [128,128],
			id: 'forest_orange'
		}
	};

	global.scripts.Front = {
		initialize : function (host) {
			var stage 		= host.stage,
				resources 	= stage.resources,
				h 			= stage.getHeight(),
				style		= STYLES['forest_green'],
				size		= style.size,
				bitmap;

			bitmap = resources.getResult(style.id).result;

			host.ps = new global.ParticleSystem({
				totalParticles: 3,
				emissionRate :30,
				pos: {
					x : 0,
					y : h >> 1
				},
				posVar : {
					x : 0,
					y : 500
				},
				gravity: {
					x: 100,
					y: 3
				},
				angle: 0,
				angleVar: 30,
				speed: 36,
				speedVar: 5,
				life: 7,
				lifeVar: 10,
				radialAccel: -36,
				radialAccelVar: 0,
				tangentialAccel: 14,
				tangentialAccelVar: 0,
				textureEnabled: false,
				textureAdditive: false,
				bitmapEnabled : true,
				bitmap : [
					{
						image : bitmap,
						rect  : [0, 0, size[0], size[1]]
					},
					{
						image : bitmap,
						rect  : [0, size[1], size[0], size[1]]
					},
					{
						image : bitmap,
						rect  : [size[0], 0, size[0], size[1]]
					},
					{
						image : bitmap,
						rect  : [size[0], size[1], size[0], size[1]]
					}
				],
				radius: 3,
				radiusVar: 1,
				startScale:.2,
				endScale:.5,
				startColor: null,
				startColorVar: null,
				endColor: null,
				active: true,
				duration: Infinity
			});
			host.world.registerSkin(host.ps, 'gameplay_go_static');
		},
		update : function (host, manager, dt){
//			host.ps.update(dt);
		},
		remove : function (host) {
			host.world.unRegisterSkin(host.ps);
		}
	}
}());