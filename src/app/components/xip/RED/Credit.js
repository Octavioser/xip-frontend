import React from 'react';
import '../../../../App.css';
import { ImgBtn } from '../REDCommon/CommonStyle';


const instaLogo = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/credit/insta.png'
// 정보
const Credit = () => {
    return (
                <div className='logoImage' style={{width:'40vw',height:'10vw'}}>
                    <div style={{width:'10vw',height:'10vw', float:'left'}}>
                        <ImgBtn
                            src={instaLogo}
                            alt='instaLogo'
                            style={{width:'10vw',height:'10vw'}}
                            onClick={()=>{
                                window.open('https://instagram.com/xipchang?igshid=YzA2ZDJiZGQ=', '_blank')
                            }}
                        >
                        </ImgBtn>
                    </div>
                    <div style={{width:'3vw',height:'3vw', float:'left'}}>
                        
                    </div>
                    <div style={{width:'10vw',height:'10vw', float:'left',display:'flex',alignItems: 'center', color:'white', fontFamily: 'HelveticaNeue', fontSize:'3vw', fontWeight:'bold'}}>
                        www.xip.red<br></br>xxipchang@gmail.com
                    </div>
                </div>
    );
};
export default Credit;

