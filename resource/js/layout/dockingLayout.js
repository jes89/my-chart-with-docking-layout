var DockingLayout = (function (){
	
	var DockingLayout = function (){}
	var chartEventFactory = {};
	var contentsContainer = {};
	
	DockingLayout.prototype.dropEvt = function(){
		
		event.preventDefault();
		
		var contentsWrapper = event.target;
		var eventType = event.dataTransfer.getData("event-type");
	    var chartType = event.dataTransfer.getData("chart-type");
	    var maxCnt = 100;
	    var cnt = 0;
	    
	    while(true){
    		
	    	if(contentsWrapper.className.indexOf("contents_sub_container") > -1){
    			contentsWrapper = contentsWrapper;
    			break;
    		} 
    		
	    	if(cnt >= maxCnt){
	    		comm.errorLog("not found contents_sub_container div.");
	    		break;
	    	}
    		
    		contentsWrapper = contentsWrapper.parentElement;
    		cnt ++;
    	}
	    
	    if(chartEventFactory[eventType]){
	    	chartEventFactory[eventType](contentsWrapper,chartType);
	    } else {
	    	comm.errorLog(eventType + " event is not enrolled at chartFactory.");
	    }
	    
	}
	
	chartEventFactory.createChart = function(contentsWrapper,chartType){
		
		var key = +new Date();
		var index = contentsWrapper.getAttribute("data-index");
		var newComponent = new Components(contentsWrapper,chartType);
		var layoutComponents  = null;
		
		if(contentsContainer[index] == null){
			contentsContainer[index] = {};
		}
		
		contentsContainer[index][key] = newComponent;
		
		layoutComponents  = contentsContainer[index];
		
		newComponent.create(contentsContainer[index]);
	}
	
	chartEventFactory.deleteChart = function(contentsWrapper){
		
	}
	
	chartEventFactory.moveChart = function(contentsWrapper){
		
	}
	
	var Components = (function() {
		
		var that = null;
		
		var Components = function( partent, chartType ){
			that = this;
			this.partent = partent;
			this.chartType = chartType;
		}
		
		Components.prototype.create = function(layoutComponents){
			appendChartContainer(layoutComponents);
		}
		
		Components.prototype.remove = function(){
			
		}
		
		Components.prototype.move = function(){
			
		}
		
		var appendChartContainer = function( layoutComponents ){
			
			var layoutContainer = document.createElement( "div" );
			var layoutComponentKeys = Object.keys( layoutComponents );
			var partentBorder = 2;
			var key = null;
			var partent = that.partent;
			
			that.layoutContainer = layoutContainer;
			
			for( var ix = 0, ixLen = layoutComponentKeys.length; ix < ixLen; ix++ ){
				
				key = layoutComponentKeys[ix];
				
				layoutComponents[key].layoutContainer.style.width = (partent.offsetWidth / ixLen) - partentBorder + "px";
			}
			
			layoutContainer.className = "layout_container";
			
			partent.appendChild( layoutContainer );
			
			
			
		}
		
		return Components;
		
	})();
	
	return DockingLayout;
	
})();