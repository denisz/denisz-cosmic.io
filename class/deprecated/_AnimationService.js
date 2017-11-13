(function () {
    var global = (1,eval)('this');
    var AnimationService = function (resources) {
        assert(!AnimationService.instance,"AnimationService cannot be instantiated");
        if(!resources)
            resources = global.Resources.getInstance();

        this.resources = resources;
        AnimationService.instance = this;
    };
    /**
     * static
     * @type {null}
     */
    AnimationService.instance = null;
    /**
     * static
     * @return {*}
     */
    AnimationService.getInstance = function () {
        assert(AnimationService.instance !== null, "AnimationService class has not been created");

        return AnimationService.instance;
    };

    var p = AnimationService.prototype = {};

    p.getMovieClip = function  (name , mode, startPosition, loop) {
        var lib = global.lib;
        assert(name in lib,'MovieClip is not defined');
        this._reconstructorImages(name);
        return new lib[name](mode, startPosition, loop)
    };

    p._reconstructorImages = function (name) {
        assert(this.resources,'Resources is not loading');
        assert(lib['i_' + name + '_images'],'Information from the pictures no animation');

        if(!lib['i_' + name + '_images'].prototype.isReconstructor){
            var paramsImages = lib['i_' + name + '_images'](),
                img  = paramsImages.img,
                manifest = paramsImages.manifest;

            //взять из ресурса резуьтат и вбить в img
            for(var i = 0, l = manifest.length; i < l; i++){
                var load = this.resources.getResult(manifest[i].id);
                img[ manifest[i].id ] = load.result;
            }
            lib['i_' + name + '_images'].prototype.isReconstructor = true;
        }

    };

    global.AnimationService = AnimationService;
}());