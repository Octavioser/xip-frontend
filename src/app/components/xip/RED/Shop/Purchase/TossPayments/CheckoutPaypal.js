import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common'

const selector = "#payment-widget";

const clientKey = process.env.REACT_APP_API_TOSS_CLIENT_KEY;
const customerKey = nanoid();

const CheckoutPage = (props) => {
    console.log(props)
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(props.totalPrice);
    const { commonShowLoading, commonHideLoading} = useCommon();

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
            {
            value: props.totalPrice,
            currency: 'USD',
            country: 'US'
            },
            { variantKey: 'PAYPAL' } // 해외결제가 추가된 결제 UI의 variantKey
        );
        paymentWidget.renderAgreement('#agreement', { variantKey: `AGREEMENT` })// 영문 이용약관 UI 렌더링

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
        await commonShowLoading();
        // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        let orderName = '';
        let prodQty = 0
        let products = [];
        props.item.forEach((e,i) => { // 제품
            prodQty = prodQty + e.prodQty
            products[i] = {
                name: e.name,
                quantity: e.prodQty,
                unitAmount: e.usPrice,
                currency: 'USD',
                description: e.prodSize
            }
        });
        products.push({ // 배송비
            name: 'shipping fee',
            quantity: 1,
            unitAmount: props.shippingPrice,
            currency: 'USD',
            description: 'shipping fee'
        })
        if(prodQty > 1) {
            orderName = (props?.item[0]?.name || '')  + ' and ' + (prodQty -1) + ' more items'
        }
        else {
            orderName = props?.item[0]?.name || ''
        }
        try {
            await paymentWidget.requestPayment({
                // 결제 정보 파라미터
                orderId: nanoid(),
                orderName: orderName,
                customerName: props.userItem.firstNm + ' ' + props.userItem.lastNm,
                customerEmail: props.userItem.email,
                successUrl: `${window.location.origin}/shop/success/${props.orderMethod}`,
                failUrl: `${window.location.origin}/shop/fail/${props.orderMethod}`,
                // 판매자 보호 및 위험 관리 파라미터
                products: products,
                shipping: {
                    fullName: props.userItem.firstNm + ' ' + props.userItem.lastNm,
                    address: {
                        country: props.userItem.iso2,
                        line1:  props.userItem.add1,
                        line2: props.userItem.add2,
                        area1: props.userItem.state,
                        area2: props.userItem.city,
                        postalCode: props.userItem.postalCd
                    }
                },
                paymentMethodOptions: {
                  // PayPal에서 요구하는 추가 파라미터
                  paypal: {
                    setTransactionContext: {  // PayPal STC 파라미터 예시 (구매자의 로그인 정보)
                      sender_account_id: props.userItem.userCd,
                      sender_first_name: props.userItem.firstNm,
                      sender_last_name: props.userItem.lastNm,
                      sender_email: props.userItem.lastNm,
                    //   sender_phone: '(1) 562 254 5591',
                    //   sender_country_code: 'US',
                    //   sender_create_date: '2012-12-09T 19:14:55.277-0:00'
                    }
                  }
                }
              })
        } catch (error) {
            console.error("Error requesting payment:", error);
        } finally {
            commonHideLoading();
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
            <div className="result wrapper">
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <p style={{color:'black', fontSize:'0.8rem', textAlign:'center'}}>Important: Your order will be shipped to the address saved on our site. Please verify this address before payment.</p>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <PBtn
                    style={{ 
                        marginTop: "30px", 
                        color:'black',
                        textAlign: 'center', 
                        display: 'inline-block', 
                        padding: '3px 6px',
                        border: '2px solid black',  
                        fontSize: '1.3rem',
                    }}
                    onClick={handlePaymentRequest}
                    labelText='CHECK OUT'
                    >
                </PBtn>
                </div>
            </div>
            </div>
        </div>
    );
}
export default CheckoutPage;
