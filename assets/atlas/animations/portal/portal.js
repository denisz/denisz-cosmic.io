(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.portal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// portal
	this.instance = new lib.portal_2("synched",0);
	this.instance.setTransform(245.3,203,1,1,0,0,0,146,153);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(100));

	// light3
	this.instance_1 = new lib.light3_1("synched",0);
	this.instance_1.setTransform(243.5,232,1,1,0,0,0,75.5,92.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1.15,scaleY:0.96,rotation:-89.8,x:243.6},39).to({rotation:-179.9,x:243.5,y:231.9},20).to({rotation:-269.9,y:232},20).to({scaleX:1,scaleY:1,rotation:-359.9},20).wait(1));

	// light2
	this.instance_2 = new lib.light2_1("synched",0);
	this.instance_2.setTransform(244.5,231,1,1,0,0,0,87.5,87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({rotation:-89.8},19).to({rotation:-179.9},20).to({rotation:-269.9},20).to({rotation:-359.9},40).wait(1));

	// light1
	this.instance_3 = new lib.light_back_1("synched",0);
	this.instance_3.setTransform(235.5,233,1,1,0,0,0,106.5,106.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:1.07,scaleY:1.07,x:240.5,y:229.5},29).to({scaleX:1,scaleY:1,x:236,y:233.5},70).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(99.3,50,292,306);


// symbols:
(lib.light_back = function() {
	this.initialize(img.light_back);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,213,213);


(lib.light2 = function() {
	this.initialize(img.light2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,213,213);


(lib.light3 = function() {
	this.initialize(img.light3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,198);


(lib.portal_1 = function() {
	this.initialize(img.portal_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,292,306);


(lib.portal_2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.portal_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,292,306);


(lib.light3_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.light3();
	this.instance.setTransform(0,0,0.932,0.932);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,151,184.6);


(lib.light2_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.light2();
	this.instance.setTransform(0,0,0.822,0.822);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,175,175);


(lib.light_back_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.light_back();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,213,213);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;