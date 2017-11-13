(function(){
	var global = (1,eval)('this');
	var SfxService = function () {
		this.resources = global.Resources.getInstance();
		SfxService.instance = this;

		createjs.Sound.registerPlugins([ createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
		this.player  = createjs.Sound;

		var app				= global.App.getInstance();
		this.musicVolume 	= app.musicVolume;
		this.sfxVolume 		= app.sfxVolume;
		this.enabled 		= app.musicEnabled;

		createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
	};

	SfxService.instance = null;

	SfxService.getInstance = function () {
		assert(SfxService.instance !== null,"SfxService class has not been created");
		return SfxService.instance;
	};

	var p = SfxService.prototype = {};

	p.queue = [];

	p.loaded = true;

	p.loadHandler = function () {
		console.log('Sound loaded');
		this.loaded = true;
		while(this.queue.length){
			var action = this.queue.shift();
			this[action.method].apply(this, action.args);
		}
	};

	p.disable = function () {
		this.enabled = false;
		this.stopAllSound();
	};

	p.playFX = function (fx ,interrupt, delay, offset, loop, volume, pan ) {
		if (!this.loaded) {
			return this.queue.push({
				method  : 'playFX',
				args 	: arguments
			});
		}
		if (this.enabled) {
			if (loop === undefined) loop = false;
			var instance = this.player.createInstance(fx);
			return instance.play(interrupt, delay, offset, loop, volume || this.sfxVolume, pan);
		}
		return false;
	};

	p.playMusic = function (fx ,interrupt, delay, offset, loop, volume, pan) {
		if (!this.loaded) {
			return this.queue.push({
				method  : 'playMusic',
				args 	: arguments
			});
		}
		this.stopMusic();
		this._music = this.playFX(fx ,interrupt, delay, offset, loop, this.musicVolume, pan);
		return this._music;
	};

	p.stopMusic = function () {
		if (this._music) {
			this._music.stop();
			this._music = null;
		}
	};

	/**
	 * Stop all sound with the given id from playing
	 */
	p.stopAllSound = function () {
		if (this.enabled) {
			this.player.stop(id);
		}
	};

	/**
	 * Sets the music volume.
	 *
	 * @param {number} level the volume level.
	 */
	p.setMusicVolume = function(level) {
		if (this.enabled) {
			this.player.setVolume(level * this.musicVolume, 0);
		}
	};

	global.SfxService = SfxService;
}());