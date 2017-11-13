(function () {
	var global = (1,eval)('this');
	var GameObjectsService = function (scheme) {
		this._gameObjects = {};
		this.setGameObjects(scheme);
		GameObjectsService.instance = this;
	};

	GameObjectsService.instance = null;

	GameObjectsService.getInstance = function () {
		assert(GameObjectsService.instance !== null,"GameObjectsService class has not been created");
		return GameObjectsService.instance;
	};

	var p = GameObjectsService.prototype = {};

	p.setGameObjects = function (scheme) {
		this._gameObjects = scheme;
	};

	p.getGameObjectByIndex = p.getGameObject = function (index) {
		return this._gameObjects[index];
	};

	p.getGameObjectByName = function (name){
		var go = this._gameObjects;
		for (var i = 0, l = go.length; i < l ; i++) {
			if (go[i].name == name) {
				return go[i]
			}
		}
		return false;
	};

	p.release = function (){
		this._gameObjects = [];
	};

	global.GameObjectsService = GameObjectsService;
}());