/* global kakao */
import React, { useEffect, useState } from 'react';

const MapContainer = (idx) => {
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

    useEffect(() => {
        
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(myPosition.latitude, myPosition.longitude),
            level: 3
        };

        // map
        const map = new kakao.maps.Map(container, options);

        // 마커를 표시할 위치와 title 객체 배열
        var positions = [
            {
                title: '정순', 
                latlng: new kakao.maps.LatLng(myPosition.latitude, myPosition.longitude),
                image:"img/marker_soon.png"
            },
            {
                title: '영범', 
                latlng: new kakao.maps.LatLng(37.53050019531031, 126.72251599828131),
                image:"img/marker_defalut.png"
            },
            {
                title: '미정', 
                latlng: new kakao.maps.LatLng(37.3582321773491, 126.93296899827823),
                image:"img/marker_mee.png"
            },
            {
                title: '재성',
                latlng: new kakao.maps.LatLng(37.566348088940565, 127.04295426944607),
                image:"img/marker_sorry.png"
            },
            {
                title: '서영',
                latlng: new kakao.maps.LatLng(37.503290447218596, 126.94776267685054),
                image:"img/marker_defalut.png"
            },
            {
                title: '소민',
                latlng: new kakao.maps.LatLng(36.99128209052405, 127.08492735409203),
                image:"img/marker_defalut.png"
            },
            {
                title: '윤정',
                latlng: new kakao.maps.LatLng(37.14590120049749, 127.0672146596489),
                image:"img/marker_defalut.png"
            }
        ];
        
        // 마커를 생성
        for (var i = 0; i < positions.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(68, 70); 
            
            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(positions[i].image, imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage,   // 마커 이미지 
                clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                window.location.href = '/main';
            });
        }

        // 마커를 지도 위에 표시
        marker.setMap(map);

        // 지도에 컨트롤 추가
        var control = new kakao.maps.ZoomControl();
        map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT); 
        
    }, [myPosition]);

    return (
        <div id='map' style={{
            width: '100rem',
            height: '50rem',
            marginBottom: '8rem'
        }}></div>
    );
}

export default MapContainer;