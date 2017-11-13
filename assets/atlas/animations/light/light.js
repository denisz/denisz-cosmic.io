(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.light_stage = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{stand:0,go:150});

		// timeline functions:
		this.frame_149 = function() {
			this.gotoAndPlay("stand");
		}
		this.frame_224 = function() {
			this.gotoAndPlay("go");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).wait(149).call(this.frame_149).wait(75).call(this.frame_224));

		// uplight3 copy 3
		this.instance = new lib.uplight("synched",0);
		this.instance.setTransform(545.8,170.6,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance.alpha = 0.031;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(150).wait(34).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:585.9,alpha:0.359},9).to({regX:252.5,scaleY:1.19,x:625.8,alpha:0.031},11).to({_off:true},1).wait(20));

		// uplight3 copy 4
		this.instance_1 = new lib.uplight("synched",0);
		this.instance_1.setTransform(953.9,170.6,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance_1.alpha = 0.031;
		this.instance_1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(150).wait(55).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:994,alpha:0.359},10).to({regX:252.5,scaleY:1.19,x:1033.9,alpha:0.031},8).to({_off:true},1).wait(1));

		// uplight3 copy 5
		this.instance_2 = new lib.uplight("synched",0);
		this.instance_2.setTransform(177,169.4,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance_2.alpha = 0.031;
		this.instance_2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(150).wait(11).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:217.1,alpha:0.359},17).to({regX:252.5,scaleY:1.19,x:257,alpha:0.031},20).to({_off:true},1).wait(26));

		// uplight2 copy
		this.instance_3 = new lib.uplight("synched",0);
		this.instance_3.setTransform(754.6,131.9,0.762,0.762,0,0,0,252.5,174.5);
		this.instance_3.alpha = 0.5;
		this.instance_3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(150).to({startPosition:0,_off:false},0).to({x:799.6,alpha:0.031},20).to({_off:true},1).wait(26).to({x:702.5,alpha:0.039,_off:false},0).to({x:754.6,alpha:0.5},27).wait(1));

		// uplight1 copy
		this.instance_4 = new lib.uplight("synched",0);
		this.instance_4.setTransform(352.5,174.4,1,1,0,0,0,252.5,174.5);
		this.instance_4.alpha = 0;
		this.instance_4._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(150).to({startPosition:0,_off:false},0).to({x:363.5,alpha:0.328},14).to({x:393.5},22).to({x:410.5,alpha:0},23).to({_off:true},1).wait(15));

		// uplight3 copy 2
		this.instance_5 = new lib.uplight("synched",0);
		this.instance_5.setTransform(545.8,170.6,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance_5.alpha = 0.031;
		this.instance_5._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(67).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:585.9,alpha:0.359},36).to({regX:252.5,scaleY:1.19,x:625.8,alpha:0.031},38).to({_off:true},1).wait(83));

		// uplight3 copy
		this.instance_6 = new lib.uplight("synched",0);
		this.instance_6.setTransform(953.9,170.6,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance_6.alpha = 0.031;
		this.instance_6._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(55).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:994,alpha:0.359},35).to({regX:252.5,scaleY:1.19,x:1033.9,alpha:0.031},33).to({_off:true},1).wait(101));

		// uplight3
		this.instance_7 = new lib.uplight("synched",0);
		this.instance_7.setTransform(177,169.4,0.315,1.193,0,-33,0,252.5,174.5);
		this.instance_7.alpha = 0.031;
		this.instance_7._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(25).to({startPosition:0,_off:false},0).to({regX:252.6,scaleY:1.19,x:217.1,alpha:0.359},36).to({regX:252.5,scaleY:1.19,x:257,alpha:0.031},41).to({_off:true},1).wait(122));

		// uplight2
		this.instance_8 = new lib.uplight("synched",0);
		this.instance_8.setTransform(754.6,131.9,0.762,0.762,0,0,0,252.5,174.5);
		this.instance_8.alpha = 0.5;

		this.timeline.addTween(cjs.Tween.get(this.instance_8).to({x:799.6,alpha:0.031},39).to({_off:true},1).wait(54).to({x:702.5,alpha:0.039,_off:false},0).to({x:754.6,alpha:0.5},55).to({_off:true},1).wait(75));

		// uplight1
		this.instance_9 = new lib.uplight("synched",0);
		this.instance_9.setTransform(352.5,174.4,1,1,0,0,0,252.5,174.5);
		this.instance_9.alpha = 0;

		this.timeline.addTween(cjs.Tween.get(this.instance_9).to({x:363.5,alpha:0.328},28).to({x:393.5},45).to({x:410.5,alpha:0},45).to({_off:true},1).wait(106));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(100,-1,847.1,350);


// symbols:
	(lib.light_st = function() {
		this.initialize(img.light);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,505,349);


	(lib.uplight = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.light_st();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,505,349);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;