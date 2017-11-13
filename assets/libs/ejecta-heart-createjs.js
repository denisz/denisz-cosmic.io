/**
 * @method _getElementRect
 * @protected
 * @param {HTMLElement} e
 **/

createjs.Stage.prototype._getElementRect = function(e) {

		/*
		// Original implementation required the offest of HTML elements.
		// It was also using a.getBoundingClientRect() which isn't implemented in Ejecta
		// For Ejecta, we just need to return the entire canvas size object.
		// I'll explain in more detail soon...
		*/

        return {
        left: 0,
        right: this.canvas.width,
        top: 0,
        bottom: this.canvas.height
        }

};

/**
 * @method _IOS_handleEvent
 * @protected
 * @static
 **/
createjs.Touch._IOS_handleEvent = function(stage, e) {
    if (!stage) { return; }
    if (stage.__touch.preventDefault) { e.preventDefault&&e.preventDefault(); }
    var touches = e.changedTouches;
    var type = e.type;
    for (var i= 0,l=touches.length; i<l; i++) {
        var touch = touches[i];
        var id = touch.identifier;

        // Removed this, as in ejecta we're always in the canvas + these Ejecta objects are not defined to return matchin values
        //if (touch.target != stage.canvas) { continue; }

        if (type == "touchstart") {
            this._handleStart(stage, id, e, touch.pageX, touch.pageY);
        } else if (type == "touchmove") {
            this._handleMove(stage, id, e, touch.pageX, touch.pageY);
        } else if (type == "touchend" || type == "touchcancel") {
            this._handleEnd(stage, id, e);
        }
    }
};

/**
 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
 * This does not account for whether it would be visible within the boundaries of the stage.
 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
 * @method isVisible
 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
 **/
createjs.Bitmap.prototype.isVisible = function() {

    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image;
    // These image vars are not implemented in ejecta yet, so i removed from above expression
	// && (this.image.complete || this.image.getContext || this.image.readyState >= 2);

	// UDATE: this.image.complete just added per my request .. try to bring it back into the mix and test if it works.
};


///////////////////////////////////
// PATCH EJECTA
///////////////////////////////////

// Missing implementation of Window object, which is required for EaselJS
// Todo: Figure out proper implementation and send issue to Ejecta github
window.ontouchstart = true;

