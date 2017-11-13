var b2Vec2				= 	Box2D.Common.Math.b2Vec2,
	b2BodyDef 			= 	Box2D.Dynamics.b2BodyDef,
	b2Body 				= 	Box2D.Dynamics.b2Body,
	b2FixtureDef		= 	Box2D.Dynamics.b2FixtureDef,
	b2Fixture 			= 	Box2D.Dynamics.b2Fixture,
    b2TimeStep          =   Box2D.Dynamics.b2TimeStep,
	b2World 			= 	Box2D.Dynamics.b2World,
	b2MassData 			= 	Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape 		= 	Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape 		= 	Box2D.Collision.Shapes.b2CircleShape,
	b2WorldManifold		=	Box2D.Collision.b2WorldManifold,
	b2RayCastInput 		= 	Box2D.Collision.b2RayCastInput,
	b2RayCastOutput 	= 	Box2D.Collision.b2RayCastOutput,
	b2DebugDraw 		= 	Box2D.Dynamics.b2DebugDraw,
	b2DistanceJointDef 	= 	Box2D.Dynamics.Joints.b2DistanceJointDef,
	b2RevoluteJointDef 	= 	Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2DistanceJoint		= 	Box2D.Dynamics.Joints.b2DistanceJoint,
	b2WeldJointDef 		= 	Box2D.Dynamics.Joints.b2WeldJointDef,
	b2ContactListener 	= 	Box2D.Dynamics.b2ContactListener,
	b2FilterData 		= 	Box2D.Dynamics.b2FilterData,
	b2BuoyancyController=	Box2D.Dynamics.Controllers.b2BuoyancyController,
	b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController;


var Rectangle		= createjs.Rectangle;

var onLoadHandler = function(){
	var global = (1,eval)('this');

	global.$CONTAINER	= document.getElementById('container');
	global.$CONTENT 	= document.getElementById('content');

	createjs.MotionGuidePlugin.install();

	var app = new global.App();

	global.application = function () {
        assert(app,"App is not initialize");
		return app;
	};

    global.game = function () {
        var app = global.application();
        assert(app.game,"Game is not initialize");
        return app.game;
    };

	global.stage = function () {
		var game = global.game();
		return game && game.stageService.currentStage;
	};

	global.world = function () {
		var s = global.stage();
		return s.world;
	};

	global.pl = function () {
		return global.stage().camera.getFocusObject();
	};

	document.onselectstart = function () {
		return false;
	};

	/**
	 *
	 * @param message
	 * @param file
	 * @param str
	 */
	window.onerror = function (message, file, str){
		console.log(message, file, str);
		if (!window.Modernizr.isNativeApp) {
			var wrapper = document.createElement('div');
			wrapper.innerHTML = _.substitute('{message}\n{file}:{str}',{	message:message,	file: _.last(file.split('/')),	str:str	});
			wrapper.classList.add('e-error');
			document.body.appendChild(wrapper);
			global.$CONTAINER.classList.add('error');
		}
	}
};

window.addEventListener('DOMContentLoaded',onLoadHandler);