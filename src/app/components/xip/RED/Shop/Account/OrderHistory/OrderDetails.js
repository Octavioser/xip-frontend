import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const OrderDetails = () => {

    const {orderCd} = useParams();

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const [orderItem, setOrderItem] = useState({});   //  주문 정보 state 에 저장

    const {getCookie, removeCookie} = useCookie();

    const {navigate, commonApi, commonShowLoading, commonHideLoading} = useCommon();

    useEffect(() => {    
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }   
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/shop/shopR006', {orderCd: orderCd});
                if(resultData === -2) {
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else if(!!resultData && resultData.length > 0) {
                    setOrderItem(resultData[0])
                    
                }
                else {
                    navigate('/shop')
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
            
        }
        if(useEffectCheck === 0) { // 처음시작인지 아니면 파라미터가 바뀌었을 경우
            setUseEffectCheck(1);
            getItem();
        }
    },[commonShowLoading, commonHideLoading, commonApi, useEffectCheck, navigate,orderCd,removeCookie,getCookie]);


    const orderStatus = () => {

        let className = 'pBtnNoHover';

        let labelText = orderItem.orderStatus

        let func = () => {}

        if(orderItem.orderStatus === 'SHIPPED') {
            className = 'pBtnNoRed'
            labelText = 'SHIPPED'
            func = () => {
                console.log('운송장번호 조회')
            }
        }
        
        return (
            <PBtn 
                className= {className}
                style={{ 
                    textAlign: 'center', 
                    padding: '3px 6px',
                    border: '2px solid white',  
                    fontSize: '1.5rem'
                }} 
                labelText={labelText}
                onClick={()=> {
                    func();
                }}
            />
        )
    }

    const orderDetailList = () => {
        let list = [...(orderItem?.orderDetails || [])]


        return (
            <>
                {list.map(e => 
                    <div key = {e.prodCdD + 'div0'} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                            <img key = {e.prodCdD + 'img'} src={e.imageSrc} alt={e.name} style={{width: isMobile? '20vw':'9vw'}}/>
                            <div key = {e.prodCdD + 'div1'}>{e.name}</div>
                            <div key = {e.prodCdD + 'div2'}>{'SIZE' + e.prodSize}</div>
                            <div key = {e.prodCdD + 'div3'} style={{display: 'flex', alignItems: 'center', border: '2px solid white'}}>
                                <div key = {e.prodCdD + 'div4'} style={{display: 'inline-block', padding: '1px 10px'}}>{e.prodQty}</div>
                            </div>
                        <div key = {e.prodCdD + 'div5'} >{e.prodPrice}</div>
                    </div>
                )}
            </>
        )
        
    }

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
                        <p></p>
                        <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>{orderItem?.orderCd}</p>
                        <p></p>
                    </div>

                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div style={{width:'49%'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Date Placed</p>
                        </div>
                        <div></div>
                        <div style={{width:'49%', textAlign:'center'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>{orderItem?.orderDt}</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div style={{width:'49%'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>SHIPPING METHOD</p>
                        </div>
                        <div></div>
                        <div style={{width:'49%', textAlign:'center'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>{orderItem?.shippingMethod}</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div style={{width:'49%'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>PAYMENT METHOD</p>
                        </div>
                        <div></div>
                        <div style={{width:'49%', textAlign:'center'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>{orderItem?.payMethod}</p>
                        </div>
                        <div></div>
                    </div>  
                    <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '20px'}}>
                        <div style={{width:'49%'}}>
                            <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>SHIPPING ADDRESS</p>
                        </div>
                        <div></div>
                        <div style={{width:'49%', textAlign:'center'}}>
                            <p style={{margin:0, padding: 1}}>{orderItem?.addLastNm + ', ' + orderItem?.addFirstNm}</p>
                            {!!(orderItem?.company) && <p style={{margin:0, padding: 1}}>{orderItem?.company}</p>}
                            <p style={{margin:0, padding: 1}}>{orderItem?.add1 + ', ' + orderItem?.add2}</p>
                            <p style={{margin:0, padding: 1}}>{orderItem?.state + ', ' + orderItem?.city + ', ' + orderItem?.postalCd}</p>
                            <p style={{margin:0, padding: 1}}>{orderItem?.addCountry}</p>
                            <p style={{margin:0, padding: 1}}>{orderItem?.postalCd}</p>
                            <p></p>
                        </div>
                        <div></div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderBottom: '2px solid #ccc'}}>
                    <p style={{margin: 0, padding: '2px', fontSize:'1.5rem'}}>Order Status</p>
                        <p></p>
                        <p></p>
                        <div>
                            {orderStatus()}
                        </div>
                    </div>
                    
                    <br/>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderBottom: '2px solid #ccc', fontSize:'1.5rem'}}>Order Details</div>
                        {orderDetailList()}
                    <br/><br/>

                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding: '10px', borderTop: '2px solid #ccc', fontSize:'1.5rem'}}>Order Summary</div>

                    <div style={{display: 'flex', justifyContent: 'center', width:'100%'}}>
                        <div style={{width:'95%'}}>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Subtotal</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>{orderItem?.subTotal}</p>
                            </div>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Shipping total</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>{orderItem?.shippingAmount
}</p>
                            </div>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Duties and taxes</p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>Included</p>
                            </div>
                            <br/>
                            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                <p></p>
                                <p style={{margin: 0, fontSize:'1.2rem'}}>ORDER TOTAL {orderItem?.totalAmount}</p>
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