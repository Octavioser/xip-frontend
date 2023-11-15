import React from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import AccountInfo from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountInfo';
import AccountAdd from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountAdd';

const AccountDetails = () => {

    return (
        <div style={{position:'relative', top: isMobile?'20vh':'2vh',textAlign: 'center'}}> 
            <h2 style={{textAlign: 'center', letterSpacing: '1.5px'}}>ACCOUNT DETAILS</h2>
            <div style={{width:'60%', margin: 'auto'}}>
                <div style={{ padding: '10px 0', textAlign: 'left', height:'0%'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Your Account</p>
                    <div style={{width: '100%', height:'2px', textAlign: 'center', transform: 'rotate(-1.5deg)'}}>
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
                <AccountInfo/>
                <AccountAdd/>
                <br/><br/>
                <PBtn
                    className= 'pBtnNoRed'
                    style={{ 
                        textAlign: 'center', 
                        width:'15vw', 
                        height:'2vw',
                        border: '2px solid white',  
                        fontSize: '1.3rem',  
                        margin: 'auto',
                    }}
                    labelText= 'DELETE ACCOUNT'
                >
                </PBtn>
            </div>
        </div>
    )
}
export default AccountDetails;