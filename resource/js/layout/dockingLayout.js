var DockingLayout = (function (){
	
	var DockingLayout = function (){}
	var chartEventFactory = {};
	var layoutComponents = {};
	
	DockingLayout.prototype.dropEvt = function(){
		
		event.preventDefault();
		
		var contentsWrapper = event.target;
		var eventType = event.dataTransfer.getData("event-type");
	    var chartType = event.dataTransfer.getData("chart-type");
	    
	    if(chartEventFactory[eventType]){
	    	chartEventFactory[eventType](contentsWrapper);
	    } else{
	    	comm.errorLog(eventType + " event is not enrolled at chartFactory.");
	    }
	    
	}
	
	chartEventFactory.createChart = function(contentsWrapper){
		
	}
	
	chartEventFactory.deleteChart = function(contentsWrapper){
		
	}
	
	chartEventFactory.moveChart = function(contentsWrapper){
		
	}
	
	return DockingLayout;
})();