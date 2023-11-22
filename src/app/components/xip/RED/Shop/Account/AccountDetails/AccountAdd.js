import React, { useEffect, useState} from 'react';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {getCountryDataList} from 'countries-list'

const AccountAdd = (props) => {
    const userItem = props.userItem;

    const [edit, setEdit] = useState(false);
    
    return(
        <>
            <p style={{display:'flex', fontSize:'1.3rem', textAlign: 'left'}}>ADDRESS</p>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
            {(!!userItem?.addCount) ? 
                <>
                    <p>{userItem?.addLastNm + ', ' + userItem?.addFirstNm}</p>
                    <p>{userItem?.company}</p>
                    <p>{userItem?.add1}</p>
                    <p>{userItem?.add2}</p>
                    <p>{userItem?.state + ', ' + userItem?.city}</p>
                    <p>{userItem?.addCountry + ', ' + userItem?.postalCd}</p>
                    <p>{userItem?.phone}</p>
                </>
            :
                <></>
            }
                
            </div>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                <PBtn
                    className= 'pBtnNoRed'
                    style={{ 
                        textAlign: 'center', 
                        display: 'inline-block', 
                        padding: '3px 6px',
                        border: '2px solid white',  
                        fontSize: '1.2rem',  
                        margin: 'auto',
                    }}
                    labelText= 'EDIT'
                    onClick={() => {
                        setEdit(true)
                    }}
                >
                </PBtn>
            </div>
        </>
    )
}
export default AccountAdd;
