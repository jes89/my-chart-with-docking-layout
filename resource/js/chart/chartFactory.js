var abstracChartFactory = (function() {
	var charts = {};
	return {
		addChart : function(type, chart) {
			var proto = chart.prototype;
			if (proto.draw && proto.move && proto.remove) { 
				charts[type] = chart;
			}
		},
		create : function(type) { 
			var chart = charts[type];
			return (chart ? new chart() : null);
		}
	};
})();

abstracChartFactory.addChart('ballChart', BallChart);
abstracChartFactory.addChart('scatterChart', ScatterChart);
