(function () {
	var global = (1,eval)('this');
	var Controllable = function (host, params) {
		this.host 		= host;
		this.owner 		= params.owner;
		if (this.owner) {
			this.changeOwner(this.owner);
		}
	};

	var p = Controllable.prototype = {};

	/**
	 *
	 * @type {{AI: number, PLAYER: number}}
	 */
	Controllable.OWNERS = {
		AI : 1,
		PLAYER :2
	};

	p.input = null;

	/**
	 * ai , player
	 */
	p.changeOwner = function (owner) {
		this.input && this.input.disabled();

		switch(owner) {
			case 'ai' :
				this.input = new global.GameInputVirtual();
				break;
			case 'player':
				this.input = global.GameInput.getInstance();
				break;
			default:
				this.input = null;
		}

		this.input && this.input.enabled();

		this.owner = owner;
	};

	p.isControllable = function () {
		return !!this.input;
	};

	p.tempOwner = function (owner) {
		if (this.owner !== owner) {
			this._temp 			= this.input;
			this._tempOwner 	= this.owner;
			this.changeOwner(owner);
		}
		return this;
	};

	p.resetOwner = function  (){
		if (this._temp) {
			this.input 		= this._temp;
			this.input && this.input.enabled();
			this.owner 		= this._tempOwner;
			this._tempOwner = null;
			this._temp		= null;
		}
		return this;
	};

	p._delayEnabled_= null;

	p.disabled = function (time) {
		if (this._delayEnabled_) {
			clearTimeout(this._delayEnabled_);
			this._delayEnabled_ = null;
		}

		this.isDisabled = true;
		this.input && this.input.disabled();

		if (time) {
			var to = this;
			this._delayEnabled_ = _.delay(function(){
				to.enabled();
				to._delayEnabled_ = null;
			},time)
		}
	};

	p.disabledWithChangeState = function (time) {
		var host = this.host;
		this.disabled(time);
		host.fsm.tryChangeState(true, host.states.kStateNoControl);
	};

	p.isDisabled  = false;

	p.enabled = function () {
		this.isDisabled = false;
		this.input && this.input.enabled();
	};

	p.release = function () {
		if (this._delayEnabled_) {
			clearTimeout(this._delayEnabled_);
			this._delayEnabled_ = null;
		}

		delete this.input;
		delete this._tempOwner;
	};

	global.Controllable = Controllable;
}());