(function() {
	var global = (1,eval)('this');
	var Styles = {
		'standard'  : {
			face  		: 'compass_face',
			arrow 		: 'compass_arrow',
			time		: 250,
			ease 		:  createjs.Ease.sineIn
		}
	};

	var Compass = function (options) {
		this.initializeEventsFromOptions(options);
		this.initializeHUD(options);

		this.styles = Styles[this.options.type || 'standard'];
		this.createSkeleton();

		this.transformObject = this.container;
		this.setTransform(this.options.transform);

		if (this.options.target) {
			this.setTarget(this.options.target);
		}

		if (this.options.point) {
			this.setPoint(this.options.point);
		}

		this.handlerAngle = _.throttle(this._handlerAngle.bind(this), 350);
	};

	var p = Compass.prototype = new global.HUD;

	p.angle = 0;

	/**
	 * за кем следим
	 * @type {null}
	 */
	p.target = null;
	p.point  = null;

	p.setAngle = function (angle) {
		this.angle = angle;
	};

	p.getAngle = function () {
		return this.angle;
	};

	p.setTarget = function (target) {
		this.target = target;
	};

	p.setPoint = function (point) {
		this.point = point;
	};

	p.clearPoint = function () {
		this.point = null;
	};

	p._handlerAngle = function () {
		if (this.target && this.point) {
			var p1 = this.target, p2 = this.point;
			this.angle = (Math.atan2(p2.y-p1.y,p2.x-p1.x) * 180/Math.PI >> 0) + 90;
		}
	};

	p.update = function () {
		if (this.arrow && !this.destroyed) {
			this.handlerAngle();
			//сделать анимацию
			if (this.arrow.rotation !== this.angle) {
				createjs.Tween.get(this.arrow).to({rotation : this.angle}, this.styles.time, this.styles.ease);
			}

		}
	};

	p.createSkeleton = function () {
		this.createContainer();
		this.createFace();
		this.createArrow();
	};

	p.createFace = function () {
		this.face = new createjs.Bitmap(this.resources.getResult(this.styles.face).result);
		this.container.addChild(this.face);
	};

	p.createArrow = function () {
		var img = this.resources.getResult(this.styles.arrow).result;
		this.arrow = new createjs.Bitmap(img);
		this.arrow.regX = this.arrow.x = img.width >> 1;
		this.arrow.regY = this.arrow.y = img.height >> 1;
		this.container.addChild(this.arrow);
	};

	p.createContainer = function () {
		this.container = new createjs.Container();
		this.addToLayer(this.container);
	};

	p.destroyed = false;

	p.HUD_destroy = p.destroy;

	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;
		this.container.removeAllChildren();
		this.removeFromLayer(this.container);

		delete this.handlerAngle;
		delete this.tween;
		delete this.face;
		delete this.arrow;
		delete this.point;
		delete this.target;
		delete this.container;
		this.HUD_destroy();
	};


	global.Compass = Compass;
}());