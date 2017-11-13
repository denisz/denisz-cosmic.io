(function(){
	var global = (1,eval)('this');

	//predefine
	if (global.scripts.Stage_0) { return; }

	/**
	 * @param host
	 * @constructor
	 */
	var PlayerStart = function (host) {
		var player = host.camera.getFocusObject();
		if (player) {
			player.controllable.tempOwner('ai');

			host.camera.zoomOnFocus(1.2, 2000, createjs.Ease.linear, function(){

				player.controllable.input.pressTimeout(global.Buttons.right, 1500, function(){
					player.controllable.resetOwner();
				});

				host.camera.zoomOnFocus(1, 2000, createjs.Ease.linear);

			});
		}
	};


	global.scripts.Stage_0 =  {
		initialize : function (host, manager) {
		},
		onLoad : function (host) {
            var size = host.getSizeGame(),
                width= size.width;

			host.hudService.addHUD('PauseButton',{
				transform : {
					x : width - 52,
                    y : 10
				},
				onClick : function () {
					host.pause();
				}
			},global.HUDService.LAYERS.HUD_STAGE);

			host.camera.setScale(1.3);
			PlayerStart(host);
		},
		load : function (host, manager, manifest) {

		}

	}
}());