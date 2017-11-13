(function(){
	var global = (1,eval)('this');
	var IdleState 					= function () {
		this.init.apply(this,arguments);
	};
	IdleState.prototype 			= new global.BaseState();
	IdleState.prototype.enter 		= function (msg, fromState) {

	};
	IdleState.prototype.transition 	= function () {

	};

	var ShowStateFromLoading 					= function () {
		this.init.apply(this,arguments);
	};
	ShowStateFromLoading.prototype 				= new global.BaseState();
	ShowStateFromLoading.prototype.enter 		= function (msg, fromState) {
		this.host.createBackground();
		this.host.showMenuByType(global.MenuService.ITEMS.MAIN);
		this.host._startAnimation();
		this.host.playSfx();
	};
	ShowStateFromLoading.prototype.transition 	= function () {
		return this.tryChangeState(true, this.host.states.kStateIdle);
	};

	var ShowStateFromGame 					= function () {
		this.init.apply(this,arguments);
	};
	ShowStateFromGame.prototype 			= new global.BaseState();
	ShowStateFromGame.prototype.enter 		= function (msg, fromState) {
		this.host.createBackground();
		this.host.showMenuByType(global.MenuService.ITEMS.MAIN);
		this.host._createLoading('open', 'autorelease');
		this.host.playSfx();
	};
	ShowStateFromGame.prototype.transition 	= function () {
		return this.tryChangeState(true, this.host.states.kStateIdle);
	};

	var TransitionState 					= function () {
		this.init.apply(this,arguments);
	};
	TransitionState.prototype 				= new global.BaseState();
	TransitionState.prototype.enter 		= function (msg, fromState) {};
	TransitionState.prototype.transition 	= function () {};

	var HideState 					= function () {
		this.init.apply(this,arguments);
	};
	HideState.prototype 			= new global.BaseState();
	HideState.prototype.enter 		= function (msg, fromState) {};
	HideState.prototype.transition 	= function () {};

	global.FSM_Menu = {};
	global.FSM_Menu.IdleState  				= IdleState;
	global.FSM_Menu.TransitionState 		= TransitionState;
	global.FSM_Menu.HideState 				= HideState;
	global.FSM_Menu.ShowFromLoadingState	= ShowStateFromLoading;
	global.FSM_Menu.ShowFromGameState		= ShowStateFromGame;
}());