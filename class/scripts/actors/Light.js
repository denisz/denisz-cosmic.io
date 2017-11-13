(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Light) { return; }

	global.scripts.Light = {
		initialize : function (host) {
			host._light = new lib.light_stage();
			host._fast = false;
			host.world.registerSkin(host._light, 'gameplay_go_first');

		},
		update : function (host, manager, dt){
//			host.ps.update(dt);
			//проверять если персонаж в walk то меняем на go
//			var focus = host.stage.camera.getFocusObject();
//			if (focus && !focus.fsm.hasState(focus.states.kStateIdle)) {
//				if (!host._fast) {
//					host._light.gotoAndPlay('go');
//					host._fast = true;
//				}
//			} else {
//
//				if (host._fast) {
//					host._light.gotoAndPlay('stand');
//					host._fast = false;
//
//				}
//			}
		},
		remove : function (host) {
			host.world.unRegisterSkin(host.ps);
		}
	}
}());