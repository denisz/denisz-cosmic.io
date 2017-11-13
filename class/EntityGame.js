/**
 *Settings :
 *   max_speed          : 2;
 speed              : 7;
 jump               : 22; 	//velocity jump
 jump_speed         : 4; 	//velocity movement in the side
 jump_max_speed     : 6;  	//max velocity
 ISJETPACK          : true; // racket
 jetpack_jump_start : 8;    // racket in start
 jetpack_jump       : 3;    // velocity rise
 jetpack_max_speed  : 6;    // max velocity movement in the side
 jetpack_speed      : 1;
 marioStyle         : false;
 */
(function () {
	var global = (1,eval)('this');

	var EntityGame = function (stage, params) {
		this.initialize(stage);
		this.initEntity(params);
	};

	var p = EntityGame.prototype = new global.Actor;

	p.contactable 	= null;
	p.movement 		= null;
	p.controllable 	= null;
	p.hittable 		= null;
	p.scripts		= null;

	p.initEntity = function  (params) {
		var world 	= this.world, body, skin, gameObject, settings = {
			transform : {}
		};

		this.entity = params.entity;

		if (params.go !== null) {
			gameObject = this._getGameObject(params.go) || {};
		}

		if (!gameObject) return;

		if (gameObject.skin !== null ) {
			skin = this._getSkin(gameObject.skin);

			if (params.layer)  {
				world.registerSkin(skin, params.layer);
				settings.layer = params.layer;
			}

			settings.scale = gameObject.skinScale;
		}

		if (gameObject.nominalBounds) {
			this.nominalBounds = new global.Size(gameObject.nominalBounds[2],gameObject.nominalBounds[3]);

			settings.regX = gameObject.regX;
			settings.regY = gameObject.regY;
		}

		settings.faceLeftReqX = gameObject.faceLeftReqX || 0;

		if (gameObject.enablePhysic) {
			var bodyDef = world.createBody(gameObject.bodyDef);
			body 		= world.registerBody(bodyDef);
			world.addFixtureToBody(body, gameObject.fixturesDef );
		}

		this.name 	= gameObject.name;

		if (!body) {
			body = new global.Body();
		}

		this.init_Actor(skin, body, settings, gameObject.settings);

		/**
		 * Behaviors
		 */
		if (gameObject.behaviors) {
			if ( gameObject.behaviors.controllable ) {
				this.controllable = new global.Controllable(this, gameObject.behaviors.controllable);
			}

			if ( gameObject.enablePhysic && gameObject.behaviors.contactable ) {
				this.contactable = new global.Contactable(this, gameObject.behaviors.contactable);
			}

			//detect enable physics
			if ( gameObject.enablePhysic && gameObject.behaviors.movement ) {
				this.movement = new global.Movement(this, gameObject.behaviors.movement);
			}

			if (gameObject.behaviors.hittable) {
				this.hittable = new global.Hittable(this, gameObject.behaviors.hittable);
			}

			if( gameObject.behaviors.scripts ) {
				this.scripts = new global.ScriptsService(this, gameObject.scriptsFile);
			}
		}

		world.addActor(this, body);

		this.setGlobalPosition(params.x,params.y);
		this.linearVelocity = {x :0, y: 0};
		this.scripts && this.scripts.publish('initialize');
		if ( !this.fsm ) {
			this.init_defaultFSM();
		}
	};

	p.init_defaultFSM = function (){

	};

	/**
	 *
	 * @private
	 */
	p._getSkin = function (index) {
		if (typeof index === 'string') {
			return this.stage.animationsService.getMovieClip(index);
		}
		return this.stage.animationsService.getSprite(index);
	};

	p.removeSkin = function () {
		var world 	= this.world,
			skin    = this.skin,
			layer   = this.settings.layer;

		world.unRegisterSkin(skin, layer);
	};

	/**
	 * @param index
	 */
	p.changeSkinByIndex = function (index, layer, settings) {
		this.removeSkin();
		return this.addSkinByIndex(index, layer, settings);
	};

	p.addSkinByIndex = function (index, layer, settings) {
		var newSkin 	 = this._getSkin(index), world = this.world;
		layer = layer || this.settings.layer;

		if (newSkin && layer) {
			world.registerSkin(newSkin, layer);
			this.addSettings(settings);
			this.skin  = newSkin;
		}

		return newSkin;
	};

	p._getGameObject = function (index){
		return this.stage.gameObjectsService.getGameObject(index);
	};

	p._isOnGround = true;
	p.isOnGround  = function (){
		return this.contactable && this.contactable.isOnGround();
	};

	p.faceLeft = function () {
		this.facingLeft = true;
		this.skin.skewY = 180;
	};

	p.faceRight = function () {
		this.facingLeft = false;
		this.skin.skewY = 0;
	};

	p.faceInvert = function () {
		if (this.facingLeft) {
			this.faceRight();
		} else {
			this.faceLeft();
		}
	};

	p.update = function (time) {
		if (this.movement){
			this.linearVelocity = this.movement.getLinearVelocity();
		}

		this.contactable 		&& this.contactable.update(time);
		this.hittable			&& this.hittable.update(time);
		this.fsm 				&& this.fsm.update(time);
		this.scripts 			&& this.scripts.publish('update', time);
		this.skin && this.body 	&& this.update_Actor(time);
	};

	p.dead = function (msg) {
		if (!this.fsm.hasState(this.states.kStateDead)) {
			this.fsm.setState(this.states.kStateDead, msg);
		}
	};

	p.remove = function () {
		this.scripts 			&& this.scripts.publish('remove');
		this.removeActor();
	};

	global.EntityGame = EntityGame;
}());