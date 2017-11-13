(function(){
	var global = (1,eval)('this');
	var PreloaderResources = [
		//Pause Dialog
		{id:'logoLoader', 					src:'assets/images/front/logo4.png'},
        {id:'logo', 						src:'assets/images/front/logo3.png'},
		{id:'dialog_pause_button_levels', 	src:'assets/images/GUI/pause/b_levels.png'},
		{id:'dialog_pause_button_menu', 	src:'assets/images/GUI/pause/b_menu.png'},
		{id:'dialog_pause_button_play', 	src:'assets/images/GUI/pause/b_play.png'},
		{id:'dialog_pause_button_restart', 	src:'assets/images/GUI/pause/b_restart.png'},
		{id:'button_pause', 				src:'assets/images/GUI/pause/b_pause.png'},

		{id:'bar_health_mask',				src:'assets/images/GUI/bar/bar_mask5.png'},
		{id:'bar_health_maskStart',			src:'assets/images/GUI/bar/bar_life_mask.png'},
		{id:'bar_health_thumb',				src:'assets/images/GUI/bar/bar_life_frame.png'},
		{id:'bar_health_track',				src:'assets/images/GUI/bar/bar_life_liquid.png'},

		{id:'bar_fuel_mask',				src:'assets/images/GUI/bar/bar_mask5.png'},
		{id:'bar_fuel_maskStart',			src:'assets/images/GUI/bar/bar_fuel_mask.png'},
		{id:'bar_fuel_thumb',				src:'assets/images/GUI/bar/bar_fuel_frame.png'},
		{id:'bar_fuel_track',				src:'assets/images/GUI/bar/bar_fuel_liquid.png'},
		{id:'effect_lowHealth',        		src:'assets/images/GUI/fullscreen_texture/LowHealth.png'},
		{id:'effect_outOfControl',        	src:'assets/images/GUI/fullscreen_texture/OutOfControl.png'},
		{id:'forest_green',  				src:'assets/atlas/tiles/other/images/forest_2.png'},
		{id:'forest_orange',  				src:'assets/atlas/tiles/other/images/forest.png'},
		{id:'timer_number', 				src:'assets/images/GUI/timer/BigTimerNumbers.png'},
		{id:'timer_number_glow',			src:'assets/images/GUI/timer/BigTimerNumbersGlow.png'},

		{id:'dialog_pause_frame', 			src:'assets/images/GUI/pause/frame_pause.png'},
		{id:'dialog_pause_gradient', 		src:'assets/images/GUI/pause/w_pause_grad.png'},

		{id:'dialog_defeat_frame', 			src:'assets/images/GUI/defeat/w_defeat.png'},
		{id:'dialog_defeat_icon', 			src:'assets/images/GUI/defeat/w_defeat_ic.png'},
		{id:'dialog_defeat_gradient', 		src:'assets/images/GUI/defeat/w_defeat_grad.png'},
		{id:'dialog_defeat_text', 			src:'assets/images/GUI/defeat/w_defeat_txt.png'},


		{id:'dialog_complete_frame', 	    src:'assets/images/GUI/complete/w_endlvl.png'},
		{id:'dialog_complete_icon', 	    src:'assets/images/GUI/complete/w_endlvl_ic.png'},
		{id:'dialog_complete_gradient', 	src:'assets/images/GUI/complete/w_endlvl_grad.png'},
		{id:'dialog_complete_text', 		src:'assets/images/GUI/complete/w_endlvl_txt.png'},

		{id:'dialog_buttons', 				src:'assets/images/GUI/dialog_buttons/dialog_buttons.png'},

		{id:'menu_main_buttons',			src:'assets/images/GUI/menu/b_menu.png'},

		{id:'back', 						src:'assets/atlas/animations/menuBack/images/back.jpg'},
		{id:'light', 						src:'assets/atlas/animations/menuBack/images/light.png'},
		{id:'waterglare1', 					src:'assets/atlas/animations/menuBack/images/waterglare1.png'},
		{id:'waterglare2', 					src:'assets/atlas/animations/menuBack/images/waterglare2.png'},
		{id:'plants_1stplan', 				src:'assets/atlas/animations/menuPlants/images/plants_1stplan.png'},
		{id:'plants_leaf', 					src:'assets/atlas/animations/menuPlants/images/plants_leaf.png'},
		{id:'plants_leaf2', 				src:'assets/atlas/animations/menuPlants/images/plants_leaf2.png'},
		{id:'plants_leaf3', 				src:'assets/atlas/animations/menuPlants/images/plants_leaf3.png'},

		{id:'oduvan1',  					src:'assets/atlas/tiles/other/images/oduvan1.png'},
		{id:'oduvan2',  					src:'assets/atlas/tiles/other/images/oduvan2.png'},
//		{id:'sound_menu', 					src:'assets/audio/menu.mp3|assets/audio/menu.ogg'},
		{id:'logo2',						src:'assets/atlas/animations/loading/images/logo2.png'},
		{id:'zastavka',      				src:'assets/atlas/animations/loading/images/zastavka.jpg'},
		{id:'right',      					src:'assets/images/GUI/controls/b_right2.png'},
		{id:'left',      					src:'assets/images/GUI/controls/b_left2.png'},
		{id:'jump',      					src:'assets/images/GUI/controls/b_up2.png'},

		//compass
		{id:'compass_face', 				src:'assets/images/GUI/compass/kompas.png'},
		{id:'compass_arrow', 				src:'assets/images/GUI/compass/kompas_arrow.png'}
	];

	var ManifestSound = [

	];

	global.PreloaderResources 	= PreloaderResources;
	global.ManifestSound		= ManifestSound;
}());