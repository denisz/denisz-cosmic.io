(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.glowDefeat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 10 copy 2
	this.instance = new lib.light_many("synched",0);
	this.instance.setTransform(153,302.6,0.493,0.468,0,0,0,99.5,94.5);
	this.instance.alpha = 0.051;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(32).to({startPosition:0,_off:false},0).to({regX:99.6,regY:94.7,scaleX:0.7,scaleY:0.61,y:282.4,alpha:0.648},8).to({regY:94.5,scaleX:0.75,scaleY:0.79,y:256.6,alpha:0.051},17).to({_off:true},1).wait(22));

	// Layer 10 copy
	this.instance_1 = new lib.light_many("synched",0);
	this.instance_1.setTransform(153,302.6,0.457,0.468,0,0,180,99.5,94.5);
	this.instance_1.alpha = 0.051;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(21).to({startPosition:0,_off:false},0).to({regX:99.6,scaleX:0.6,scaleY:0.61,y:282.3,alpha:0.648},8).to({scaleX:0.78,scaleY:0.79,y:256.6,alpha:0.051},17).to({_off:true},1).wait(33));

	// Layer 10
	this.instance_2 = new lib.light_many("synched",0);
	this.instance_2.setTransform(153,302.6,0.457,0.468,0,0,180,99.5,94.5);
	this.instance_2.alpha = 0.051;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:99.6,scaleX:0.6,scaleY:0.61,y:282.3,alpha:0.648},8).to({scaleX:0.78,scaleY:0.79,y:256.6,alpha:0.051},17).to({_off:true},1).wait(18).to({regX:99.5,scaleX:0.46,scaleY:0.47,y:302.6,_off:false},0).to({regX:99.6,scaleX:0.6,scaleY:0.61,y:282.3,alpha:0.648},15).to({scaleX:0.78,scaleY:0.79,y:256.6,alpha:0.051},20).wait(1));

	// Layer 9
	this.instance_3 = new lib.light_many("synched",0);
	this.instance_3.setTransform(151.1,273.9,0.528,0.528,0,0,0,99.5,94.5);
	this.instance_3.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.69,scaleY:0.69,x:149.5,y:260.6,alpha:0.059},12).to({_off:true},1).wait(9).to({regY:94.4,scaleX:0.49,scaleY:0.49,x:151.1,y:299,alpha:0.129,_off:false},0).to({scaleX:0.54,scaleY:0.54,y:284,alpha:0.699},4).to({scaleX:0.68,scaleY:0.68,y:264.3,alpha:0.031},12).to({_off:true},1).wait(27).to({regX:99.4,regY:94.5,scaleX:0.43,scaleY:0.43,x:151,y:300.4,alpha:0.352,_off:false},0).to({regX:99.5,scaleX:0.53,scaleY:0.53,x:151.1,y:273.9,alpha:0.5},13).wait(1));

	// light_circle
	this.instance_4 = new lib.light_circle("synched",0);
	this.instance_4.setTransform(154.3,322.3,1,1,0,0,0,66.3,66.3);
	this.instance_4.alpha = 0.699;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:0.34},8).to({alpha:0.699},9).to({alpha:0.5},11).to({alpha:0.898},15).to({alpha:0.5},12).to({alpha:0.34},12).to({alpha:0.699},12).wait(1));

	// Layer 6
	this.instance_5 = new lib.light_circle_small("synched",0);
	this.instance_5.setTransform(143.8,327.4,1,1,0,0,0,0.1,0.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(5).to({startPosition:0,_off:false},0).to({scaleX:1.24,scaleY:1.24,guide:{path:[143.8,327.4,144.5,325.4,144.5,324.4,144.5,321.4,142.8,319.1,141.7,317.8,139,315.6,133.5,311.3,133.5,306.6,133.5,302.8,136.6,300.1,138.2,298.7,143.5,295.8,148.3,293.2,150.4,291,153.1,288.1,153.4,284]},alpha:0.641},7).to({scaleX:0.87,scaleY:0.87,guide:{path:[153.4,284,153.5,283.5,153.5,283,153.5,278.2,150.7,273.2,148,268.1,148,259.8,148,253.9,153.6,237.8,153.9,237,154.2,236.2,160.5,218.7,160.5,213.4,160.5,206.3,158,198,157.7,197.3,155,189.8]},alpha:0.031},12).to({_off:true},1).wait(9).to({scaleX:1,scaleY:1,x:143.8,y:327.4,alpha:1,_off:false},0).to({regX:0.2,regY:0.2,scaleX:0.55,scaleY:0.55,guide:{path:[143.8,327.4,144.5,325.4,144.5,324.4,144.5,321.4,142.8,319.1,141.7,317.8,139,315.6,133.5,311.3,133.5,306.6,133.5,302.8,136.6,300.1,138.2,298.7,143.5,295.8,148.3,293.2,150.4,291,153.5,287.7,153.5,283,153.5,278.1,150.7,273.1,148,268.1,148,259.8,148,253.9,153.6,237.8,153.9,237,154.2,236.1,160.5,218.7,160.5,213.4,160.5,206.3,158,198,157.7,197.3,155,189.8]},alpha:0.031},23).to({_off:true},1).wait(22));

	// Layer 4
	this.instance_6 = new lib.light_circle_small("synched",0);
	this.instance_6.setTransform(177.8,327.5,0.565,0.565,0,0,0,0.2,0.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(16).to({startPosition:0,_off:false},0).to({regX:0.3,scaleX:0.66,scaleY:0.66,guide:{path:[177.7,327.4,176.5,323,175.4,319.5,173.7,314.3,171.9,303.8,169.4,290,169.4,279.5,169.9,263.2,170.4,246.8,170.4,229.5,169.2,223.7,167.9,218,163.4,208.8,161.9,205.6,159.9,202.1,155.8,194.5,152.4,189.6,151.9,188.9,151.4,188.2,149.1,185,148,184]},alpha:0.031},20).to({_off:true},1).wait(13).to({regX:0.2,scaleX:0.56,scaleY:0.56,x:177.8,y:327.5,alpha:1,_off:false},0).to({scaleX:0.53,scaleY:0.53,guide:{path:[177.7,327.4,176.5,323,175.4,319.5,173.7,314.3,171.9,303.8,169.4,290,169.4,279.5,169.9,263.2,170.4,246.8,170.4,229.5,169.2,223.7,167.9,218,163.4,208.8,161.9,205.6,159.9,202.1,155.8,194.5,152.4,189.6,152,189,151.5,188.3]},alpha:0.031},26).to({_off:true},1).wait(3));

	// Layer 1
	this.instance_7 = new lib.light_circle_small("synched",0);
	this.instance_7.setTransform(153.9,331.5,0.39,0.39,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({scaleX:0.62,scaleY:0.62,guide:{path:[153.8,331.5,154.5,326.9,154.5,321.6,154.5,309.4,149.8,298.9,147.3,293.4,139.5,281.5,132.2,270.5,129.1,262.5,124.5,250.2,124.5,234.9,124.5,221,129.4,212.1,131,209.2,135.7,204.1]},alpha:0.031},28).to({_off:true},1).wait(15).to({scaleX:0.39,scaleY:0.39,x:153.9,y:331.5,alpha:1,_off:false},0).to({regX:0.3,scaleX:0.65,scaleY:0.65,guide:{path:[153.8,331.5,154.5,326.9,154.5,321.6,154.5,309.4,149.8,298.9,147.3,293.4,139.5,281.5,132.2,270.5,129.1,262.5,124.5,250.2,124.5,234.9,124.5,221,129.4,212.1,130.3,210.6,132,208.4]},alpha:0.031},22).to({_off:true},1).wait(13));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(88,224.1,132.5,164.4);


// symbols:
(lib.light_many = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,6.6).s().p("AgpApQgRgRAAgYQAAgXARgSQASgQAXAAQAYAAARAQQARASAAAXQAAAYgRARQgRASgYAAQgXAAgSgSg");
	this.shape.setTransform(148.4,180.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,7.1).s().p("AgrAsQgTgSABgaQgBgYATgTQASgSAZAAQAaAAASASQATATgBAYQABAagTASQgSASgaABQgZgBgSgSg");
	this.shape_1.setTransform(105.3,161.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,10).s().p("AhEBFQgdgdAAgoQAAgoAdgdQAdgcAnAAQApAAAcAcQAdAdAAAoQAAAogdAdQgcAdgpAAQgnAAgdgdg");
	this.shape_2.setTransform(96.5,120.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,12.8).s().p("AhVBWQgkgkAAgyQAAgxAkgkQAkgkAxAAQAyAAAkAkQAkAkAAAxQAAAygkAkQgkAkgyAAQgxAAgkgkg");
	this.shape_3.setTransform(149.3,147.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,4).s().p("AgaAbQgLgLAAgQQAAgOALgMQALgMAPAAQAPAAAMAMQAMAMgBAOQABAQgMALQgMAMgPAAQgPAAgLgMg");
	this.shape_4.setTransform(127.9,124.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.4).s().p("AgiAiQgPgOAAgUQAAgTAPgPQAPgOATAAQAUAAAPAOQAPAPgBATQABAUgPAOQgPAPgUABQgTgBgPgPg");
	this.shape_5.setTransform(60,179.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.7).s().p("AgZAZQgKgKAAgPQAAgOAKgKQALgLAOAAQAOAAALALQALAKAAAOQAAAPgLAKQgLALgOAAQgOAAgLgLg");
	this.shape_6.setTransform(18.7,185.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,7.9).s().p("AgyAyQgVgUAAgeQAAgcAVgWQAWgVAcAAQAeAAAUAVQAWAWAAAcQAAAegWAUQgUAWgeAAQgcAAgWgWg");
	this.shape_7.setTransform(35.1,151.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.8).s().p("AgZAaQgLgLAAgPQAAgOALgLQALgLAOAAQAPAAALALQALALAAAOQAAAPgLALQgLALgPAAQgOAAgLgLg");
	this.shape_8.setTransform(3.8,123.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.5).s().p("AgWAYQgLgKAAgOQAAgMALgLQAJgKANAAQANAAALAKQAKALgBAMQABAOgKAKQgLAJgNABQgNgBgJgJg");
	this.shape_9.setTransform(29.9,124.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,8.9).s().p("Ag9A9QgZgZAAgkQAAgjAZgZQAbgaAiAAQAkAAAZAaQAaAZAAAjQAAAkgaAZQgZAagkAAQgiAAgbgag");
	this.shape_10.setTransform(67.3,150.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,9).s().p("Ag5A5QgXgYAAghQAAghAXgYQAYgXAhAAQAiAAAXAXQAYAYAAAhQAAAhgYAYQgXAYgiAAQghAAgYgYg");
	this.shape_11.setTransform(66.7,119.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,9.6).s().p("AhCBCQgbgbAAgnQAAgmAbgcQAcgcAmAAQAnAAAcAcQAcAcAAAmQAAAngcAbQgcAdgnAAQgmAAgcgdg");
	this.shape_12.setTransform(60.5,99);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.3).s().p("AghAiQgOgOgBgUQABgTAOgOQAOgOATgBQAUABAOAOQAOAOAAATQAAAUgOAOQgOAOgUAAQgTAAgOgOg");
	this.shape_13.setTransform(74.4,68.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,6.1).s().p("AglAnQgRgRABgWQgBgVARgQQAPgQAWgBQAXABAPAQQAQAQABAVQgBAWgQARQgPAPgXAAQgWAAgPgPg");
	this.shape_14.setTransform(57.5,56);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.6).s().p("AgjAkQgPgPAAgVQAAgUAPgPQAPgPAUAAQAVAAAPAPQAPAPAAAUQAAAVgPAPQgPAPgVAAQgUAAgPgPg");
	this.shape_15.setTransform(28.2,88.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.1).s().p("AggAhQgOgOAAgTQAAgSAOgOQAOgOASAAQATAAAOAOQAOAOAAASQAAATgOAOQgOAOgTAAQgSAAgOgOg");
	this.shape_16.setTransform(25.3,61.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.6).s().p("AgSATQgIgIAAgLQAAgKAIgIQAIgIAKAAQALAAAIAIQAIAIAAAKQAAALgIAIQgIAIgLAAQgKAAgIgIg");
	this.shape_17.setTransform(35.8,18.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.4).s().p("AgiAiQgPgOAAgUQAAgTAPgPQAPgOATAAQAUAAAOAOQAQAPgBATQABAUgQAOQgOAPgUABQgTgBgPgPg");
	this.shape_18.setTransform(68,30);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,15.7).s().p("AhsBtQgugtAAhAQAAg/AugtQAuguA+AAQBAAAAtAuQAtAtABA/QgBBAgtAtQgtAthAAAQg+AAgugtg");
	this.shape_19.setTransform(139,92);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,8.2).s().p("Ag0A1QgWgWAAgfQAAgeAWgWQAWgWAeAAQAfAAAWAWQAWAWAAAeQAAAfgWAWQgWAWgfAAQgeAAgWgWg");
	this.shape_20.setTransform(93.4,90.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,6.2).s().p("AgmAnQgRgQAAgXQAAgWARgQQARgQAVAAQAXAAAQAQQAQAQABAWQgBAXgQAQQgQAQgXAAQgVAAgRgQg");
	this.shape_21.setTransform(105.6,68.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.1).s().p("AgUAVQgJgJAAgMQAAgLAJgJQAJgIALgBQAMABAJAIQAJAJAAALQAAAMgJAJQgJAIgMABQgLgBgJgIg");
	this.shape_22.setTransform(86,3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,6.3).s().p("AgnAoQgQgRAAgXQAAgWAQgQQARgRAWAAQAXAAAQARQARAQAAAWQAAAXgRARQgQAQgXAAQgWAAgRgQg");
	this.shape_23.setTransform(130.7,51.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.3).s().p("AgVAWQgJgKAAgMQAAgLAJgKQAJgJAMAAQANAAAIAJQAKAKAAALQAAAMgKAKQgIAJgNAAQgMAAgJgJg");
	this.shape_24.setTransform(125.2,24.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.9).s().p("AglAlQgPgPAAgWQAAgVAPgQQAQgQAVAAQAWAAAQAQQAQAQAAAVQAAAWgQAPQgQARgWgBQgVABgQgRg");
	this.shape_25.setTransform(177.9,163.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.8).s().p("AgZAaQgLgLAAgPQAAgOALgLQALgLAOAAQAPAAALALQALALAAAOQAAAPgLALQgLALgPAAQgOAAgLgLg");
	this.shape_26.setTransform(195.3,141.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,5.1).s().p("AggAhQgOgOAAgTQAAgSAOgOQAOgOASAAQATAAAOAOQAOAOAAASQAAATgOAOQgOAOgTAAQgSAAgOgOg");
	this.shape_27.setTransform(166.3,119.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,3.1).s().p("AgUAVQgJgJAAgMQAAgLAJgJQAJgIALgBQAMABAJAIQAJAJAAALQAAAMgJAJQgJAIgMABQgLgBgJgIg");
	this.shape_28.setTransform(189.5,106.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,4).s().p("AgaAbQgLgLAAgQQAAgOALgMQAMgMAOAAQAPAAAMAMQAMAMAAAOQAAAQgMALQgMAMgPAAQgOAAgMgMg");
	this.shape_29.setTransform(178.4,83.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,4.8).s().p("AgeAfQgNgNgBgSQABgRANgOQANgNARAAQASAAANANQANAOAAARQAAASgNANQgNAOgSAAQgRAAgNgOg");
	this.shape_30.setTransform(167.5,54);

	this.addChild(this.shape_30,this.shape_29,this.shape_28,this.shape_27,this.shape_26,this.shape_25,this.shape_24,this.shape_23,this.shape_22,this.shape_21,this.shape_20,this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,199,189);


(lib.light_circle_small = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FF5C48","rgba(205,0,78,0)"],[0.294,1],0,0,0,0,0,17.4).s().p("Ah4B5QgygyAAhHQAAhGAygyQAygyBGAAQBHAAAyAyQAyAyABBGQgBBHgyAyQgyAyhHABQhGgBgygyg");
	this.shape.setTransform(0.2,0.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17,-17,34.4,34.4);


(lib.light_circle = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FF5425","rgba(236,4,92,0)"],[0,1],0,0,0,0,0,67.1).s().p("AnTHUQjCjCAAkSQAAkRDCjCQDCjCERAAQESAADCDCQDCDCAAERQAAESjCDCQjCDCkSAAQkRAAjCjCg");
	this.shape.setTransform(66.3,66.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,132.5,132.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;