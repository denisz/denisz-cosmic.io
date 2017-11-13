(function(){
	var global = (1,eval)('this');
	global.scriptsEffect.Shake = {
		initialize : function (manager, data) {
			var stage = manager.stage;
			stage.camera.shakeCamera(data.strength || 30,data.duration || 2000);
		}
	}
}());