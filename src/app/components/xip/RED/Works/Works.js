import React from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


const Works = () => {

    const photoSrc = [
        { key: 1, text : 'in utero', id : 'inUtero'},
        { key: 2, text : 'articulated anatomy', id : 'articulatedAnatomy'},
        { key: 3, text : 'trauma', id : 'trauma'},
        { key: 4, text : 'isetan denim project', id : 'isetanDenimProject'},
    ]

    return(
        <div style={{display:'flex', alignItems:'center', justifyContent: 'center', width:'100%', height:'100vh'}}>
            <div style={{width:isMobile? '100%' : '50%', height: isMobile?'30%':'40%', textAlign:'center'}}>
                <>
                    {photoSrc.map((e) => {
                        return (
                                <Link to={`./gallery/${e.id}`} key={e.id}>
                                    <PBtn // 샵
                                        id={e.id}
                                        labelText={e.text}
                                        alt={e.id}
                                    >
                                    </PBtn>
                                </Link>
                        )
                    })}
                    <Link to={`./fetus`} key={'fetus'}>
                    <PBtn //fetus
                        id={'fetus'}
                        labelText={'fetus'}
                        alt={'fetus'}
                    >
                    </PBtn>
                    </Link>
                    <Link to={`./newtype`} key={'newtype'}>
                    <PBtn // newtype
                        id={'newtype'}
                        labelText={'new+ype'}
                        alt={'newtype'}
                    >
                    </PBtn>
                    </Link>
                </>
            </div>
        </div>
    )
}
export default Works;
