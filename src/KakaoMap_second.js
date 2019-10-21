import React, { Component , createRef} from 'react'
import $script from 'scriptjs';
import * as mapApi from '../../services/maps'

export default class KakaoMap extends Component {
    constructor(props){
        super(props);
        this.appRef = createRef();
        this.state = {
            API_KEY: null,
            setLoading: true,
        }
    }

    componentDidMount() {
        this.getApiKey().then(API_KEY => {
            this.setState({ API_KEY, setLoading: false, });
            this.setKakaoMap();
        });
    }

    componentDidUpdate(){
        if (this.customOverlay){
            this.customOverlay.setMap(null);
            this.customOverlay = null;
        }
        this.setCenter();
        this.setOverLay();
    }

    /**
     * 서버에 api 키 가져오기
     */
    getApiKey = async () => {
        const res = await mapApi.getApiKey();
        return res.data;
    }

    /**
     * 지도 가운데
     */
    setCenter = ()=>{
        var LatLng = this.props.LatLng;
        let { x, y } = LatLng;

        if(typeof this.kakao === 'undefined' || this.kakao == null) return false;


        // 이동할 위도 경도 위치를 생성합니다
        var moveLatLon = new this.kakao.maps.LatLng(y, x);
        // 지도 중심을 이동 시킵니다
        this.map.setCenter(moveLatLon);
    }

    /**
     * 오버레이 생성
     */
    setOverLay = () => {
        var LatLng = this.props.LatLng;
        let { x, y , data} = LatLng;
        // console.log(data);

        if (typeof this.kakao === 'undefined' || this.kakao == null || !data) return false;


        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        var content = `
            <div id="overlay-area" class="arrow_box">
                <ul>
                    <li>${data.address_name}</li>
                    <li>${data.category_name}</li>
                    <li>${data.phone}</li>
                    <li>${data.place_name}</li>
                    <li>${data.place_url}</li>
                <ul>
            </div>
        `;

        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(y, x);

        // 커스텀 오버레이를 생성합니다
        this.customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content
        });

        // 커스텀 오버레이를 지도에 표시합니다
        this.customOverlay.setMap(this.map);
    }

    /**
     * 카카오 맵 생성
     */
    setKakaoMap = ()=>{
        var {x , y} = this.props.LatLng;
        const {API_KEY} = this.state;
        const kakao_url = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}`;
        var that = this;
        $script(kakao_url, () => {
            //console.log();
            // golobal setting

            /*global kakao*/
            this.kakao = kakao;
            kakao.maps.load(function () {
                // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
                that.kakao = kakao;
                that.map = new that.kakao.maps.Map(that.appRef.current, {
                    center: new that.kakao.maps.LatLng(y, x), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                });
            });
        });
    }


    render() {
        const { setLoading } = this.state
        return (
            (setLoading)?
                <div>Looooooooooooading....</div>
                : <div style={{ 'height': '850px' }} ref={this.appRef} />
        )
    }
}
