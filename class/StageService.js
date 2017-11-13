(function(){
	var global = (1,eval)('this');
	var StageService = function (stages) {
		assert(!StageService.instance, "StageService cannot be instantiated");
		this.app = global.App.getInstance();
		this.setStage(stages);
		StageService.instance= this;
	};

	StageService.instance = null;

	StageService.getInstance = function () {
		assert(StageService.instance !== null,"StageService class has not been created");
		return StageService.instance;
	};

	var p = StageService.prototype = {};

	p.setStage = function (scheme) {
		this.stages 		= scheme;
		this.defaultStage 	= this.app.skipToStage;
	};

	p.nextStage = function () {
		return this.defaultStage;
	};

	p.startStage = function () {
		this.initializeStage(this.nextStage());
	};

	p.initializeStage = function (name) {
		assert(this.stages[name], 'Stage has not been created');

		this.destroyCurrentStage();
		try{
			this.currentStage 		= new global.Stage( this.stages[name], {
				onComplete : this.onCompleteStage.bind(this),
				onReload   : this.onReloadStage.bind(this),
				onExit 	   : this.onExitStage.bind(this),
				onNextStage: this.onNextStage.bind(this)
			});
		}catch(e){
			console.log(e.message);
		}

		this.currentStage.name = name;
		return this;
	};

	p.destroyCurrentStage = function () {
		if (this.currentStage) {
			this.currentStage.destroy();
			this.currentStage = null;
		}
	};

	p.onNextStage = function () {
		console.log('next stage');
	};

	p.onCompleteStage = function () {
		console.log('stage was completed');
	};

	p.onExitStage = function () {
		console.log('Exit from stage');
		this.destroyCurrentStage();
		this.app.fsm.setState(this.app.states.kStateInMenu);
	};

	p.onReloadStage = function () {
		console.log('reload the stage');
		this.initializeStage(this.currentStage.name);
	};

	p.onFocused = function () {
		this.currentStage && this.currentStage.onFocused(value)
	};

	p.update = function (time) {
		this.currentStage && this.currentStage.update(time);
	};

	global.StageService = StageService;
}());