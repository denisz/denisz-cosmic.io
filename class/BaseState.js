(function(){
	var global = (1,eval)('this');

	/**
	 * BaseState
	 * @param host
	 * @param fsm
	 * @param id
	 * @constructor
	 */
	var BaseState = function (host, fsm, id) {
		this.init(host, fsm, id)
	};

	var p = BaseState.prototype = {};

	p.init = function (host, fsm, id){
		if(host == undefined) return;
		this.host = host;
		this.fsm = fsm;
		this.stateId = id;
		this.isSuspended = false;
	};

	p.enter = function (message, fromState) {
//		throw "Not specified in this state!";
	};

	p.leave = function () {
		// throw "Not specified in this state!";
	};

	p.update = function (dt) {
//		throw "Not specified in this state!";
	};

	p.suspended = function (dt) {
		// throw "Not specified in this state!";
	};

	p.message = function (msg) {
		//throw "Not specified in this state!";
	};

	p.suspend = function () {
		// throw "Not specified in this state!";
	};

	p.resume = function (msg, fromState) {
		//throw "Not specified in this state!";
	};

	p.preload = function () {
//		throw "Not specified in this state!";
	};

	p.cancelPreload = function () {
//		throw "Not specified in this state!";
	};

	p.transition = function () {
		return false;
	};

	p.destroy = function () {
		if (this.destroyed) return;
		this.destroyed = true;
		delete this.host;
		delete this.fsm;
	};

	global.BaseState 	= BaseState;
}());
