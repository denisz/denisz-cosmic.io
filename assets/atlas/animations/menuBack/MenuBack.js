(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.MenuBack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// uplight3 copy 2
	this.instance = new lib.uplight("synched",0);
	this.instance.setTransform(545.8,170.6,0.315,1.193,0,-33,0,252.5,174.5);
	this.instance.alpha = 0.031;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:585.9,alpha:0.359},30).to({regX:252.5,scaleY:1.19,x:625.8,alpha:0.031},33).to({_off:true},1).wait(1));

	// uplight3 copy
	this.instance_1 = new lib.uplight("synched",0);
	this.instance_1.setTransform(953.9,170.6,0.315,1.193,0,-33,0,252.5,174.5);
	this.instance_1.alpha = 0.031;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(43).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:994,alpha:0.359},30).to({regX:252.5,scaleY:1.19,x:1033.9,alpha:0.031},33).to({_off:true},1).wait(13));

	// uplight3
	this.instance_2 = new lib.uplight("synched",0);
	this.instance_2.setTransform(177,169.4,0.315,1.193,0,-33,0,252.5,174.5);
	this.instance_2.alpha = 0.031;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:217.1,alpha:0.359},30).to({regX:252.5,scaleY:1.19,x:257,alpha:0.031},33).to({_off:true},1).wait(37));

	// uplight2
	this.instance_3 = new lib.uplight("synched",0);
	this.instance_3.setTransform(754.6,131.9,0.762,0.762,0,0,0,252.5,174.5);
	this.instance_3.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:799.6,alpha:0.031},32).to({_off:true},1).wait(47).to({x:702.5,alpha:0.039,_off:false},0).to({x:754.6,alpha:0.5},39).wait(1));

	// uplight1
	this.instance_4 = new lib.uplight("synched",0);
	this.instance_4.setTransform(352.5,174.4,1,1,0,0,0,252.5,174.5);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({x:363.5,alpha:0.328},22).to({x:393.5},34).to({x:410.5,alpha:0},33).to({_off:true},1).wait(30));

	// wtrglr2
	this.instance_5 = new lib.wtrglr2("synched",0);
	this.instance_5.setTransform(544.2,565.1,1,1,0,0,0,444,203);
	this.instance_5.alpha = 0.102;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},13).to({alpha:0.102},17).to({alpha:0.859},29).to({alpha:1},16).to({alpha:0.102},17).to({startPosition:0},27).wait(1));

	// waterglare1
	this.instance_6 = new lib.wtrglr1("synched",0);
	this.instance_6.setTransform(474.1,569,1,1,0,0,0,388.5,199);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:0.199},11).to({alpha:0.75},21).to({alpha:0.051},22).to({alpha:0.199},23).to({alpha:0.75},21).to({alpha:1},21).wait(1));

	// back
	this.instance_7 = new lib.back_1("synched",0);
	this.instance_7.setTransform(640,384,1,1,0,0,0,640,384);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).wait(120));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,1280,769.2);


// symbols:
(lib.back = function() {
	this.initialize(img.back);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,768);


(lib.light = function() {
	this.initialize(img.light);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,505,349);


(lib.waterglare1 = function() {
	this.initialize(img.waterglare1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,777,398);


(lib.waterglare2 = function() {
	this.initialize(img.waterglare2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,888,406);


(lib.wtrglr2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.waterglare2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,888,406);


(lib.wtrglr1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.waterglare1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,777,398);


(lib.uplight = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.light();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,505,349);


(lib.back_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.back();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1280,768);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;