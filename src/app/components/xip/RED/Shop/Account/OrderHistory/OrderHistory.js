import React, {useState, useEffect} from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';


const OrderHistory = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonConfirm} = useCommon();

    const {getCookie} = useCookie();

    const [orderList, setOrderList] = useState([]);      // 주문내역

    useEffect(() => {
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
        const getUserItem = async() => {
            try{
                await commonShowLoading();
                let resultData = await commonApi('/shop/shopR005', {});
                setOrderList(resultData || [])
            } catch (error) {
                navigate('/shop')
            } finally {
                commonHideLoading();
            }
        }
        getUserItem();
        /* eslint-disable */
    },[])

    const apiList = {
        updateCancleOrder: {
            api: '/shop/shopU204',
            param: (orderCd) => {
                return (
                    {
                        orderCd:orderCd
                    }
                )
            }
        },
        updateCancellingCancel: {
            api: '/shop/shopU205',
            param: (orderCd) => {
                return (
                    {
                        orderCd:orderCd
                    }
                )
            }
        }
    }

    const cancelOrder = async(orderCd, index) => {
        try{
            await commonShowLoading();
            await commonApi(apiList.updateCancleOrder.api, apiList.updateCancleOrder.param(orderCd));
            let list = [...orderList]
            list[index].orderStatus = 'CANCELLING'
            setOrderList(list)
            alert('Request submitted successfully.');
            
        } catch (error) {
            alert('Please try again.');
            let resultData = await commonApi('/shop/shopR005', {});
            setOrderList(resultData || [])
        } finally {
            commonHideLoading();
        }
    }

    const Cancellingcancel = async(orderCd, index) => {
        try{
            await commonShowLoading();
            await commonApi(apiList.updateCancellingCancel.api, apiList.updateCancellingCancel.param(orderCd));
            let list = [...orderList]
            list[index].orderStatus = 'PURCHASED'
            setOrderList(list)
            alert('Order cancellation reversed.')
        } catch (error) {
            alert('Please try again.');
        } finally {
            commonHideLoading();
        }
    }

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
                                {'Order #XIP-' + e.orderCd}<br/>
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
                                        navigate(`../orderdetails/${e.orderCd}`)
                                    }}
                                />
                            </div>
                            <p></p>
                            <div key={index +'div5'}>
                                {e.orderStatus === 'SHIPPED' &&   // 배송중일때 배송조회
                                    <PBtn 
                                        className= 'pBtnNoHover'
                                        style={{ 
                                            textAlign: 'center', 
                                            padding: '3px 6px',
                                            border: '2px solid white',  
                                            fontSize: '1rem'
                                        }} 
                                        labelText='Track Order'
                                    />
                                }
                                {e.orderStatus === 'PURCHASED' && e.cancelAble === '1' &&   
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
                                            commonConfirm('Are you sure?', () => {cancelOrder(e.orderCd, index)});
                                        }}
                                    />
                                }
                                {e.orderStatus === 'CANCELLING' &&   // 배송중일때 배송조회
                                    <PBtn 
                                        className= 'pBtnNoHover'
                                        style={{ 
                                            textAlign: 'center', 
                                            padding: '3px 6px',
                                            border: '2px solid white',  
                                            fontSize: '1rem'
                                        }} 
                                        labelText='Cancelling' 
                                        onClick={() => {
                                            commonConfirm('Cancel the cancellation request?', () => {Cancellingcancel(e.orderCd, index)});
                                        }}
                                    />
                                }
                                {e.orderStatus === 'CANCELLED' &&   // 배송중일때 배송조회
                                    <PBtn 
                                        className= 'pBtnNoHover'
                                        style={{ 
                                            textAlign: 'center', 
                                            padding: '3px 6px',
                                            border: '2px solid white',  
                                            fontSize: '1rem'
                                        }} 
                                        labelText='Cancelled'
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
        <div style={{display:'flex', position:'relative', width: '100%', marginTop: isMobile?'13vh':'',
                    flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}} 
         >
            <div style={{ width:isMobile? '100%':'60%', minHeight:'100vh'}}>
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