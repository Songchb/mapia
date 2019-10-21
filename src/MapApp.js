import React, { Component } from 'react';
import KakaoMap from './KakaoMap.js';
// import App2 from './app2.js';

// declare var kakao:any;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 37.557689,
      lng: 127.045289,
      error: null,
      markers: null,
    }
  }

  findMyLocation = () =>  {
    // console.log('current coords : ', this.state.lat, this.state.lng)
    navigator.geolocation.getCurrentPosition(
      pos => {
        // console.log('new coords : ', pos.coords.latitude, pos.coords.longitude)
        this.setState({
          lat: pos.coords.latitude, // 위도
          lng: pos.coords.longitude, // 경도
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h5>당신은 현재 다음 위치에 있습니다.</h5>
          <button type='button' onClick={this.findMyLocation}> 현재위치 찾기 </button>
          <KakaoMap lat={this.state.lat} lng={this.state.lng} markers={this.state.markers} handleLocation={this.handleLocation}/>
        </header>
      </div>
    )
  }
}

export default App;
