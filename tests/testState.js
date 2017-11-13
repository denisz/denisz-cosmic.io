/**
 * test State
 */

(function(){
	var global = (1,eval)('this');

	var TestState = function(host, fsm, id){
		if(host == undefined) return;
		this.host = host;
		this.fsm = fsm;
		this.stateId = id;
		this.isSuspended = false;
	};

	var p = TestState.prototype = new BaseState();

	p.leave = function(){
		console.log(arguments);
	};

	p.cancelPreload = function(){

	};

	p.update = function(){
		console.log(arguments);
	};

	p.enter = function(){
		console.log(arguments);
	};

	p.resume = function(){
		console.log(arguments);
	};

	p.transition = function(){
		console.log(arguments);
	};

	global.TestState = TestState;
}());