(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.loading = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{close:0,open:21});

		// timeline functions:
		this.frame_20 = function() {
			this.stop();
			this.onAnimationEnd && this.onAnimationEnd();
		}
		this.frame_36 = function() {
			this.stop();
			this.onAnimationEnd && this.onAnimationEnd();
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).wait(20).call(this.frame_20).wait(16).call(this.frame_36));

		// Layer 8 (mask)
		var mask = new cjs.Shape();
		mask._off = true;
		var mask_graphics_0 = new cjs.Graphics().p("EhkAAAPIAAgdMDIBAAAIAAAdg");
		var mask_graphics_1 = new cjs.Graphics().p("EhkAADjIAAnFMDIBAAAIAAHFg");
		var mask_graphics_2 = new cjs.Graphics().p("EhkAAG3IAAttMDIBAAAIAANtg");
		var mask_graphics_3 = new cjs.Graphics().p("EhkAAKLIAA0VMDIBAAAIAAUVg");
		var mask_graphics_4 = new cjs.Graphics().p("EhkAANfIAA69MDIBAAAIAAa9g");
		var mask_graphics_5 = new cjs.Graphics().p("EhkAAQzMAAAghlMDIBAAAMAAAAhlg");
		var mask_graphics_6 = new cjs.Graphics().p("EhkAAUGMAAAgoLMDIBAAAMAAAAoLg");
		var mask_graphics_7 = new cjs.Graphics().p("EhkAAXaMAAAguzMDIBAAAMAAAAuzg");
		var mask_graphics_8 = new cjs.Graphics().p("EhkAAauMAAAg1bMDIBAAAMAAAA1bg");
		var mask_graphics_9 = new cjs.Graphics().p("EhkAAeCMAAAg8DMDIBAAAMAAAA8Dg");
		var mask_graphics_10 = new cjs.Graphics().p("EhkAAhWMAAAhCrMDIBAAAMAAABCrg");
		var mask_graphics_11 = new cjs.Graphics().p("EhkAAkqMAAAhJTMDIBAAAMAAABJTg");
		var mask_graphics_12 = new cjs.Graphics().p("EhkAAn+MAAAhP7MDIBAAAMAAABP7g");
		var mask_graphics_13 = new cjs.Graphics().p("EhkAArSMAAAhWjMDIBAAAMAAABWjg");
		var mask_graphics_14 = new cjs.Graphics().p("EhkAAulMAAAhdJMDIBAAAMAAABdJg");
		var mask_graphics_15 = new cjs.Graphics().p("EhkAAx5MAAAhjxMDIBAAAMAAABjxg");
		var mask_graphics_16 = new cjs.Graphics().p("EhkAA1NMAAAhqZMDIBAAAMAAABqZg");
		var mask_graphics_17 = new cjs.Graphics().p("EhkAA4hMAAAhxBMDIBAAAMAAABxBg");
		var mask_graphics_18 = new cjs.Graphics().p("EhkAA71MAAAh3pMDIBAAAMAAAB3pg");
		var mask_graphics_19 = new cjs.Graphics().p("EhkAA/JMAAAh+RMDIBAAAMAAAB+Rg");
		var mask_graphics_20 = new cjs.Graphics().p("EhkABCdMAAAiE5MDIBAAAMAAACE5g");
		var mask_graphics_21 = new cjs.Graphics().p("EhkABCdMAAAiE5MDIBAAAMAAACE5g");
		var mask_graphics_22 = new cjs.Graphics().p("EhkABCdMAAAiE5MDIBAAAMAAACE5g");
		var mask_graphics_23 = new cjs.Graphics().p("EhkABCdMAAAiE5MDIBAAAMAAACE5g");
		var mask_graphics_24 = new cjs.Graphics().p("EhkABCdMAAAiE5MDIBAAAMAAACE5g");
		var mask_graphics_25 = new cjs.Graphics().p("EhkABCYMAAAh6KMDIBAAAMAAAB6Kg");
		var mask_graphics_26 = new cjs.Graphics().p("EhkABCYMAAAhvcMDIBAAAMAAABvcg");
		var mask_graphics_27 = new cjs.Graphics().p("EhkABCYMAAAhkuMDIBAAAMAAABkug");
		var mask_graphics_28 = new cjs.Graphics().p("EhkABCYMAAAhZ/MDIBAAAMAAABZ/g");
		var mask_graphics_29 = new cjs.Graphics().p("EhkABCYMAAAhPRMDIBAAAMAAABPRg");
		var mask_graphics_30 = new cjs.Graphics().p("EhkABCYMAAAhEjMDIBAAAMAAABEjg");
		var mask_graphics_31 = new cjs.Graphics().p("EhkABCYMAAAg52MDIBAAAMAAAA52g");
		var mask_graphics_32 = new cjs.Graphics().p("EhkABCYMAAAgvIMDIBAAAMAAAAvIg");
		var mask_graphics_33 = new cjs.Graphics().p("EhkABCYMAAAgkaMDIBAAAMAAAAkag");
		var mask_graphics_34 = new cjs.Graphics().p("EhkABCYIAA5sMDIBAAAIAAZsg");
		var mask_graphics_35 = new cjs.Graphics().p("EhkABCYIAAu9MDIBAAAIAAO9g");
		var mask_graphics_36 = new cjs.Graphics().p("EhkABCYIAAkPMDIBAAAIAAEPg");

		this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:639.3,y:0.6}).wait(1).to({graphics:mask_graphics_1,x:639.3,y:21.8}).wait(1).to({graphics:mask_graphics_2,x:639.3,y:43}).wait(1).to({graphics:mask_graphics_3,x:639.3,y:64.2}).wait(1).to({graphics:mask_graphics_4,x:639.3,y:85.3}).wait(1).to({graphics:mask_graphics_5,x:639.3,y:106.5}).wait(1).to({graphics:mask_graphics_6,x:639.3,y:127.7}).wait(1).to({graphics:mask_graphics_7,x:639.3,y:148.9}).wait(1).to({graphics:mask_graphics_8,x:639.3,y:170.1}).wait(1).to({graphics:mask_graphics_9,x:639.3,y:191.2}).wait(1).to({graphics:mask_graphics_10,x:639.3,y:212.4}).wait(1).to({graphics:mask_graphics_11,x:639.3,y:233.6}).wait(1).to({graphics:mask_graphics_12,x:639.3,y:254.8}).wait(1).to({graphics:mask_graphics_13,x:639.3,y:275.9}).wait(1).to({graphics:mask_graphics_14,x:639.3,y:297.1}).wait(1).to({graphics:mask_graphics_15,x:639.3,y:318.3}).wait(1).to({graphics:mask_graphics_16,x:639.3,y:339.5}).wait(1).to({graphics:mask_graphics_17,x:639.3,y:360.7}).wait(1).to({graphics:mask_graphics_18,x:639.3,y:381.8}).wait(1).to({graphics:mask_graphics_19,x:639.3,y:403}).wait(1).to({graphics:mask_graphics_20,x:639.3,y:424.4}).wait(1).to({graphics:mask_graphics_21,x:639.3,y:424.4}).wait(1).to({graphics:mask_graphics_22,x:639.3,y:424.4}).wait(1).to({graphics:mask_graphics_23,x:639.3,y:424.4}).wait(1).to({graphics:mask_graphics_24,x:639.3,y:424.4}).wait(1).to({graphics:mask_graphics_25,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_26,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_27,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_28,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_29,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_30,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_31,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_32,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_33,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_34,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_35,x:639.3,y:424.8}).wait(1).to({graphics:mask_graphics_36,x:639.3,y:424.9}).wait(1));

		// Layer 5
		this.instance = new lib.logo2_1();
		this.instance.setTransform(651.5,512.1,1,1,0,0,0,281,280.5);
		this.instance.alpha = 0.5;

		this.instance.mask = mask;

		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(37));

		// Layer 1 copy 12
		this.instance_1 = new lib.Tween1("synched",0);
		this.instance_1.setTransform(640.1,818.2,1,0.074);
		this.instance_1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:842.8},5).to({scaleY:1,y:849.7},4).wait(12).to({startPosition:0},0).to({scaleY:0.14,y:879.2},4).wait(1));

		// Layer 1 copy 11
		this.instance_2 = new lib.Tween1("synched",0);
		this.instance_2.setTransform(640.1,750.2,1,0.074);
		this.instance_2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:774.7},5).to({scaleY:1,y:781.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.09,y:812.7},4).to({_off:true},1).wait(1));

		// Layer 1 copy 10
		this.instance_3 = new lib.Tween1("synched",0);
		this.instance_3.setTransform(640.1,682.2,1,0.074);
		this.instance_3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(10).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:706.7},5).to({scaleY:1,y:713.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.15,y:742.7},4).to({_off:true},1).wait(2));

		// Layer 1 copy 9
		this.instance_4 = new lib.Tween1("synched",0);
		this.instance_4.setTransform(640.1,614.2,1,0.074);
		this.instance_4._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:638.7},5).to({scaleY:1,y:645.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.16,y:674.2},4).to({_off:true},1).wait(3));

		// Layer 1 copy 8
		this.instance_5 = new lib.Tween1("synched",0);
		this.instance_5.setTransform(640.1,546.2,1,0.074);
		this.instance_5._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(8).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:570.7},5).to({scaleY:1,y:577.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.13,y:607.2},4).to({_off:true},1).wait(4));

		// Layer 1 copy 7
		this.instance_6 = new lib.Tween1("synched",0);
		this.instance_6.setTransform(640.1,478.2,1,0.074);
		this.instance_6._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:502.7},5).to({scaleY:1,y:509.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.1,y:540.2},4).to({_off:true},1).wait(5));

		// Layer 1 copy 6
		this.instance_7 = new lib.Tween1("synched",0);
		this.instance_7.setTransform(640.1,409.9,1,0.074);
		this.instance_7._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(6).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:434.5},5).to({scaleY:1,y:441.4},4).wait(11).to({startPosition:0},0).to({scaleY:0.15,y:470.5},4).to({_off:true},1).wait(6));

		// Layer 1 copy 5
		this.instance_8 = new lib.Tween1("synched",0);
		this.instance_8.setTransform(640.1,341.9,1,0.074);
		this.instance_8._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(5).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:366.5},5).to({scaleY:1,y:373.4},4).wait(11).to({startPosition:0},0).to({scaleY:0.16,y:402},4).to({_off:true},1).wait(7));

		// Layer 1 copy 4
		this.instance_9 = new lib.Tween1("synched",0);
		this.instance_9.setTransform(640.1,273.9,1,0.074);
		this.instance_9._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(4).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:298.5},5).to({scaleY:1,y:305.4},4).wait(11).to({startPosition:0},0).to({scaleY:0.12,y:335.4},4).to({_off:true},1).wait(8));

		// Layer 1 copy 3
		this.instance_10 = new lib.Tween1("synched",0);
		this.instance_10.setTransform(640.1,206.2,1,0.074);
		this.instance_10._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:230.7},5).to({scaleY:1,y:237.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.12,y:267.7},4).to({_off:true},1).wait(9));

		// Layer 1 copy 2
		this.instance_11 = new lib.Tween1("synched",0);
		this.instance_11.setTransform(640.1,138.2,1,0.074);
		this.instance_11._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(2).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:162.7},5).to({scaleY:1,y:169.7},4).wait(11).to({startPosition:0},0).to({scaleY:0.1,y:200.2},4).to({_off:true},1).wait(10));

		// Layer 1 copy
		this.instance_12 = new lib.Tween1("synched",0);
		this.instance_12.setTransform(640.1,70.2,1,0.074);
		this.instance_12._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({startPosition:0,_off:false},0).to({scaleY:0.79,y:94.7},5).to({scaleY:1,y:101.7},4).wait(12).to({startPosition:0},0).to({scaleY:0.09,y:132.7},3).to({_off:true},1).wait(11));

		// Layer 1
		this.instance_13 = new lib.Tween1("synched",0);
		this.instance_13.setTransform(640.1,2.6,1,0.074);

		this.timeline.addTween(cjs.Tween.get(this.instance_13).to({scaleY:0.79,y:27.2},5).to({scaleY:1,y:34.1},4).wait(13).to({startPosition:0},0).to({scaleY:0.1,y:64.7},2).to({_off:true},1).wait(12));

		// dark_down
		this.instance_14 = new lib.dark();
		this.instance_14.setTransform(640.2,1.3,1,0.002,0,0,0,640.1,502.4);
		this.instance_14.alpha = 0.301;

		this.timeline.addTween(cjs.Tween.get(this.instance_14).to({regY:502.1,scaleY:0.89,y:449.2,alpha:1},20).wait(2).to({regY:505.6,scaleY:0.01,y:878.6,alpha:0.199},14).wait(1));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(0.1,0.1,1280.3,792.5);


// symbols:
	(lib.logo2 = function() {
		this.initialize(img.logo2);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,562,561);


	(lib.zastavka = function() {
		this.initialize(img.zastavka);
	}).prototype = p = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,1280,68);


	(lib.Tween1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.zastavka();
		this.instance.setTransform(-639.9,-33.9);

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-639.9,-33.9,1280,68);


	(lib.logo2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.logo2();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,562,561);


	(lib.dark = function() {
		this.initialize();

		// Layer 1
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#0E0C0A").s().p("EhkABOcMAAAic3MDIBAAAMAAACc3g");
		this.shape.setTransform(640.1,502.1);

		this.addChild(this.shape);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,1280.3,1004.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;