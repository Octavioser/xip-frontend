import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common'

const Cart = () => {

    const {navigate} = useCommon();

    const productColumn = () => {
        return(
            <>
                <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '10px'}}>
                    <ImgBtn className='imgBtnNoRed'style={{width: isMobile? '5vw':'1.6vw'}} src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/cart/closeSlideBtn.webp" alt="x"> </ImgBtn>
                    <img src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/products/test/testT.gif" alt="testT" style={{width: isMobile? '20vw':'9vw'}}/>
                    <div>XIP UNIFORM JERSEY</div>
                    <div>SIZE M</div>
                    <div style={{display: 'flex', alignItems: 'center', border: '2px solid white'}}>
                        <div style={{display: 'inline-block', padding: '1px 10px'}}>1</div>
                            <div style={{display: 'inline-block', padding: '1px 10px'}}>
                                <PBtn className= 'pBtnNoRed' style={{display: 'table-cell'}} labelText='▲'></PBtn>
                                <PBtn className= 'pBtnNoRed' style={{display: 'inline'}} labelText='▼'></PBtn>
                            </div>
                        </div>
                    <div>₩128,000</div>
                </div>
            </>
        )
    }

    return (
        <div style={{display:'flex', width: '100vw', height: '100vh', 
                    flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}} 
         >
            <div style={{ width:isMobile? '100vw':'60vw', height:'100vh'}}>
                <div style={{marginTop:'10vh',top:'5vh'}}>
                    <p style={{fontSize:'1.5rem',textAlign:'center'}}>CART</p>
                </div>
                <div>
                    
                        {productColumn()}
                    
                </div>
                <br/>
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
                <div style={{textAlign:'right'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.1rem', textAlign:'right', display: 'inline-block', marginRight: '10px'}}>SUBTOTAL</p>
                    <p style={{margin: 0, padding: '2px', fontSize:'0.9rem', textAlign:'right', display: 'inline-block'}}>₩600,000</p>                  
                </div>
                <br/><br/>
                <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
                        <PBtn
                            className= 'pBtnNoRed'
                            style={{ 
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '1.2rem'
                            }}
                            labelText= 'CONTINUE SHOPPING'
                            onClick={() => {
                                navigate('/shop')
                            }}
                        >
                        </PBtn>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <PBtn
                            className= 'pBtnNoRed'
                            style={{ 
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '1.2rem'
                            }}
                            labelText= 'PROCEED TO CHECKOUT'
                            onClick={() => {

                            }}
                        >
                        </PBtn>
                </div>
            </div>
        </div>
    )
}
export default Cart;