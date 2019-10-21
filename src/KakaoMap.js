import React, { Component, Fragment } from 'react'

// declare var kakao:any

class KakaoMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      lat: this.props.lat,
      lng: this.props.lng,
      markers: this.props.markers,
    }
  }

  componentDidMount() {

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		    mapOption = {
            center: new kakao.maps.LatLng(this.state.lat, this.state.lng), // 지도의 중심좌표
            level : 3, // 지도의 확대 레벨
		        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
		    };

		// 지도를 생성한다
		var kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

    // kakaoMap.setDraggable(true);

    this.setState({
      map: kakaoMap,
    })


    var roadviewContainer = document.getElementById('roadview');

		// 로드뷰 위치
    // var rvPosition = new kakao.maps.LatLng(37.56613, 126.97837);
		var rvPosition = new kakao.maps.LatLng(this.state.lat, this.state.lng);

		//로드뷰 객체를 생성한다
		var roadview = new kakao.maps.Roadview(roadviewContainer, {
			panoId : 1050215190, // 로드뷰 시작 지역의 고유 아이디 값
      panoX: this.state.lat,
      panoY: this.state.lng,
			// panoX : 126.97837, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값
			// panoY : 37.56613, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값
			pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
			tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
			zoom: -1 // 로드뷰 줌 초기값
		});

    // 로드뷰 초기화 완료 이벤트를 등록한다
		kakao.maps.event.addListener(roadview, 'init', function() {
		    console.log('로드뷰 초기화가 완료되었습니다');
		});

		// 로드뷰 파노라마 ID 변화 이벤트를 등록한다
		kakao.maps.event.addListener(roadview, 'panoid_changed', function() {
		    console.log('로드뷰의 파노라마 ID가 변경되었습니다');
		});

		// 로드뷰 시점 변화 이벤트를 등록한다
		kakao.maps.event.addListener(roadview, 'viewpoint_changed', function() {
			console.log('로드뷰 시점이 변경되었습니다');
		});

		// 로드뷰 지도 좌표 변화 이벤트를 등록한다
		kakao.maps.event.addListener(roadview, 'position_changed', function() {
		    console.log('로드뷰 좌표가 변경되었습니다');
		});

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.map)
    // console.log(this.state.map)
    if(prevState.map !== null)
      console.log('old center : ', prevState.map.getCenter())
    else
      console.log('old map is null')
    if(this.state.map !== null)
      console.log('new center : ', this.state.map.getCenter())
    else
      console.log('new map is null')


    if(this.props.lat !== prevProps.lat && this.props.lng !== prevProps.lng) {
      // console.log('componentDidUpdate!')
      console.log('oldProps', prevProps)
      console.log('newProps', this.props)
      // console.log('this.state.map', this.state.map)
      this.setState({
        lat: this.props.lat,
        lng: this.props.lng,
      })

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(this.props.lat, this.props.lng),
          draggble: true,
          map : this.state.map
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      this.state.map.setCenter(new kakao.maps.LatLng(this.props.lat, this.props.lng))

    } else if(this.state.map !== prevState.map) {
      console.log('handleMapDragged')

      let newLat = this.state.map.getCenter().getLat()
      let newLng = this.state.map.getCenter().getLng()
      this.setState({
        lat: newLat,
        lng: newLng,
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="Map" id="map" style={{width:'80%', height:'500px', margin: '50px'}}></div>
        <div className="Roadview" id="roadview" style={{ width: '80%', height: '400px', margin: '50px'}}></div>
      </Fragment>
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
