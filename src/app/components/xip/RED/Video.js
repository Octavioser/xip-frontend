import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';

// 뮤직비디오
const Video = () =>{
    const nightKidsMv = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/Night+Kids+Mv.png';
    const greenCardMv = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/green+card+mv.png'
    const masterinnovation ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/masterinnovation.png';
    const masterinnovationBunka = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/video/masterinnovation+Bunka.png'


    const menuSize = {height: isMobile ? '3vh':'6vh'}
    const menulength = 4
    return (
        <div className='logoImage' style={{height: isMobile ? (menulength*3 + 'vh') : (menulength*6 + 'vh')}}>
        {/* <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', position:'fixed', top: isMobile ? '16vh':'11vh'}}> */}
             <div style={{textAlign: 'center'}}>
                <Link to = './nightKidsMv'>
                    <ImgBtn
                        src={nightKidsMv}
                        alt='nightKidsMv' 
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
            </div>
            <div style={{textAlign: 'center'}}>
                <Link to = './greenCardMv'>
                    <ImgBtn
                        src={greenCardMv}
                        alt='greenCardMv'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
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
                <ImgBtn
                    src={masterinnovationBunka}
                    alt='masterinnovationBunka'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
            </div>
        </div>
    )
}
export default Video;

