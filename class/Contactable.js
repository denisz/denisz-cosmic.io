(function () {
	var global = (1, eval)('this');

	var Contactable = function (host, params) {
		this.host 			= host;
		this.world 			= host.world;
		this.observers 		= {
			'end' 	: [],
			'begin'	: []
		};
		this.contactable 	= true;
		this.countContacts 	= 0;
		this.auto 			= [];
		this.contacts 		= [];
		this.findAuto();
	};

	var p = Contactable.prototype = {};

	/**
	 * @param fixture
	 */
	p.findAuto = function ()  {
		var fixture = this.host.body.GetFixtureList();

		while(fixture) {
			if (fixture.m_userData && fixture.m_userData.autoDetect) {
				this.setAutoDetect(fixture, fixture.m_userData.autoDetect);
			}
			fixture = fixture.GetNext();
		}
	};

	p.isAutoDetect = false;

	/**
	 * @param fixture
	 */
	p.setAutoDetect = function (fixture, groups) {
		this.isAutoDetect = true;
		var mask = 0;

		for (var i = 0, l = groups.length; i < l; i++) {
			mask |= global.GROUP_CONTACT[groups[i]]
		}

		this.auto.push({
			mask: mask,
			fixture: fixture
		})
	};

	/**
	 * @param fixture
	 * @param groups
	 */
	p.rmAutoDetect = function (fixture, groups) {
		var mask = 0,
			remove = [];
		for (var i = 0, l = groups.length; i < l; i++) {
			mask |=  global.GROUP_CONTACT[i]
		}

		for (var i = 0, l = this.auto.length; i < l; i++) {
			if (this.auto[i].fixture == fixture) {
				this.auto[i].mask ^= mask;
				!this.auto[i].mask && remove.push(this.auto[i]);
			}
		}

		if (remove.length) {
			for (var i = 0, l = remove.length; i < l; i++) {
				var index = this.auto.indexOf(remove[i]);
				if (index !== -1) this.auto.splice(index, 1)
			}
		}
	};

	p.isDetect = function (groups) {
		var mask = 0;
		for (var i = 0, l = groups.length; i < l; i++) {
			mask |=  global.GROUP_CONTACT[groups[i]]
		}
		var result = [];

		for (var i = 0, l = this.contacts.length; i < l; i++) {
			if (mask & this.contacts[i].mask) {
				result.push(this.contacts[i]);
			}
		}

		return result;
	};

	p.getMaskByGroup = function (groups) {
		var mask = 0;
		for (var i = 0, l = groups.length; i < l; i++) {
			mask |=  global.GROUP_CONTACT[groups[i]]
		}
		return mask;
	};

	p.isDetectFixture = function (fixture, groups) {
		var mask = 0;
		for (var i = 0, l = groups.length; i < l; i++) {
			mask |=  global.GROUP_CONTACT[groups[i]]
		}
		var result = [];

		for (var i = 0, l = this.contacts.length; i < l; i++) {
			if (mask & this.contacts[i].mask && this.contacts[i].fixture === fixture) {
				result.push(this.contacts[i]);
			}
		}

		return result;
	};

	p.findContactByMask = function (mask) {
		for (var i = 0, l = this.contacts.length; i < l; i++) {
			if (mask & this.contacts[i].mask) {
				return this.contacts[i];
			}
		}
	};

	p.getFixtureByName = function(name) {
		return this.world.getFixtureByName(this.host.body, name);
	};

	p.isAutoDetectByFixtureName = function (groups, fixtureName) {
		var fixture = this.getFixtureByName(fixtureName);
		return fixture && this.isDetectFixture(fixture, groups)
	};

	p.autoDetect = function (contact, contacting, params) {
		var category = params.filter.categoryBits,
			fixture  = params.fixture;

		for (var i = 0, l = this.auto.length; i < l; i++) {
			if ((this.auto[i].mask & category) && (this.auto[i].fixture == fixture)) {
				if (params.type === 'begin') {
					this.contacts.push({
						fixture		: this.auto[i].fixture,
						mask		: category,
						contacting	: contacting,
						params		: params
					});

				} else {
					for (var j = 0, l2 = this.contacts.length; j < l2; j++) {
						if (this.contacts[j].contacting === contacting && this.contacts[j].fixture === this.auto[i].fixture) {

							var index = this.contacts.indexOf(this.contacts[j]);
							if (index !== -1) this.contacts.splice(index, 1);

							break;
						}
					}
				}
			}
		}

	};

	p._setMaskBits = function (fixture, masks, noReset) {
		var filter = fixture.GetFilterData();
		if (!noReset) filter.maskBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.maskBits |= global.GROUP_CONTACT[masks[i]];
		}
		fixture.SetFilterData(filter);
		return fixture;
	};

	p._setCategory = function (fixture, masks, noReset) {
		var filter = fixture.GetFilterData();
		if (!noReset) filter.categoryBits = 0;
		for (var i = 0, l = masks.length; i < l; i++) {
			filter.categoryBits |= global.GROUP_CONTACT[masks[i]];
		}
		fixture.SetFilterData(filter);
		return fixture;
	};

	p.disableContactByFixture = function (fixture) {
		var filter = fixture.GetFilterData();
		filter.maskBits =  global.GROUP_CONTACT.NONE;
	};

	p.disableContact = function (maskBits) {
		var fixture = this.host.body.GetFixtureList();
		maskBits = maskBits ||  global.GROUP_CONTACT.NONE;

		while(fixture) {
			var filter 				= fixture.GetFilterData();
			fixture.m_tempMaskBits 	= filter.maskBits;
			filter.maskBits 		= maskBits;
			fixture.SetFilterData(filter);
			fixture = fixture.GetNext();
		}
		this.contactable = false;
	};

	p.disableContactButGround = function () {
		this.disableContact(global.GROUP_CONTACT.GROUND);
	};

	p.madeSensor = function () {
		var fixture = this.host.body.GetFixtureList();
		while(fixture) {
			fixture.m_tempSensor 	= fixture.m_isSensor;
			fixture.SetSensor(true);
			fixture = fixture.GetNext();
		}
	};

	p.restoreSensor = function () {
		var fixture = this.host.body.GetFixtureList();
		while(fixture) {
			fixture.SetSensor(fixture.m_tempSensor);
			fixture = fixture.GetNext();
		}
	};

	p.enableContact = function () {
		var fixture = this.host.body.GetFixtureList();
		while(fixture) {
			var filter 		= fixture.GetFilterData();
			filter.maskBits = fixture.m_tempMaskBits;
			fixture.SetFilterData(filter);
			fixture = fixture.GetNext();
		}
		this.contactable = true;
	};

	p.contact = function (contact, contacting, params) {
		if (!this.contactable) return;

		var observers;

		if (params.type == 'begin') {
			this.beginContact();
			observers = this.observers['begin'];
		} else if (params.type == 'end') {
			this.endContact();
			observers = this.observers['end'];
		}

		if (observers) {
			for (var i = 0, l = observers.length; i < l; i++) {
				observers[i](contact, contacting, params);
			}
		}

		this.isAutoDetect && this.autoDetect(contact, contacting, params);
	};

	p.beginContact = function () {
		this.countContacts++;
	};

	p.endContact = function () {
		this.countContacts--;
	};

	p.addObserver = function (fn, type) {
		if (typeof fn === 'function') {
			if (type) {
				this.observers[type].push(fn);
			} else {
				this.addObserver(fn,'end');
				this.addObserver(fn,'begin');
			}
		}
	};

	p.addObserverByFixtureName = function (fn, type, fixtureName) {
		if (typeof fn === 'function') {
			var wrapper = function(contact, contacting, params){
				var fixture = params.fixture;
				if (fixture.m_userData.name === fixtureName) {
					fn(contact, contacting, params);
				}
			};
			wrapper.origin = fn;
			this.addObserver(wrapper, type);
		}
	};

	p.removeObserverByFixtureName = function (fn, type) {
		if ( type ) {
			var observers = this.observers[type], index = -1;

			for(var i = 0 , l = observers.length; i < l; i++) {
				if (observers[i].origin === fn) {
					index = i;
					break;
				}
			}

			if (index != -1) {
				observers.splice(index, 1);
			}
		}
	};

	p.removeObserver = function (fn, type) {
		if ( type ) {
			var observers = this.observers[type],
				index = observers.indexOf(fn);

			if (index != -1) {
				observers.splice(index, 1);
			}
		} else {
			this.removeObserver(fn,'end');
			this.removeObserver(fn,'begin');
		}

	};

	p.isContactable = function () {
		return this.contactable
	};

	p.setContactable = function (v) {
		this.contactable = !! v;
	};

	p.reset = function () {
		for (var i in this.auto) {
			this.auto[i] = {
				normal: {
					x: 0,
					y: 0
				},
				is: false
			};
		}
		this.countContacts = 0;
	};

	p.isOnGround = function (){
		return this._tickisOnGround <= 2;
	};

	p._tickisOnGround = 0;

	p.updateIsOnGround = function (time) {

		var contacts = this.isDetect(['GROUND']);
		for (var i= 0, l=contacts.length; i < l; i++) {
			var normal = contacts[i].params.m_normal;

			if (normal.x > -.72 && normal.x < .72 && normal.y < 0) {
				this._tickisOnGround = 0;
				return true;
			}
		}

		if (this._tickisOnGround <= 2) {
			this._tickisOnGround++;
		}

		return false;
	};

	p.update = function (time){
		this.updateIsOnGround(time);
	};

	p.release = function  () {
		delete this.observers;
		delete this.auto;
		delete this.contacts;
		delete this.host;
		delete this.world;
	};

	global.Contactable = Contactable;
}());
