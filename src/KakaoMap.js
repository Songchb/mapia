import React, { Component } from 'react'

class KakaoMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      lat: 37.547158,
      lng: 127.006566,
      pickedMarker: this.props.pickedMarker,
    }
  }

  componentDidMount() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	    mapOption = {
        center: new kakao.maps.LatLng(this.state.lat, this.state.lng), // 지도의 중심좌표
        level : 9, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
	    };

		// 지도를 생성한다
		var kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: kakaoMap.getCenter(),
      draggable : true,
    })

    // 마커의 드래그가 종료될 때 마커의 정보를 부모에게 넘겨줍니다
    kakao.maps.event.addListener(marker, 'dragend', () => {
      this.props.handleMapClick(
        marker.getPosition().getLat(),
        marker.getPosition().getLng(),
        marker
      )
    })

    var rectangleBounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(37.472433, 126.908862),
      new kakao.maps.LatLng(37.623232, 127.100093)
    );

    var square = new kakao.maps.Rectangle({
      bounds: rectangleBounds, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: '#FF3DE5', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      fillColor: '#FF8AEF', // 채우기 색깔입니다
      fillOpacity: 0.1 // 채우기 불투명도 입니다
    });

    square.setMap(kakaoMap)

    // 지도에 클릭 이벤트 등록
    kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent) => {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      if(this.props.pickedMarker === null) {
        marker.setMap(kakaoMap);
      }
      this.props.handleMapClick(latlng.getLat(), latlng.getLng(), marker)
    })

    this.setState({
      map: kakaoMap,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // device의 현재 위치를 확인
    if(this.props.deviceLocation !== prevProps.deviceLocation) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            this.props.deviceLocation.lat,
            this.props.deviceLocation.lng
          ),
          map : this.state.map
      });

      // 맵의 중앙을 변합니다
      this.state.map.setCenter(
        new kakao.maps.LatLng(
          this.props.deviceLocation.lat,
          this.props.deviceLocation.lng
        )
      )

      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var iwContent = '<div style="padding: 5px;">'
      +'내 위치'+'</div>'
      //인포윈도우 표시 위치입니다
      var iwPosition = new kakao.maps.LatLng(
        this.props.deviceLocation.lat,
        this.props.deviceLocation.lng
      );

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          position : iwPosition,
          content : iwContent
      });

      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(this.state.map, marker);
    }
  }

  render() {
    return (
      <div>
        <div className="Map" id="map" style={{width:'80%', height:'400px', margin: '10px'}}></div>
      </div>
    )
  }
}

export default KakaoMap


/*

들어가면

상단헤더 로고 + 로그인버튼
게임시작

위치기반 (내 주변으로)
카테고리 (산, 도시, 바다, 관광지)


로드뷰 보여주고 이동 가능,
우하단 찍기 버튼 누르면 지도 팝업 (크기 변경 가능, 확대축소 가능)
찍으면 찍은 위치와 로드뷰의 실제 위치 (이동 전 기존 위치)의 거리 차가 적을수록 점수가 높다


우상단 로그인 시
해당 답의 위치가 괜찮은 곳인지 아닌지,
평점을 매기거나 댓글 쓰기 가능

직접 문제 리스트를 작성 가능

*/
