import React from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';

// 정보
const Credit = () => {
    return (    
                <div className='logoImage'>
                    <div style={{display:'flex', justifyContent: 'center', alignItems:'center', minHeight: '100vh'}}>
                    <div style={{color:'white', fontFamily: 'HelveticaNeue', fontSize:'3vw', fontWeight:'bold',textAlign: 'center', lineHeight: isMobile ? '2vh' : '1vh'}}>
                    {isMobile ?
                        <>
                        <h1>www.xip.red</h1>
                        <h1 onClick={()=>{window.open('https://instagram.com/xipchang?igshid=YzA2ZDJiZGQ=', '_blank')}}>@xipchang</h1>
                        <h1 onClick={()=>{window.open('https://instagram.com/xip.red?igshid=YmMyMTA2M2Y=', '_blank')}}>@xip.red</h1>
                        <h1>xxipchang@gmail.com</h1>
                        </>
                        :
                        <>
                        <h3>www.xip.red</h3>
                        <h3 onClick={()=>{window.open('https://instagram.com/xipchang?igshid=YzA2ZDJiZGQ=', '_blank')}}>@xipchang</h3>
                        <h3 onClick={()=>{window.open('https://instagram.com/xip.red?igshid=YmMyMTA2M2Y=', '_blank')}}>@xip.red</h3>
                        <h3>xxipchang@gmail.com</h3>
                        </>
                    }
                    </div>
                    </div>
                </div>
    );
};
export default Credit;
