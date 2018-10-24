var abstracChartFactory = (function() {
	var charts = {};
	return {
		addChart : function(type, chart) {
			var proto = chart.prototype;
			if (proto.draw) { 
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
abstracChartFactory.addChart('sectionChart', SectionChart);
abstracChartFactory.addChart('pieChart', PieChart);
abstracChartFactory.addChart('lineChart', LineChart);
abstracChartFactory.addChart('barChart', BarChart);
abstracChartFactory.addChart('tableChart', TableChart);
