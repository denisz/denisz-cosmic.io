(function(){
	var global = (1,eval)('this');
	/**
	 *
	 * @param options
	 * @constructor
	 */
	var Sampling = function(options){
		options 			= options || {};
		this.width 			= options.width  || 1;
		this.height 		= options.height || 1;
		this.minDistance 	= options.minDistance || 100;
		this.frequency  	= options.frequency || 10;
		this.algorithm      = options.algorithm ||  Sampling.ALGORITHM.RANDOM;

		if (this.algorithm === Sampling.ALGORITHM.POISSON) {
			this.solutionPointsPoisson();
		} else {
			this.solutionPointsRandom();
		}
	};

	/**
	 *
	 * @type {{POISSON: number, RANDOM: number}}
	 */
	Sampling.ALGORITHM = {
		POISSON : 1,
		RANDOM  : 2
	};

	var p = Sampling.prototype = {};

	p.solutionPointsPoisson = function () {
		var sampler = new global.PoissonDiskSampler( this.width, this.height, this.minDistance, this.frequency );
		this.points =  sampler.sampleUntilSolution();
	};

	p.solutionPointsRandom =  function () {
		var points 	= [],
			w 	   	= this.width,
			h 		= this.height,
			n 		= this.frequency,
			m  		= this.minDistance,
			dx 		= w - m * 2,
			dy 		= h - m * 2;

		for (var i=0; i<n; i++) {
			points.push({
				x: Math.round(m+ Math.random() * dx),
				y: Math.round(m+ Math.random() * dy)
			});
		}

		this.points = points
	};

	p.generateDiagram = function () {
		var v = new Voronoi();
		this.diagram = v.compute(this.points, {xl:0,xr:this.width,yt:0,yb:this.height});
	};

	p.getCells = function () {
		if (this.diagram) {
			return this.diagram.cells;
		}
		return []
	};

	global.Sampling = Sampling;
}());