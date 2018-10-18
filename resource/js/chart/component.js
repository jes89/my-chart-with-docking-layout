var Component = (function(){
	
	var mo
	
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
		
		var targetEl = event.target;
		var eventType = event.dataTransfer.getData("event-type");
		var chartType = event.dataTransfer.getData("chart-type");
		var siblingIndex = targetEl.getAttribute("data-index");
		var currentIndex = Component.prototype.index;
		var siblingComponent = Component.prototype.componentsList[siblingIndex];
		var position = getPosition(event);
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
	
	var getPosition = function(event){
	    
		var x = event.offsetX;
		var y = event.offsetY;
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

		if(siblingComponent){
			var siblingComponentSelf = siblingComponent.self;
			if(isPrevious){
				inserteBefore(siblingComponentSelf, componentWrapper);
			} else{
				insertAfter(siblingComponentSelf, componentWrapper);
			}
		} else{
			targetEl.appendChild(componentWrapper);
		}
		
		componentWrapper.ondragstart = preventEevnt;
		componentWrapper.ondragover = preventEevnt;
		componentWrapper.ondrop = Component.prototype.drop;
		
		
		Component.prototype.index++;
		
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
		
		var resultTop = targetEl.offsetTop + resultHeight;
		var resultLeft = targetEl.offsetLeft + resultWidth;
		
		componentWrapper.style.width = resultWidth + "px";
		componentWrapper.style.height = resultHeight + "px";
		componentWrapper.style.border = "solid gray";
		componentWrapper.style.borderWidth = boarder + "px";
		
		if(siblingComponent){
			siblingComponentSelf = siblingComponent.self;
			siblingComponentSelf.style.width = resultWidth + "px";
			siblingComponentSelf.style.height = resultHeight + "px";
		} 
		

		if(diviedType === "horizontal"){
			if(isPrevious){
				if(siblingComponentSelf){
					
					componentWrapper.style.top = targetEl.offsetTop + "px";
					componentWrapper.style.left = targetEl.offsetLeft + "px"
					
					siblingComponentSelf.style.top = targetEl.offsetTop + "px";
					siblingComponentSelf.style.left = resultLeft + "px";
					
				}
			} else{
				if(siblingComponentSelf){
					siblingComponentSelf.style.top = targetEl.offsetTop + "px";
					siblingComponentSelf.style.left = targetEl.offsetLeft + "px";
					
					componentWrapper.style.top = targetEl.offsetTop + "px";
					componentWrapper.style.left = resultLeft + "px";
				}
			}
		} else{
			if(isPrevious){
				if(siblingComponentSelf){
					
					componentWrapper.style.top = targetEl.offsetTop + "px";
					componentWrapper.style.left = targetEl.offsetLeft + "px";
					
					siblingComponentSelf.style.top = resultTop + "px";
					siblingComponentSelf.style.left = targetEl.offsetLeft + "px";
					
				}
			} else{
				if(siblingComponentSelf){
					
					siblingComponentSelf.style.top = targetEl.offsetTop + "px";
					siblingComponentSelf.style.left = targetEl.offsetLeft + "px";
					
					componentWrapper.style.top = resultTop + "px";
					componentWrapper.style.left = targetEl.offsetLeft + "px";
				}
			}
		}
	}
	
	return Component;
	
})();