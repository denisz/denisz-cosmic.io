(function () {

	function sortci(a, b) {
		return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
	}

	function stringify(o, simple) {
		var json = '', i, type = ({}).toString.call(o), parts = [], names = [];

		if (type == '[object String]') {
			json = '"' + o.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
		} else if (type == '[object Array]') {
			json = '[';
			for (i = 0; i < o.length; i++) {
				parts.push(stringify(o[i], simple));
			}
			json += parts.join(', ') + ']';
			json;
		} else if (type == '[object Object]') {
			json = '{';
			for (i in o) {
				names.push(i);
			}
			names.sort(sortci);
			for (i = 0; i < names.length; i++) {
				parts.push(stringify(names[i]) + ': ' + stringify(o[names[i] ], simple));
			}
			json += parts.join(', ') + '}';
		} else if (type == '[object Number]') {
			json = o+'';
		} else if (type == '[object Boolean]') {
			json = o ? 'true' : 'false';
		} else if (type == '[object Function]') {
			json = o.toString();
		} else if (o === null) {
			json = 'null';
		} else if (o === undefined) {
			json = 'undefined';
		} else if (simple == undefined) {
			json = type + '{\n';
			for (i in o) {
				names.push(i);
			}
			names.sort(sortci);
			for (i = 0; i < names.length; i++) {
				parts.push(names[i] + ': ' + stringify(o[names[i]], true)); // safety from max stack
			}
			json += parts.join(',\n') + '\n}';
		} else {
			try {
				json = o+''; // should look like an object
			} catch (e) {}
		}
		return json;
	}

	if (!window.Modernizr.mobile) {
		return console.log('Remote debug offline');
	}

	var uuid 	= 'iphone',
		isOpen = false,
		socket, msgType = '';

	if (!uuid) {
		return console.log('UUID not found');
	}

	var error = function () {};
	var close = function () {};

	var message =  function (event) {
		try {
			if (event.data.indexOf('console.log') == 0) {
				eval('remote.echo(' + event.data.match(/console.log\((.*)\);?/)[1] + ', "' + event.data + '", true)');
			} else {
				remote.echo(eval(decodeURIComponent(event.data)), decodeURIComponent(event.data), undefined); // must be undefined to work
			}
		} catch (e) {
			remote.error(e, event.data);
		}
	};

	var sendMessage = function (msgObj) {
		if (socket) {
			if (typeof msgObj === 'string') {
				msgObj = {
					response :msgObj
				}
			}

			if (!msgObj.action) {
				msgObj.action = 'actionClient';
			}

			msgObj.uuid   = uuid;

			socket.send(JSON.stringify(msgObj));
		}
	};

	var remote = {
		log   : function () {
			var response = [];
			window.originConsole.log.apply(window.originConsole, arguments);

			[].forEach.call(arguments, function (args) {
				response.push(stringify(args, true));
			});

			sendMessage({ response : response, cmd : 'remote console.log', type : msgType });
			msgType = '';

		},
		info  : function () {
			msgType = 'info';
			remote.log.apply(this, arguments);
		},
		echo  : function () {
			var args = [].slice.call(arguments, 0),
				plain = args.pop(),
				cmd = args.pop(),
				response = args;

			var argsObj = stringify(response, plain);

			sendMessage({ response : argsObj, cmd : cmd });
		},
		error : function (error, cmd) {
			sendMessage({ response : error.message, cmd : cmd, type : 'error' });
		}
	};

	// just for extra support
	remote.debug = remote.dir = remote.log;
	remote.warn = remote.info;

	window.addEventListener && window.addEventListener('error', function (event) {
		remote.error({ message : event.message }, event.filename + ':' + event.lineno);
	}, false);

	try{
		if (window.WebSocket) {
			socket = new WebSocket('ws://platrorum.linkpc.net:8080');

			socket.addEventListener('open', function() {
				sendMessage({
					response: '',
					action  : '__initClient__',
					uuid 	: uuid
				});
				isOpen = true;
			});

			socket.addEventListener('message', message);

			socket.addEventListener('close', close);

			socket.addEventListener('error', error);

			window.originConsole = window.console;
			window.console = remote;
		}
	}catch(e){

	}
	return true;
}());