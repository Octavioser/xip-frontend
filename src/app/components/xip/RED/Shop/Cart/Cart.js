import React, { useEffect, useState } from 'react';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const Cart = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate } = useCommon();

    const {removeCookie} = useCookie();
    
    const [cartList, setCartList] = useState([]);   //  상품 정보 state 에 저장

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const [totalPrice, setTotalPrice] = useState(0); // 전체 가격

    useEffect(() => {       
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/shop/shopR004', {});
                if(resultData === -1) {
                    alert('Registration failed. Please try again.')
                }
                else if(resultData === -2){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    let totalPrice = 0;
                    resultData.forEach((e) => {
                        totalPrice = totalPrice + (e.price * e.prodQty)
                    })
                    
                    setTotalPrice('₩' + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
                    setCartList(resultData)
                    
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
            
        }
        if(useEffectCheck === 0) { // 처음시작인지 
            setUseEffectCheck(1);
            getItem();
        }
    },[commonShowLoading, commonHideLoading, commonApi, useEffectCheck, navigate,removeCookie]);

    const apiList = {
        updateCartQty: {
            api: '/shop/shopU203',
            param: (prodCdD, prodQty, qtyChangeType) => {
                return (
                    { 
                        prodCdD:prodCdD,
                        prodQty:prodQty,
                        qtyChangeType: qtyChangeType
                    }
                )
            }
        }
    }

    const productQty = {
        up: async(e, prodCdD) => {
            try {
                await commonShowLoading();

                let list = [...cartList]
                let qty = list[e].prodQty + 1

                let resultData = await commonApi(apiList.updateCartQty.api, apiList.updateCartQty.param(prodCdD, qty, 'UP'));

                if(!resultData || resultData === -1 || resultData.length < 1) {
                    alert('Registration failed. Please try again.')
                }
                else if(resultData === -2){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else if(resultData === -3){ // 재고부족
                    alert('The requested quantity is not available.')
                }
                else {
                    list[e].prodQty = qty
                    setCartList(list);
                    getTotalPrice(list);
                }
            } catch (error) {
                console.log(error)
            } finally {
                commonHideLoading();
            }
            
        },

        down: async(e, prodCdD) => {
            try {
                await commonShowLoading();

                let list = [...cartList]
                let qty = list[e].prodQty - 1


                if(qty < 1) {
                    console.log('삭제')
                    return
                }

                let resultData = await commonApi(apiList.updateCartQty.api, apiList.updateCartQty.param(prodCdD, qty, 'DOWN'));

                if(!resultData || resultData === -1 || resultData.length < 1) {
                    alert('Registration failed. Please try again.')
                }
                else if(resultData === -2){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    list[e].prodQty = qty
                    setCartList(list)
                    getTotalPrice(list);
                }
            } catch (error) {
                console.log(error)
            } finally {
                commonHideLoading();
            }
        },

        delete: async(e, prodCdD) => {
            try {
                let list = [...cartList]

                await commonShowLoading();

                let resultData = await commonApi(apiList.updateCartQty.api, apiList.updateCartQty.param(prodCdD, 0, 'DOWN'));

                if(!resultData || resultData === -1 || resultData.length < 1) {
                    alert('Registration failed. Please try again.')
                }
                else if(resultData === -2){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    list.splice(e,1) // 객체삭제
                    setCartList(list)
                    getTotalPrice(list);
                }
            } catch (error) {
                console.log(error)
            } finally {
                commonHideLoading();
            }
        }
    }

    const getTotalPrice = (list) => {
        let totalPrice = 0;
        let item = [...list]
        
        item.forEach((e) => {
            totalPrice = totalPrice + (e.price * e.prodQty)
        })
        
        setTotalPrice('₩' + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
    }

    const clickCheckout = async() => {  // PROCEED TO CHECKOUT 클릭시
        if(!cartList || cartList.length < 1) {
            alert('Please select a product before adding to cart.')
            return;
        }

        // 장바구니 담기
        navigate('/shop/purchase', {state: cartList})  // putchase에 state 값 넘겨주기
    }

    const productColumn = () => {
        
        
        return(
            <>
                {cartList.map((e, index)=> 
                    { 
                        return(
                            <div key={'0div'+index} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '10px'}}>
                                <ImgBtn  
                                    key={'ImgBtn'+index} 
                                    className='imgBtnNoRed'
                                    style={{width: '3%'}} 
                                    src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/cart/closeSlideBtn.webp" 
                                    alt="x"
                                    onClick={()=>{
                                        productQty.delete(index, e.prodCdD)
                                    }}
                                    > 
                                </ImgBtn>
                                <img key={'img'+index} src={e.imageSrc} alt={e.name} style={{width: '15%'}}/>
                                <div key={'1div'+index} style={{width: '20%'}}>{e.name}</div>
                                <div key={'2div'+index} style={{width: '10%'}}>{'SIZE ' + e.prodSize}</div>
                                <div key={'3div'+index} style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between', border: '2px solid white', width:'8%'}}>
                                    <div key={'4div'+index} style={{display: 'inline-block', padding: '1px 10px', width:'100%'}}>{e.prodQty}</div>
                                    <div key={'5div'+index} style={{display: 'inline-block', padding: '1px 3px', textAlign:'right'}}>
                                        <PBtn 
                                            key={'1PBtn'+index} 
                                            className= 'pBtnNoRed' 
                                            style={{display: 'table-cell'}} 
                                            labelText='▲' 
                                            onClick={()=>{
                                                productQty.up(index, e.prodCdD)
                                            }}>
                                        </PBtn>
                                        <PBtn 
                                            key={'2PBtn'+index} 
                                            className= 'pBtnNoRed' 
                                            style={{display: 'inline'}} 
                                            labelText='▼'
                                            onClick={()=>{
                                                productQty.down(index, e.prodCdD)
                                            }}>
                                        </PBtn>
                                    </div>
                                </div>
                                <div key={'6div'+index} style={{textAlign:'right',width: '10%'}}>{'₩' + (e.price * e.prodQty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            </div>
                        )
                    }
                )}
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
                <div style={{textAlign:'right'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.1rem', textAlign:'right', display: 'inline-block', marginRight: '10px'}}>SUBTOTAL</p>
                    <p style={{margin: 0, padding: '2px', fontSize:'0.9rem', textAlign:'right', display: 'inline-block'}}>{totalPrice}</p>                  
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
                                clickCheckout()
                            }}
                        >
                        </PBtn>
                </div>
            </div>
        </div>
    )
}
export default Cart;