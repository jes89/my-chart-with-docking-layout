var PieChart = (function(){
	
	var PieChart = function(){
		
	}
	

	
	return PieChart;
	
})();

PieChart.prototype.draw = function(component) {

	google.charts.load("current", {"packages":["corechart"]});
	google.charts.setOnLoadCallback(function () {
		
		var chartWrapper = component.chartWrapper;
		var data = new google.visualization.DataTable();
		
        data.addColumn("string", "Topping");
        data.addColumn("number", "Slices");
        data.addRows([
				          ["Mushrooms", 3],
				          ["Onions", 1],
				          ["Olives", 1],
				          ["Zucchini", 1],
				          ["Pepperoni", 2]
				        ]);

        var options = {
        				"title":"How Much Pizza I Ate Last Night",
        				"backgroundColor": "#000",
        				"width":comm.getNumWithoutPx(chartWrapper,"width"),
        				"height":comm.getNumWithoutPx(chartWrapper,"height"),
        				"hAxis": {
        				    textStyle:{color: 'white'}
        				}

        }


        var chart = new google.visualization.PieChart(chartWrapper);
        chart.draw(data, options);
	});

};

