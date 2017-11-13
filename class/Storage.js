(function () {
	var global = (1,eval)('this');
	var Storage = function () {};

	var p = Storage.prototype = {};

	p.declare = null;

	p.setItem = function (key, value) {
		if (this.declare) {
			this.declare.setItem(key, value)
		}
	};

	p.getItem = function (key) {
		if (this.declare) {
			return this.declare.getItem(key)
		}
		return false;
	};

	global.Storage = new Storage;
}());