import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import { useCommon }  from 'app/components/xip/REDCommon/Common';

const Account = () => {

    const { navigate } = useCommon();

    const showOrderHistory = () => {
        navigate('./orderhistory')
    }

    const showAccountDetails = () => {
        navigate('./accountdetails')
    }


    return (
        <>
            <div style={{width:'100%', height:'100vh', textAlign:'center'}}>
                <div style={{width:'100%', height: isMobile?'40%':'35%', textAlign:'center'}}/> 
                <PBtn // 샵
                    className='pBtnNoRed'
                    id='Order History'
                    labelText='Order History'
                    alt='Order History'
                    onClick={() => {
                        showOrderHistory();
                    }}
                >
                </PBtn>
                <PBtn // 샵
                    className='pBtnNoRed'
                    id='Account Details'
                    labelText='Account Details'
                    alt='Account Details'
                    onClick={() => {
                        showAccountDetails();
                    }}
                >
                </PBtn>
            </div>
        </>
        
    )
}
export default Account;