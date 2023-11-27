import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const Account = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate } = useCommon();

    const { removeCookie } = useCookie();


    // const menulength = photoSrc.length
    const menulength = 3;

    const apiList = {
        selectDetailAccount: {
            api: '/shop/shopR001',
            param: () => {
                return (
                    {}
                )
            }
        }
    }

    const getUserItem = async() => {
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectDetailAccount.api, apiList.selectDetailAccount.param());
            if (resultData === -2 || !resultData || resultData.length < 1){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop', { replace: true })
            }
            else {
                return resultData
            }
        } catch (error) {
            console.log(error);
        } finally {
            commonHideLoading();
        }
    }


    return (
        <>
            <div style={{display:'flex',margin:'15vh 20vh 0 20vh',  /* 위, 오른쪽, 아래, 왼쪽 순서대로 마진 값을 설정 */}}> 
                <div className='logoImage' style={{height: isMobile ? (menulength*5 + 'vh') : (menulength*7 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
                    <PBtn // 샵
                        className='pBtnNoRed'
                        id='Order History'
                        labelText='Order History'
                        alt='Order History'
                    >
                    </PBtn>
                    <PBtn // 샵
                        className='pBtnNoRed'
                        id='Account Details'
                        labelText='Account Details'
                        alt='Account Details'
                        onClick={async() => {
                            let item = await getUserItem();
                            navigate('./accountDetails', {state: item})
                        }}
                    >
                    </PBtn>
                </div>
            </div>
        </>
        
    )
}
export default Account;