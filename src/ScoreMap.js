import React, { Component } from 'react';
// import App2 from './app2.js';

class ScoreMap extends Component {
  componentDidMount() {
    var mapContainer = document.getElementById('scoreMap'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          this.props.pickedLocation.lat,
          this.props.pickedLocation.lng
        ), // 지도의 중심좌표
        level : 13, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
      };

    // 지도를 생성한다
    var kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

    var pickedLocation = new kakao.maps.LatLng(this.props.pickedLocation.lat, this.props.pickedLocation.lng),
      roadViewLocation = new kakao.maps.LatLng(this.props.roadViewLocation.lat, this.props.roadViewLocation.lng)

    var linePath = [
      pickedLocation, roadViewLocation
    ]
    console.log('linePath', linePath)

    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: '#FF0000', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid' // 선의 스타일입니다
    })

    polyline.setMap(kakaoMap)

    var overlayPosition = new kakao.maps.LatLng(
      (this.props.pickedLocation.lat + this.props.roadViewLocation.lat) / 2,
      (this.props.pickedLocation.lng + this.props.roadViewLocation.lng) / 2
    )

    // if(this.props.pickedLocation.lng > this.props.roadViewLocation.lng) overlayPosition = pickedLocation
    // else overlayPosition = roadViewLocation

    // 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
    var distance = Math.round(polyline.getLength())
    var distanceOverlay = new kakao.maps.CustomOverlay({
       content: '<div style="position:relative;bottom:10px;border-radius:6px;'
        +'border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;'
        +'font-size:12px;padding:5px;background:#fff;">'
        +'<span style="font-weight:bold;color:#ee6152;">'
        +(distance > 10000 ? distance/1000:distance)
        +'</span>'
        +(distance>10000?'km':'m')
        +'</div>',
       position: overlayPosition,
       yAnchor: 1,
       zIndex: 2
    });

    var pickedLocationOverlay = new kakao.maps.CustomOverlay({
       content: '<div style="position:relative;bottom:10px;border-radius:6px;'
        +'border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;'
        +'font-size:12px;padding:5px;background:#fff;">찍은곳</div>',
       position: pickedLocation,
       yAnchor: 1,
       zIndex: 2
    });

    var roadViewLocationOverlay = new kakao.maps.CustomOverlay({
       content: '<div style="position:relative;bottom:10px;border-radius:6px;'
        +'border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;'
        +'font-size:12px;padding:5px;background:#fff;">로드뷰</div>',
       position: roadViewLocation,
       yAnchor: 1,
       zIndex: 2
    });

    // 지도에 표시합니다
    distanceOverlay.setMap(kakaoMap);
    pickedLocationOverlay.setMap(kakaoMap);
    roadViewLocationOverlay.setMap(kakaoMap);

    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    var bounds = new kakao.maps.LatLngBounds();
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(linePath[0])
    bounds.extend(linePath[1])
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    kakaoMap.setBounds(bounds);
  }

  render() {
    return (
      <div>
        <div id="scoreMap" style={{ height:'820px', margin: '10px' }}></div>
        <button
          type='button'
          style={{
            width: '100px',
            backgroundColor: '#f8585b',
            color: '#fff',
            padding: '15px 0',
            textAlign: 'center',
            fontSize: '15px',
            margin: '4px',
            float: 'right'
          }}
          onClick={this.props.handleScoreToggle}
        >
          재시도
        </button>
      </div>
    )
  }
}

export default ScoreMap;
