import React from 'react';
import '../../../../../App.css';
import YouTube from "react-youtube";
import { isMobile } from 'react-device-detect';

// 정보
// https://www.youtube.com/watch?v=-yW0UH67STI
const Masterinnovation = () => {
    const mobileOpts = {
        width: window.innerWidth/1,
        height: window.innerWidth/1.5,
        playerVars: {
          autoplay: 1,
        },
    }
    const opts = {
        width: window.innerWidth/1.5,
        height: window.innerWidth/2.5,
        playerVars: {
          autoplay: 1,
        },
    };
    return (
        /* 유튜브 absolute 중앙 */
        <div>
            <div className='youtube'>  
                {isMobile ? 
                    <YouTube videoId={'-yW0UH67STI'} opts={mobileOpts} onEnd={(e)=>{e.target.stopVideo(0);}} />
                :
                    <YouTube videoId={'-yW0UH67STI'} opts={opts} title= '100' onEnd={(e)=>{e.target.stopVideo(0);}} />
                }
            </div>
        </div>
    );
};
export default Masterinnovation;