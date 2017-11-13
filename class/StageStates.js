(function () {
	var global = (1,eval)('this');

	var InPassageStage = function () {
		this.init.apply(this,arguments);
	};
	InPassageStage.prototype 			= new global.BaseState();
	InPassageStage.prototype.enter 		= function () {
		console.log('Game');
	};
	InPassageStage.prototype.leave 		= function () {
	};
	InPassageStage.prototype.update 	= function () {};
	InPassageStage.prototype.transition = function () {
		return  this.host.fsm.tryChangeState(this.host._paused ,this.host.stageStates.kStateInPausedStage);
	};

	var InLoadingStage = function () {
		this.init.apply(this,arguments);
	};
	InLoadingStage.prototype 			= new global.BaseState();
	InLoadingStage.prototype.enter 		= function () {
		console.log('Create loader by stage',this.host.resources.getProgress());
		this._loading = this.host._createLoading(false);
		this._loading.gotoAndStop(21);
		this._animationEnd = 0;
	};
	InLoadingStage.prototype.leave 		= function () {
		console.log('Erase loader from stage');
		if (this._loading.parent) {
			this._loading.parent.removeChild(this._loading);
		}
		delete this._loading;
	};
	InLoadingStage.prototype.update 	= function () {
		var progress = this.host.resources.getProgress();
		console.log('Transition stage' , progress);
	};
	InLoadingStage.prototype.transition = function () {
		var progress = this.host.resources.getProgress(),
			isLoaded = progress == 1;

		if (isLoaded && this.host.isLoaded && !this._animationEnd) {
			if (this._loading) {
				this._loading.gotoAndPlay('open');
				this._loading.onAnimationEnd = function(){
					this._animationEnd = 2;
				}.bind(this);
				this._animationEnd = 1;
			} else {
				this._animationEnd = 2;
			}
		}

		return this.host.fsm.tryChangeState(isLoaded && this.host.isLoaded && this._animationEnd == 2,this.host.stageStates.kStateInPassageStage);
	};

	var InCompleteState = function () {
		this.init.apply(this,arguments);
	};
	InCompleteState.prototype 			= new global.BaseState();
	InCompleteState.prototype.enter 	= function () {
		console.log('Enter complete stage');
		this.host.pause();

		var result = this.host.completed, that = this.host;

		if (this.host.completed) {

			if (result === global.Stage.COMPLETE.WIN) {
				this.host.hudService.addHUD('DialogComplete',{
					onClickOnNext 	: function(){
						console.log('restart');
						that.restart();
					},
					onClickOnMenu 		: function(){
						console.log('menu');
						that.exit();
					},
					onClickOnLevels : function () {
						that.exit();
					},
					position : global.DialogComplete.POSITIONS.CENTER,
					transform : {}
				}, global.HUDService.LAYERS.HUD_GAME);
			} else if(result === global.Stage.COMPLETE.DEFEAT){
				this.host.hudService.addHUD('DialogDefeat',{
					onClickOnRestart 	: function(){
						console.log('restart');
						that.restart();
					},
					onClickOnMenu 		: function(){
						console.log('menu');
						that.exit();
					},
					onClickOnLevels : function () {
						that.exit();
					},
					position : global.DialogDefeat.POSITIONS.CENTER,
					transform : {}
				}, global.HUDService.LAYERS.HUD_GAME);
			}
		}

		this.host.freezeLayers();
		this.host.gameInput.releaseAll();
	};
	InCompleteState.prototype.leave 	= function () {
	};
	InCompleteState.prototype.update 	= function () {
	};
	InCompleteState.prototype.transition= function () {
//		this.host.fsm.tryChangeState(this.host.stageStates.kStateInLoadingStage);
	};

	var InPausedStage = function () {
		this.init.apply(this,arguments);
	};
	InPausedStage.prototype 		= new global.BaseState();
	InPausedStage.prototype.enter 	= function () {
		console.log('Pause');
		this.host.pause();
		var to = this;

		to._dialogPause = to.host.hudService.addHUD('DialogPause',{
			onClickOnRestart 	: function(event){
				console.log('restart');
				to.host.restart();
			},
			onClickOnPlay 		: function(event){
				console.log('play');
				event.target.hide(function(){
					to._paused = false;
				});
			},
			onClickOnLevels 	: function(event){
				console.log('levels');
				to.host.exit();
			},
			onClickOnMenu 		: function(event){
				console.log('menu');
				to.host.exit();
			},
			position : global.DialogPause.POSITIONS.CENTER,
			transform : {}
		}, global.HUDService.LAYERS.HUD_GAME);

		this._paused = true;
//		this._filter = new createjs.ColorFilter( 0.42, 0.58, 0.8, 1);
//		this.host.addFilterToLayer(this._filter, null, true);
		this.host.freezeLayers();
	};
	InPausedStage.prototype.leave 	= function () {
		if (this._dialogPause) {
			this._dialogPause.destroy();
			delete this._dialogPause;
		}

//		this.host.removeFilterToLayer(this._filter, null, true);
		this.host.freezeLayers(true);
		this.host.play();

//		delete this._filter;
		this._paused = false;
	};
	InPausedStage.prototype.update= function (time) {
	};
	InPausedStage.prototype.transition= function () {
		return this.host.fsm.tryChangeState(!this._paused ,this.host.stageStates.kStateInPassageStage);
	};

	global.InPausedStage 	= InPausedStage;
	global.InCompleteStage  = InCompleteState;
	global.InLoadingStage 	= InLoadingStage;
	global.InPassageStage 	= InPassageStage;
}());