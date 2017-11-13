(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.leafs1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.leaf12("synched",0);
	this.instance.setTransform(83.9,74.8,1,1,0,0,0,76,65);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-0.1,x:84.3,y:74.7},9).to({regX:75.9,rotation:-3.3,x:86.9,y:74.2},20).to({regX:76,rotation:-4,x:87.4,y:74.1},11).to({rotation:-3.6,x:87.1,y:74.2},9).to({regY:64.9,rotation:-0.1,x:84.2,y:74.6},40).to({regY:65,rotation:0,x:83.9,y:74.8},11).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.9,9.8,152,130);


// symbols:
(lib.tree1_leafs1 = function() {
	this.initialize(img.tree1_leafs1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,152,130);


(lib.leaf12 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.tree1_leafs1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,152,130);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;