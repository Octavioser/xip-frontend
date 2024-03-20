import React, { useState, useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import AccountInfo from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountInfo';
import AccountAdd from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountAdd';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const AccountDetails = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonConfirm} = useCommon();

    const {getCookie, removeCookie} = useCookie();

    const [userItem, setUserItem] = useState([]);

    useEffect(() => {
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
        const getUserItem = async() => {
            try{
                await commonShowLoading();
                let resultData = await commonApi('/shop/shopR001', {});
                if (!resultData || resultData.length < 1){  // 데이터 없을시
                    navigate('/shop')
                }
                else {
                    setUserItem(resultData)
                }
            } catch (error) {
                console.log(error);
            } finally {
                commonHideLoading();
            }
        }
        getUserItem();
        /* eslint-disable */
    },[])

    const apiList = {
        deleteAccount: {
            api: '/shop/shopD302',
            param: () => {
                return (
                    {}
                )
            }
        }
    }

    

    const clickDeleteAccount = async() => {
        // webauthn 지우기
        try{
            await commonShowLoading();
            await commonApi(apiList.deleteAccount.api, apiList.deleteAccount.param());
            alert('Successfully Deleted.')
            removeCookie('xipToken') // 토큰 오류시 로그아웃
            navigate('/shop')
        } catch (error) {
            alert('Please try again.')
        } finally {
            commonHideLoading();
        }
    }

    return (
        <div style={{position:'relative', marginTop: isMobile?'20vh':'2vh',textAlign: 'center', minHeight:'100vh'}}> 
            <h2 style={{textAlign: 'center', letterSpacing: '1.5px'}}>ACCOUNT DETAILS</h2>
            <div style={{width: isMobile? '95%':'60%', margin: 'auto'}}>
            <p style={{borderBottom: '2px solid #ccc', textAlign: 'left', margin: 0, padding: '2px', fontSize:'1.5rem'}}>Your Account</p>
                {!!userItem[0] &&
                    <>
                        <AccountInfo userItem={userItem[0]}/>
                        <AccountAdd userItem={userItem[0]}/>
                    </>
                }
                <br/><br/><br/>
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
                    labelText= 'DELETE ACCOUNT'
                    onClick={()=>{
                        commonConfirm( 'Deleting your account will permanently remove all data. This action is irreversible.', () => {clickDeleteAccount()});
                    }}
                >
                </PBtn>
                <br/><br/><br/>
            </div>
        </div>
    )
}
export default AccountDetails;