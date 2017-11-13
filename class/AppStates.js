(function(){
	var global = (1,eval)('this');

	var LoadingResourcesState = function(){
		this.init.apply(this,arguments);
	};
	LoadingResourcesState.prototype = new global.BaseState();
	LoadingResourcesState.prototype.enter = function(){
		this.timeInState    = 0;
		this.loading = this.host.createLoading();
		console.log('create loader',this.host.resources.getProgress());
	};
	LoadingResourcesState.prototype.leave = function(){
		console.log('erase loader');
		if (this.loading) {
			this.loading.destroy();
			this.loading = null;
		}
	};
	LoadingResourcesState.prototype.transition = function(){
		var progress = this.host.resources.getProgress(),
			isLoaded = progress === 1;

		if (this.loading) {
			isLoaded = this.loading.isFinished;
		}

		return this.host.fsm.tryChangeState(isLoaded && this.host._isLoadedPrimaryResources && this.timeInState > 3000,this.host.states.kStateInAds);
	};
	LoadingResourcesState.prototype.update 	= function(time){
		var progress = this.host.resources.getProgress();

		if (this.loading) {
			this.loading.setProgress(progress);
		}
		this.timeInState += time;
	};

	var InGameState = function(){
		this.init.apply(this,arguments);
	};
	InGameState.prototype = new global.BaseState();
	InGameState.prototype.enter = function(msg, fromState){
		console.log('in game');
		this.host.game.stageService.startStage();
	};
	InGameState.prototype.update = function(time){
		this.host.game.update(time);
	};
	InGameState.prototype.transition = function(){};

	var InMenuState = function(){
		this.init.apply(this,arguments);
	};
	InMenuState.prototype = new global.BaseState();
	InMenuState.prototype.enter = function(msg, fromState){
		console.log('in menu');
		this.host.game.init();
		this.menu = new global.MenuService();

		if (fromState === this.host.states.kStateInAds || fromState === this.host.states.kStateLoading) {
			this.menu.fsm.enter(this.menu.states.kStateShowFromLoading);
		} else {
			this.menu.fsm.enter(this.menu.states.kStateShowFromGame);
		}
	};
	InMenuState.prototype.update = function(time){

	};
	InMenuState.prototype.leave = function(time){
		this.menu.destroy();
		delete this.menu;
	};
	InMenuState.prototype.transition = function(){

	};

	var InMap = function(){
		this.init.apply(this,arguments);
	};
	InMap.prototype = new global.BaseState();
	InMap.prototype.enter = function(){
		console.log('in map');

	};
	InMap.prototype.update = function(time){

	};
	InMap.prototype.transition = function(){

	};

	var InAds = function () {
		this.init.apply(this,arguments);
	};
	InAds.prototype = new global.BaseState();
	InAds.prototype.enter = function(){
		console.log('in ads');
		this.isFinish = true;
//		if (window.Modernizr.mobile) {
//			new global.AdsCreateJS({
//				onFinish : function (){
//					console.log('cool');
//				}
//			});
//		} else {
//			this.isFinish = true;
//		}
	};
	InAds.prototype.update = function(time){

	};
	InAds.prototype.transition = function(){
		return this.host.fsm.tryChangeState(this.isFinish,this.host.states.kStateInMenu);
	};


	global.App_FSM = {};

	global.App_FSM.InGameState 				= InGameState;
	global.App_FSM.LoadingResourcesState 	= LoadingResourcesState;
	global.App_FSM.InMenuState 				= InMenuState;
	global.App_FSM.InMap					= InMap;
	global.App_FSM.InAds					= InAds;
}());
