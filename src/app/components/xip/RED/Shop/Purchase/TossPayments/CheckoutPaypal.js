import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

const CheckoutPage = () => {
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50_000);

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
            value: 664.98,
            currency: 'USD',
            country: 'US'
            },
            { variantKey: 'PAYPAL' } // 해외결제가 추가된 결제 UI의 variantKey
        );
        paymentWidget.renderAgreement('#agreement',{ variantKey: 'AGREEMENT-EN'})// 영문 이용약관 UI 렌더링

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
        try {
            await paymentWidget.requestPayment({
                // 결제 정보 파라미터
                orderId: 'GeK8jNOEnmWHKNf8fMFEF',
                orderName: '토스 티셔츠 외 2건',
                successUrl: `${window.location.origin}/shop/success`,
                failUrl: `${window.location.origin}/shop/fail`,
                customerEmail: 'toss@sample.com',
                customerName: '김토스',
                // 판매자 보호 및 위험 관리 파라미터
                products: [
                  {
                    name: 'NeoPhone',
                    quantity: 1,
                    unitAmount: 114.86,
                    currency: 'USD',
                    description: 'Green color, 2023'
                  },
                  {
                    name: 'NeoPad',
                    quantity: 1,
                    unitAmount: 550.12,
                    currency: 'USD',
                    description: 'Grey color'
                  }
                ],
                shipping: {
                    fullName: 'Toss Kim',
                    address: {
                        country: 'JP',
                        line1: '111111111',
                        line2: '222222222222',
                        area1: 'CA',
                        area2: 'San Jose',
                        postalCode: '16328'
                    }
                    },
                paymentMethodOptions: {
                  // PayPal에서 요구하는 추가 파라미터
                  paypal: {
                    setTransactionContext: {  // PayPal STC 파라미터 예시 (구매자의 로그인 정보)
                      sender_account_id: 'kimToss01',
                      sender_first_name: 'Toss',
                      sender_last_name: 'Kim',
                      sender_email: 'toss@sample.com',
                    //   sender_phone: '(1) 562 254 5591',
                    //   sender_country_code: 'US',
                      sender_create_date: '2012-12-09T 19:14:55.277-0:00'
                    }
                  }
                }
              })
        } catch (error) {
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
            <div className="result wrapper">
                {/* 결제하기 버튼 */}
                <button
                    className="button"
                    style={{ marginTop: "30px" }}
                    onClick={handlePaymentRequest}
                    >
                    결제하기
                </button>
            </div>
            </div>
        </div>
    );
}
export default CheckoutPage;
