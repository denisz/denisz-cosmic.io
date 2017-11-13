(function(){
	var global = (1,eval)('this');

	var Size = function(w, h){
		this.w = this.width = (w == null ? 0 : w);
		this.h = this.height= (h == null ? 0 : h);
	};

	var p = Size.prototype = {};
	p.w = 0;
	p.h = 0;

	p.clone = function() {
		return new Size(this.w, this.h);
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Size (w="+this.w+" h="+this.h+")]";
	};

	global.Size = Size;
}());