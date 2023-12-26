
import React, {useState} from 'react';
import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';



const MusicBtn = (props) => {

    const [soundBtn, setSoundBtn] = useState('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundControl.webp');  // 음악 실행
    
    return(
        <>
            {soundBtn ?
            <ImgBtn  
                className='soundBtn imgBtnNoHover'
                style={{width: isMobile ?'6vw':'2vw', right: '20px', bottom: '20px'}}
                src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundControl.webp'} 
                alt='startBtn' 
                onClick={()=>{
                    setSoundBtn(props.musicSwitch())  // 음악을 실행시키고 결과 값을 리턴해줌
                }}
                >
            </ImgBtn>
            :
            <ImgBtn  
                className='soundBtn imgBtnNoHover'
                style={{width: isMobile ?'6vw':'2vw', right: '20px', bottom: '20px'}}
                src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundStop.webp'} 
                alt='startBtn' 
                onClick={()=>{
                    setSoundBtn(props.musicSwitch())
                }}
                >
            </ImgBtn>
            }
        </>
    )
} 
export default MusicBtn