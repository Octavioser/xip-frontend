import React, { Component} from 'react';
import '../../../../App.css';
import YouTube from "react-youtube";
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';



const kang = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/Night+Kids+Mv.png';
const master ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/masterinnovation.png';
// 뮤직비디오
export default class Video extends Component {

    state = {

        videoId: 'pJ1a-MzZriw'  //https://www.youtube.com/watch?v=pJ1a-MzZriw
    }


    render() {
        const mobileOpts = {
            width: "320px",
            height: "200px",
            playerVars: {
              autoplay: 1,
            },
        }
        const opts = {
            width: "1280",
            height: "720",
            playerVars: {
              autoplay: 1,
            },
        };
         // <YouTube
        //     videoId={string}                  // defaults -> null
        //     id={string}                       // defaults -> null
        //     className={string}                // defaults -> null
        //     containerClassName={string}       // defaults -> ''
        //     title={string}                    // defaults -> null
        //     opts={obj}                        // defaults -> {}
        //     onReady={func}                    // defaults -> noop
        //     onPlay={func}                     // defaults -> noop
        //     onPause={func}                    // defaults -> noop
        //     onEnd={func}                      // defaults -> noop
        //     onError={func}                    // defaults -> noop
        //     onStateChange={func}              // defaults -> noop
        //     onPlaybackRateChange={func}       // defaults -> noop
        //     onPlaybackQualityChange={func}    // defaults -> noop
        // />
        const footerImageStyle = {height: isMobile ? '9vh' : '15vh'}
        return (
            
            <div>
                {/* 유튜브 absolute 중앙 */}
                <div className='youtube'>  
                    {isMobile ? 
                        <YouTube videoId={this.state.videoId} opts={mobileOpts} onEnd={(e)=>{e.target.stopVideo(0);}} />
                    :
                        <YouTube videoId={this.state.videoId} opts={opts} onEnd={(e)=>{e.target.stopVideo(0);}} />
                    }
                </div>
                {/* 맨밑에 간격 정렬 */}
                <div className='footer'>
                    <ImgBtn src={kang} alt='kang' style={footerImageStyle} onClick={(e) => {this.setState({videoId: '4PJu0F21q8I'})}}></ImgBtn>
                    <ImgBtn src={master} alt='kang' style={footerImageStyle} onClick={(e) => {this.setState({videoId: 'pJ1a-MzZriw'})}}></ImgBtn>
                </div>
            </div>
        )
    }
}

