import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import { useCommon }  from 'app/components/xip/REDCommon/Common';

const OrderHistory = () => {

    const { navigate} = useCommon();

    const histroyColumn = () => {
        return(
            <>
                <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '10px'}}>
                    
                    <div style={{display: 'inline-block', fontSize:'1.1rem'}}>
                        <p>
                            MAY 4, 2020<br/>
                            SHIPPED<br/>
                            Order 751018807984<br/>
                            ₩427,000<br/>
                        </p>
                    </div>
                    <div>
                        <div>
                            <PBtn 
                                className= 'pBtnNoRed'
                                style={{ 
                                    textAlign: 'center', 
                                    padding: '3px 6px',
                                    border: '2px solid white',  
                                    fontSize: '1rem'
                                }} 
                                labelText='View Details'
                                onClick={()=> {
                                    navigate('../orderDetails')
                                }}
                            />
                        </div>
                        <p></p>
                        <div>
                            <PBtn 
                                className= 'pBtnNoRed'
                                style={{ 
                                    textAlign: 'center', 
                                    padding: '3px 6px',
                                    border: '2px solid white',  
                                    fontSize: '1rem'
                                }} 
                                labelText='Track Order'
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div style={{display:'flex', position:'relative', width: '100vw', height: '100vh', top: isMobile?'13vh':'',
                    flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}} 
         >
            <div style={{ width:isMobile? '100vw':'60vw', height:'100vh'}}>
                <div style={{marginTop:'10vh'}}>
                    <h2 style={{textAlign: 'center', letterSpacing: '1.5px'}}>ACCOUNT</h2>
                </div>
                <p style={{borderBottom: '2px solid #ccc',textAlign:'left', margin: 0, padding: '0px', fontSize:'1.5rem'}}>Order History</p>
                <div>
                    {histroyColumn()}
                </div>
                <br/>
            </div>
        </div>
    )
}
export default OrderHistory;