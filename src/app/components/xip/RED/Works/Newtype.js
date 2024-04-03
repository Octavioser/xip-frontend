import React from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


const Newtype = () => {

    return(
        <div 
            style={{
                display:'flex', 
                position:'fixed', 
                alignItems:'center', 
                justifyContent: 'center', 
                width:'100%', 
                height:'100%',
                backgroundImage: 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/background/newtypeBackground.webp)',
                backgroundSize: "130% 100%",
            }}>
            <div style={{width:isMobile? '100%' : '50%', height: isMobile?'30%':'40%', textAlign:'center'}}>
                <br/><br/><br/><br/>
                <Link to={'/works/gallery/newtype'} key={'newtype1'}>
                    <PBtn // 샵
                        id={'newtype1'}
                        labelText={'new+ype'}
                        alt={'newtype1'}
                    >
                    </PBtn>
                </Link>
                
                <Link to={'/works/gallery/newtypeDetails'} key={'newtypeDetails'}>
                    <PBtn // 샵
                        id={'newtypeDetails'}
                        labelText={'new+ype details'}
                        alt={'newtypeDetails'}
                    >
                    </PBtn>
                </Link>
            </div>
        </div>
    )
}
export default Newtype;
