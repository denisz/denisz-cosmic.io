(function () {
	var global = (1, eval)('this');
	var PADDING_WIDTH = 30,
		PADDING_HEIGHT = 27;

	var LoadingProgressBarHTML = function (app) {
		this.app = app;
		this.createSkeleton();
	};

	var p = LoadingProgressBarHTML.prototype = {};

	p.createSkeleton = function () {
		this.$thumb = jQuery(document.createElement('div'))
			.addClass('e-thumb_loading')
			.css({
				width  : this.app.width - PADDING_WIDTH,
				height : 0,
				y      : 450
			});

		this.$track = jQuery(document.createElement('div')).addClass('e-track_loading');
		this.$logo  = jQuery(document.createElement('div')).addClass('e-logo_loading');
	};

	p.appendTo = function ($parent) {
		this.$thumb.appendTo($parent);
		this.$track.appendTo($parent);
		this.$logo.appendTo($parent);
	};

	p._progress = 0;

	p.setProgress = function (progress) {
		if (this.destroyed) return;

		var that = this;
		if (that._prePogress >= progress) return;

		that._prePogress = progress;

		this.$track.transition({
			width : progress * (this.app.width - 2)
		}, 250, function () {
			if (progress === 1) {
				that.finish();
			} else {
				that._progress = progress;
			}
		})
	};

	p.getProgress = function () {
		return this._progress;
	};

	p.isFinished = false;

	p.finish = function () {
		if (this.destroyed) return;

		this.$logo
			.css({
			x : '-50%'
			})
			.transition({
				y       : -450,
				opacity : window.innerHeight <= 960 ? 0 : 1
			}, 500, function () {
				if (window.innerHeight <= 960 ) {
					this.$logo.remove();
				} else {
					this.$logo.addClass('top');
				}

			}.bind(this));

		this.$track.remove();
		delete this.$track;

		this.$thumb
			.transition({
				x       : 0,
				y       : 0,
				width   : this.app.width - PADDING_WIDTH,
				height  : this.app.height - PADDING_HEIGHT,
				opacity : .7
			}, 500, function () {
				typeof this.onFinish === 'function' && this.onFinish();
				this.isFinished = true;
			}.bind(this));
	};

	p.destroyed = false;

	p.destroy = function () {
		if (this.destroyed) return;

		this.destroyed = true;
		this.$track && this.$track.remove();
		delete this.$thumb;
		delete this.$track;
	};

	global.LoadingProgressBarHTML = LoadingProgressBarHTML;
}());