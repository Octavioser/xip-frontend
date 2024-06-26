import React, { useEffect, useState } from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {useLocation} from 'react-router-dom';
import CheckoutModal from './CheckoutModal.js';

const Purchase = () => {

    const {state} = useLocation();   // 메인버튼에서 state 값 받아오기

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonRegion} = useCommon();

    const [modal, seModal] = useState(false);

    const [itemList, setItemList] = useState([]);

    const [orderQty, setOrderQty] = useState(0);

    const [orderSubTotalPrice, setSubOrderTotalPrice] = useState(0);

    const [orderSubTotalUsPrice, setSubOrderTotalUsPrice] = useState(0);

    const [shippingPrice, setShippingPrice] = useState(0);

    const {getCookie, removeCookie} = useCookie();

    const [userItem, setUserItem] = useState({});
    
    useEffect(() => {
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
        if(!state || state['item'].length < 1 || !state['orderMethod'] ) {
            navigate('/shop')
        } 
        else{
            let qty = 0;
            let subTotalPrice = 0;   // 제품가격
            let subTotalUSPrice = 0;   // 달러 제품가격       
            state['item'].forEach(e => {
                qty = qty + e.prodQty
                subTotalPrice = subTotalPrice + e.price * e.prodQty
                subTotalUSPrice = subTotalUSPrice + e.usPrice * e.prodQty
            });
            setOrderQty(qty)
            setSubOrderTotalPrice(subTotalPrice)
            setSubOrderTotalUsPrice(subTotalUSPrice)
            setItemList(state['item'])
        }
        /* eslint-disable */
    },[])


    useEffect(() => {
        if(commonRegion() === 'KOR') {
            setShippingPrice(0)
        }
        else {
            setShippingPrice(userItem.shipFee || 0)
        }
    },[commonRegion(),userItem])


    useEffect(()=>{
        const getUserItem = async() => {
            try{
                await commonShowLoading();
                let resultData = await commonApi('/shop/shopR001', {});
                if (resultData === -2 || !resultData || resultData.length < 1){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    setUserItem(resultData[0])
                }
            } catch (error) {
                console.log(error);
            } finally {
                commonHideLoading();
            }
        }
        getUserItem();
    },[])

    const setOrderList = () => {
        let list = [...itemList];

        return (
            <> 
                {list.map((e, index)=>
                    <div key={index} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',margin: '7px',}}>
                        <span style={{width:'30%'}}>{e.name}</span>
                        <span style={{width:'30%'}}>{'SIZE ' + e.prodSize}</span>
                        <span style={{width:'10%' , textAlign:'center'}}>{e.prodQty}</span>
                        {   commonRegion()  === 'KOR' ?
                            <span style={{width:'30%', textAlign:'right'}}>{'₩' + e.price}</span>
                            :
                            <span style={{width:'30%', textAlign:'right'}}>{'$' + e.usPrice}</span>
                        }
                    </div>
                )}
            </>
            
        )
    }

    const clickCheckOut = () => {
        if(!userItem.addCount) {
            alert("Please add an address in the Acoount Details section." )
            return;
        }
        if((commonRegion()  === 'KOR' && userItem.addCountry === 'KOR') ||
            (commonRegion()  !== 'KOR' && userItem.addCountry !== 'KOR')
        ){
            seModal(true);
            return;
        }
        else {
            alert("Please select the correct region matching your address." )
            return;
        }
        
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height:'100vh', width:'100%'}}>
            <div style={{ display: isMobile?'' : 'flex', position:'relative', justifyContent: 'space-between', top: isMobile?'20vh':'15%', width:isMobile? '95vw':'80vw', height:'85%'}}>
                <div style={{width: isMobile? '100%':'48%', height: isMobile? '30%':'48%'}}>
                <div style={{fontWeight: 'bold',paddingBottom: '10px',borderBottom: '2px solid #ccc',marginBottom: '20px'}}>SHIPPING ADDRESS</div>
                {!!userItem.addCount ?
                    <>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.addLastNm + ', ' + userItem?.addFirstNm}</p>
                        {!!(userItem?.company) && <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.company}</p>}
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.add1 + ', ' + userItem?.add2}</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.state + ', ' + userItem?.city + ', ' + userItem?.postalCd}</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.addCountry}</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>{userItem?.postalCd}</p>
                        <p></p>
                    </>
                    :
                    <>
                        <p>Please ensure that if your address is not in Korea, you change the region to USA.</p>
                        <p>Please add an address in the <a style={{textDecoration: 'underline'}} href="/shop/account/accountdetails">Acoount Details</a> section.</p>
                    </>
                }
            </div>
                <div style={{width: isMobile? '100%':'48%', height:'48%'}}>
                    <div style={{fontWeight: 'bold',paddingBottom: '10px',borderBottom: '2px solid #ccc',marginBottom: '20px',}}>{`ORDER SUMMARY - (${orderQty}) ITEMS`}</div>
                    <div style={{maxHeight: '100px',overflowY: 'scroll'}}>
                        {setOrderList()}
                    </div>
                    <div style={{borderTop: '2px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Subtotal</span>
                        <span>
                            {   commonRegion()  === 'KOR' ?
                                '₩' + orderSubTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                :
                                '$' + orderSubTotalUsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                        </span>
                    </div>
                    <div style={{borderTop: '2px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Shipping total</span>
                        <span>
                            {   (commonRegion()  === 'KOR' ? '₩' : '$')
                                 + shippingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                        </span>
                    </div>
                    <div style={{borderTop: '2px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Order total (USD)</span>
                        <span>
                            {   commonRegion()  === 'KOR' ?
                                '₩' + (orderSubTotalPrice + shippingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                :
                                '$' + (orderSubTotalUsPrice + shippingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                        </span>
                    </div>
                    <div style={{display:'flex', height:'50%',justifyContent: 'center',alignItems: 'center'}}>
                        <PBtn 
                            className='pBtnNoRed'
                            style={{
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '2rem'
                            }}
                            labelText='CHECKOUT'
                            onClick={() => {
                                clickCheckOut();
                            }}
                        >
                        </PBtn>
                    </div>
                </div>
            </div>
            {  modal &&
                <CheckoutModal 
                    seModal={seModal} 
                    userItem={userItem} 
                    prodItem={itemList} 
                    shippingPrice={shippingPrice}
                    orderMethod={state['orderMethod']}
                    totalPrice={   
                        commonRegion()  === 'KOR' ?
                        orderSubTotalPrice + shippingPrice
                        :
                        orderSubTotalUsPrice + shippingPrice
                    }
                    />
            }
        </div>
      );
}
export default Purchase;