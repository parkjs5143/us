/*global kakao*/ 
import React, { useEffect, useState } from 'react'

const LoginMap=()=>{
    const { kakao } = window;
    const [myPosition, setMyPosition] = useState([]);
    
    // 내 위치 불러오기
    function getLocation() {
        if (navigator.geolocation) { // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(function(position) {
                // alert(position.coords.latitude + ' ' + position.coords.longitude);
                setMyPosition(position.coords);
            }, function(error) {
                console.error(error);
            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: Infinity
            });
        } else {
            alert('GPS를 지원하지 않습니다');
        }
    }
    getLocation();
    console.log(myPosition);

    useEffect(()=>{
        
        // 지도 활성화
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(myPosition.latitude, myPosition.longitude),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        // 마커 표시
        var markerPosition  = new kakao.maps.LatLng(myPosition.latitude, myPosition.longitude); 
        var marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition,
            title : "Seongnam, Korea",
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });
        marker.setMap(map);
        
        // 지도에 컨트롤 추가
        var control = new kakao.maps.ZoomControl();
        map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT); 

    }, [myPosition])

    return (
        <div>
            <div id="map" style={{width:"600px", height:"400px"}}></div> 
        </div>
    )
}

export default LoginMap;