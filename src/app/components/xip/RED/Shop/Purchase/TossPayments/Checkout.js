import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';

const selector = "#payment-widget";

const clientKey = process.env.REACT_APP_API_TOSS_CLIENT_KEY;
const customerKey = nanoid();

const CheckoutPage = (props) => {
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price,] = useState(props.totalPrice); 

    useEffect(() => {
        const fetchPaymentWidget = async () => {
            try {
                const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
                setPaymentWidget(loadedWidget);
            } catch (error) {
                console.error("Error fetching payment widget:", error);
            }
        };

        fetchPaymentWidget();
    }, []);

    useEffect(() => {
        if (paymentWidget == null) {
            return;
        }

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            selector,
            { value: props.totalPrice },
            { variantKey: "DEFAULT" }
        );

        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT-KR" });

        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, [paymentWidget, price]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    const handlePaymentRequest = async () => {
        // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        let orderName = '';
        let prodQty = 0
        props.item.forEach(e => {
            prodQty = prodQty + e.prodQty
        });
        if(prodQty > 1) {
            orderName = (props?.item[0]?.name || '')  + ' 외' + (prodQty -1) + '건'
        }
        else {
            orderName = props?.item[0]?.name || ''
        }
        try {
            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: orderName,
                customerName: props.userItem.firstNm + ' ' + props.userItem.lastNm,
                customerEmail: props.userItem.email,
                customerMobilePhone: props.userItem.phone,
                successUrl: `${window.location.origin}/shop/success/${props.orderMethod}`,
                failUrl: `${window.location.origin}/shop/fail/${props.orderMethod}`,
            });
        } catch (error) {
            alert(error)
            console.error("Error requesting payment:", error);
        }
    };

    return (
        <div className="wrapper">
            <div className="box_section">
            {/* 결제 UI, 이용약관 UI 영역 */}
            <div id="payment-widget" />
            <div id="agreement" />
            <div style={{ paddingLeft: "24px" }}>
            </div>
            
            <div className="result wrapper" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                {/* 결제하기 버튼 */}
                <PBtn
                    style={{ 
                        marginTop: "30px", 
                        color:'black',
                        textAlign: 'center', 
                        display: 'inline-block', 
                        padding: '3px 6px',
                        border: '2px solid black',  
                        fontSize: '1.3rem'}}
                    onClick={handlePaymentRequest}
                    labelText='CHECK OUT'
                    >
                    
                </PBtn>
            </div>
            </div>
        </div>
    );
}
export default CheckoutPage;
