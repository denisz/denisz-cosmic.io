/**
 * PlayerCharacter
 */
(function () {
	var global = (1,eval)(this),
		PlayerCharacter = function (stage, params) {
			this.max_speed          = 2;
			this.speed 		        = 7;

			this.jump               = 22; //скорость прыжка
            this.jump_speed         = 4;  //скорость движение в бок
            this.jump_max_speed     = 6;  //максимальная скорость

            this.ISJETPACK          = true;    // а что тут можно и ракетами пользоваться
            this.jetpack_jump_start = 8;    // скорость на старте запуска рюкзака
            this.jetpack_jump       = 3;    // скорость подъёма
            this.jetpack_max_speed  = 6;    // максимальная скорость движения в бок
            this.jetpack_speed      = 1;  // скорость движения в бок

            this.marioStyle     = false;

			this.initialize(stage);
			this.input 		    = global.GameInput.getInstance();
			this.init(params);
		};

	var pcStates = {
		kStateIdle 	: 1,
		kStateWalk	: 2,
		kStateJump	: 3,
		kStateFall  : 4,
		kStateDead	: 5,
        kStateRocket: 6
	};

	var p = PlayerCharacter.prototype = new global.Actor();

	p.init = function(params){
        var skin, body, world;
        world = this.stage.world;

        assert(params.bodyDef,'Enemy is not bodyDef');
        body = world.createBody(params.bodyDef);

        skin = this.init_skin();
		this.init_Actor(
			world.registerSkin(skin),
            world.registerBody(body)
        );

        world.addFixtureToBody(this.body, params.fixturesDef );

        world.addActor(this);

        this.addSettings({
			scale 		: 0.4,
            xOffset     : -20,
            yOffset	    : -60
        });

        this.init_FSM();
        this.init_contactable();
	};

    p.init_contactable = function (){
        this.contactable = new global.Сontactable();

        var fixture = this.body.GetFixtureList();
        this.contactable._setAutoDetect(fixture,['GROUND']);
        this.contactable.setMaskBits(fixture,['GROUND']);
        this.contactable.setCategory(fixture,['PLAYER'])
    };

    p.init_skin = function () {
        var ss = new createjs.SpriteSheet({
            "animations": {
                "fly": {"frames": [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 44]},
                "all": {"frames": [89]},
                "run": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]},
                "afterrun": {"frames": [86, 86, 87, 88, 89], next:"idle"},
                "jump_down": {"frames": [75, 75, 76, 76, 77, 78, 79, 80, 81], next :'idle'},
                "prerun": {"frames": [82, 82, 83, 84, 85],next : "run"},
                "idle": {"frames": [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 19]},
                "jump_up": {"frames": [68, 68, 69, 69, 70, 71, 72, 73, 74], next : "fly"}
            },
            "images": ["assets/atlas/animations/man3/man3.png"],
            "frames": [
                [1604, 872, 177, 198, 0, -15, 0],
                [137, 663, 155, 203, 0, -24, -1],
                [1858, 447, 140, 206, 0, -24, -3],
                [911, 447, 125, 208, 0, -24, -5],
                [1446, 447, 122, 206, 0, -24, -7],
                [1166, 447, 134, 208, 0, -24, -5],
                [159, 447, 141, 211, 0, -24, -4],
                [1347, 226, 153, 214, 0, -19, -2],
                [1504, 226, 167, 214, 0, -9, -1],
                [1115, 872, 166, 199, 0, -24, 0],
                [956, 872, 155, 201, 0, -24, -1],
                [1572, 447, 144, 206, 0, -24, -2],
                [774, 447, 133, 209, 0, -24, -4],
                [1040, 447, 122, 208, 0, -24, -5],
                [1720, 447, 134, 206, 0, -24, -7],
                [474, 447, 141, 210, 0, -24, -5],
                [2, 447, 153, 212, 0, -19, -4],
                [1788, 226, 166, 213, 0, -9, -2],
                [1285, 872, 158, 199, 0, -21, -1],
                [402, 663, 102, 203, 0, -48, -13],
                [932, 663, 102, 203, 0, -48, -13],
                [1038, 663, 102, 203, 0, -48, -13],
                [1144, 663, 102, 203, 0, -48, -13],
                [1250, 663, 102, 203, 0, -48, -13],
                [108, 872, 102, 202, 0, -48, -14],
                [2, 872, 102, 202, 0, -48, -14],
                [1568, 663, 102, 202, 0, -48, -14],
                [1886, 663, 102, 202, 0, -48, -14],
                [744, 872, 102, 201, 0, -48, -15],
                [638, 872, 102, 201, 0, -48, -15],
                [214, 872, 102, 201, 0, -48, -15],
                [320, 872, 102, 201, 0, -48, -15],
                [850, 872, 102, 201, 0, -48, -15],
                [532, 872, 102, 201, 0, -48, -15],
                [426, 872, 102, 201, 0, -48, -15],
                [1356, 663, 102, 202, 0, -48, -14],
                [1780, 663, 102, 202, 0, -48, -14],
                [1674, 663, 102, 202, 0, -48, -14],
                [1462, 663, 102, 202, 0, -48, -14],
                [720, 663, 102, 203, 0, -48, -13],
                [614, 663, 102, 203, 0, -48, -13],
                [508, 663, 102, 203, 0, -48, -13],
                [826, 663, 102, 203, 0, -48, -13],
                [296, 663, 102, 203, 0, -48, -13],
                [1218, 226, 125, 216, 0, -20, 0],
                [1089, 226, 125, 216, 0, -19, 0],
                [2, 226, 126, 217, 0, -18, 0],
                [132, 226, 125, 217, 0, -17, -1],
                [1201, 2, 125, 218, 0, -16, -1],
                [1454, 2, 124, 218, 0, -15, -2],
                [1330, 2, 120, 218, 0, -17, -3],
                [602, 2, 117, 219, 0, -19, -3],
                [243, 2, 114, 219, 0, -20, -4],
                [361, 2, 115, 219, 0, -18, -5],
                [480, 2, 118, 219, 0, -15, -5],
                [1700, 2, 114, 218, 0, -20, -6],
                [839, 2, 115, 219, 0, -18, -5],
                [2, 2, 118, 220, 0, -15, -4],
                [958, 2, 116, 219, 0, -18, -4],
                [1582, 2, 114, 218, 0, -21, -4],
                [723, 2, 112, 219, 0, -24, -3],
                [124, 2, 115, 219, 0, -22, -2],
                [1078, 2, 119, 218, 0, -20, -2],
                [431, 226, 122, 217, 0, -18, -2],
                [1818, 2, 126, 218, 0, -15, -1],
                [683, 226, 122, 217, 0, -20, -1],
                [966, 226, 119, 216, 0, -24, -1],
                [557, 226, 122, 217, 0, -22, 0],
                [1958, 226, 85, 193, 0, -40, -22],
                [1067, 1078, 99, 175, 0, -29, -41],
                [1170, 1078, 117, 175, 0, -29, -41],
                [2, 663, 131, 205, 0, -27, -12],
                [1304, 447, 138, 207, 0, -27, -12],
                [809, 226, 153, 216, 0, -19, -4],
                [261, 226, 166, 217, 0, -9, -4],
                [1675, 226, 109, 213, 0, -29, -4],
                [1948, 2, 92, 202, 0, -34, -15],
                [952, 1078, 111, 175, 0, -35, -41],
                [825, 1078, 123, 176, 0, -35, -41],
                [686, 1078, 135, 179, 0, -30, -41],
                [1447, 872, 153, 198, 0, -19, -22],
                [2, 1078, 166, 197, 0, -9, -22],
                [587, 1078, 95, 186, 0, -44, -30],
                [481, 1078, 102, 187, 0, -44, -30],
                [619, 447, 151, 209, 0, -24, -9],
                [304, 447, 166, 211, 0, -9, -9],
                [1785, 872, 141, 197, 0, -22, -11],
                [1930, 872, 106, 187, 0, -40, -30],
                [342, 1078, 135, 189, 0, -30, -30],
                [172, 1078, 166, 191, 0, -9, -30]
            ]
        });

        return new createjs.BitmapAnimation(ss);
    };

    p.init_FSM = function () {
        this.states = pcStates;

        var statesList = [
            pcStates.kStateIdle, global.IdleState,
            pcStates.kStateWalk, global.WalkState,
            pcStates.kStateJump, global.JumpState,
            pcStates.kStateFall, global.FallState,
            pcStates.kStateDead, global.DeadState,
            pcStates.kStateRocket,global.RocketState
        ];

        this.fsm = new global.FSM(this, statesList);
        this.fsm.enter(pcStates.kStateIdle);
    };

    p.faceLeft = function () {
        this.facingRight = false;
        this.skin.skewY = 180;
        this.skin.regX = 140;
    };

    p.faceRight = function () {
        this.facingRight = true;
        this.skin.skewY = 0;
        this.skin.regX = 40;
    };

	p.updateFaceDirection =function () {
		//смотри если скорость по x > 0 то на право иначе налево
		var vel = this.linearVelocity;
        if (vel.x > 0 ) {
            this.faceRight();
        } else if (vel.x < 0) {
            this.faceLeft();
        }
	};

    p.isOnGround = function (){
        return this._tickisOnGround <= 2;
    };

    p._tickisOnGround = false;
    p.updateIsOnGround = function (time) {

        var contacts = this.contactable.isDetect(['GROUND']);
        for (var i= 0, l=contacts.length; i < l; i++) {
            var normal = contacts[i].params.m_normal;

            if (normal.x > -.72 && normal.x < .72 && normal.y < 0) {
                this._tickisOnGround = 0;
                return true;
            }
        }

        //сколько тиков мы не на земле
        //todo endure constant
        if (this._tickisOnGround <= 2) {
            this._tickisOnGround++;
        }

        return false;
    };

	p.update = function (time) {
		//cache linearVelocity if movable is true
		this.linearVelocity = this.getLinearVelocity();
        this.updateIsOnGround(time);
        this.fsm.update(time);
		this.updateFaceDirection(time);
		this.update_Actor(time);
	};

	p.entity = 'player';

	global.PlayerCharacter = PlayerCharacter;
}());