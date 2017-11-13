(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.glowWin = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// glow2
	this.instance = new lib.glow_1("synched",0);
	this.instance.setTransform(132.2,134.3,0.88,0.92,0,-89.9,90,100.1,100);
	this.instance.alpha = 0.051;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:100.1,scaleX:0.88,scaleY:0.92,skewX:-48.2,skewY:131.6,alpha:0.5},18).to({regY:100,scaleX:0.88,scaleY:0.92,skewX:0,skewY:180,y:134.2,alpha:0.051},21).wait(10).to({startPosition:0},0).to({skewX:45,skewY:225.1,alpha:0.551},30).to({skewX:90,skewY:270.1,alpha:0.051},40).wait(1));

	// glow1
	this.instance_1 = new lib.glow_1("synched",0);
	this.instance_1.setTransform(142.2,135.7,1,1,0,0,0,100,100);
	this.instance_1.alpha = 0.301;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.75,scaleY:0.75,rotation:90,alpha:0.602},29).to({scaleX:0.95,scaleY:0.95,rotation:180,x:130.2,alpha:0.301},30).to({scaleX:0.8,scaleY:0.8,rotation:270.1,alpha:0.5},30).to({scaleX:1,scaleY:1,rotation:360,x:142.2,alpha:0.301},30).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(40.2,35.7,202,200);


// symbols:
(lib.glow = function() {
	this.initialize(img.glow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.glow_1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.glow();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;