(function(){
	window.Modernizr = {
		isNativeApp : true,
		mobile 		: true,
		addTest 	: function (obj) {
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					window.Modernizr[i] = obj[i]();
				}
			}
		}
	};

	window.Modernizr.addTest({
		mobile          : function(){return /iPhone|iPad|iPod|Android/.test(navigator.userAgent)},
		ios             : function(){return /iPhone|iPad|iPod/.test(navigator.userAgent)},
		ipadretina      : function(){return /iPad/.test(navigator.userAgent) && window.devicePixelRatio === 2},
		ipad            : function(){return /iPad/.test(navigator.userAgent)},
		android         : function(){return /Android/.test(navigator.userAgent)},
		iphone5         : function(){return window.screen.height == (1136 / 2)},
		highresdisplay  : function(){ return window.devicePixelRatio !== 1 },
		standalone      : function(){return !!navigator.standalone}
	});
}());