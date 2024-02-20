
import React from 'react';
import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';



const MusicBtn = (props) => {
    
    return(
        <>
            {props.playState ?
                /* 음악이 재생되는중 */
                <ImgBtn  
                    className='soundBtn imgBtnNoHover'
                    style={{width: isMobile ?'6vw':'2vw', right: '20px', bottom: '20px'}}
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundControl.webp'} 
                    alt='startBtn' 
                    onClick={()=>{
                        props.musicSwitch(false)  // 음악 스탑
                    }}
                    >
                </ImgBtn>
                :
                /* 음악이 멈춰있는중 */
                <ImgBtn  
                    className='soundBtn imgBtnNoHover'
                    style={{width: isMobile ?'6vw':'2vw', right: '20px', bottom: '20px'}}
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundStop.webp'} 
                    alt='startBtn' 
                    onClick={()=>{
                        props.musicSwitch(true) // 음악 재생
                    }}
                    >
                </ImgBtn>
            }
        </>
    )
} 
export default MusicBtn