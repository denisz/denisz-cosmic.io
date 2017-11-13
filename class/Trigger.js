(function (){
	var global = (1,eval)('this');
	var Trigger = function(){

	};

	var p = Trigger.prototype = new global.Actor();

    p.update = function (){

    };

	p.contact = function(contact, manifold){

	};

    p._remove = function (){

    };

	global.Trigger = Trigger;
}());