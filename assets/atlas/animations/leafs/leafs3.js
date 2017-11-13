(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.leafs3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.leaf3("synched",0);
	this.instance.setTransform(121.7,130.4,1,1,0,0,0,111,124);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({skewX:0.3,x:120.9},6).to({scaleY:1,skewX:1.8,x:117.4,y:130.3},16).to({skewX:2.4,x:116.4,y:130.4},7).to({skewX:1.5,skewY:-0.1,x:118.8},8).to({scaleY:1,rotation:-1.6,skewX:0,skewY:0,x:127.6,y:130.6},14).to({regX:110.9,rotation:0,skewX:-2.7,skewY:-2,x:130.1},8).to({regX:111,skewX:-2.3,skewY:-1.6,x:129.1,y:130.5},7).to({regY:123.9,skewX:-0.3,skewY:-0.1,x:123.3,y:130.4},15).to({regY:124,skewX:0,skewY:0,x:121.7},8).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.7,6.4,222,248);


// symbols:
(lib.tree1_leafs3 = function() {
	this.initialize(img.tree1_leafs3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,222,248);


(lib.leaf3 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.tree1_leafs3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,222,248);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;