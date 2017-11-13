(function(){
	var global = (1,eval)('this');

	/**
	 * predefine
	 */
	if (global.scripts.Player) { return; }

	var IdleState 					= function () {
		this.init.apply(this,arguments);
	};
	IdleState.prototype 			= new global.BaseState();
	IdleState.prototype.enter 		= function (msg, fromState) {
		console.log('Idle');
		var  vel 	= this.host.linearVelocity;

		this.host.movement.setFriction(0);

		this.timeInState    = 0;

		this.host.hittable.playRegeneration('fuel');

		if (fromState == this.host.states.kStateNoControl) {

		} else if (fromState == this.host.states.kStateWalk) {
			this.host.movement.setLinearVelocity(0, vel.y);
			this.host.skin.gotoAndPlay('afterrun');
		} else if (fromState == this.host.states.kStateFall) {
			this.host.movement.setLinearVelocity(0, vel.y);
			this.host.skin.gotoAndPlay('jump_down');
//			this.host.game.shakeCamera(5,300)
		} else {
			this.host.movement.setLinearVelocity(0, vel.y);
			this.host.skin.gotoAndPlay('idle');
		}

	};
	IdleState.prototype.update 		= function (time) {
		this.timeInState += time;
	};
	IdleState.prototype.transition 	= function () {
		var input = this.host.controllable.input;

		return  this.fsm.tryChangeState(!this.host.isOnGround(),this.host.states.kStateFall)  ||
				this.fsm.tryChangeState(input.hold(global.Buttons.jump), this.host.states.kStateJump) ||
				this.fsm.tryChangeState(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right) , this.host.states.kStateWalk);
	};
	IdleState.prototype.message     = function (message) {

	};
	IdleState.prototype.leave 		= function () {
		this.host.hittable.pauseRegeneration('fuel');
	};

	var JumpState 					= function () {
		this.init.apply(this,arguments);
	};
	JumpState.prototype 			= new global.BaseState();
	JumpState.prototype.enter 		= function (msg, fromState) {
		console.log('Jump');
		this.host.movement.setFriction(0);
		this.timeInState = 0;
		this.host.movement.applyImpulse(0, -this.host.settings.jump);
		if (this.host.skin.currentAnimation !== 'fly') {
			this.host.skin.gotoAndPlay('jump_up');
		}
	};
	JumpState.prototype.update 		= function (time) {
		var input  	= this.host.controllable.input,
			vel 	= this.host.linearVelocity;

		this.timeInState += time;

		if (input.hold(global.Buttons.left)) {
			if (vel.x > -this.host.settings.jump_max_speed) {
				this.host.movement.applyImpulse(-this.host.settings.jump_speed, 0);
			}
			//to left
			if (!this.host.facingLeft) {
				this.host.faceLeft();
			}
		}

		if (input.hold(global.Buttons.right)) {
			if (vel.x <  this.host.settings.jump_max_speed) {
				this.host.movement.applyImpulse(this.host.settings.jump_speed, 0);
			}
			//to left
			if (this.host.facingLeft) {
				this.host.faceRight();
			}
		}

		if (this.host.settings.marioStyle) {
			if ( !(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right)) ) {
				this.host.movement.setLinearVelocity(0,vel.y);
			}
		}
	};
	JumpState.prototype.transition 	= function () {
		var input   	= this.host.controllable.input,
			vel     	= this.host.linearVelocity,
			isEmptyFuel = this.host.hittable.getActualHitPoints('fuel') === 0;

		return 	this.fsm.tryChangeState(this.timeInState  > 400 && this.host.settings.ISJETPACK && input.hold(global.Buttons.jump) && !isEmptyFuel, this.host.states.kStateRocket) ||
				this.fsm.tryChangeState(vel.y > 0, 	this.host.states.kStateFall) ||
				this.fsm.tryChangeState(this.host.isOnGround() && vel.y > 0, this.host.states.kStateIdle);
	};
	JumpState.prototype.leave 		= function () {
		this.timeInState = 0;
	};

	var RocketState                 = function(){
		this.init.apply(this,arguments)
	};
	RocketState.prototype           = new global.BaseState();
	RocketState.prototype.enter     = function () {
		console.log('rocket jump');
		var isEmptyFuel 	= this.host.hittable.getActualHitPoints('fuel') === 0;
		if (isEmptyFuel) return;

		this.timeInState = 0;

//		this.host.movement.applyImpulse(0, -this.host.settings.jetpack_jump_start);
		if (this.host.skin.currentAnimation !== 'fly') {
			this.host.skin.gotoAndPlay('fly');
		}
	};
	RocketState.prototype.update    = function (time) {
		var fading      = 0.3,
			input  	    = this.host.controllable.input,
			isEmptyFuel = this.host.hittable.getActualHitPoints('fuel') === 0,
			vel         = this.host.linearVelocity;

		if (isEmptyFuel) return;

		this.timeInState += time;

		if (input.hold(global.Buttons.left)) {
			if (vel.x > -this.host.settings.jetpack_max_speed) {
				this.host.movement.applyImpulse(-this.host.settings.jetpack_speed, 0);
			}
			//to left
			if (!this.host.facingLeft) {
				this.host.faceLeft();
			}
		}

		if (input.hold(global.Buttons.right)) {
			if (vel.x <  this.host.settings.jetpack_max_speed) {
				this.host.movement.applyImpulse(this.host.settings.jetpack_speed, 0);
			}
			//to left
			if (this.host.facingLeft) {
				this.host.faceRight();
			}
		}

		if (input.hold(global.Buttons.jump)) {
			if (vel.y > -this.host.settings.jetpack_max_speed) {
				this.host.movement.applyImpulse(0, -this.host.settings.jetpack_jump);
			}
			this.host.hittable.incrementHitPoints('fuel',-input.timePressedAndReset(global.Buttons.jump)/1000 *this.host.settings.fuelRate);
		}

		if ( !(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right)) && vel.x !== 0) {
			this.host.movement.setLinearVelocity(vel.x -(vel.x * fading) ,vel.y);
		}

	};
	RocketState.prototype.transition= function () {
		var input  		= this.host.controllable.input,
			isEmptyFuel = this.host.hittable.getActualHitPoints('fuel') === 0;

		return 	this.fsm.tryChangeState(!input.hold(global.Buttons.jump) || isEmptyFuel, this.host.states.kStateFall);
	};
	RocketState.prototype.leave     = function () {
		this.timeInState = 0;
	};

	var FallState 					= function () {
		this.init.apply(this,arguments);
	};
	FallState.prototype 			= new global.BaseState();
	FallState.prototype.enter 		= function () {
		console.log('FallState');
		this.host.movement.setFriction(0);
		if (this.host.skin.currentAnimation !== 'jump') {
			this.host.skin.gotoAndPlay('jump');
		}
	};
	FallState.prototype.update 		= function () {
		var input  	= this.host.controllable.input,
			fading  = 0.1,
			vel 	= this.host.linearVelocity;

		if (input.hold(global.Buttons.left)) {
			if (vel.x > -this.host.settings.jump_max_speed) {
				this.host.movement.applyImpulse(-this.host.settings.jump_speed, 0);
			}
			//to left
			if (!this.host.facingLeft) {
				this.host.faceLeft();
			}
		}

		if (input.hold(global.Buttons.right)) {
			if (vel.x <  this.host.settings.jump_max_speed) {
				this.host.movement.applyImpulse(this.host.settings.jump_speed, 0);
			}
			//to left
			if (this.host.facingLeft) {
				this.host.faceRight();
			}
		}

		if ( !(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right)) && vel.x !== 0) {
			this.host.movement.setLinearVelocity(vel.x -(vel.x * fading) ,vel.y);
		}

		if (this.host.settings.marioStyle) {
			if ( !(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right)) ) {
				this.host.movement.setLinearVelocity(0,vel.y);
			}
		}
	};
	FallState.prototype.transition 	= function () {
		var input  		= this.host.controllable.input,
			isOnGround  = this.host.isOnGround(),
			isEmptyFuel = this.host.hittable.getActualHitPoints('fuel') === 0;

		return  this.fsm.tryChangeState(this.host.settings.ISJETPACK  && input.hold(global.Buttons.jump) && !isEmptyFuel, this.host.states.kStateRocket) ||
				this.fsm.tryChangeState(isOnGround  && input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right) , this.host.states.kStateWalk) ||
				this.fsm.tryChangeState(isOnGround, this.host.states.kStateIdle);
	};
	FallState.prototype.leave 		= function () {};

	var WalkState 					= function () {
		this.init.apply(this,arguments);
	};
	WalkState.prototype 			= new global.BaseState();
	WalkState.prototype.enter 		= function ( msg, fromState ) {
		console.log('walk');

		var input  	= this.host.controllable.input;

		this.host.hittable.playRegeneration('fuel');

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

		if (this.host.skin.currentAnimation !== 'run') {
			if ( fromState == this.host.states.kStateFall) {
				this.host.skin.gotoAndPlay('run');
			} else {
				this.host.skin.gotoAndPlay('prerun');
			}
		}
	};
	WalkState.prototype.update 		= function (  ) {
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
	WalkState.prototype.transition 	= function () {
		var control = this.host.controllable,
			input  	 = control.input;

		return 	this.fsm.tryChangeState(!this.host.isOnGround(),this.host.states.kStateFall) ||
				this.fsm.tryChangeState(input.hold(global.Buttons.jump), this.host.states.kStateJump) ||
				this.fsm.tryChangeState(!(input.hold(global.Buttons.left) ^ input.hold(global.Buttons.right)), this.host.states.kStateIdle);
	};
	WalkState.prototype.leave 		= function () {
		this.host.hittable.pauseRegeneration('fuel');
	};

	var NoControlState = function () {
		this.init.apply(this,arguments);
	};
	NoControlState.prototype 		= new global.BaseState();
	NoControlState.prototype.enter 	= function(){
		console.log('NO control');
		this.timeInState    = 0;
	};
	NoControlState.prototype.update 	= function(dt){
		this.timeInState    += dt;
		if (!this.host.isOnGround()) {
			if (this.host.skin.currentAnimation !== 'fly') {
				this.host.skin.gotoAndPlay('fly');
			}
		} else {
			if (this.host.skin.currentAnimation !== 'idle') {
				this.host.skin.gotoAndPlay('idle');
			}
		}
//
	};
	NoControlState.prototype.transition = function(){
		return this.fsm.tryChangeState(!this.host.controllable.isDisabled, this.host.states.kStateIdle);
	};

	var NoControlWithoutUpdateState = function () {
		this.init.apply(this,arguments);
	};
	NoControlWithoutUpdateState.prototype 		= new global.BaseState();
	NoControlWithoutUpdateState.prototype.enter 	= function(){
		console.log('NO control');
		this.timeInState    = 0;
		if (!this.host.isOnGround()) {
			if (this.host.skin.currentAnimation !== 'fly') {
				this.host.skin.gotoAndPlay('fly');
			}
		} else {
			if (this.host.skin.currentAnimation !== 'idle') {
				this.host.skin.gotoAndPlay('idle');
			}
		}
	};
	NoControlWithoutUpdateState.prototype.update 	= function(dt){
		this.timeInState    += dt;
	};
	NoControlWithoutUpdateState.prototype.transition = function(){
		return this.fsm.tryChangeState(!this.host.controllable.isDisabled, this.host.states.kStateIdle);
	};

	var DeadState 					= function (){
		this.init.apply(this,arguments);
	};
	DeadState.prototype 			= new global.BaseState();
	DeadState.prototype.enter 		= function(msg){
		console.log('Dead');
		var host  = this.host,
			stage = host.stage;

		this.host.changeSkinByIndex('deathPlayer', null, {
			regX : -300,
			regY : -280,
			scale: .3
		});

		this.host.skin.onAnimationEnd = function () {
			//делаем полет
			var pos 		= host.body.m_sweep.c,
				sizeGame  	= host.stage.getSizeGame(),
				hGame 		= sizeGame.height / host.world.scale,
				x  			= pos.x,
				y  			= pos.y;

			createjs.Tween.get(pos).to({x : x, y: y - hGame}, 1000, createjs.Ease.sineIn).call(function(){
				host.stage.complete(global.Stage.COMPLETE.DEFEAT);
			});
			host.skin.onAnimationEnd  = null;
		};

		this.host.movement.setLinearVelocity(0,0);
		this.host.contactable.madeSensor();
		this.host.contactable.setContactable(false);
		this.host.contactable.setContactable(false);
		this.host.movement.setType(b2Body.b2_staticBody);
		stage.camera.missFocus();
	};
	DeadState.prototype.update 		= function(){

	};
	DeadState.prototype.transition 	= function(){

	};
	DeadState.prototype.leave 		= function(){

	};

	global.FSM_PLAYER = {};
	global.FSM_PLAYER.IdleState    	 = IdleState;
	global.FSM_PLAYER.JumpState    	 = JumpState;
	global.FSM_PLAYER.FallState    	 = FallState;
	global.FSM_PLAYER.WalkState    	 = WalkState;
	global.FSM_PLAYER.DeadState    	 = DeadState;
	global.FSM_PLAYER.RocketState  	 = RocketState;
	global.FSM_PLAYER.NoControlState = NoControlState;
	global.FSM_PLAYER.NoControlWithoutUpdateState = NoControlWithoutUpdateState;

	var States = {
		kStateIdle 	: 1,
		kStateWalk	: 2,
		kStateJump	: 3,
		kStateFall  : 4,
		kStateDead	: 5,
		kStateRocket: 6,
		kStateNoControl : 7,
		kStateNoControlWithoutUpdate : 8
	};

	var statesList = [
		States.kStateIdle,  	global.FSM_PLAYER.IdleState,
		States.kStateWalk,  	global.FSM_PLAYER.WalkState,
		States.kStateJump,  	global.FSM_PLAYER.JumpState,
		States.kStateFall,  	global.FSM_PLAYER.FallState,
		States.kStateDead,  	global.FSM_PLAYER.DeadState,
		States.kStateRocket,	global.FSM_PLAYER.RocketState,
		States.kStateNoControl, global.FSM_PLAYER.NoControlState,
		States.kStateNoControlWithoutUpdate, global.FSM_PLAYER.NoControlWithoutUpdateState
	];

	global.scripts.Player = {
		initialize : function(host){
			host.states = States;

			host.fsm 	= new global.FSM(host,statesList);

			var maskGround = global.GROUP_CONTACT['GROUND'];

			host.contactable.addObserver(function(contact, contacting, params){

				if (maskGround & params.filter.categoryBits) {
					var velY 	= params.fixture.m_body.m_linearVelocity.y;
					if (velY < -3) return ;

					var gravity = host.world.gravity,
						height 	= ((velY << 1) * velY / gravity),
						oHeight = height >> 31,
						diff 	= ( ( (height ^ oHeight) - oHeight) >> 6 ) << 3;

					if (diff > 0) {
						host.hittable.incrementHitPoints('health',-diff);
						host.stage.addEffect('Shock');
					}

				}

			}, 'begin');

			host.hittable.addHits([
				{
					property 	: 'health',
					maxValue 	: 100,
					defaultValue: 100,
					update 		: function (obj) {
						obj.$thumb.setProgress(obj.actualValue/obj.maxValue);

						if (obj.actualValue === 0) {
							host.dead('health')
						}
					},
					create 		: function (obj) {
						obj.$thumb = host.stage.hudService.addHUD('BarHealthAndFuel',{
							type 			: 'health',
							startProgress 	: 1,
							transform : {
								scaleX 	: .6,
								scaleY 	: .6,
								x 		: 10,
								y 		: 5
							}
						},global.HUDService.LAYERS.HUD_STAGE);
					}
				},
				{
					property 	: 'fuel',
					maxValue 	: host.settings.fuelMaxValue,
					defaultValue: host.settings.fuelDefaultValue,
					update 		: function (obj) {
						obj.$thumb.setProgress(obj.actualValue/obj.maxValue);
					},
					create 		: function (obj) {
						obj.$thumb = host.stage.hudService.addHUD('BarHealthAndFuel',{
							type 			: 'fuel',
							startProgress 	: 1,
							transform : {
								scaleX 	: .6,
								scaleY 	: .6,
								x		: 220,
								y 		: 5
							}
						},global.HUDService.LAYERS.HUD_STAGE);
					},
					regenerate   	: false,
					regenerateCount	: host.settings.fuelRegenerate,
					regenerateTime  : host.settings.fuelRegenerateTime
				}
			]);

			host.$compass = host.stage.hudService.addHUD('Compass',{
				target : host.body.GetPosition(),
				point  : new Point2(148,19),
				transform : {
					x 		: 500,
					y 		: 5,
					scaleX  :.6,
					scaleY  :.6
				}
			},global.HUDService.LAYERS.HUD_STAGE);

			host.fsm.enter(States.kStateIdle);
		},
		update : function (host, manager, dt) {
			host.$compass && host.$compass.update();
		}
	};
}());