import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../REDCommon/CommonStyle';

// 정보
const Credit = () => {
    return (    
        <div className='logoImage' style={{height: isMobile ? '20vh' : '20vh',width: isMobile ? '90%':'50%', textAlign: 'center'}}>
            <>
                <PBtn
                    style={{fontSize: '2.5rem'}}
                    labelText='@xip.red'
                    onClick={()=>{window.open('https://instagram.com/xip.red?igshid=YmMyMTA2M2Y=', '_blank')}}
                >
                </PBtn>
                <p></p>
                <PBtn
                    style={{fontSize: '2.5rem'}}
                    className='pBtnNoHover'
                    labelText='contact: xip@xip.red'
                >
                </PBtn>
            </>
        </div>
    );
};
export default Credit;
