import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';

// 뮤직비디오
const Video = () =>{
    const menulength = 4
    return (
        <div className='logoImage' style={{height: isMobile ? (menulength*3 + 'vh') : (menulength*6 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
        {/* <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', position:'fixed', top: isMobile ? '16vh':'11vh'}}> */}
            <PBtn
                labelText='Cue Choi' 
                alt='cueChoi' 
                onClick={()=>{
                    window.open('https://www.youtube.com/@cuechoi', '_blank') 
                }}
            >
            </PBtn>
            <Link to = './masterinnovation'>
                <PBtn
                    labelText='masterinnovation'
                    alt='masterinnovation'
                    onClick={()=>{

                    }}
                >
                </PBtn>
            </Link>
            <Link to = './masterinnovationBunka'>
                <PBtn
                    labelText='masterinnovation Bunka'
                    alt='masterinnovation Bunka'
                    onClick={()=>{

                    }}
                >
                </PBtn>
            </Link>
        </div>
    )
}
export default Video;

