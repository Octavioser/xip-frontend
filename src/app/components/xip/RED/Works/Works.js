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
        { key: 5, text : 'fetus', id : 'fetus'},
        { key: 6, text : 'fetus details', id : 'fetusDetails'}
    ]
    const menulength = photoSrc.length

    return(
            <div className='logoImage' style={{height: isMobile ? (menulength*5 + 'vh') : (menulength*7 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
            {photoSrc.map((e) => {
                return (
                        <Link to={`./Gallery/?type=${e.id}`} key={e.id}>
                            <PBtn // 샵
                                id={e.id}
                                labelText={e.text}
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
