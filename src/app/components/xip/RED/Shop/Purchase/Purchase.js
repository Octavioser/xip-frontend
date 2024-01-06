import React, { useEffect, useState } from 'react';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {useLocation} from 'react-router-dom';
import CheckoutModal from './CheckoutModal.js';

const Purchase = () => {

    const {state} = useLocation();   // 메인버튼에서 state 값 받아오기

    const { commonShowLoading, commonHideLoading, commonApi, navigate } = useCommon();

    const [modal, seModal] = useState(false);

    const [itemList, setItemList] = useState([]);

    const [orderQty, setOrderQty] = useState(0);

    const [orderSubTotalPrice, setSubOrderTotalPrice] = useState(0);

    const [shippingPrice, setShippingPrice] = useState(3000);

    useEffect(() => {
        if(!state && state.length < 1) {
            navigate('/shop')
        } 
        else{
            let qty = 0;
            let subTotalPrice = 0;   // 제품가격       
            state.forEach(e => {
                qty = qty + e.prodQty
                subTotalPrice = subTotalPrice + e.price * e.prodQty
            });
            setOrderQty(qty)
            setSubOrderTotalPrice(subTotalPrice)
            setItemList(state)
        }
    },[state])

    const setOrderList = () => {
        let list = [...itemList];

        return (
            <> 
                {list.map((e, index)=>
                    <div key={index} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',margin: '7px',}}>
                        <span>{e.name}</span>
                        <span>{'SIZE ' + e.prodSize}</span>
                        <span >{e.prodQty}</span>
                        <span>{'₩' + e.price}</span>
                    </div>
                )}
            </>
            
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width:'100vw', height: '100vh',margin: 0,padding: 0}}>
            <div style={{ display: isMobile?'' : 'flex', position:'relative', justifyContent: 'space-between', top: isMobile?'20vh':'15%', width:isMobile? '95vw':'80vw', height:'85%'}}>
                <div style={{width: isMobile? '90%':'48%', height: isMobile? '30%':'48%'}}>
                    <div style={{fontWeight: 'bold',paddingBottom: '10px',borderBottom: '1px solid #ccc',marginBottom: '20px',}}>SHIPPING ADDRESS</div>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>hyunsuk, lim</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>company</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>7910 SW Nimbus Ave, NYZ46730M</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>Beaverton, Oregon, 97008</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>United States</p>
                        <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}>201-488-0054</p>
                        <p></p>
                </div>
                <div style={{width: isMobile? '90%':'48%', height:'48%'}}>
                    <div style={{fontWeight: 'bold',paddingBottom: '10px',borderBottom: '1px solid #ccc',marginBottom: '20px',}}>{`ORDER SUMMARY - (${orderQty}) ITEMS`}</div>
                    <div style={{maxHeight: '100px',overflowY: 'scroll'}}>
                        {setOrderList()}
                    </div>
                    <div style={{borderTop: '1px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Subtotal</span>
                        <span>{'₩' + orderSubTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div style={{borderTop: '1px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Shipping total</span>
                        <span>{'₩' + shippingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div style={{borderTop: '1px solid #ccc',paddingTop: '10px',display: 'flex',justifyContent: 'space-between',fontWeight: 'bold',marginTop: '20px',}}>
                        <span>Order total (USD)</span>
                        <span>{'₩' + (orderSubTotalPrice + shippingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div style={{display:'flex', height:'50%',justifyContent: 'center',alignItems: 'center'}}>
                        <PBtn 
                            className= 'pBtnNoRed'
                            style={{
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '2rem'
                            }}
                            labelText= 'CHECKOUT'
                            onClick={() => {
                                seModal(true);
                            }}
                        >
                        </PBtn>
                    </div>
                </div>
            </div>
            {  modal &&
                <CheckoutModal seModal={seModal}/>
            }
        </div>
      );
}
export default Purchase;