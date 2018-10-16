var DockingLayout = (function (){
	
	var DockingLayout = function (){}
	var chartEventFactory = {};
	var contentsContainer = {};
	
	var appendPartition = function( parent, partitionWidth, layoutContainer, type , insertType ){
		
		var partition = document.createElement( "div" );
		var width = null;
		var height = null;
		
		partition.className = "partition " + type;
		
		if(type === "horizontal"){
			width = partitionWidth + "px";
			height = layoutContainer.style.height;
		} else{
			width = layoutContainer.style.width || (layoutContainer.offsetWidth + "px");
			height = partitionWidth + "px";
		}
	
		partition.style.width = width;
		partition.style.height = height;
		
		if ( insertType === "before" ) {
			parent.insertBefore( partition , layoutContainer);
		} else{
			parent.appendChild( partition );
		}
		
		partition.addEventListener( "dragstart"	, function(){event.preventDefault();});
		partition.addEventListener( "dragover"	, function(){event.preventDefault();});
		partition.addEventListener( "drop"		, function(){event.preventDefault();});
		
	}
	
	DockingLayout.prototype.partitionWidth = 10;
	
	DockingLayout.prototype.appendPartition = appendPartition;
	
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
		var newComponent = new Components( contentsWrapper, chartType );
		var layoutComponents  = null;
		
		if(contentsContainer[index] == null){
			contentsContainer[index] = {};
		}
		
		contentsContainer[index][key] = newComponent;
		
		layoutComponents  = contentsContainer[index];
		
		newComponent.parentComponents = layoutComponents;
		
		newComponent.create(newComponent);
	}
	
	chartEventFactory.deleteChart = function(contentsWrapper){
		
	}
	
	chartEventFactory.moveChart = function(contentsWrapper){
		
	}
	
	var Components = (function() {
		
		var that = null;
		
		var Components = function( parent, chartType ){
			that = this;
			this.parent = parent;
			this.chartType = chartType;
			this.parentComponents = null;
		}
		
		Components.prototype.create = function( layoutComponents, newComponent ){
			appendChartContainer( layoutComponents, newComponent );
		}
		
		Components.prototype.remove = function(){
			
		}
		
		Components.prototype.move = function(){
			
		}
		
		var appendChartContainer = function( newComponent ){
			
			var parent 				= that.parent;
			var layoutComponents 	= newComponent.parentComponents;
			var layoutComponentKeys = Object.keys( layoutComponents );
			var ixLen 				= layoutComponentKeys.length;
			var layoutContainer 	= document.createElement( "div" );
			var partentBorder 		= parent.style.borderWidth.replace("px","");
			var partentPadding 		= parent.style.padding.replace("px","");
			var wrapperBorder 		= partentBorder;
			var partitionWidth 		= DockingLayout.prototype.partitionWidth;
			var parentWidth 		= parent.offsetWidth - (partentBorder * 2) - (partentPadding * 2) - (partitionWidth * (ixLen - 1) ) ;
			var parentHeight 		= parent.offsetHeight - (partentBorder * 2) - (partentPadding * 2) - (wrapperBorder * 2);
			var key 				= null;
			var tempComponet 		= null;
			var tempLayoutContainer = null;
			var partition 			= null;
		
			that.layoutContainer = layoutContainer;
			
			for( var ix = 0; ix < ixLen; ix++ ){
				
				key = layoutComponentKeys[ix];
				
				tempComponet = layoutComponents[key];
				
				tempLayoutContainer = tempComponet.layoutContainer;
				
				tempLayoutContainer.style.width = ( parentWidth / ixLen ) - (wrapperBorder * 2) + "px";
				tempLayoutContainer.style.height = parentHeight + "px";
			}
			
			layoutContainer.className = "layout_container";
			layoutContainer.style.border = "solid gray";
			layoutContainer.style.borderWidth = partentBorder + "px";
			
			parent.appendChild( layoutContainer );
			
			if(ixLen > 1){
				appendPartition( parent, partitionWidth, layoutContainer , "horizontal" , "before" );
			}
			
		}
		
		return Components;
		
	})();
	
	return DockingLayout;
	
})();