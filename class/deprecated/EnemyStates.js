(function () {
	var global = (1,eval)('this');

	var EnemyIdleState 					= function () {
		this.init.apply(this,arguments);
	};
    EnemyIdleState.prototype 			= new global.BaseState();
    EnemyIdleState.prototype.enter 		= function (msg, fromState) {
		console.log('Простой');
		this.host.setFriction(7);
		this.host.setLinearVelocity(0,0);
        this.host.skin.gotoAndPlay('idle');
	};
    EnemyIdleState.prototype.update 	= function (time) {
	};
    EnemyIdleState.prototype.transition = function () {
		//если зажаты кнопки управления переключаем на нужный стате
		var input = this.host.input;

		return  this.fsm.tryChangeState(!this.host.isOnGround(),this.host.states.kStateFall);
	};
    EnemyIdleState.prototype.leave 		= function () {};

	var EnemyJumpState 					= function () {
		this.init.apply(this,arguments);
	};
    EnemyJumpState.prototype 			= new global.BaseState();
    EnemyJumpState.prototype.enter 		= function (msg, fromState) {
		console.log('Прыжок');
		this.timeInState = 0;
	};
    EnemyJumpState.prototype.update 	= function (time) {
		this.timeInState += time;
	};
    EnemyJumpState.prototype.transition = function () {
		var vel = this.host.getLinearVelocity();

		return 	this.fsm.tryChangeState(vel.y > 0, 	this.host.states.kStateFall) ||
				this.fsm.tryChangeState(this.host.isOnGround() && vel.y > 0, this.host.states.kStateIdle);
	};
    EnemyJumpState.prototype.leave 		= function () {};

	var EnemyFallState 					= function () {
		this.init.apply(this,arguments);
	};
    EnemyFallState.prototype 			= new global.BaseState();
    EnemyFallState.prototype.enter 		= function () {
		console.log('Падение');
//		this.host.setFriction(0);
	};
    EnemyFallState.prototype.update 	= function () {
	};
    EnemyFallState.prototype.transition = function () {
		this.fsm.tryChangeState(this.host.isOnGround(), this.host.states.kStateIdle);
	};
    EnemyFallState.prototype.leave 		= function () {};

    var EnemyDamagedState                   = function() {
        this.init.apply(this,arguments);
    };
    EnemyDamagedState.prototype             = new global.BaseState();
    EnemyDamagedState.prototype.enter       = function(msg, fromState){};
    EnemyDamagedState.prototype.update      = function(time){};
    EnemyDamagedState.prototype.leave       = function(){};
    EnemyDamagedState.prototype.transition  = function(){};

	var EnemyWalkState 					= function () {
		this.init.apply(this,arguments);
        if(this.host.skin.currentAnimation !== 'run')
            this.host.skin.gotoAndPlay('run');
	};
    EnemyWalkState.prototype 			= new global.BaseState();
    EnemyWalkState.prototype.enter 		= function ( ) {
		console.log('ходьба')
	};
    EnemyWalkState.prototype.update 	= function () {
	};
    EnemyWalkState.prototype.transition = function () {
		return 	this.fsm.tryChangeState(!this.host.isOnGround(),this.host.states.kStateFall);
	};
    EnemyWalkState.prototype.leave 		= function () {};

	var EnemyDeadState 					= function (){};
    EnemyDeadState.prototype 			= new global.BaseState();
    EnemyDeadState.prototype.enter 		= function(){};
    EnemyDeadState.prototype.update 	= function(){};
    EnemyDeadState.prototype.transition = function(){};
    EnemyDeadState.prototype.leave 		= function(){};

	global.EnemyIdleState       = EnemyIdleState;
	global.EnemyJumpState       = EnemyJumpState;
	global.EnemyFallState       = EnemyFallState;
	global.EnemyWalkState       = EnemyWalkState;
	global.EnemyDeadState       = EnemyDeadState;
    global.EnemyDamagedState    = EnemyDamagedState;

}());