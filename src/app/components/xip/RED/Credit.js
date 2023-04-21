import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../REDCommon/CommonStyle';

// 정보
const Credit = () => {
    const menulength = 5
    return (    
        <div className='logoImage' style={{height: isMobile ? '20vh' : '35vh',width: isMobile ? '90%':'50%', textAlign: 'center'}}>
            <>
                <PBtn
                    labelText='www.xip.red'
                    noHover={true}
                >   
                </PBtn>
                <PBtn
                    labelText='@xipchang'
                    onClick={()=>{window.open('https://instagram.com/xipchang?igshid=YzA2ZDJiZGQ=', '_blank')}}
                >
                </PBtn>
                <PBtn
                    labelText='@xip.red'
                    onClick={()=>{window.open('https://instagram.com/xip.red?igshid=YmMyMTA2M2Y=', '_blank')}}
                >
                </PBtn>
                <PBtn
                    labelText='xxipchang@gmail.com'
                    noHover={true}
                >
                </PBtn>
            </>
        </div>
    );
};
export default Credit;
