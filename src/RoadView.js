import React, { Component } from 'react'

function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

class RoadView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panoId: null,
      roadview: null,
      rvPosition: null,
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
      randomRange(35176832, 37861999) / 1000000,
      randomRange(126693605, 128809716) / 1000000
    );

    roadviewClient.getNearestPanoId(rvPosition, 1000000, function(nearPanoId) {
      roadview.setPanoId(nearPanoId, rvPosition);
    });

    this.props.handleRoadViewMounted(
      roadview.getPosition().getLat(),
      roadview.getPosition().getLng()
    )

    this.setState({
      roadview: roadview,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.rvPosition === null || nextProps.roadViewLocation.lat !== this.state.rvPosition.getLat()) {
      const roadview = this.state.roadview
      if(this.state.roadview !== null) {
        this.setState({
          panoId: roadview.getPanoId(),
          roadview: roadview,
          rvPosition: roadview.getPosition(),
        })

        this.props.handleRoadViewMounted(
          roadview.getPosition().getLat(),
          roadview.getPosition().getLng()
        )
      }

    }
  }

  handleGoOrigin = () => {
    this.state.roadview.setPanoId(this.state.panoId, this.state.rvPosition)
  }

  render() {
    return (
      <div>
        <div className="Roadview" id="roadview" style={{ width: '80%', height: '400px', margin: '10px'}}></div>
        <button type='button' onClick={this.handleGoOrigin}>처음 위치로 돌아가기</button>
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
