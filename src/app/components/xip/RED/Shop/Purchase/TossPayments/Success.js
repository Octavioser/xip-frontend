import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { useParams } from 'react-router-dom';

const Success = () => {
    const [searchParams] = useSearchParams();
    const {orderMethod} = useParams();

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const [orderCd, setOrderCd] = useState();
    const [price, setPrice] = useState();

    useEffect(() => {
        // TODO: 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        const confirm = async() => {
            try{
                await commonShowLoading();
                let resultData = await commonApi('/payment/payC101', {...requestData, orderMethod:orderMethod, pgName:'TOSS'});
                if (resultData === -2) {
                    // TODO: 결제 실패 비즈니스 로직을 구현하세요.
                    if(orderMethod === 'cart') {
                        navigate('/shop/cart')
                    }
                    else {
                        navigate(`/shop/detailproduct/${orderMethod}`)
                    }
                    setTimeout(() => alert("Payment failed. Please try again."), 100); // 100ms 후에 실행
                    return;
                }
                setOrderCd(resultData.orderCd)
                let price = '₩' + (Number(requestData.amount)).toLocaleString()
                setPrice(price)
            } catch (error) {
                console.log(error);
            } finally {
                commonHideLoading();
            }
        }
        confirm();
        /* eslint-disable */
    }, []);

    return (
        <>
            <div style={{width:'100%', height:'20vh'}}></div>
            <div style={{display:'flex', width:'100%', minHeight:'80vh', justifyContent:'center', textAlign:'center'}}>
                <div  style={{width:'50%'}}>
                    <img 
                        style={{width: '50%'}}
                        src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/order/xiplogo.webp'} 
                        alt="logo"
                    />
                    <h2 style={{ padding: "20px 0px 10px 0px" }}>
                        Order Complete
                    </h2>
                    <div style={{display:'flex', width:'100%', justifyContent:'center', textAlign:'center'}}>
                        <div style={{width:'50%',color:'black', textAlign:'left'}}>
                            <p>{`Order Number: #XIP-${orderCd}`}</p>
                            <p>{`Price: ${price}`}</p>
                        </div>
                    </div>
                    <div style={{display:'flex', width:'100%', justifyContent:'center', textAlign:'center'}}>
                        <div style={{width:'50%'}}>
                        <PBtn 
                            className= 'pBtnNoRed'
                            style={{ 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '2rem'
                            }}
                            labelText= 'CHECK STATUS'
                            onClick={() => {
                                navigate(`/shop/account/orderdetails/${orderCd}`)
                            }}
                        >
                        </PBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Success