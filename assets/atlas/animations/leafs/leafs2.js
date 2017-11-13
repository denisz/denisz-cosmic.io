(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.leafs2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.leaf21("synched",0);
	this.instance.setTransform(91.6,95.7,1,1,0,0,0,80,92);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({skewX:-0.3,x:92.5,y:95.6},9).to({scaleY:1,skewX:-4.1,skewY:-1.1,x:98.1,y:95.7},20).to({scaleY:1,skewX:-4.9,skewY:-1.5,x:99.1,y:95.6},10).to({scaleY:1,skewX:-4.1,skewY:-1.1,x:98.1},10).to({scaleY:1,skewX:-0.4,skewY:0,x:92.7,y:95.7},20).to({skewX:0,x:91.6},10).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11.6,3.7,160,184);


// symbols:
(lib.tree1_leafs2 = function() {
	this.initialize(img.tree1_leafs2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,184);


(lib.leaf21 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.tree1_leafs2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,160,184);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;