import React, { Component } from 'react'

declare var kakao:any

class KakaoMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      map: null,
      lat: this.props.lat,
      lng: this.props.lng,
      markers: this.props.markers
    }
  }

  componentDidMount () {
    var kakaoMap = new kakao.maps.Map(
      document.getElementById('map'),
      {
        center: new kakao.maps.LatLng(this.state.lat, this.state.lng),
        level: 3
      }
    )

    kakaoMap.setDraggable(true)

    this.setState({
      map: kakaoMap
    })
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log(prevState.map)
    // console.log(this.state.map)
    if (prevState.map !== null) console.log('old center : ', prevState.map.getCenter())
    else console.log('old map is null')
    if (this.state.map !== null) console.log('new center : ', this.state.map.getCenter())
    else console.log('new map is null')

    if (this.props.lat !== prevProps.lat && this.props.lng !== prevProps.lng) {
      // console.log('componentDidUpdate!')
      console.log('oldProps', prevProps)
      console.log('newProps', this.props)
      // console.log('this.state.map', this.state.map)
      this.setState({
        lat: this.props.lat,
        lng: this.props.lng
      })

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(this.props.lat, this.props.lng)
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.state.map)
      this.state.map.setCenter(new kakao.maps.LatLng(this.props.lat, this.props.lng))
    } else if (this.state.map !== prevState.map) {
      console.log('handleMapDragged')

      const newLat = this.state.map.getCenter().getLat()
      const newLng = this.state.map.getCenter().getLng()
      this.setState({
        lat: newLat,
        lng: newLng
      })
    }
  }

  render () {
    return (
      <fragment>
        <div className='Map' id='map' style={{ width: '80%', height: '500px', margin: '50px' }} />
      </fragment>
    )
  }
}

export default KakaoMap
