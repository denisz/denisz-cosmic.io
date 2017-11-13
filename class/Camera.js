(function () {
	var global = (1,eval)('this');
	var Camera = function(stage){
		this.stage 				= stage;
		this.game				= stage.game;
		this.app				= stage.app;
		this.debug				= this.app.debugCamera;
		this.camera 			= new global.Vec2(0, 0);
		this.cameraConstraint 	= new global.Rectf(0, 0, 0, 0);
		this.cameraTransform    = {
			scaleX      :1,
			scaleY      :1,
			rotation    :0,
			skewX       :0,
			skewY       :0,
			regX        :0,
			regY        :0
		};

		this.focus = null;
		this.setUp();
	};

	var p = Camera.prototype = {};

	p.getFocusObject = function () {
		return this.focus;
	};

	p.missTarget = p.missFocus = function (){
		this.focus = null;
	};

	/**
	 * @param object
	 * @return {*}
	 */
	p.setTarget = p.setFocusObject = function (object) {
		if(!object) return;
		assert(object instanceof  global.Actor, 'Focus must be inherited from Actor');
		this.focus = object;
	};

	p._cameraFreeze = false;

	p.updateCamera = function () {
		var halfW = this.app.width  >> 1;
		var halfH = this.app.height >> 1;
		var focus = this.focus;

		if (focus) {
			var focusPos = focus.getGlobalPosition().addNew(focus.getCameraOffset());
			var newCameraPos = new global.Point2(halfW - (focusPos.x | 0) , halfH - (focusPos.y | 0));

			var kDeadZone = 32;
			var diff = newCameraPos.sub(this.camera);

			if (diff.x > kDeadZone) {
				diff.x -= kDeadZone;
			}
			else if (diff.x < -kDeadZone) {
				diff.x += kDeadZone;
			}
			else {
				diff.x = 0;
			}

			if (diff.y > kDeadZone) {
				diff.y -= kDeadZone;
			}
			else if (diff.y < -kDeadZone) {
				diff.y += kDeadZone;
			}
			else {
				diff.y = 0;
			}

			this.camera.add(diff);

			// Rects only deal with positive numbers
			this.camera.mul(-1);
			this.cameraConstraint.clipSet(this.camera);
			this.camera.mul(-1);

			this.cameraTransform.regX = focusPos.x;
			this.cameraTransform.regY = focusPos.y;
		}
	};

	p.setUp = function () {
		var gpr = this.stage.getSizeStage();
		var screenW = this.stage.getWidth();
		var screenH = this.stage.getHeight();
		this.cameraConstraint = new global.Rectf(0, 0, (gpr.w - screenW), (gpr.h - screenH));

		// Center camera if screen is wider than gameplay area
		if (gpr.w < screenW) {
			var halfw = (screenW - gpr.w) / 2;
			this.cameraConstraint.x = halfw;
			this.cameraConstraint.x1 = halfw;
		}

		// Center camera if screen is higher than gameplay area
		if (gpr.w < screenH) {
			var halfh = (screenH - gpr.h) / 2;
			this.cameraConstraint.y = halfh;
			this.cameraConstraint.y1 = halfh;
		}
	};

	p.animationCameraPosition = function (x, y, time, ease, onCallback) {
		var to = this;
		to._cameraFreeze = true;
		createjs.Tween.get(this.camera).to({x : x, y: y}, time, ease || createjs.Ease.linear).call(function(){
			if (typeof onCallback === 'function') {
				onCallback(function(){
					to._cameraFreeze = false;
				});
			} else {
				to._cameraFreeze = false;
			}
		});
	};

	p.setScale = function (scale) {
		return this.cameraTransform.scaleY = this.cameraTransform.scaleX = scale;
	};

	p.getCenterCamera = function () {
		return new global.Vec2(this.app.width  >> 1,this.app.height >> 1);
	};

	p.tweenCameraTransform = function (fn, fnCallback, fnChange) {
		if (typeof(fn) === 'function'){
			var tween = createjs.Tween.get(this.cameraTransform);

			if (typeof fnChange === 'function') {
				tween.addEventListener("change", fnChange)
			}

			fn(tween, this);

			tween.call(function(){
				typeof fnCallback === 'function' && fnCallback();
				tween.removeAllEventListeners();
			})
		}
	};

	/**
	 * viewportCentre = (400,300) //Lets say screen size is 800 x 600
	 radius = 30.0
	 randomAngle = rand()%360
	 offset = ( sin(randomAngle) * radius , cos(randomAngle) * radius) //create offset 2d vector
	 viewport.setCentre(viewportCentre + offset) // set centre of viewport
	 draw()

	 while(true)  //update about every 10-20ms
	 {
		radius *=0.9 //diminish radius each frame
		randomAngle +=(180 +\- rand()%60) //pick new angle
		offset = (sin(randomAngle) * radius , cos(randomAngle) * radius) //create offset 2d vector
		viewport.setCentre(viewportCentre + offset) //set centre of viewport
		draw() //redraw
	}
	 * @param strength
	 * @param duration
	 */
	p.shakeCamera = function (strength, duration) {
		strength 	= strength 	|| 30;
		duration	= duration 	|| 2000;

		var to			= this,
			obj 		= { strength : strength},
			camera		= this.camera,
			randomAngle = randomRange(0,360);

		function handleChange() {
			randomAngle +=	(180 + randomRange(-60,60));
			to.updateCamera();
			camera.x 	+=  Math.sin(randomAngle) * obj.strength;
			camera.y 	+=  Math.cos(randomAngle) * obj.strength;
		}

		this._cameraFreeze = true;

		createjs.Tween.get(obj).to({strength:0},duration).call(function (tween){
			to._cameraFreeze = false;
			tween.removeAllEventListeners();
		}).addEventListener("change", handleChange);
	};

	p.zoomOnFocus = function (zoom, time, ease, onFinish, onChange) {
		zoom = Math.max(zoom,1);

		this.tweenCameraTransform(function(tween){
			tween.to({scaleX:zoom,scaleY:zoom}, time, ease);
		}, onFinish, onChange)
	};

	p.update = function () {
		!this._cameraFreeze && this.updateCamera();
		this.debug 			&& this.updateDebug();
	};

	p.updateDebug = function (){
		this.app._textCamera.text = _.substitute('{x}:{y}:{width}:{height}',{
			x		: this.camera.x.toFixed(0),
			y		: this.camera.y.toFixed(0),
			width	: this.stage.getWidth(),
			height	: this.stage.getHeight()
		});
	};

	p.destroy = function () {
		delete this.stage;
		delete this.game;
		delete this.camera;
		delete this.cameraConstraint;
		delete this.app;
		delete this.focus;
	};

	global.Camera = Camera;
}());