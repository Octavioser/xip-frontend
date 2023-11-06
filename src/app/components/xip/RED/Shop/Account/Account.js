import React from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {Link} from 'react-router-dom';

const Account = () => {

    // const menulength = photoSrc.length
    const menulength = 3;
    return (
        <div style={{display:'flex',margin:'15vh 20vh 0 20vh',  /* 위, 오른쪽, 아래, 왼쪽 순서대로 마진 값을 설정 */}}> 
               <div className='logoImage' style={{height: isMobile ? (menulength*5 + 'vh') : (menulength*7 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
                    <Link to='orderHistory'>
                        <PBtn // 샵
                            className='pBtnNoRed'
                            id='Order History'
                            labelText='Order History'
                            alt='Order History'
                        >
                        </PBtn>
                    </Link>
                    <Link to='accountDetails'>
                        <PBtn // 샵
                            className='pBtnNoRed'
                            id='Account Details'
                            labelText='Account Details'
                            alt='Account Details'
                        >
                        </PBtn>
                    </Link>
                </div>
        </div>
    )
}
export default Account;