import React from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import { useLocation} from 'react-router-dom';
const Footer = () => {
    const { navigate} = useCommon();

    const { pathname } = useLocation();
    
    const footerStyle = {color:'black', padding:'1px', margin:'1px'};

   
      
    return (
        <>  
            {pathname.substring(0,5).toLowerCase() === '/shop'  && 
                <div style={{position: 'relative', bottom:0, left:0, width:'100%', minHeight:'7vh', fontSize:'0.7rem', textAlign:'center'}}>
                <p style={footerStyle}><span style={{fontSize:'1rem'}}>ⓒ XIP</span> BUSINESS NUMBER 424-19-02088 | MAIL-ORDER-SALES REGISTRATION NUMBER 2024-성남분당A-0198 |  CEO PARK JUNHEE | CONTACT 010-5160-6202</p>
                <p style={footerStyle}>804-52, 124, Unjung-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <PBtn  style={footerStyle} labelText='AGREEMENT' onClick={()=>navigate('/shop/termsofuse')}></PBtn>
                    <PBtn  style={footerStyle} labelText='PRIVACY' onClick={()=>navigate('/shop/privacy')}></PBtn>
                    <PBtn  style={footerStyle} labelText='SHIPPING & RETURN POLICY' onClick={()=>navigate('/shop/shipReturn')}></PBtn>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            }
        </>
    )
      
}
export default Footer;