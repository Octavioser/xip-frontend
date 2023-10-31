import React from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


const Works = () => {

    const photoSrc = [
        { key: 1, id : 'inUtero'},
        { key: 2, id : 'articulatedAnatomy'},
        { key: 3, id : 'trauma'},
        { key: 4, id : 'isetanDenimProject'},
        { key: 5, id : 'fetus'},
        { key: 6, id : 'fetusDetails'}
    ]
    const menulength = photoSrc.length

    return(
            <div className='logoImage' style={{height: isMobile ? (menulength*5 + 'vh') : (menulength*7 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
           {photoSrc.map((e) => {
                return (
                        <Link to={`./Gallery/?type=${e.id}`}>
                            <PBtn // 샵
                                id={e.key}
                                labelText={e.id}
                                alt={e.id}
                            >
                            </PBtn>
                        </Link>
                )
            })}
            </div>
    )
}
export default Works;
