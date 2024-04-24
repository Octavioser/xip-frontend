import React from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {Link} from 'react-router-dom';


const NewtypeVideo = () => {

    return(
        <div 
            style={{
                display:'flex', 
                position:'fixed', 
                alignItems:'center', 
                justifyContent: 'center', 
                width:'100%', 
                height:'100%'
            }}>
            <div style={{width:isMobile? '100%' : '50%', height: isMobile?'30%':'40%', textAlign:'center'}}>
                <br/><br/><br/><br/>
                <Link to={'./feb29'} key={'feb29'}>
                    <PBtn // 샵
                        id={'feb29'}
                        labelText={'Feb. 29'}
                        alt={'feb29'}
                    >
                    </PBtn>
                </Link>
            </div>
        </div>
    )
}
export default NewtypeVideo;
