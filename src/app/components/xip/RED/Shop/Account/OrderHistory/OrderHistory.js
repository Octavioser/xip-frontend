import React, {useState, useEffect} from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';


const OrderHistory = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonConfirm} = useCommon();

    const {getCookie, removeCookie} = useCookie();

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const [orderList, setOrderList] = useState([]);      // 주문내역

    useEffect(() => {
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
        const getUserItem = async() => {
            try{
                await commonShowLoading();
                let resultData = await commonApi('/shop/shopR005', {});
                if (resultData === -2 || !resultData || resultData.length < 1){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    setOrderList(resultData)
                }
            } catch (error) {
                console.log(error);
            } finally {
                commonHideLoading();
            }
        }
        if(useEffectCheck === 0) {
            setUseEffectCheck(1);
            getUserItem();
        }
        
    },[navigate, getCookie, commonApi, commonHideLoading, commonShowLoading, removeCookie, useEffectCheck])

    const histroyColumn = () => {
        let list = [...orderList] || []
        return(
            <>
                {list.map((e, index) => 
                    <div key={index +'div1'}style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '10px'}}>
                        <div key={index +'div2'} style={{display: 'inline-block', fontSize:'1.1rem'}}>
                            <p>
                                {e.orderDt}<br/>
                                {e.orderStatus}<br/>
                                {'Order #' + e.orderCd}<br/>
                                {e.totalAmount}<br/>
                            </p>
                        </div>
                        <div key={index +'div3'} >
                            <div key={index +'div4'} >
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
                                        navigate('../orderdetails')
                                    }}
                                />
                            </div>
                            <p></p>
                            <div key={index +'div5'}>
                                {e.orderStatus === 'SHIPPED' &&   // 배송중일때 배송조회
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
                                }
                                {e.orderStatus === 'PURCHASED' &&   
                                    <PBtn 
                                        className= 'pBtnNoRed'
                                        style={{ 
                                            textAlign: 'center', 
                                            padding: '3px 6px',
                                            border: '2px solid white',  
                                            fontSize: '1rem'
                                        }} 
                                        labelText='Cancel Order'
                                        onClick={() => {
                                            commonConfirm('Are you sure?', () => {console.log('취소요청!')});
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                )}
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