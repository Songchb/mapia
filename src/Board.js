import React, { Component } from 'react'
import KakaoMap from './KakaoMap.js'
import RoadView from './RoadView.js'
import ScoreMap from './ScoreMap.js'
import AppBar from './AppBar.js'

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
      guess: false,
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
    if(this.state.guess === false && this.state.pickedMarker === null)
      return
    const guess = this.state.guess
    this.setState({
      pickedMarker: null,
      guess: !guess
    })
  }

  render () {
    return (
      <div>
        {!this.state.guess
          ? <div>
              <RoadView
                handleRoadViewLocation={this.handleRoadViewLocation}
                handleScoreToggle={this.handleScoreToggle}
              />
              <KakaoMap
                deviceLocation={this.state.deviceLocation}
                pickedLocation={this.state.pickedLocation}
                pickedMarker={this.state.pickedMarker}
                handleMapClick={this.handleMapClick}
              />
              {/*
              <table style={{ float: 'right' }}>
                <tbody>
                  <tr>
                    <th>
                      <h4>서울시 안에서 로드뷰가 어디일지 찍어보세요</h4>
                    </th>
                    <th>
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
                        }}
                        onClick={this.handleScoreToggle}
                      >
                        결과 확인
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
              */}
            </div>
          : <div>
              <ScoreMap
                pickedLocation={this.state.pickedLocation}
                roadViewLocation={this.state.roadViewLocation}
                handleScoreToggle={this.handleScoreToggle}
              />
            </div>
        }
        <AppBar
          guess={this.state.guess}
          findMyLocation={this.findMyLocation}
          handleScoreToggle={this.handleScoreToggle}
        />
      </div>
    )
  }
}

export default Board
