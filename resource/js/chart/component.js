var Component = (function(){
	
	var Component = function( type, position, previousSibling, nextSibling, self ){
		this.type = type;
		this.position = position;
		this.previousSibling = previousSibling;
		this.nextSibling = nextSibling;
		this.self = null;
	}
	
	Component.prototype.boarderWidth = 1;
	Component.prototype.partitionWidth = 10;
	Component.prototype.index = 0;
	Component.prototype.observer = new Observer();
	Component.prototype.componentsList = [];
	
	Component.prototype.hidePreviwArea = function(){
		var previewTop = comm.getElById("previewTop");
		var previewRight = comm.getElById("previewRight");
		var previewBottom = comm.getElById("previewBottom");
		var previewLeft = comm.getElById("previewLeft");
		
		previewTop.style.top = "-10000px";
		previewRight.style.top = "-10000px";
		previewBottom.style.top = "-10000px";
		previewLeft.style.top = "-10000px";
	}
	
	Component.prototype.draw = function( chartType, component, isPrevious ) {
		
		var chart = abstracChartFactory.create(chartType); 
		
		this.observer.observe(chartType + " 그렸다.");
		
		createComponentWrapper(component, isPrevious);
		Component.prototype.componentsList.push(component);
		
		if(chart){
			chart.draw();
		}
	};
	
	Component.prototype.move = function() {
		console.log('컴포먼트 이동 호출');
	};
	
	Component.prototype.remove = function() {
		console.log('컴포먼트 삭제 호출');
	};
	
	Component.prototype.drop = function(){
		
		event.stopPropagation();
		
		Component.prototype.hidePreviwArea();
		
		var targetEl = event.target;
		var eventType = event.dataTransfer.getData("event-type");
		var chartType = event.dataTransfer.getData("chart-type");
		var siblingIndex = targetEl.getAttribute("data-index");
		var currentIndex = Component.prototype.index;
		var siblingComponent = Component.prototype.componentsList[siblingIndex];
		var position = getPosition(event.offsetX , event.offsetY);
		var isPrevious = getIsPreviousType(position);
		var previousSibling = null;
		var nextSibling = null;
		var component = null;
		
		if(isPrevious){
			previousSibling = siblingIndex;
		} else{
			nextSibling = siblingIndex;
		}
		
		component = new Component( chartType, position, previousSibling, nextSibling );
		
		if(siblingComponent){
			if(isPrevious){
				siblingComponent.nextSibling = currentIndex;
			} else{
				siblingComponent.previousSibling = currentIndex;
			}
		}
		
		component[eventType](chartType, component, isPrevious );
		
		Component.prototype.index++;
	};
	
	var preventEevnt = function(){event.preventDefault();}
	
	var getIsPreviousType = function(position){
		return (position === "top" || position === "left");
	}
	
	var inserteBefore = function(beforeEl, newEl){
		if(beforeEl){
			var parent = beforeEl.parentElement;
			if(parent){
				parent.insertBefore(newEl, beforeEl);
			} 
		}
	}
	
	var insertAfter = function(aferEl, newEl) {
		if(aferEl){
			var parent = aferEl.parentElement;
			if(parent && aferEl.nextSibling){
				aferEl.parentNode.insertBefore(newEl, aferEl.nextSibling);
			} else{
				aferEl.parentNode.appendChild(newEl);
			}
		}
	}
	
	var getPosition = function(x, y){
	    
		var targetEl = event.target;
		var quarterWidth = targetEl.offsetWidth / 4;
		var halfHeight = comm.getNumWithoutPx(targetEl,"height") / 2;
		
		if(quarterWidth > x){
	    	divideType = "left";
	    } else if((quarterWidth * 3) < x){
	    	divideType = "right";
	    } else{
	    	if(halfHeight > y){
	    		divideType = "top";
	    	} else{
	    		divideType = "bottom";
	    	}
	    }
	    
	    return divideType;
	}
	
	
	var getDiviedType = function(position){
		
		var type = null;
		
		if(position === "top" || position === "bottom"){
			type = "vertical";
		} else{
			type = "horizontal";
		}
		
		return type;
		
	}
	
	var hasSibling = function(component){
		return (component.nextSibling || component.previousSibling) ? true : false;
	}
	
	var createComponentWrapper = function( component, isPrevious ){
		
		var siblingIdx = null;
		
		if(isPrevious){
			siblingIdx = component.previousSibling;
		} else{
			siblingIdx = component.nextSibling;
		}

		var siblingComponent = Component.prototype.componentsList[siblingIdx];
		var targetEl = event.target;
		var componentWrapper = document.createElement("div");
		
		component.self = componentWrapper;
		
		componentWrapper.className = "component_wrapper";
		componentWrapper.setAttribute("data-index", component.index);
		
		setComponentStyle(targetEl, isPrevious, component, siblingComponent);
		
		componentWrapper.textContent = component.type + "미구현";
		componentWrapper.style.color = "white";
		componentWrapper.style.textAlign = "center";
		
		if(siblingComponent){
			var siblingComponentSelf = siblingComponent.self;
			if(isPrevious){
				inserteBefore(siblingComponentSelf, componentWrapper);
			} else{
				insertAfter(siblingComponentSelf, componentWrapper);
			}
		} else{
			var contentsRootContainer = comm.getElById("contentsRootContainer")
			contentsRootContainer.appendChild(componentWrapper);
		}
		
		initComponentEvent(componentWrapper);
		
	}
	
	var initComponentEvent = function(componentWrapper){
		
		componentWrapper.ondragstart = preventEevnt;
		componentWrapper.ondrop = Component.prototype.drop;
		componentWrapper.ondragover = function(){
			
			var targetEl = event.target;
			var previewTop = comm.getElById("previewTop");
			var previewRight = comm.getElById("previewRight");
			var previewBottom = comm.getElById("previewBottom");
			var previewLeft = comm.getElById("previewLeft");
			var position = getPosition(event.offsetX , event.offsetY);
			var diviedType = getDiviedType(position);
			var width = null;
			var height = null;
			var top = null;
			var right = null;
			var bottom = null;
			var left = null;
			
			if(diviedType === "horizontal"){
				width = targetEl.offsetWidth / 2;
				height = targetEl.offsetHeight;
			} else{
				width = targetEl.offsetWidth;
				height = targetEl.offsetHeight / 2;
			}
			
			switch(position){
				case "top" :
					top = targetEl.offsetTop;
					left = targetEl.offsetLeft;
					right = left + width;
					bottom = top + height;
					break;
				case "bottom" :
					top = targetEl.offsetTop + ( comm.getNumWithoutPx(targetEl, "height") / 2 );
					left = targetEl.offsetLeft;
					right = left + width;
					bottom = top + height;
					break;
				case "left" :
					top = targetEl.offsetTop;
					left = targetEl.offsetLeft;
					right = left + width;
					bottom = top + height;
					break;
				case "right" :
					top = targetEl.offsetTop;
					left = targetEl.offsetLeft  + ( comm.getNumWithoutPx(targetEl, "width") / 2 );
					right = left + width;
					bottom = top + height;
					break;
					
					default:
						
						break;
			}
			
			previewTop.style.top =  top + "px";
			previewTop.style.left =  left + "px";
			previewTop.style.width = width + "px";
			
			previewRight.style.left =  right + "px";
			previewRight.style.top = top + "px";
			previewRight.style.height = height + "px";
			
			previewBottom.style.top =  bottom + "px"; 
			previewBottom.style.width = width + "px";
			previewBottom.style.left =  left + "px";
			
			previewLeft.style.left =  left + "px";
			previewLeft.style.top = top + "px";
			previewLeft.style.height = height + "px";
			
		}
	}
	
	var setComponentStyle = function(targetEl, isPrevious, component, siblingComponent){
		
		var siblingComponentSelf = null;
		var componentWrapper = component.self;
		var boarder =  Component.prototype.boarderWidth;
		var headerHeigth = header.offsetHeight;
		var isHasSibling = hasSibling(component);
		var divisionValue = isHasSibling ? 2 : 1;
		var targetWidth = comm.getNumWithoutPx(targetEl,"width");
		var targetHeight = comm.getNumWithoutPx(targetEl,"height");
		var diviedType = getDiviedType(component.position);
		var parentPadding = 0;
		var minusStylePx = null;
		var resultWidth = null;
		var resultHeight = null;
		var nextSiblingTop = null;
		var nextSiblingLeft = null;
		
		if(Component.prototype.index === 0){
			minusStylePx = -(boarder * 2) * divisionValue;
		} else{
			minusStylePx = 0;
		}
		
		if(siblingComponent){
			parentPadding = comm.getNumWithoutPx(siblingComponent.self.parentElement, "padding");
		}
		
		if(diviedType === "horizontal"){
			resultWidth = ( targetWidth + minusStylePx) / divisionValue;
			resultHeight = targetHeight;
		} else{
			resultWidth = targetWidth;
			resultHeight = ( targetHeight + minusStylePx) / divisionValue;
		}
		
		componentWrapper.style.width = resultWidth + "px";
		componentWrapper.style.height = resultHeight + "px";
		componentWrapper.style.border = "solid gray";
		componentWrapper.style.borderWidth = boarder + "px";
		
		if(siblingComponent){
			siblingComponentSelf = siblingComponent.self;
			siblingComponentSelf.style.width = resultWidth + "px";
			siblingComponentSelf.style.height = resultHeight + "px";
		} 
		
		if(siblingComponentSelf == null){
			return;
		}
		
		if(diviedType === "horizontal"){
			nextSiblingTop = targetEl.offsetTop;
			nextSiblingLeft = targetEl.offsetLeft + resultWidth;
		} else{
			nextSiblingTop = targetEl.offsetTop + resultHeight;
			nextSiblingLeft = targetEl.offsetLeft;
		}
		
		if(isPrevious){
			componentWrapper.style.top = targetEl.offsetTop + "px";
			componentWrapper.style.left = targetEl.offsetLeft + "px"
			siblingComponentSelf.style.top = nextSiblingTop + "px";
			siblingComponentSelf.style.left = nextSiblingLeft + "px";
		} else{
			siblingComponentSelf.style.top = targetEl.offsetTop + "px";
			siblingComponentSelf.style.left = targetEl.offsetLeft + "px";
			componentWrapper.style.top = nextSiblingTop + "px";
			componentWrapper.style.left = nextSiblingLeft + "px";
		}
		
	}
	
	return Component;
	
})();