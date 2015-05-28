

  function addCenterMarker(map ,lon,lat){

  	var cpoint = new AMap.LngLat(lon,lat);
  	  var cmarker = new AMap.Marker({
	        icon:new AMap.Icon({
	            image:"http://developer.amap.com/wp-content/uploads/2014/06/mark.png",
	            size:new AMap.Size(20, 30),
	            imageOffset:new AMap.Pixel(-32, 0)
	        }),
	        position:cpoint,
	        offset : {
	                x : -10,
	                y : -30
	        },
	        map:map
	    });
  }

  //地点查询函数
		function placeSearch(lon,lat) {
			var cpoint = new AMap.LngLat(lon,lat);
		    var MSearch;
		    //加载服务插件，实例化地点查询类 
		    AMap.service(["AMap.PlaceSearch"], function() {
		        MSearch = new AMap.PlaceSearch({
		            city: "郑州"
		        });
		
		        MSearch.searchNearBy("超市", cpoint, 500, function(status, result){
		        	if(status === 'complete' && result.info === 'OK'){
		        		placeSearch_CallBack(result);
		        	}
		        });
		    });
		}

		function addmarker(i, d) {
		    var lngX = d.location.getLng();
		    var latY = d.location.getLat();
		    var markerOption = {
		        map:map,
		        icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",
		        position:new AMap.LngLat(lngX, latY),
		        topWhenMouseOver:true
		    };
		    var mar = new AMap.Marker(markerOption);
		    marker.push(new AMap.LngLat(lngX, latY));
		 
		    var infoWindow = new AMap.InfoWindow({
		        content:"<h3><font color=\"#00a6ac\">  " + (i + 1) + "." + d.name + "</h3></font>" + TipContents(d.type, d.address, d.tel),
		        size:new AMap.Size(300, 0),
		        autoMove:true,
		        offset:{x:0, y:-20}
		    });
		    windowsArr.push(infoWindow);
		   
		    var aa = function (e) {infoWindow.open(map, mar.getPosition());};
		    AMap.event.addListener(mar, "click", aa);
		}
		//回调函数
		function placeSearch_CallBack(data) {
		    var resultStr = "";
		    var poiArr = data.poiList.pois;
		    var resultCount = data.poiList.pois.length;
		    for (var i = 0; i < data.poiList.pois.length; i++) {
		        resultStr += "<div id='divid" + (i + 1) + "' click='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" + "<td><h3><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h3>";
		        resultStr += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + "</td></tr></table></div>";
		        addmarker(i, poiArr[i]);
		    }
		    map.setFitView();
		}
		function TipContents(type, address, tel) {  //信息窗体内容
		    if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
		        type = "暂无";
		    }
		    if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
		        address = "暂无";
		    }
		    if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
		        tel = "暂无";
		    }
		    var str = "  地址：" + address + "<br />  电话: " + tel + " <br />  类型：" + type;
		    return str;
		}
		//根据数组id打开搜索结果点tip
		function openMarkerTipById1(pointid, thiss) { 
		    thiss.style.background = '#CAE1FF';
		    windowsArr[pointid].open(map, marker[pointid]);
		}
		//鼠标移开后点样式恢复
		function onmouseout_MarkerStyle(pointid, thiss) {
		    thiss.style.background = "";
		}