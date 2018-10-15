

# 프로젝트의 개발 목적

기본적으로 제가 첫 회사 입사하고 

3~4개월 배우고 작업한 페이지를 

아키텍쳐를 다시 잡고 리펙토링 작업위주로 할 예정입니다.

![모너티링 싱글 웹 페이지 사진](https://cafefiles.pstatic.net/MjAxODEwMTNfMjEy/MDAxNTM5NDA0MDQxMTI5.EdNMbLaNOzMrDBUCQzDTY6bN3MSXSN33kjHQyTUXAJUg.k3_O0CCWo0q-_yGEoTzf6C09t9aPwp5eEUSuLqnKU84g.PNG.hiter00/%EC%8B%A0%EC%9E%85%EB%95%8C%ED%95%9C_%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8.PNG)

해당 페이지는 3초마다 웹소켓통신으로 

데몬이 설치된 PC와 통신하여

DB의 상태를 모니터링해주는 페이지였으나

데몬 개발과 모니터링의 문제로

서버단에서 랜덤값을 만들어 보내줄 보내주며

기존 모든 차트 및 그리드는 모두 퍼포먼스를 향상 시키기위해 켄버스로 개발되었으나

켄버스로 개발을 계속 할지, 엘리먼트에 애니메이션 효과를 둘지는 고려하는 중입니다.

매 처음 로드시 값은 DB 및 브라우저의 로컬스토리지로 저장되어 서로 값을 비교하여 동기화 작업을 수행합니다.

상단의 차트 및 그리드를 페이지 안에 [도킹 레이아웃](https://golden-layout.com/)을 통해 자유롭게 붙일 수 있으며

오른쪽에는 접기/펴기가 가능한 히스토리를 통해서 

사용자가 활동한 정보를 기록해두고 자유롭게 해당 시점으로 되돌리기가 가능하게 하려고 합니다.

사용자가 로컬스토리지의 정보를 지울때에는 DB에서의 히스토리를 별도로 다시 가져올 수 있는 기능을 포함합니다.


# 개발환경
- node.js : 10.12.0
- mySQl : 8.0.12

# 노드 사용 모듈
- express: 4.16.4
- mysql2 : 1.6.1
- properties-reader : 0.0.16
- pug : 2.0.3
- sequelize : 4.39.0
- websocket : 1.0.28

# 프로젝트 적용 패턴
### 백 엔드

- MVC :

모벨은 원래 리플렉션을 이용해 데이터를 셋팅 및 조작하려 하려 했으나

기존 스프링에서 하이버네이트를 실무에서 사용해보지 못 하여

ORM 개념이 부족하여 sequelize를 통해 ORM을 적용해보려합니다.

MVC를 선택한 이유는 자바 개발자로 있다보니

MVC의 좋은 구조와 유지보수 유용함을 항상 느끼고 있기때문입니다. 

이후 MVVM이나 MVVC등은 새로운 프로젝트에서 적용해볼 예정입니다.

- 서킷 브레이커 : 지속적인 에러가 발생할시 더 이상의 에러를 방지하기 위해 서킷 브레이커를 적용

### 프론트 엔드
- 싱글톤   : 제가 알고 있는 싱글톤이 2가지가 있는데

       var singleObj = {
	    
	    this.init = function(param){
			      this.ininProperties(param);
	    }

	    this.ininProperties = function(param){
			      this.userName = param.userName;
	        this.position = param.position;
	    }
	  }

식의 제이슨형식의 싱글객체를 만들지만 모두 퍼블릭 속성을 가지게되는 단점이 있어


     var singleObj = (function() {
         var instance;
         var gObj = {};
      
	function initiate() {
		return {
	       		foo : function() {
		    	//TODO
	       		}
	 	}
      	}
	
      	return {
              getInstance: function() {
                   if (!instance) {
                        instance = initiate();
                   }
                   return instance;
              }
       }
     })();

아래처럼 사용할 예정입니다.

너무 많은 권한을 가지게 되어 자기 자신의 인스턴스까지 제어가 가능해지는 현상이 생기는 단점에서 불과하고

전역환경에 1번만 있어야하는 공통 기능을 싱글톤으로 구현하였습니다.

- 플라이급 : 차트라는 기능 자체의 무게와 객체는고가이기때문에 필요한 부분은 플라이급을 적용했습니다.

- 중재자 : 각 차트에 대한 소켓통신과 옵저버에 메시지를 주기위해 중재자를 적용했습니다.

- 옵저버 : 사용자의 모든 활동을 기록해야하기때문에 옵저버로 사용자의 입력을 기록합니다.

- 전략 : 같은 영역에 다른 차트를 추가하면 텝으로 추가되기때문에 같은 영역의 차트를 언제라도 변경가능하게 전략패턴을 적용했습니다.

- 추상 펙토리 : 등록되지 않은 차트나 구조라면 실행을 될수 없어야하기때문에 추상 펙토리를 적용했습니다.

- 메멘토 : 사용자가 선택한 히스토리의 지점으로 언제든기 복귀가 가능해야하기때문에 메멘토 패턴이 필요합니다.

- 메모이제이션 : 다큐먼트를 셀렉트할때 ID셀렉터가 가장 빠르지만 문서전체를 탐색하는 작업은 비효율 적이니 한번 탐색했던 엘리먼트는 캐쉬에 저장해 캐쉬에서 가져오는 형식

		getElById : function(id){
				
			var selectedEl = gObj.cacheElementsMemory[id];

			if(selectedEl == null){
				selectedEl = document.getElementById(id);
				gObj.cacheElementsMemory[id] = selectedEl;
			}

			return selectedEl;

		}

# 도킹 레이아웃 구현 방법

차트를 드래그해서 붙일 수 있는 영역을 만드는  ContentsContainer.js는

DockingLayout.js을 상속 받고
	
	if(typeof(DockingLayout) !== "function"){
		comm.errorLog("ContentsContainer.js have to extend DockingLayout.js");
		return;
	}
	
	comm.extendClass( DockingLayout, ContentsContainer );
	
	extendClass : function( superClass, childClass ){
				
		var protoTypeArr = Object.keys(superClass.prototype);
		var protoAttr = null;

		for(var ix = 0, ixLen = protoTypeArr.length; ix < ixLen; ix++){
			protoAttr = protoTypeArr[ix];
			childClass.prototype[protoAttr] = superClass.prototype[protoAttr];
		}

	}


DockingLayout.js는 

chartEventFactory 객체와 layoutComponents 객체를 포함하는데

chartEventFactory는 chart의 CRUD의 이벤트를 가지고 있으며

각각 이벤트는 layoutComponents에서 이벤 이벤트에대한 Component를 가져와서 

Component 객체의 CRUD를 수행합니다.

Component는 DockingLayout의 innerClass이며 

필요에따라 Component.parent에 있는 영역에서 CRUD가 진행됩니다.

	var DockingLayout = (function (){
	
		var DockingLayout = function (){}
		var chartEventFactory = {};
		var layoutComponents = {};
		
		chartEventFactory.createChart = function(){//TODO}
		chartEventFactory.deleteChart = function(){//TODO}
		chartEventFactory.moveChart = function(){//TODO}
		
		var Components = (function(){
		
			var Components = function(partent,chartType){
				this.partent = partent;
				this.chartType = chartType;
			}
			
			Components.prototype.createComponent = function(){//TODO}
			Components.prototype.deleteComponent = function(){//TODO}
			Components.prototype.moveComponent = function(){//TODO}

			return Components;

		})();

		return DockingLayout;

	})();

	
# 부가설명 
<strong>해당 프로젝트는 크롬에 최적화 </strong>되었으며

클로저는 메모리 이슈의 원인이 될뿐 아니라

	var arr = [0,1,2,3,4,5];
	
	for(var ix = 0, ixLen = arr.length; ix < ixLen; ix++){
		
	}
	arr.length = null;
	arr = null;
	
이런 식의 arr.length 부터 null을 처리해주지 않으면 메모리에 남게되는 이슈가 있으며

return 문에서 사용될 변수는

	try{
		return something;
	} finally{
		something.a = null;
		something.b = null;
		something = null
	}

이런 형식의 메모리 관리가 필요하고

예외가 발생하지 않을 블록에

메모리를 관리하기 위해서 return 이후 메모리를 비울수 있도록

catch문 없는 try-finally문을 써야하는 이상한 상황이 생기기때문에

유지보수에 손이 많이가기때문에 클로저 대신

되도록이면 Object.defineProperty를 통해 프로퍼티의 접근제어를 했습니다..

규모가 상당히 커질 것을 고려해 메모리 관리 및  미리 신경써야하기때문입니다.

또한 javascript를 로드할때 defer 속성을 이용해 속도저하의 원인이되는 

쓰레드 블로킹을 조금이라도 완화하기위해 사용했습니다. 


# 크롬에 최적화한 이유

크롬은 <strong>히든 클래스</strong>를 가지고 있어

프로퍼티의 특성을 바꾸지 않을 구조로 가는 

저에게는 히든 클래스를 가진 크롬이 가장 적합하며

배열안의 타입이 변하지 않아 ( <strong>ex) arr = [1,2,3,"a"]</strong> )

배열 탑색의 속도적인 면에서 최적화를 기대할 수 있으나

<strong>IE, 파이어폭스, 사파리 등은  http 요청이 동시에 17개</strong>까지 열리지만

<strong>크롬은 10개까지가 한계</strong>인 점을 고려해 

파일 용량및 순서를 고려해 http 요청을 최적화 할 예정
	
	



