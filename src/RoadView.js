import React, { Component } from 'react'

function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

class RoadView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    var roadviewContainer = document.getElementById('roadview');
    //로드뷰 객체를 생성한다
    var roadview = new kakao.maps.Roadview(roadviewContainer, {
      pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
      tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
      zoom: -1 // 로드뷰 줌 초기값
    });

    var roadviewClient = new kakao.maps.RoadviewClient()
    var rvPosition = new kakao.maps.LatLng(
      randomRange(37472433, 37623232) / 1000000,
      randomRange(126908862, 127100093) / 1000000
    )
    console.log(rvPosition)
    roadviewClient.getNearestPanoId(rvPosition, 100, function(nearPanoId) {
      roadview.setPanoId(nearPanoId, rvPosition);
    })

		// 로드뷰 지도 좌표 변화 이벤트
		kakao.maps.event.addListener(roadview, 'position_changed', () => {
      this.props.handleRoadViewLocation(
        roadview.getPosition().getLat(),
        roadview.getPosition().getLng(),
        roadview.getPanoId()
      )
		})
  }


  render() {
    return (
      <div>
        <div className="Roadview" id="roadview" style={{ width: '80%', height: '400px', margin: '10px'}}></div>
      </div>
    )
  }
}

export default RoadView


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
