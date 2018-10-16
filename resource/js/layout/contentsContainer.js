var ContentsContainer = (function() {
	
	var ContentsContainer = function(){}
	
	if(typeof( DockingLayout ) !== "function"){
		comm.errorLog( "ContentsContainer.js have to extend DockingLayout.js" );
		return;
	}
	
	comm.extendClass( DockingLayout, ContentsContainer );
	
	ContentsContainer.prototype.init = function( subContainerSize ) {
		initLayout.apply( this, [ subContainerSize ] );
	}
		
	var initLayout = function(subContainerSize){
		
		var contentsWrapper = document.createElement( "div" );
		var rootContainer = comm.getElById( "rootContainer" );
		var header = comm.getElById( "header" );
		var padding = 10 * 2;
		var boarder = 1 * 2;
		var resultHeight = rootContainer.offsetHeight - header.offsetHeight - padding - boarder;
		
		contentsWrapper.className = "contents_root_container";
		contentsWrapper.style.height = resultHeight + "px";
		rootContainer.appendChild( contentsWrapper );
		
		initSubContainer.apply(this, [ contentsWrapper, subContainerSize ] );
		
	}
	
	var initSubContainer = function( contentsWrapper, subContainerSize ){
		
		var border =  1;
		var paddingPx = 10;
		var partitionWidth = this.partitionWidth;
		var partitionCnt = ( subContainerSize - 1 );
		var result = (partitionWidth * partitionCnt) / subContainerSize;
		var wrapperhHeight = ( contentsWrapper.style.height.replace("px","") * 1 );
		var eachHeight = Math.floor( wrapperhHeight / subContainerSize ) - ( border * 2 ) - ( paddingPx * 2 ) - result;
		var tempEl = null;
		
		eachHeight = eachHeight;
		
		for(var ix = 0; ix < subContainerSize; ix ++){
			
			tempEl = document.createElement("div");
			
			tempEl.setAttribute( "data-index", ix );
			
			tempEl.className = "contents_sub_container";
			
			tempEl.style.padding = paddingPx + "px";
			tempEl.style.border = "solid gray";
			tempEl.style.borderWidth = border + "px";
			
			tempEl.style.height = eachHeight + "px";
			
			contentsWrapper.appendChild( tempEl );
			
			addDragDropEvt( tempEl );
			
			if(ix < partitionCnt ){
				this.appendPartition( contentsWrapper, partitionWidth, tempEl , "vertical", "after" );
			}
		}
	}
	
	var addDragDropEvt = function(contentsWrapper){
		contentsWrapper.addEventListener( "dragstart"	, function(){event.preventDefault();});
		contentsWrapper.addEventListener( "dragover"	, function(){event.preventDefault();});
		contentsWrapper.addEventListener( "drop"		, ContentsContainer.prototype.dropEvt);
	}
	
	return ContentsContainer;
	
})();




