import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';

const OrderDetails = () => {



    return (
        <div style={{display:'flex', position:'relative', width: '100%', top: isMobile?'13vh':'',
                    flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}} 
         >
            <div style={{ width:isMobile? '100%':'60%'}}>
                <div style={{marginTop:'10vh'}}>
                    <h2 style={{textAlign: 'center', letterSpacing: '1.5px'}}>ORDER DETAILS</h2>
                </div>
                <div style={{ padding: '10px 0', textAlign: 'left', height:'0%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderBottom: '2px solid #ccc'}}>
                        <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Order Number</p>
                        <p></p>
                        <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>000001</p>
                        <p></p>
                    </div>

                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Date Placed</p>
                        </div>
                        <div></div>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>May 3, 2020</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>SHIPPING METHOD</p>
                        </div>
                        <div></div>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Express</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>PAYMENT METHOD</p>
                        </div>
                        <div></div>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>VISA 4934********8697</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>SHIPPING ADDRESS</p>
                        </div>
                        <div></div>
                        <div>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>BILLING ADDRESS</p>
                        </div>
                        <div></div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderBottom: '2px solid #ccc'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Order Status</p>
                        <p></p>
                        <p></p>
                        <div>
                            <PBtn 
                                className= 'pBtnNoRed'
                                style={{ 
                                    textAlign: 'center', 
                                    padding: '3px 6px',
                                    border: '2px solid white',  
                                    fontSize: '1.5rem'
                                }} 
                                labelText='Track Order'
                                onClick={()=> {

                                }}
                            />
                        </div>
                    </div>
                    
                    <br/>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderBottom: '2px solid #ccc', fontSize:'1.5rem'}}>Order Details</div>


                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                        <img src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/products/test/testT.gif" alt="testT" style={{width: isMobile? '20vw':'9vw'}}/>
                        <div>XIP UNIFORM JERSEY</div>
                        <div>SIZE M</div>
                        <div style={{display: 'flex', alignItems: 'center', border: '2px solid white'}}>
                            <div style={{display: 'inline-block', padding: '1px 10px'}}>1</div>
                            </div>
                        <div>₩128,000</div>
                    </div>
                    <br/><br/>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderTop: '2px solid #ccc', fontSize:'1.5rem'}}>Order Summary</div>

                    <div style={{display: 'flex', justifyContent: 'center', width:'100%'}}>
                        <div style={{width:'95%'}}>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Subtotal</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>₩600000</p>
                            </div>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Shipping total</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>₩4500</p>
                            </div>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Duties and taxes</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Included</p>
                            </div>
                            <br/>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p></p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>ORDER TOTAL ₩604500</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    )
}
export default OrderDetails;