(function () {
    var global = (1,eval)('this');
    var BaseTask = function (host, taskManager) {
        this.init(host, taskManager);
    };

    var p = BaseTask.prototype = {};

    p.init = function (host, taskManager) {
        this.host       = host;
        this.taskManager= taskManager;
    };

    p.execute = function ( ) {
        throw "Not specified in this task!";
    };

    global.BaseTask = BaseTask;
}());