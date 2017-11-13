(function () {
    var global = (1,eval)('this');

    var WalkEnemyTask = function(){
        this.init.apply(this,arguments);
    };
    WalkEnemyTask.prototype = new global.BaseTask();
    WalkEnemyTask.prototype.execute = function (params) {
        //заставляем противника гулять по платформам и проверяем нету ли цели
        var vel 	= this.host.getLinearVelocity();

        //направо
//        if (vel.x <  this.host.max_speed)
//            this.host.applyImpulse(this.host.speed, 0);

        //налево
//        if (vel.x > -this.host.max_speed)
//            this.host.applyImpulse(-this.host.speed, 0);
        //будет итди пока не потеряет землю


    };

    var AttackEnemyTask = function (){
        this.init.apply(this,arguments)
    };
    AttackEnemyTask.prototype = new global.BaseTask();
    AttackEnemyTask.prototype.execute = function (params) {
        //аттакуем перевести игрока в состояние атаки и атаковать

    };

    var TargetEnemyTask = function () {
        this.init.apply(this,arguments);
    };
    TargetEnemyTask.prototype = new global.BaseTask();
    TargetEnemyTask.prototype.execute = function (params) {
        //начинаем путь к противнику
    };

    global.WalkEnemyTask    = WalkEnemyTask;
    global.AttackEnemyTask  = AttackEnemyTask;
    global.TargetEnemyTask  = TargetEnemyTask;
}());