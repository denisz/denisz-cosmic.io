(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.DeadZone) { return; }

	global.scripts.DeadZone = {
		initialize : function (host, manager) {
			var world  = host.world,
				body   = host.body,
				size   = host.stage.size,
				width  = size.width;

			var fixture = world.getFixtureByName(body, 'body');

			if (fixture) {
				world.rmFixtureToBody(body, fixture);
				world.addFixtureToBody(body, {
					shape : {
						type        : 'rectangle',
						width 		: width,
						height		: 30,
						x 	 		: width >> 1,
						y 	 		: 0
					},
					name 		: 'body',
					isSensor	: true
				});
			}

			host.contactable.addObserver(function(contact, contacting, params){
				var fixture = params.fixture;
				if (fixture.m_userData.name === 'body') {
					contacting.dead && contacting.dead('deadZone');
				}
			},'begin');

		}
	}
}());