(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Flower) { return; }

	var IdleState 					= function () {
		this.init.apply(this,arguments);
	};
	IdleState.prototype 			= new global.BaseState();
	IdleState.prototype.enter 		= function (msg, fromState) {
		this.host.skin.gotoAndPlay('idle');
	};
	IdleState.prototype.transition 	= function () {
	};

	var ThrowState = function () {
		this.init.apply(this,arguments);
	};

	ThrowState.prototype 			= new global.BaseState();
	ThrowState.prototype.enter 		= function (msg, fromState) {
		this.host.skin.gotoAndPlay('attack');
		this.timeInState = 0;
	};
	ThrowState.prototype.update 		= function (time) {
		this.timeInState += time;
	};
	ThrowState.prototype.transition 	= function () {
		return  this.fsm.tryChangeState(this.timeInState > 300,this.host.states.kStateIdle)
	};

	global.FSM_Flowers = {};
	global.FSM_Flowers.IdleState  = IdleState;
	global.FSM_Flowers.ThrowState = ThrowState;

	var States = {
		kStateIdle  : 1,
		kStateThrow : 2
	};

	global.scripts.Flower = {
		initialize : function (host, manager) {
			host.states = States;
			var statesList = [
				States.kStateIdle,  global.FSM_Flowers.IdleState,
				States.kStateThrow, global.FSM_Flowers.ThrowState
			];
			randomBool() && host.faceLeft();
			host.fsm = new global.FSM(host, statesList);
			host.fsm.enter(States.kStateIdle);
			host.contactable.addObserver(function(contact, contacting, params){
				if (host.fsm.currentState !== States.kStateThrow) {
					var impulseX = host.settings.impulseX,
						impulseY = host.settings.impulseY,
						damage	 = host.settings.damage;

					if (contacting.movement) {
						contacting.controllable.disabledWithChangeState(300);
						contacting.movement.setLinearVelocity(0,0);
						contacting.movement.applyImpulse(contacting.facingLeft ? impulseX : -impulseX,-impulseY);
						contacting.faceInvert();
						contacting.stage.addEffect('Shock');
						host.fsm.tryChangeState(true, States.kStateThrow);
						contacting.hittable.incrementHitPoints('health',-damage);
					}

				}
			},'begin');

//			host.ps = new global.ParticleSystem({
//				totalParticles: 25,
//				emissionRate: 150 / 2,
//				pos: {
//					x : 0,
//					y : 0
//				},
//				posVar : {
//					x : 10,
//					y : 0
//				},
//				gravity: {
//					x: -0,
//					y: - 100
//				},
//				angle: 90,
//				angleVar: 360,
//				speed: 15,
//				speedVar: 5,
//				life: 2,
//				lifeVar: 1,
//				radialAccel: 0,
//				radialAccelVar: 0,
//				tangentialAccel: 0,
//				tangentialAccelVar: 0,
//				textureEnabled: false,
//				textureAdditive: true,
//				radius: 3,
//				radiusVar: 1,
//				startScale: 1,
//				endScale: 1,
//				startColor: [51, 102, 178.5, 1],
//				startColorVar: [0, 0, 51, 0.1],
//				endColor: [0, 0, 0, 1],
//				active: true,
//				duration: Infinity
//			});
//			host.world.registerSkin(host.ps, 'gameplay_go');
		},
		update : function (host, manager, dt){
//			host.ps.update(dt, host.skin.x + 115, host.skin.y + 120);
		},
		remove : function (host, manager) {
//			host.world.unRegisterSkin(host.ps);
		}
	}
}());