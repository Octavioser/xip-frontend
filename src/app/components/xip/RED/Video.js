import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';

// 뮤직비디오
const Video = () =>{
    const cueChoi = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/cueChoi.png';
    const masterinnovation ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/masterinnovation.png';
    const masterinnovationBunka = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/masterinnovation+Bunka.png'


    const menuSize = {height: isMobile ? '3vh':'6vh'}
    const menulength = 4
    return (
        <div className='logoImage' style={{height: isMobile ? (menulength*3 + 'vh') : (menulength*6 + 'vh')}}>
        {/* <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', position:'fixed', top: isMobile ? '16vh':'11vh'}}> */}
             <div style={{textAlign: 'center'}}>
                <ImgBtn
                    src={cueChoi}
                    alt='cueChoi' 
                    onClick={()=>{
                        window.open('https://www.youtube.com/@cuechoi', '_blank') 
                    }}
                    style={menuSize}
                >
                </ImgBtn>
            </div>
            <div style={{textAlign: 'center'}}>
                <Link to = './masterinnovation'>
                    <ImgBtn
                        src={masterinnovation}
                        alt='masterinnovation'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
            </div>
            <div style={{textAlign: 'center'}}>
                <Link to = './masterinnovationBunka'>
                    <ImgBtn
                        src={masterinnovationBunka}
                        alt='masterinnovationBunka'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
            </div>
        </div>
    )
}
export default Video;

