(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.deathPlayer = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{death:0,circle:52});

		// timeline functions:
		this.frame_51 = function() {
			this.onAnimationEnd && this.onAnimationEnd();
		}
		this.frame_64 = function() {
			this.gotoAndPlay("circle");
			this.onAnimationEnd && this.onAnimationEnd();
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).wait(51).call(this.frame_51).wait(13).call(this.frame_64));

		// light_tv
		this.instance = new lib.light_tv("synched",0);
		this.instance.setTransform(294.4,266.4,1,1,0,0,0,140.5,143.5);
		this.instance.alpha = 0.16;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(25).to({startPosition:0,_off:false},0).to({alpha:1},5).to({alpha:0.531},6).to({alpha:1},6).to({alpha:0.531},4).to({alpha:1},5).to({alpha:0.762},4).to({alpha:1},9).wait(1));

		// polip
		this.instance_1 = new lib.death_plants_9("synched",0);
		this.instance_1.setTransform(240.3,161.9,0.346,0.346);
		this.instance_1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(40).to({startPosition:0,_off:false},0).to({scaleX:1.25,scaleY:1.25,x:254,y:155.8},6).to({scaleX:1,scaleY:1,x:253.4,y:156.9},5).to({scaleY:1,skewX:-3.4,x:250.9},3).to({scaleY:1,skewX:4.6,x:254.7},3).to({scaleY:1,skewX:-3,x:251.2},3).to({scaleY:1,skewX:0,x:253.4},4).wait(1));

		// Layer 9 (mask)
		var mask = new cjs.Shape();
		mask._off = true;
		var mask_graphics_24 = new cjs.Graphics().p("AskgzILVlKIMaBzIBaFhInSDmInjAKIpdA3g");
		var mask_graphics_27 = new cjs.Graphics().p("AsJMCQg/gkgJgJQBzl6AFgvQgSgEglABIg3ADQgKh+gJidQgLihAAgjQAAgcAGgJQAJgLAigIQAYgGBVgQIgbjYILVlKIMZBzIBaFjInSDmImiAJQgaAYgsAdQg+ApiqBZQinBahCAsQhpBHAAArQAAALAXBrIAWBrQAAAMgWAfQgZAlgIAgQgGAWAAA8QgGAwgkABQgEgBg9gig");
		var mask_graphics_30 = new cjs.Graphics().p("AuRL6QgKAKgQAAQgEAAg9gjQg/gkgJgJQBzl5AFgwQgSgDglABIg3ACQgKh9gKibQgKikAAgiQAAgdAGgJQAJgLAigIQAYgGBVgQIgcjYILVlKIMaBzIBaFjInSDmImjAJQgZAYgtAdQg9ApirBaQhfAzg+AkIAACjQAAAWACAeIADAmQAAAOACAaIADAeQAAAKgIAVIgHAWQAAAIAKATQAMAVADAOIAAAtIhIADIg6ACQgNAZgTBUQgSBPAAARQgGgMgug/gAN9GaQgViCAAguQAAg5AMgrQAKghAMgNIAHgWIAQgYQAjgzADgHQAeAvA5A8QArA7AABoQAAA8g0CgQg6Cwg3A+QgMiIgbimg");
		var mask_graphics_33 = new cjs.Graphics().p("AvxQWQg9gvAAheIAAiFQg9AegMAAQgIAAgOgoQgPgoAAgZQAAheAkg5QAng8BWhAQgRgLgEgEQBzl5AFguQgSgDglABIg3ACQgKh9gKidQgKikAAgiQAAgdAGgJQAJgLAigIQAYgGBVgQIgcjYILVlKIMaBzIBaFjInSDmImiAJQgaAYgtAdQgtAehpA6QgJBIgKCFQAAAKAbAYIA8AxQBYBMAAAsQAABThBA5Qg5Ayg9AAIhUgXQhUgYgEgDQgXgPgTgOIAHAOQAMAVADAOIAAAtIgEAAQBDAvAlAmIA7BAQAkArAAAaQAAA4hGCDQhNCRg6AAQhBAAhMhgIgTApIAAgPIgFATIgGAWQgJAyAAA+QAABTAeAfQAHAIAQAKQANAIAEAHQixgZhDgzgAQ0PWQhAgXgJgMQgHgxgRhhQgLg+AAgWQAAgaABgFIAJgSQBxAyArBLQAdAyAABKQAAAhgKAgQgKAhAAAMQgIgZg7gUgAQAFQQgcA8gcAfQgMiIgbimQgViAAAguQAAg5AMgrQAKghAMgNIAHgWIAQgYQAjg1ADgHQANAVASAWQADgDAEAAQBuAAAWCHQAJAxgBBTIgDCUQAABmgPAnQgPAqhLBaIgxhbg");
		var mask_graphics_36 = new cjs.Graphics().p("AN/OxQARgSAhgbQARgSAFgcQgbgMgFgHQgHgygRhgQgLg+AAgWQAAgbABgEIAIgSQAeANAaAPQAMgSAbgOQArgXA6AAQBRAAAnBzQAZBKAABKQAABPg8BJQgsA0haA9QhhA/gmAdQg/AwgEAmQgbjbBEhHgAmARCQgegQgegDQgQgBhPAAQg/AAgvAKQgwAKg0AAQizAAhbgoQiCg6AAiWQAAglAKgcIABh2Qg+AfgLAAQgIAAgPgoQgPgpAAgYQAAheAlg5QAmg9BWhAQgQgKgFgFQBzl3AFgwQgSgDglABIg3ACQgJh9gKidQgLijAAgjQAAgcAHgJQAIgMAigIQAZgGBUgQIgbjYILVlKIMZBzIBaFkInRDmIjmAEQALAXAAAgQAADOi0CHQg+AuhJAdQAyAzAAAfQAABUhBA5Qg4Ayg9AAIhVgYQhUgYgEgCQgWgPgUgPIAHAOQAMAWADAOIAAAtIgEAAQBEAuAkAnIA8BAQAjArAAAZQAAA4hGCEQhNCRg6AAQhBAAhMhgIgNAeQAjAuA6AuQA7AuB6A/QBiAzBAAsQBDAwAQAggAQIEZIgbAiIgyhbQgcA8gbAfQgNiJgailQgViAAAguQAAg5AMgrQAJghAMgNIAHgXIAQgXQAjg1AEgIQAMAVASAXQAEgEADAAIAGAAQAXgoAVAAQA8AAA1CRQAtB7AABOQAABzgqBkQgKAZhOCPIgSgig");
		var mask_graphics_39 = new cjs.Graphics().p("ALtUPQgXggABg1QAAg8AZg/IAOghQgOiyA8g/QARgTAhgaQARgTAFgcQgagMgGgHQgHgxgRhhQgLg+AAgWQAAgaABgFIAJgSQAeAOAZAPQAMgTAbgOQArgWA6AAQBRAAAnBzQAZBJAABKQAABQg8BIQgoAwhPA4IgMANQghAkgIARQgTAhABA1QAAA8ANATQAIAKBFAzQg1gPg0hDQg3hKATg2IgHAEIgTAOQgYAWgLAnQgNAvAABhQAABQAdBDQg8g3gMgRgAhmTkIhVgUQg1gNgigNQhhgngohQQgTglgrgYQgygdhEAAQidAIhGgGQhdgHgXgnQhpgIg/gcQiBg5AAiXQgBglALgcIAAh1Qg+AegLAAQgIAAgPgoQgOgoAAgZQAAheAkg5QAmg8BXhAQgRgLgFgEQB0l3AFgwQgTgDglABIg3ACQgJh9gKidQgLikAAgiQABgdAGgJQAJgLAhgIQAZgGBUgQIgbjYILVlKIMZBzIBaFjInRDmIjmAFQALAWAAAhQABDNi1CHQg+AuhIAeQAxAzABAhQgBBThAA3Qg5Ayg9AAIhVgXQhTgYgFgDQgWgPgTgOIAGAOQAMAVADAOIAAAtIgEAAQBEAvAkAmIA8BAQAkArAAAaQgBA4hGCDQhNCRg6AAQhAAAhNhgIgNAeQAjAvA6AtQAyAnBdAyIAOAAQCeAOBcBAQA4AoANAlIAYA/QAOAmAHAiQAQBDBfAxQASAJBDAeQA0AXAcARIAAAFgAOBDUQgZgaAAg4QAAgQACgTIgBgEQgdA8gbAfQgMiIgbikQgViCAAguQAAg5AMgrQAJghANgNIAGgWIAQgYQAkg1ADgHQANAVARAWQAEgDAEAAIAFAAQAKgRAJgKQgMgjAAgGQAAghAZgOQAagPA+AAQBzAABhCCQBpCNABDJQgBCshpB3QhmBziHAAQhBAAgcgeg");
		var mask_graphics_42 = new cjs.Graphics().p("A3CZAMAAAgx/MAuFAAAMAAAAx/g");
		var mask_graphics_64 = new cjs.Graphics().p("A3CZAMAAAgx/MAuFAAAMAAAAx/g");

		this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(24).to({graphics:mask_graphics_24,x:255.6,y:158.8}).wait(3).to({graphics:mask_graphics_27,x:249.1,y:201}).wait(3).to({graphics:mask_graphics_30,x:271.8,y:204.3}).wait(3).to({graphics:mask_graphics_33,x:268.2,y:232.8}).wait(3).to({graphics:mask_graphics_36,x:275,y:244}).wait(3).to({graphics:mask_graphics_39,x:283.3,y:257.3}).wait(3).to({graphics:mask_graphics_42,x:280.6,y:268.1}).wait(22).to({graphics:mask_graphics_64,x:280.6,y:268.1}).wait(1));

		// plain
		this.instance_2 = new lib.plants_1("synched",0);
		this.instance_2.setTransform(282,283,1,1,0,0,0,123,130.5);
		this.instance_2._off = true;

		this.instance_2.mask = mask;

		this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({startPosition:0,_off:false},0).wait(33).to({startPosition:0},0).wait(7).to({startPosition:0},0).wait(1));

		// rip_up copy
		this.instance_3 = new lib.rip_up_1("synched",0);
		this.instance_3.setTransform(278.3,235,1.109,1.109,0,0,0,96.5,100.5);
		this.instance_3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,y:259},4).wait(29).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(1));

		// rip_down
		this.instance_4 = new lib.bottom_plate("synched",0);
		this.instance_4.setTransform(275.4,406.3,0.465,0.465);
		this.instance_4._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({startPosition:0,_off:false},0).to({scaleX:1.11,scaleY:1.11,y:393},4).to({scaleX:1,scaleY:1,y:375.3},3).wait(40).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(1));

		// rip_up
		this.instance_5 = new lib.rip_up_1("synched",0);
		this.instance_5.setTransform(278.3,358,0.44,0.44,0,0,0,96.5,100.5);
		this.instance_5._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(11).to({startPosition:0,_off:false},0).to({scaleX:1.11,scaleY:1.11,y:235},7).to({_off:true},1).wait(46));

		// engine
		this.instance_6 = new lib.engine_1("synched",0);
		this.instance_6.setTransform(262.3,392.5,1,0.473,0,0,0,125,75);
		this.instance_6._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(21).to({startPosition:0,_off:false},0).to({scaleY:1,y:432},23).to({startPosition:0},7).to({scaleY:0.68,y:417},3).to({scaleY:1,y:432},3).to({scaleY:0.66,y:416.5},3).to({scaleY:1,y:432},4).wait(1));

		// plantback_r
		this.instance_7 = new lib.death_plants_1("synched",0);
		this.instance_7.setTransform(193.3,187.9,0.374,0.374);
		this.instance_7._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(26).to({startPosition:0,_off:false},0).to({scaleX:1.15,scaleY:1.15,x:168.3,y:166.9},5).to({scaleX:1,scaleY:1,x:173.3,y:168.4},4).wait(16).to({startPosition:0},0).to({rotation:-2.1},4).to({rotation:0},9).wait(1));

		// plantback_l
		this.instance_8 = new lib.death_plants_7("synched",0);
		this.instance_8.setTransform(340.1,192.6,0.368,0.368);
		this.instance_8._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(32).to({startPosition:0,_off:false},0).to({scaleX:1.13,scaleY:1.13,y:175.6},7).to({scaleX:1,scaleY:1},4).wait(8).to({startPosition:0},0).to({rotation:1},8).to({rotation:0},5).wait(1));

		// Layer 1
		this.instance_9 = new lib.man1();
		this.instance_9.setTransform(199.5,6,1.702,1.702);

		this.instance_10 = new lib.man2();
		this.instance_10.setTransform(199.5,0.5,1.702,1.702);

		this.instance_11 = new lib.man3();
		this.instance_11.setTransform(199.2,0.5,1.702,1.702);

		this.instance_12 = new lib.man5();
		this.instance_12.setTransform(199.2,0.9,1.702,1.702);

		this.instance_13 = new lib.Symbol1("synched",0);
		this.instance_13.setTransform(280.4,194.2,1.702,1.702,0,0,0,47.5,114.1);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13,p:{regY:114.1,scaleY:1.702,y:194.2}}]},1).to({state:[{t:this.instance_13,p:{regY:114,scaleY:1.366,y:232.3}}]},1).to({state:[{t:this.instance_13,p:{regY:114,scaleY:0.888,y:286.8}}]},1).to({state:[{t:this.instance_13,p:{regY:114,scaleY:0.481,y:333.1}}]},1).to({state:[]},1).wait(57));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(199.5,6,161.7,388);


// symbols:
	(lib.coral = function() {
		this.initialize(img.coral);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,127,80);


	(lib.engine = function() {
		this.initialize(img.engine);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,250,150);


	(lib.man1 = function() {
		this.initialize(img.man1);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man2 = function() {
		this.initialize(img.man2);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man3 = function() {
		this.initialize(img.man3);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man4 = function() {
		this.initialize(img.man4);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man5 = function() {
		this.initialize(img.man5);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man6 = function() {
		this.initialize(img.man6);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.man7 = function() {
		this.initialize(img.man7);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.plants = function() {
		this.initialize(img.plants);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,246,261);


	(lib.plants_back = function() {
		this.initialize(img.plants_back);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,134,131);


	(lib.plants_back_2 = function() {
		this.initialize(img.plants_back_2);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,171,267);


	(lib.rip_down = function() {
		this.initialize(img.rip_down);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,225,71);


	(lib.rip_up = function() {
		this.initialize(img.rip_up);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,193,201);


	(lib.tv_glow = function() {
		this.initialize(img.tv_glow);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,281,287);


	(lib.Symbol1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.man6();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,95,228);


	(lib.rip_up_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.rip_up();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,193,201);


	(lib.plants_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.plants();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,246,261);


	(lib.light_tv = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.tv_glow();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,281,287);


	(lib.engine_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.engine();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,250,150);


	(lib.death_plants_9 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.coral();
		this.instance.setTransform(-63.4,-39.9);

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-63.4,-39.9,127,80);


	(lib.death_plants_7 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.plants_back_2();
		this.instance.setTransform(-85.4,-133.4);

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-85.4,-133.4,171,267);


	(lib.death_plants_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.plants_back();
		this.instance.setTransform(-66.9,-65.4);

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-66.9,-65.4,134,131);


	(lib.bottom_plate = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.rip_down();
		this.instance.setTransform(-112.4,-35.4);

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-112.4,-35.4,225,71);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;