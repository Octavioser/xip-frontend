import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import AccountInfo from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountInfo';
import AccountAdd from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountAdd';



const AccountDetails = (props) => {
    const userItem = props.userItem;

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
                <AccountInfo userItem={userItem}/>
                <AccountAdd userItem={userItem}/>
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
                >
                </PBtn>
                <br/><br/><br/>
            </div>
        </div>
    )
}
export default AccountDetails;