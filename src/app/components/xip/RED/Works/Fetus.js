import React from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


const Fetus = () => {


    return(
        <div style={{display:'flex', alignItems:'center', justifyContent: 'center', width:'100%', height:'100vh'}}>
            <div style={{width:isMobile? '100%' : '50%', height: isMobile?'30%':'40%', textAlign:'center'}}>
                    <br/><br/><br/><br/>
                    <Link to={'/works/gallery/fetus'} key={'fetus1'}>
                        <PBtn // 샵
                            id={'fetus'}
                            labelText={'fetus'}
                            alt={'fetus'}
                        >
                        </PBtn>
                    </Link>
                    <Link to={'/works/gallery/fetusDetails'} key={'fetusDetails'}>
                        <PBtn // 샵
                            id={'fetusDetails'}
                            labelText={'fetus details'}
                            alt={'fetusDetails'}
                        >
                        </PBtn>
                    </Link>
            </div>
        </div>
    )
}
export default Fetus;
