import {useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import AccountInfo from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountInfo';
import AccountAdd from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountAdd';
import { useLocation } from 'react-router-dom';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const AccountDetails = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const { openConfirm } = useAppContext();

    const {state} = useLocation();

    const {getCookie, removeCookie} = useCookie();

    useEffect(() => {
        if(!state) { // 유저정보 불러왔는지 체크
            navigate('/shop') 
        }
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
    },[state, navigate, getCookie])

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
            let resultData = await commonApi(apiList.deleteAccount.api, apiList.deleteAccount.param());

            if(resultData === -1) {
                alert('Registration failed. Please try again.')
            }
            else if(resultData === -2){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else {
                alert('Successfully Deleted.')
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }

    return (
        <div style={{position:'relative', top: isMobile?'20vh':'2vh',textAlign: 'center'}}> 
            <h2 style={{textAlign: 'center', letterSpacing: '1.5px'}}>ACCOUNT DETAILS</h2>
            <div style={{width: isMobile? '90%':'60%', margin: 'auto'}}>
                <div style={{ padding: '10px 0', textAlign: 'left', height:'0%'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Your Account</p>
                    <div style={{width: '100%', height:'2px', textAlign: 'center'}}>
                        <hr 
                            style={{
                                border: 'none', 
                                height:'2px', 
                                backgroundColor:'white', 
                                width: '100%',
                                top:'50%',
                                left:'5%',
                                margin: 'auto',
                                transform: 'translateY(-50%)'
                            }}>
                        </hr>
                    </div>
                </div>
                <AccountInfo userItem={!state ? [] : state[0]}/>
                <AccountAdd userItem={!state ? [] : state[0]}/>
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
                        openConfirm( 'Deleting your account will permanently remove all data. This action is irreversible.', () => {clickDeleteAccount()});
                    }}
                >
                </PBtn>
                <br/><br/><br/>
            </div>
        </div>
    )
}
export default AccountDetails;