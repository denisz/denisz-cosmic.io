/**
 * A Finite State Machine.
 *
 * @param {Object} host
 * @param {Array} states a list where even positions are identifiers with a
 *			value that is position / 2 and odd positions are state classes.
 * @param {Function} [onStateChange] a callback function that will be called when
 *			the state changes.
 */
(function(){
	var global = (1,eval)('this');

	var FSM = function (host, states, onStateChange) {
		if (host === undefined) return;
		this.host = host;
		this.onStateChange = onStateChange;

		this.stateArray = [];

		for (var i = 0, l = states.length; i < l; i += 2) {
			//assert(states[i] == i / 2 && typeof (states[i + 1]) == "function", "State " + i / 2
			//		+ " did not initialize correctly.");
			try{
				this.stateArray[states[i]] = new states[i + 1](host, this, states[i]);
			}catch(e){}

		}

		this.currentState = fsmStates.kNoState;
		this.numSuspended = 0;
		this.suspendedArray = [];
		this.numPreloaded = 0;
		this.preloadedArray = [];
		this.numStates = this.stateArray.length;
	};

	var p = FSM.prototype = {};

	var fsmStates = {
		kNoState : -1,
		kNextState : -2
	};

	p.enter = function (startState, message) {
		assert(this.currentState == fsmStates.kNoState, "FSM is already started when enter was called.");
		this.setState(startState, message);
	};

	p.leave = function () {
		this.setState(this.kNoState);
	};

	p.update = function (dt) {
		for (var i = 0; i < this.numSuspended; i++) {
			this.stateArray[this.suspendedArray[i]].suspended(dt);
		}

		if (this.currentState != fsmStates.kNoState) {
			this.stateArray[this.currentState].update(dt);
			if (this.currentState != fsmStates.kNoState) {
				this.stateArray[this.currentState].transition();
			}
		}
	};

	p.message = function (msg) {
		if (this.currentState != fsmStates.kNoState) {
			this.stateArray[this.currentState].message(msg);
		}
	};

	p.messageSuspended = function (msg) {
		for (var i = 0; i < this.numSuspended; i++) {
			this.stateArray[this.suspendedArray[i]].message(msg);
		}
	};

	p.tryChangeState = function (condition, toState, msg, reEnter, suspendedCurrent) {
		if (this.destroyed) return;
		if (reEnter === undefined) reEnter = true;
		if (suspendedCurrent === undefined) suspendedCurrent = false;
		if (toState == fsmStates.kNextState) toState = this.currentState + 1;

		if (condition && (toState != this.currentState || reEnter)) {
			this.setState(toState, msg, suspendedCurrent);
			return true;
		}
		return false;
	};

	p.setState = function (state, msg, suspendCurrent) {
		if (state == fsmStates.kNextState) state = this.currentState + 1;
		assert(state >= fsmStates.kNoState && state < this.numStates, "Trying to set invalid state " + state + ".");
		assert(state == fsmStates.kNoState || this.stateArray[state].stateId == state,
				"Trying to set already active state.");

		if (state == fsmStates.kNoState) {
			for (; this.numSuspended > 0; this.numSuspended--) {
				this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave();
				this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = false;
			}
			for (; this.numPreloaded > 0; this.numPreloaded--) {
				this.stateArray[this.preloadedArray[this.numPreloaded - 1]].cancelPreload();
			}
		} else {
			if (suspendCurrent) {
				this.stateArray[this.currentState].suspend();
				this.stateArray[this.currentState].isSuspended = true;
				this.suspendedArray[this.numSuspended++] = this.currentState;
			} else {
				if (this.currentState != fsmStates.kNoState) {
					this.stateArray[this.currentState].leave();
				}
				if (!this.stateArray[state].isSuspended) {
					for (; this.numSuspended > 0; this.numSuspended--) {
						this.stateArray[this.suspendedArray[this.numSuspended - 1]].leave();
						this.stateArray[this.suspendedArray[this.numSuspended - 1]].isSuspended = false;
					}
				}
			}
		}

		for (var p = 0; p < this.numPreloaded; ++p) {
			if (this.preloadedArray[p] != state) {
				this.stateArray[this.preloadedArray[p]].cancelPreload();
			}
		}
		this.numPreloaded = 0;

		if (this.onStateChange !== undefined) {
			this.onStateChange(this.currentState, state, msg);
		}

		var lastState = this.currentState;
		this.currentState = state;

		if (this.currentState != fsmStates.kNoState) {
			if (this.stateArray[this.currentState].isSuspended) {
				assert(this.currentState == this.suspendedArray[this.numSuspended - 1],
						"Not resuming the most recently suspended state!");
				this.stateArray[this.currentState].resume(msg, lastState);
				this.stateArray[this.currentState].isSuspended = false;
				--this.numSuspended;
			} else {
				this.stateArray[this.currentState].enter(msg, lastState);
			}
		}
	};

	p.getCurrentState = function () {
		if (this.currentState == fsmStates.kNoState) return null;
		return this.stateArray[this.currentState];
	};

	p.preload = function (state) {
		this.preloadedArray[this.numPreloaded++] = state;
	};

	p.isSuspended = function (state) {
		return this.stateArray[state].isSuspended;
	};

	p.hasState = function (state) {
		return this.currentState === state;
	};

	p.destroyed = false;

	p.destroy = function () {
		if (this.destroyed) return;

		this.destroyed = true;
		//make state noState

		for (var i = 0, l = this.stateArray.length ; i < l; i++) {
			this.stateArray[i] && this.stateArray[i].destroy();
		}

		this.suspendedArray.length = 0;
		this.stateArray.length = 0;
		this.preloadedArray.length = 0 ;

		delete this.host;
		delete this.stateArray;
		delete this.suspendedArray;
		delete this.preloadedArray;
	};

	global.FSM = FSM;
})();


