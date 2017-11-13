(function(){
	var global = (1,eval)('this');
	var PREFIX_NAMESPACE = 'scripts';
	var ScriptService = function(host, files){
		this.host 		= host;
		this.scripts 	= files;
		this.events  	= {};
		this.initialize();
	};
	var p = ScriptService.prototype = {};

	p.initialize = function () {
		if(this.scripts) {
			this.subscribeScripts(this.scripts);
		}
	};

	p.subscribeScripts = function (scripts){
		var listScripts = global[PREFIX_NAMESPACE];
		for (var  i =0 , l = scripts.length; i < l; i++) {
			var script = listScripts[scripts[i]];
			if (script) {
				for (var j in script) {
					this.subscribe(j,script[j]);
				}
			}
		}
	};

	p.subscribe = function (event, fn) {
		if (typeof this.events[event] === 'undefined') {
			this.events[event] = [];
		}
		this.events[event].push(fn);
	};

	p.unsubscribe = function (event, fn) {
		if (this.events[event]) {
			var index = this.events[event].indexOf(fn);
			if ( index !== -1) {
				this.events[event].splice(index ,1);
			}
		}
	};

	p.message = function (msg) {
		this.publish('message',msg);
	};

	p.publish = function (event, params){
		if (this.events[event]) {
			var funcs = this.events[event];
			for (var  i =0 , l = funcs.length; i < l; i++) {
				funcs[i](this.host, this, params);
			}
		}
	};

	p.release = function (){
		delete this.host;
	};

	global.ScriptsService = ScriptService;
	global.scripts 	  = {};
}());