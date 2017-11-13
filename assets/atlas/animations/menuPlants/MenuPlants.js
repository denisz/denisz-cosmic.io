(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.MenuPlants = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 1stplanplants
	this.instance = new lib._1stplanplants("synched",0);
	this.instance.setTransform(1078.7,384.1,1,1,0,0,0,215,384);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:1078.2},4).to({skewX:-1.1,x:1069.4},35).to({skewX:-1.3,x:1068.7},5).to({skewX:-1.1,x:1069.3},4).to({skewX:0,x:1077.8},27).to({x:1078.7},5).to({x:1077.9},4).to({skewX:-0.8,x:1071.7},15).to({skewX:-0.6,x:1072.4},3).to({skewX:0,x:1077.9},13).to({x:1078.7},4).wait(1));

	// leaf3
	/* Layers with classic tweens must contain only a single symbol instance. */

	// leaf2
	this.instance_1 = new lib.leaf2("synched",0);
	this.instance_1.setTransform(1024.1,110.5,1,1,0,0,0,79,110.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:1023.3},4).to({rotation:-2.6,x:1008.8,y:110},38).to({rotation:-2.8,x:1008},4).to({regX:79.1,regY:110.6,rotation:-2.3,x:1008.7,y:110.1},4).to({rotation:3.5,x:1017.8,y:108.5},27).to({regX:79,regY:110.5,rotation:4.2,x:1018.7,y:108.3},5).to({rotation:3.3,x:1018.4,y:108.6},5).to({regY:110.6,rotation:-1.1,x:1016.9,y:110.1},13).to({regY:110.5,rotation:-2.3,x:1016.7,y:110.4},4).to({rotation:-1.8,x:1018},4).to({rotation:-0.1,x:1023,y:110.5},7).to({rotation:0,x:1024.1},4).wait(1));

	// leaf1
	this.instance_2 = new lib.leaf1("synched",0);
	this.instance_2.setTransform(857.8,122.4,1,1,0,0,0,46.5,107.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:107.6,x:857.2,y:122.5},4).to({rotation:-3.1,x:845.4,y:123},38).to({regY:107.5,rotation:-3.3,x:844.8,y:122.9},4).to({rotation:-2.8,x:845.3,y:122.8},4).to({regY:107.6,rotation:2.5,x:852.9,y:121.2},27).to({regY:107.5,rotation:3.2,x:853.7,y:121},5).to({rotation:2.5,x:853.2,y:121.2},4).to({rotation:-2.1,x:850,y:122.7},12).to({rotation:-3,x:849.5,y:123},3).to({rotation:-2.6,x:850.4,y:122.9},4).to({regY:107.6,rotation:-0.1,x:856.9,y:122.6},10).to({regY:107.5,rotation:0,x:857.8,y:122.4},4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(811.3,0,482.4,768.1);


// symbols:
(lib.plants_1stplan = function() {
	this.initialize(img.plants_1stplan);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,430,768);


(lib.plants_leaf = function() {
	this.initialize(img.plants_leaf);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,93,215);


(lib.plants_leaf2 = function() {
	this.initialize(img.plants_leaf2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,158,221);


(lib.plants_leaf3 = function() {
	this.initialize(img.plants_leaf3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,88,204);


(lib.Tween4 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.plants_leaf3();
	this.instance.setTransform(-43.9,-101.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-43.9,-101.9,88,204);


(lib.leaf2 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.plants_leaf2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,158,221);


(lib.leaf1 = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.plants_leaf();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,93,215);


(lib._1stplanplants = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.plants_1stplan();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,430,768);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;