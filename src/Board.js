import React, { Component } from 'react'
import KakaoMap from './KakaoMap.js'
import RoadView from './RoadView.js'
import ScoreMap from './ScoreMap.js'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      pickedMarker: null,
      pickedLocation: {
        lat: null,
        lng: null,
      },
      roadViewLocation: {
        panoId: null,
        lat: null,
        lng: null,
      },
      deviceLocation: {
        lat: null,
        lng: null,
      },
      guess: true,
    }
  }

  handleMapClick = (lat, lng, marker) => {
    this.setState({
      pickedMarker: marker,
      pickedLocation: {
        lat: lat,
        lng: lng
      },
    })
  }

  findMyLocation = () =>  {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          deviceLocation: {
            lat: pos.coords.latitude, // 위도
            lng: pos.coords.longitude, // 경도
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  handleRoadViewLocation = (lat, lng, panoId) => {
    this.setState({
      roadViewLocation: {
        panoId: panoId,
        lat: lat,
        lng: lng
      }
    })
  }

  handleScoreToggle = () => {
    const guess = this.state.guess
    this.setState({
      pickedMarker: null,
      guess: !guess
    })
  }

  render () {
    return (
      <div>
        {this.state.guess
          ? <div>
              <RoadView
                handleRoadViewLocation={this.handleRoadViewLocation}
                handleScoreToggle={this.handleScoreToggle}
              />
              <button type='button' onClick={this.findMyLocation}> 현재위치 찾기 </button>
              <KakaoMap
                deviceLocation={this.state.deviceLocation}
                pickedLocation={this.state.pickedLocation}
                pickedMarker={this.state.pickedMarker}
                handleMapClick={this.handleMapClick}
              />
              <h4>로드뷰의 위치를 찍으세요</h4>
              <button type='button' onClick={this.handleScoreToggle}>결과는</button>
            </div>
          : <div>
              <ScoreMap
                pickedLocation={this.state.pickedLocation}
                roadViewLocation={this.state.roadViewLocation}
                handleScoreToggle={this.handleScoreToggle}
              />
            </div>
        }
      </div>
    )
  }
}

export default Board
