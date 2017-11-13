/**
 * @property skin
 * @property body
 */
(function () {
	var global = (1,eval)('this'),
		Actor = function () {};

	var p = Actor.prototype = {};

	p.skin 		= null;
	p.body 		= null;
	p.entity 	= null;
	p.isCreated = false;
	p.fsm 		= null;

	p.initialize = function (stage){
		this.stage 		    = stage;
		this.world 			= stage.world;
	};

	p.init_Actor    = function (skin, body, settings, extendSettings) {
		this.skin  = skin;
		this.body  = body;
		this.addSettings(settings || {}, extendSettings || {});
		this.enable(this.settings.visible);
	};

	p.enable        = function (isEnable){
		if (this.skin) {
			this.skin.visible = isEnable;
		}
		return this;
	};

	/**
	 * @return {*}
	 */
	p.isWorld       = function (){
		return this.world;
	};

	p.isVisible     = function (){
		var skin = this.skin;
		return skin && this.skin.isVisible()
	};

	p.setSkin       = function (skin){
		this.skin = skin;
		return this;
	};

	p.setBody       = function (body) {
		this.body = body;
		return this;
	};

	/**
	 * apply settings
	 */
	p.addSettings   = function (obj, extendSettings) {
		//predefine
		if(!this.settings) {
			this.settings = {};
			this.settings.type 		= obj.type;
			this.settings.subtype 	= obj.subtype;
			this.settings.rotOffset = obj.rotOffset || 0;
			this.settings.xOffset 	= obj.xOffset 	|| 0;
			this.settings.yOffset 	= obj.yOffset 	|| 0;
			this.settings.scale		= obj.scale 	|| 1;
			this.settings.noX 		= false;
			this.settings.noY 		= false;
			this.settings.noAngle 	= true;
			this.settings.visible 	= true;
			this.settings.regX      = 0;
			this.settings.regY      = 0;
			this.settings.faceLeftReqX = 0;
		}

		if (extendSettings) {
			for (var i in extendSettings) {
				if (extendSettings.hasOwnProperty(i)) {
					this.settings[i] = extendSettings[i]
				}
			}
		}

		for ( var i in obj ) {
			if (obj.hasOwnProperty(i)) {
				this.settings[i] = obj[i]
			}
		}
	};

	p.getSettings 	= function () {
		return this.settings || {};
	};

	p.setUID        = function (uid){
		this.uid = uid;
	};

	p.onCreate      = function (uid){
		this.isCreated = true;
		this.setUID(uid);
	};

	p.facingLeft = false;

	/**
	 * synchronize body and skin
	 * @param time
	 */
	p.update_Actor  = function (time) {
		if(!this.isCreated || this.removed) return;

		if(this.skin && this.body){
			var scaleGame 	= this.stage.scale,
				scaleWorld  = this.world.scale,
				worldCenter = this.body.GetWorldCenter();

			this.skin.scaleX = this.settings.scale * scaleGame;
			this.skin.scaleY = this.settings.scale * scaleGame;

			if (this.facingLeft) {
				this.skin.regX  = -this.settings.regX + this.settings.faceLeftReqX;
			} else {
				this.skin.regX  = -this.settings.regX;
			}

			this.skin.regY  = -this.settings.regY;


			if(!this.settings.noAngle) {
				this.skin.rotation = this.body.GetAngle() * (180 / Math.PI)   + this.settings.rotOffset * scaleGame;
			}

			if (!this.settings.noX) {
				this.skin.x = worldCenter.x * scaleWorld;
			}

			if (!this.settings.noY) {
				this.skin.y = worldCenter.y * scaleWorld;
			}

		}
	};

	p.update        	= function (time) {
		this.update_Actor(time);
	};

	p.currentCameraOffset = null;

	p.markedToRemove    = function () {
		this._markedToRemove = true;
	};

	p.removeActor      = function (){
		this.markedToRemove();
	};

	p.remove = function () {
		this.removeActor();
	};

	p.removed 			= false;

	/**
	 * @private
	 */
	p._remove           = function (){
		delete this.stage;
		delete this.world;
		delete this.skin;
		delete this.body;
		delete this.settings;
		delete this.fsm;
		delete this.states;
		this.removed = true;
	};



	p.toString          = function(){
		return _.substitute("[Actor (x={x},y={y})]",this.getGlobalPosition());
	};

	p.setCameraOffset   = function (vec2) {
		this.currentCameraOffset = vec2;
	};

	p.getCameraOffset   = function () {
		if(!this.currentCameraOffset) {
			this.setCameraOffset(new global.Vec2(0,0));
		}

		return this.currentCameraOffset;
	};

	p.clone 			= function () {
	};

	/**
	 *
	 * @return {*|global.Point2}
	 */
	p.getGlobalPosition   = function () {
		var body 	= this.body,
			scale 	= this.world.scale,
			WC 	 	= body && body.GetWorldCenter();

		return body && new global.Point2(WC.x * scale, WC.y * scale)
	};

	p.getLocalPosition    = function () {
		var body = this.body,
			WC 	 = body && body.GetWorldCenter();

		return body && new global.Point2(WC.x, WC.y)
	};

	/**
	 * @param x
	 * @param y
	 * @return {*}
	 */
	p.setGlobalPosition  = function (x, y) {
		var body 	= this.body,
			scale 	= this.world.scale;
		body && body.SetPosition(new b2Vec2(x / scale,y / scale));
		return this;
	};

	/**
	 * @param x
	 * @param y
	 * @return {*}
	 */
	p.setLocalPosition   = function (x, y){
		var body = this.body;
		body && body.SetPosition(new b2Vec2(x ,y ));
		return this;
	};

	global.Actor = Actor;
}());
