(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Portal) { return; }

	global.scripts.Portal = {
		initialize : function (host, manager) {
			host.contactable.addObserver(function(contact, contacting, params){
				var fixture = params.fixture;
				if (fixture.m_userData.name === 'body') {
					//заблокировать персонажа и делаем анимацию портал
					//потому вин
					contacting.controllable.disabled();
					contacting.fsm.tryChangeState(true, contacting.states.kStateNoControlWithoutUpdate);
					contacting.movement.setLinearVelocity(0,0);
					contacting.skin.gotoAndPlay('portal');
					//сделать анимацию сдвига к центру

					var pos 			= contacting.body.m_sweep.c,
						posCenterPortal	= host.body.GetPosition();

					createjs.Tween.get(pos).to({x : posCenterPortal.x, y: posCenterPortal.y}, 200, createjs.Ease.linear);

					contacting.skin.onAnimationEnd = function (target, anim, next ) {
						host.stage.complete(global.Stage.COMPLETE.WIN);
						contacting.skin.stop();
						contacting.skin.onAnimationEnd = null;
					};
				}
			},'begin');

		}
	}
}());