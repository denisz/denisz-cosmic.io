(function () {
	var global = (1,eval)('this');
	var AnimationsService = function (scheme) {
		this.loadSpriteSheets 	= [];
		this.resources 			= global.Resources.getInstance();
		this.setAnimations(scheme);
		AnimationsService.instance = this;
	};

	AnimationsService.instance = null;

	AnimationsService.getInstance = function () {
		assert(AnimationsService.instance !== null,"AnimationsService class has not been created");
		return AnimationsService.instance;
	};

	var p = AnimationsService.prototype = {};

	p.setAnimations = function (scheme) {
		this._animations = scheme;
	};

	/**
	 *
	 * @param index
	 * @return createjs.BitmapAnimation
	 */
	p.getAnimationByIndex = p.getSprite = function (index, raw) {
		if (index == -1) return null;
		var t = this.loadSpriteSheets[index];

		if (t !== undefined) return raw ? t : new createjs.BitmapAnimation(t);

		t = this.loadAnimation(index);
		this.loadSpriteSheets[index] = t;

		return raw ? t : new createjs.BitmapAnimation(t);
	};

	/**
	*
	 */
	p.getMovieClip = function  (name , mode, startPosition, loop) {
		var lib = global.lib;
		assert(name in lib,'MovieClip is not defined');
		return new lib[name](mode, startPosition, loop)
	};

	/**
	 * create spriteSheet
	 */
	p.loadAnimation = function (index) {
		var tween = this._animations[index];
//		var images = [];
//		for (var i =0 , l = tween.images; i < l; i++) {
//			images.push(this.resources.getResult(tween.images[i]));
//		}
//		tween.images = images;
		return new createjs.SpriteSheet(tween);
	};

	/**
	 * @param name
	 */
	p.getAnimationByName = function (name) {
		var animations = this._animations;
		for (var i = 0 , l = animations.length; i < l ; i++) {
			if (animations[i].name === name) {
				return animations[i];
			}
		}
		return false;
	};

	/**
	 *
	 */
	p.reset = function(){
		this.loadSpriteSheets.length = 0;
	};

	/**
	 *
	 */
	p.release = function (){
		this._animations = [];
	};

	global.AnimationsService = AnimationsService;
}());