(function () {
	var global = (1, eval)('this');
	var SCALEBOX2D = 30;

	/**
	 * @type {Object}
	 */
	global.GROUP_CONTACT = {
		"NONE"		: 0,
		"PLAYER"	: 2,
		"ENEMY"		: 4,
		"GAMEOBJECT": 8,
		"NEUTRAL"	: 16,
		"GROUND"	: 32,
		"SENSOR"	: 64
	};

	var World = function (stage, gravity, doSleep, size, layers) {
		this.gravity 		= gravity;
		this.doSleep 		= doSleep;
		this.size 			= size;
		this.actors 		= [];
		this._listeners 	= [];
		this.stage			= stage;
		this.app 			= global.App.getInstance();
		this.layers 		= layers;
		this.isDebug 		= this.app.debug && this.app.debugPhysics;

		assert(this.layers, "Layers for game object not defined");

		this.setScale(this.stage.scale);
		this.setupWorld();
		this.handlerContactListener();
		this.isDebug && this.debug();
	};

	var p = World.prototype = {};

	p.scale = SCALEBOX2D;

	p.setScale = function (scale) {
		this.scale = scale * SCALEBOX2D;
	};

	p.isDebug = false;

	p.setupWorld = function () {
		this.box2d = new b2World(new b2Vec2(0, this.gravity), this.doSleep);
	};

	p.update = function (time) {
		var update_interval = this.paused ? 0 : time/1000;

		this.box2d.Step(update_interval, 10, 10);

		this.updateRemovedActors();

		var actors = this.actors;

		// update active actors
		for (var i = 0, l = actors.length; i < l; i++) {
			actors[i].update(time);
		}

		if (this.isDebug) {
			this.updateDebug();
		}

		this.box2d.ClearForces();
	};

	/**
	 * @return {*}
	 */
	p.updateRemovedActors = function () {
		var actors = this.actors,
			world = this;

		for (var i = 0, l = actors.length; i < l; i++) {
			if (this.actors[i]._markedToRemove) {
				world.rmActor(this.actors[i]);
			}
		}
	};

	/**
	 * @param actor
	 * @param body
	 * @return {*}
	 */
	p.addActor = function (actor, body) {
		this.actors.push(actor);
		body.SetUserData(actor);
		return this;
	};

	p.createGround = function (bodyDef, data) {
		if (!data) data = {};
		data.entity = 'ground';
		this.ground = this.box2d.CreateBody(this.createBody(bodyDef));
		this.ground.SetUserData(data);
		this.groundFixture = [];
	};

	/**
	 * @param point1
	 * @param point2
	 * @param groups
	 * @return (*|Fixtures)
	 */
	p.rayCast = function (point1, point2, groups) {
		var fixtures = this.box2d.RayCastAll(point1, point2);
		if (groups) {

		} else {
			return fixtures;
		}
	};

	/**
	 * @param point1
	 * @param point2
	 * @param groups
	 */
	p.rayCastOne = function (point1, point2, groups) {
		var fixture = this.box2d.RayCastOne(point1, point2);
		if (groups) {

		} else {
			return fixture;
		}
	};

	p.addGround = function (fixtureDef, data) {
		if (!fixtureDef || !this.ground || !this.groundFixture) {
			return;
		}

		var fixture = this.addFixtureToBody(this.ground, fixtureDef);

		if (_.isArray(fixture)) {
			for (var i = 0 , l = fixture.length; i < l; i++) {
				data && fixture[i].SetUserData(data);
				this.groundFixture.push(fixture[i]);
//				this.setCategory(fixture[i], ['GROUND']);
			}
		} else {
			data && fixture.SetUserData(data);
			this.groundFixture.push(fixture);
//			this.setCategory(fixture, ['GROUND']);
		}
	};

	p.setMassGround = function () {
//        this.ground.SetMass
	};

	p.rmGround = function (fixture) {
		var index;

		if (_.isArray(fixture)) {
			for (var i = 0 , l = fixture.length; i < l; i++) {
				index = this.groundFixture.indexOf(fixture);
				if (index != -1)
					this.groundFixture.splice(index, 1);

				this.ground.DestroyFixture(fixture);
			}
		} else {
			index = this.groundFixture.indexOf(fixture);
			if (index != -1)
				this.groundFixture.splice(index, 1);

			this.ground.DestroyFixture(fixture);
		}
	};

	p.setCategoryBitsPrototype = function (fixture, masks, noReset) {
		var filter = fixture.filter;
		if (!noReset) filter.categoryBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.categoryBits |= global.GROUP_CONTACT[masks[i]];
		}
		return fixture;
	};

	p.setMaskBitsPrototype = function (fixture, masks, noReset) {
		var filter = fixture.filter;
		if (!noReset) filter.maskBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.maskBits |= global.GROUP_CONTACT[masks[i]];
		}
		return fixture;
	};

	p.setMaskBits = function (fixture, masks, noReset) {
		var filter = fixture.GetFilterData();
		if (!noReset) filter.maskBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.maskBits |= global.GROUP_CONTACT[masks[i]];
		}
		fixture.SetFilterData(filter);
		return fixture;
	};

	p.setCategory = function (fixture, masks, noReset) {
		var filter = fixture.GetFilterData();
		if (!noReset) filter.categoryBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.categoryBits |= global.GROUP_CONTACT[masks[i]];
		}
		fixture.SetFilterData(filter);
		return fixture;
	};

	p.addSensor = function (bodyDef, fixtureDef, data) {
		if (!data) data = {};
		data.entity = 'sensor';
		fixtureDef.isSensor = true;
		var body = this.simpleCreateBodyFixture(bodyDef, fixtureDef, data);
		var fixture = body.GetFixtureList();
		this.setCategory(fixture, ['SENSOR']);
		return body
	};

	p.addTrigger = function (actor) {
		this.actors.push(actor);
		actor.body.SetUserData(actor);
		return this;
	};

	/**
	 * @param actor
	 * @return {*}
	 */
	p.rmActor = function (actor) {
		this.actors.splice(this.actors.indexOf(actor), 1);
		actor.body.SetUserData(null);
		this.box2d.DestroyBody(actor.body);
		if (actor.skin && actor.skin.parent) {
			actor.skin.parent.removeChild(actor.skin);
		}
		actor._remove();
		return this;
	};

	/**
	 * @return {*}
	 */
	p.rmActorsAll = function () {
		var box2d = this.box2d;

		for (var i = 0, l = this.actors.length; i < l; i++) {
			this.actors[i].body.SetUserData(null);
			box2d.DestroyBody(this.actors[i].body);
			this.actors[i]._remove();
		}

		for (var i in this.layers) {
			this.layers[i].removeAllChildren();
		}

		this.actors.length = 0;
		return this;
	};

	p.registerSkin = function (skin, layer) {
		return this.layers[layer].addChild(skin);
	};

	p.unRegisterSkin = function (skin, layer) {
		return this.layers[layer].removeChild(skin);
	};

	p.registerBody = function (body, fixture) {
		if (fixture) {
			var _body = this.box2d.CreateBody(body);
			this.addFixtureToBody(_body, fixture);
			return body;
		}
		else
			return this.box2d.CreateBody(body);
	};

	p.registerJoint = function (joint) {
		return this.box2d.CreateJoint(joint);
	};

	p.registerController = function (controller) {
		return this.box2d.AddController(controller);
	};

	/**
	 * @param body
	 * @param fixture
	 * @return {*}
	 */
	p.addFixtureToBody = function (body, fixture) {
		if (!fixture) return body;

		var _fixture;

		if (_.isArray(fixture)) {
			var createdFixture = [];
			for (var i = 0, l = fixture.length; i < l; i++) {
				_fixture = body.CreateFixture(this.createFixture(fixture[i]));
				createdFixture.push(_fixture);
			}
			return createdFixture;
		} else {
			if (fixture instanceof b2FixtureDef) {
				return body.CreateFixture(fixture);
			} else {
				return body.CreateFixture(this.createFixture(fixture));
			}
		}
	};

	/**
	 * @param body
	 * @param fixture
	 */
	p.rmFixtureToBody = function (body, fixture) {
		body.DestroyFixture(fixture);
	};

	/**
	 * @param body
	 * @param name
	 */
	p.getFixtureByName = function (body, name) {
		var fixture = body.GetFixtureList();
		while (fixture) {
			if (fixture.m_userData && fixture.m_userData.name === name) {
				return fixture;
			}
			fixture = fixture.GetNext();
		}
		return false;
	};

	/**
	 *
	 * @return {*}
	 */
	p.getGroundBody = function () {
		return this.box2d.GetGroundBody()
	};

	/**
	 * @param bodyDef
	 * @return {*}
	 */
	p.createBody = function (bodyDef) {
		var body = new b2BodyDef;

		for (var i in bodyDef) {
			switch (i) {
				case 'type':
					switch (bodyDef[i]) {
						case "dynamic":
							body.type = b2Body.b2_dynamicBody;
							break;
						case "static":
							body.type = b2Body.b2_staticBody;
							break;
						case "kinematic":
							body.type = b2Body.b2_kinematicBody;
							break;
						default:
							body.type = b2Body.b2_dynamicBody;
					}
					break;
				case 'x':
					body.position.x = bodyDef[i] / this.scale;
					break;
				case 'y':
					body.position.y = bodyDef[i] / this.scale;
					break;
				case 'angle':
					body.angle = bodyDef[i];
					break;
				default:
					body[i] = bodyDef[i];
			}
		}

		return body;
	};

	p.createFixture = function (fixtureDef) {
		var fixture = new b2FixtureDef;

		var	isData 	= false,
			data 	= {};

		for (var i in fixtureDef) {
			var param = fixtureDef[i];

			switch (i) {
				case 'shape':
					switch (param.type) {
						//Shape circle
						case "circle":
							fixture['shape'] = new b2CircleShape(param.radius / this.scale);
							if (param.x && param.y) {
								fixture['shape'].SetLocalPosition(new b2Vec2(param.x / this.scale, param.y / this.scale));
							}
							break;
						//Shape rectangle offset
						case "rectangle":
							fixture['shape'] = new b2PolygonShape;
							fixture['shape'].SetAsOrientedBox(
								(param.width >> 1)  / this.scale,
								(param.height >> 1) / this.scale,
								new b2Vec2(param.x / this.scale, param.y / this.scale)
							);
							break;
						//Shape polygon
						case "polygon":
							var vecs = this._convertPolygonPoints(param.points);
							fixture['shape'] = new b2PolygonShape;
							fixture['shape'].SetAsArray(vecs, vecs.length);
							break;
						//Shape rectangle
						case "boxRectangle":
							fixture['shape'] = new b2PolygonShape;
							fixture['shape'].SetAsBox(
								(param.width >> 1)  / this.scale,
								(param.height >> 1) / this.scale
							);
							break;
					}
					break;
				case 'categoryBits' :
					param && this.setCategoryBitsPrototype(fixture,param);
					break;
				case 'maskBits' :
					param && this.setMaskBitsPrototype(fixture,param);
					break;
				case 'autoDetect' :
					data.autoDetect = param;
					isData = true;
					break;
				case 'name' :
					data.name 	= param;
					isData 		= true;
					break;
				default:
					fixture[i] = param;
			}
		}

		if (isData) {
			fixture.userData = data;
		}

		return fixture;
	};

	p.changeRectangleByShapeAsOrientedBox = function (shape, x, y, width, height) {
		var halfW = width >> 1,
			halfH = height >> 1;

		shape.SetAsOrientedBox(
			halfW  / this.scale,
			halfH / this.scale,
			new b2Vec2((x + halfW) / this.scale, (y + halfH) / this.scale)
		)
	};

	p.changeRectangleByShapeAsBox = function (shape,  width, height) {
		shape.SetAsBox(
			(width >> 1)  / this.scale,
			(height >> 1) / this.scale
		)
	};

	p._convertPolygonPoints = function (points, xInv) {
		var vecs = [];

		for (var p = 0, l = points.length; p < l; p += 2) {
			vecs.push({
				x : (xInv ? -1 : 1) * points[p],
				y : points[p + 1]
			});
		}

		return vecs;
	};

	p.simpleCreateBodyFixture = function (bodyDef, fixtureDef, data) {
		var body = this.box2d.CreateBody(this.createBody(bodyDef));

		if (fixtureDef instanceof  b2FixtureDef)
			body.CreateFixture(fixtureDef);
		else {
			var fixture = this.createFixture(fixtureDef);
			this.addFixtureToBody(body, fixture);
		}

		data && body.SetUserData(data);

		return body;
	};

	/**
	 * @param uid
	 * @return {*}
	 */
	p.findActor = p.getActorByUid = function (uid) {
		var actors = this.actors;
		for (var i = 0, l = actors.length; i < l; i++) {
			if (actors[i].uid === uid) {
				return actors[i];
			}
		}
		return false;
	};

	p.findActorByName = function (name) {
		var actors = this.actors;
		for (var i = 0, l = actors.length; i < l; i++) {
			if (actors[i].name === name) {
				return actors[i];
			}
		}
		return false;
	};

	p.draw = function () {

	};

	p.paused = false;

	p.setPaused = function (value) {
		this.paused = value
	};

	p.setGravity = function (x, y) {
		this.box2d.SetGravity(new b2Vec2(x, y));
		return this;
	};

	p.handlerContactListener = function () {
		var contactListener = new b2ContactListener;

		contactListener.BeginContact = function (contact) {

			var userDataA = contact.m_fixtureA.m_body.GetUserData(),
				userDataB = contact.m_fixtureB.m_body.GetUserData(),
				normal = contact.m_manifold.m_localPlaneNormal;

			var b2WM = new b2WorldManifold();
			contact.GetWorldManifold(b2WM);

			userDataA && userDataA.contactable && userDataA.contactable.contact(contact, userDataB, {
				normal   : normal,
				m_normal : b2WM.m_normal,
				fixture  : contact.m_fixtureA,
				type     : 'begin',
				filter   : contact.m_fixtureB.m_filter
			});
			userDataB && userDataB.contactable && userDataB.contactable.contact(contact, userDataA, {
				normal   : normal,
				m_normal : b2WM.m_normal,
				fixture  : contact.m_fixtureB,
				type     : 'begin',
				filter   : contact.m_fixtureA.m_filter
			});
		};

		contactListener.EndContact = function (contact) {
			var userDataA = contact.m_fixtureA.m_body.GetUserData(),
				userDataB = contact.m_fixtureB.m_body.GetUserData();

			userDataA && userDataA.contactable && userDataA.contactable.contact(contact, userDataB, {
				type    : 'end',
				fixture : contact.m_fixtureA,
				filter  : contact.m_fixtureB.GetFilterData()
			});
			userDataB && userDataB.contactable && userDataB.contactable.contact(contact, userDataA, {
				type    : 'end',
				fixture : contact.m_fixtureB,
				filter  : contact.m_fixtureA.GetFilterData()
			});
		};
		contactListener.PreSolve = function (contact, manifold) {
			//do some stuff
		};
		contactListener.PostSolve = function (contact, manifold) {
			//do some stuff
		};

		this.__setContactListener(contactListener);
	};

	p.addCallbackListener = function (callback) {
		this.removeCallbackListener(callback);
		this._listeners.push(callback);
	};

	p.removeCallbackListener = function (callback) {
		var listeners = this._listeners;
		var index = listeners.indexOf(callback);
		if (index != -1) {
			listeners.splice(index, 1);
		}
	};

	p.__setContactListener = function (globalCallback) {
		this.box2d.SetContactListener(globalCallback);
	};

	p.updateDebug = function () {
		var camera 			= this.stage.camera.camera,
			cameraTransform = this.stage.camera.cameraTransform;

		var mtx = this.debugMatrix.identity().appendTransform(
									camera.x + cameraTransform.regX,
									camera.y + cameraTransform.regY,
									cameraTransform.scaleX,
									cameraTransform.scaleY,
									cameraTransform.rotation,
									cameraTransform.skewX,
									cameraTransform.skewY,
									cameraTransform.regX,
									cameraTransform.regY );
		this.box2d.m_debugDraw.m_sprite.graphics.clear();
		this.box2d.m_debugDraw.SetDrawScale(this.scale);
		this.debugContext.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
		this.box2d.DrawDebugData();
		this.debugContext.setTransform(1, 0, 0, 1, 0, 0);
	};

	p.debug = function () {
		this.debugMatrix = new createjs.Matrix2D();
		var canvas = document.getElementById('canvasDebugMovement');
		var debugContext = this.debugContext = canvas.getContext('2d');
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(debugContext);
		debugDraw.SetDrawScale(this.scale);
		debugDraw.SetFillAlpha(0);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this.box2d.SetDebugDraw(debugDraw);
	};

	p.destroy = function () {
		this.rmActorsAll();
		this.actors.length = 0;
		this._listeners.length = 0;
		delete this.app;
		delete this.box2d;
		delete this.stage;
		delete this.layers;
	};

	global.World = World;
}());