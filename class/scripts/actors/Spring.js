(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Spring) { return; }

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
		this.host.skin.gotoAndPlay('jump');
		this.timeInState = 0;
	};
	ThrowState.prototype.update 		= function (time) {
		this.timeInState += time;
	};
	ThrowState.prototype.transition 	= function () {
		return  this.fsm.tryChangeState(this.timeInState > 400,this.host.states.kStateIdle)
	};

	global.FSM_Spring = {};
	global.FSM_Spring.IdleState  = IdleState;
	global.FSM_Spring.ThrowState = ThrowState;

	var States = {
		kStateIdle  : 1,
		kStateThrow : 2
	};

	var statesList = [
		States.kStateIdle,  global.FSM_Spring.IdleState,
		States.kStateThrow, global.FSM_Spring.ThrowState
	];

	global.scripts.Spring = {
		initialize : function (host, manager) {
			host.states = States;

			randomBool() && host.faceLeft();
			host.fsm = new global.FSM(host, statesList);
			host.fsm.enter(States.kStateIdle);
			host.contactable.addObserver(function(contact, contacting, params){
				if (host.fsm.currentState !== States.kStateThrow) {
					var impulseX = host.settings.impulseX,
						impulseY = host.settings.impulseY;

					if (contacting.movement) {
						contacting.controllable.disabledWithChangeState(80);
						contacting.movement.setLinearVelocity(0,0);
						contacting.movement.applyImpulse(contacting.facingLeft ? -impulseX : impulseX,-impulseY);
						host.fsm.tryChangeState(true, States.kStateThrow);
					}

				}
			},'begin')
		}
	}
}());