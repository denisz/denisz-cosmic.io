(function () {
    var global = (1,eval)('this');
    var TaskManager = function (host, tasks, cycle, onTaskDone) {
        this.cycle = cycle;
        this.tasks  = [];
        this.result = false;
        this.host   = host;
        this.onTaskDone = onTaskDone;
        this.tasksArray = [];

        this.tasksArray[-1] = {
            execute : this.timerFrame.bind(this)
        };

        for (var i=0; i < tasks.length; i += 2 ) {
            this.tasksArray[tasks[i]] = new tasks[i + 1](this.host, this);
        }
    };

    var p = TaskManager.prototype = {};

    p.pauseIndex= -1;
    p.isStarted = false;
    p.isPaused  = false;
    p.pauseCount= 0;

    /**
     * добавить задачу в конец очереди
     */
    p.addTask = function (task, params, ignoreCycle) {
        this.tasks.push({task:this.tasksArray[task], params:params, ignoreCycle:ignoreCycle});
        this.start();
    };

    /**
     * добавить задачу в начало очереди
     */
    p.addUrgentTask = function (task, params, ignoreCycle) {
        this.tasks.unshift({task:this.tasksArray[task], params:params, ignoreCycle:ignoreCycle});
        this.start();
    };

    /**
     * добавить задачу, которая выполнится всего 1 раз в конец очереди
     */
    p.addInstantTask = function (task, params, ignoreCycle) {
        this.tasks.push({task:this.tasksArray[task], params:params, ignoreCycle:ignoreCycle, isInstant:true});
        this.start();
    };

    /**
     *  добавить одноразовую задачу в начало очереди
     */
    p.addUrgentInstantTask = function (task, params, ignoreCycle) {
        this.tasks.unshift({task:this.tasksArray[task], params:params, ignoreCycle:ignoreCycle, isInstant:true});
        this.start();
    };

    /**
     * добавить паузу в конец очереди (в кадрах)
     */
    p.addPause = function ( time, ignoreCycle) {
        this.addTask(this.pauseIndex, [time], ignoreCycle);
    };

    /**
     * Следующая задача
     * @param ignoreCycle
     */
    p.nextTask = function (ignoreCycle) {
        var cycle    = this.cycle,
            tasks    = this.tasks;

        if(cycle && !ignoreCycle) {
            tasks.push(tasks.shift());
        } else {
            tasks.shift();
        }
    };

    /**
     * пауза
     * @param time
     */
    p.timerFrame = function (time) {
        this.pauseCount++;
        if(this.pauseCount >= time) {
            this.pauseCount = 0;
            this.nextTask(false);
        }
    };

    /**
     * начинает если добавлена новая задача
     */
    p.start = function () {
        if(!this.isStarted) {
            this.isStarted = true;
            this.isPaused  = false;
        }
    };

    /**
     * Стоп
     */
    p.stop = function () {
        this.isStarted = false;
    };

    /**
     * Шаг просчета выполняем одну задачу додех пор пока не вернем true
     * @param time
     */
    p.step = function (time) {
        if(!this.isStarted || this.isPaused)
            return;

        var tasks   = this.tasks,
            curTask = tasks[0];

        if(curTask) {
            this.result = curTask.task.execute.apply(curTask.task, curTask.params);
            if(curTask == tasks[0] && (curTask.isInstant || this.result)) {
                this.nextTask(curTask.ignoreCycle);
            }
        } else {
            this.stop();
            if(typeof this.onTaskDone === 'function') {
                this.onTaskDone();
            }
        }
    };

    /**
     * устанавливаем паузу
     * @param value
     */
    p.setPaused = function (value) {
        this.isPaused = value;
    };

    /**
     * количество задач
     * @return {Number}
     */
    p.tasksNum = function () {
        return this.tasks.length;
    };

    /**
     * удалить все задачи из очереди
     */
    p.removeAllTasks = function () {
        this.tasks  = [];
    };

    global.TaskManager = TaskManager;
}());