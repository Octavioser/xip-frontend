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
            <div style={{display:'flex', alignItems:'center', justifyContent: 'center', width:'100%', height:'100vh'}}>
                <div style={{width:isMobile? '100%' : '50%', height: isMobile?'20%':'30%', textAlign:'center'}}> 
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
                    <br/>
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
                </div>
            </div>
        </>
        
    )
}
export default Account;