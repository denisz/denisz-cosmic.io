(function () {
	var global = (1, eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Slug) { return; }

	var WalkState = function () {
		this.init.apply(this, arguments);
	};
	WalkState.prototype = new global.BaseState();
	WalkState.prototype.enter = function (msg, fromState) {
		var input  	= this.host.controllable.input;

		if (input.hold(global.Buttons.left)) {
			this.host.movement.setLinearVelocity(-this.host.settings.speed,0);

			if (!this.host.facingLeft) {
				this.host.faceLeft();
			}
		}

		if (input.hold(global.Buttons.right)) {
			this.host.movement.setLinearVelocity(this.host.settings.speed,0);

			if (this.host.facingLeft) {
				this.host.faceRight();
			}
		}

		if (fromState === this.host.states.kStateBlink) {
			this.host.skin.gotoAndPlay('grow');
		} else if (fromState === this.host.states.kStateTurn) {

		} else {
			this.host.skin.gotoAndPlay('go');
		}
	};
	WalkState.prototype.update = function () {
		var input  	= this.host.controllable.input,
			vel 	= this.host.linearVelocity;

		if (input.hold(global.Buttons.left) && vel.x > -this.host.settings.max_speed) {
			this.host.movement.setLinearVelocity(-this.host.settings.speed, vel.y);

			if (!this.host.facingLeft) {
				this.host.faceLeft();
			}
		}

		if (input.hold(global.Buttons.right) && vel.x <  this.host.settings.max_speed) {
			this.host.movement.setLinearVelocity(this.host.settings.speed, vel.y);

			if (this.host.facingLeft) {
				this.host.faceRight();
			}
		}
	};
	WalkState.prototype.transition = function () {
//		return 	this.fsm.tryChangeState(!this.host.isOnGround(),this.host.states.kStateFall);
	};

	var FallState = function () {
		this.init.apply(this, arguments);
	};
	FallState.prototype = new global.BaseState();
	FallState.prototype.enter = function (msg, fromState) {
		this.host.skin.gotoAndPlay(1);
	};
	FallState.prototype.transition = function () {

	};

	var BlinkState = function () {
		this.init.apply(this, arguments);
	};
	BlinkState.prototype = new global.BaseState();
	BlinkState.prototype.enter = function (msg, fromState) {
		this.host.contactable.disableContactButGround();
		this.host.skin.gotoAndPlay('blow');
		this.timeInState = 0;
	};
	BlinkState.prototype.update = function (time) {
		this.timeInState += time;
	};
	BlinkState.prototype.transition = function () {
		return this.fsm.tryChangeState(this.host.settings.timeInBlink < this.timeInState,this.host.states.kStateWalk)
	};
	BlinkState.prototype.leave = function () {
		this.host.skin.gotoAndPlay('grow');
		this.host.contactable.enableContact();
	};

	var changeDirectionMovement = function (that, msg) {

		if ((that.host.facingLeft && msg === 'left') || (!that.host.facingLeft && msg === 'right') ) {
			return;
		}

		that.host.skin.gotoAndPlay('turn_begin');
		that.isAnimationEnd = false;
		that.host.skin.onAnimationEnd = function ( target, anim, next ) {
			if (anim !== 'turn_begin') {
				that.isAnimationEnd = true;
				that.host.skin.onAnimationEnd = null;
				return;
			}

			that.host.skin.gotoAndPlay('turn_end');

			if (msg === 'left') {
				that.host.faceLeft();
			} else {
				that.host.faceRight();
			}

			that.isAnimationEnd = true;
			that.host.skin.onAnimationEnd = null;
		};
	};

	var TurnState = function () {
		this.init.apply(this, arguments);
	};
	TurnState.prototype = new global.BaseState();
	TurnState.prototype.enter = function (msg, fromState) {
		var that = this;
		changeDirectionMovement(that,msg);
	};
	TurnState.prototype.transition = function () {
		return this.fsm.tryChangeState(this.isAnimationEnd,this.host.states.kStateWalk)
	};

	var ThrowState = function () {
		this.init.apply(this, arguments);
	};
	ThrowState.prototype = new global.BaseState();
	ThrowState.prototype.enter = function (msg, fromState) {
		this.timeInState = 0;
	};
	ThrowState.prototype.update = function (time) {
		this.timeInState += time;
	};
	ThrowState.prototype.transition = function () {
		return this.fsm.tryChangeState(this.timeInState > 10,this.host.states.kStateWalk)
	};

	var WalkTask = function (){
		this.init.apply(this,arguments);
	};
	WalkTask.prototype = new global.BaseTask();
	WalkTask.prototype.execute = function (params) {
		var input  	= this.host.controllable.input;
		if (this.host.fsm.currentState === States.kStateWalk) {

			if ( this.host.facingLeft ) {
				if (this.host.contactable.isAutoDetectByFixtureName(['GROUND'],'left').length) {
					input.press(global.Buttons.left);
				} else {
					input.releaseAll();
					this.host.fsm.tryChangeState(true, this.host.states.kStateTurn, 'right');
				}
			} else {
				if (this.host.contactable.isAutoDetectByFixtureName(['GROUND'],'right').length) {
					input.press(global.Buttons.right);
				} else {
					input.releaseAll();
					this.host.fsm.tryChangeState(true, this.host.states.kStateTurn, 'left');
				}
			}
		} else {
			input.releaseAll();
			this.host.taskManager.addTask(Tasks.kTaskWait);
		}
		return false
	};

	var WaitTask = function (){
		this.init.apply(this,arguments);
	};
	WaitTask.prototype = new global.BaseTask();
	WaitTask.prototype.execute = function (params) {
		if (this.host.fsm.currentState === States.kStateWalk) {
			this.host.taskManager.addTask(Tasks.kTaskWalk);
			return true;
		}
		return false;
	};


	var DeadState 					= function (){
		this.init.apply(this,arguments);
	};
	DeadState.prototype 			= new global.BaseState();
	DeadState.prototype.enter 		= function(){
	};
	DeadState.prototype.update 		= function(){

	};
	DeadState.prototype.transition 	= function(){

	};
	DeadState.prototype.leave 		= function(){

	};


	global.FSM_Slug = {};
	global.FSM_Slug.WalkState  = WalkState;
	global.FSM_Slug.FallState  = FallState;
	global.FSM_Slug.BlinkState = BlinkState;
	global.FSM_Slug.TurnState  = TurnState;
	global.FSM_Slug.ThrowState = ThrowState;
	global.FSM_Slug.DeadState  = DeadState;

	var States = {
		kStateWalk  : 2,
		kStateBlink : 3,
		kStateFall  : 4,
		kStateTurn  : 5,
		kStateThrow : 6,
		kStateDead  : 7
	};

	global.TASK_Slug = {};
	global.TASK_Slug.WalkTask = WalkTask;
	global.TASK_Slug.WaitTask = WaitTask;

	var Tasks = {
		kTaskWalk   : 1,
		kTaskWait	: 2
	};

	var tasksList = [
		Tasks.kTaskWalk    	, global.TASK_Slug.WalkTask,
		Tasks.kTaskWait		, global.TASK_Slug.WaitTask
	];

	var statesList = [
		States.kStateWalk, 	global.FSM_Slug.WalkState,
		States.kStateFall, 	global.FSM_Slug.FallState,
		States.kStateBlink, global.FSM_Slug.BlinkState,
		States.kStateTurn, 	global.FSM_Slug.TurnState,
		States.kStateThrow, global.FSM_Slug.ThrowState,
		States.kStateDead,  global.FSM_Slug.DeadState

	];

	global.scripts.Slug = {
		initialize : function (host, manager) {
			host.states = States;

			host.fsm = new global.FSM(host, statesList);
			host.fsm.enter(States.kStateWalk);

			host.tasks = Tasks;
			host.taskManager = new global.TaskManager(host, tasksList, true, function (){});
			host.contactable.addObserver(function(contact, contacting, params){
				if ( host.fsm.currentState !== States.kStateBlink ) {
					var impulseX 		= host.settings.impulseX,
						impulseY 		= host.settings.impulseY,
						impulseXAttack 	= host.settings.impulseXAttack,
						impulseYAttack 	= host.settings.impulseYAttack,
						damage			= host.settings.damage;

					if (contacting.movement) {
						if (params.normal.x > -.72 && params.normal.x < .72 && params.normal.y < 0) {
							contacting.movement.setLinearVelocity(0,0);
							contacting.movement.applyImpulse(contacting.facingLeft ? -impulseX : impulseX,-impulseY);
							host.fsm.tryChangeState(true, States.kStateBlink);
						} else {
							contacting.controllable.disabledWithChangeState(200);
							contacting.movement.setLinearVelocity(0,0);
							contacting.movement.applyImpulse(params.normal.x > 0 ? impulseXAttack : -impulseXAttack,-impulseYAttack);
							contacting.hittable.incrementHitPoints('health',-damage);
							contacting.stage.addEffect('Shock');
							host.fsm.tryChangeState(true, States.kStateThrow);
						}
					}

				}
			}, 'begin');
			host.taskManager.addTask(Tasks.kTaskWalk);
		},
		update : function ( host, manager, time ) {
			host.taskManager.step(time);
		}
	}
}());