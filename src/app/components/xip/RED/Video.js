import React, { Component} from 'react';
import '../../../../App.css';
import YouTube from "react-youtube";

// 뮤직비디오
export default class Video extends Component {



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
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <div className='youtube'>
                    <YouTube videoId={'4PJu0F21q8I'} opts={opts} onEnd={(e)=>{e.target.stopVideo(0);}} />
                </div>
            </div>
        )
    }
}

