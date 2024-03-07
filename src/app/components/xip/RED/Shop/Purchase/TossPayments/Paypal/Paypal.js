import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
const customerKey = "61FTgvBNHRDZwsgedhjvk" // 내 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID

// async/await을 사용하는 경우
async function main() {

  // ------  결제위젯 초기화 ------
  // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
  const paymentWidget = await loadPaymentWidget(clientKey, customerKey) // 회원 결제
  // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS) // 비회원 결제

  // ------  결제 UI 렌더링 ------
  // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
  // 해외 결제에는 currency, country 정보가 필수입니다.
  // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
  paymentWidget.renderPaymentMethods(
    "#payment-method",
    {
      value: 664.98,
      currency: 'USD',
      country: 'US'
    },
    { variantKey: 'PAYPAL' } // 해외결제가 추가된 결제 UI의 variantKey
)

  // ------  이용약관 UI 렌더링 ------
  // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
  // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
  paymentWidget.renderAgreement(
    '#agreement',
    { variantKey: 'AGREEMENT-EN'} // 영문 이용약관 UI 렌더링
  )

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
  // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
//   button.addEventListener("click", function () {
//     paymentWidget.requestPayment({
//       // 결제 정보 파라미터
//       orderId: 'GeK8jNOEnmWHKNf8fMFEF',
//       orderName: '토스 티셔츠 외 2건',
//       successUrl: 'http://localhost:8080/success',
//       failUrl: 'http://localhost:8080/fail',
//       customerEmail: 'toss@sample.com',
//       customerName: '김토스',
//       // 판매자 보호 및 위험 관리 파라미터
//       // 판매자를 보호하고 위험한 거래를 관리하기 위해 PayPal에 제공되는 정보입니다.
//       // https://docs.tosspayments.com/reference/widget-sdk#판매자-보호-및-위험-관리-파라미터
//       products: [
//         {
//           name: 'NeoPhone',
//           quantity: 1,
//           unitAmount: 114.86,
//           currency: 'USD',
//           description: 'Green color, 2023'
//         },
//         {
//           name: 'NeoPad',
//           quantity: 1,
//           unitAmount: 550.12,
//           currency: 'USD',
//           description: 'Grey color'
//         }
//       ],
//       shipping: {
//         fullName: 'Toss Kim',
//         address: {
//           country: 'US',
//           line1: '2nd st 105',
//           line2: 'unit #105',
//           area1: 'CA',
//           area2: 'San Jose',
//           postalCode: '16328'
//         }
//       },
//       paymentMethodOptions: {
//         // PayPal에서 요구하는 추가 파라미터
//         paypal: {
//           setTransactionContext: {  // PayPal STC 파라미터 예시 (구매자의 로그인 정보)
//             sender_account_id: 'kimToss01',
//             sender_first_name: 'Toss',
//             sender_last_name: 'Kim',
//             sender_email: 'toss@sample.com',
//             sender_phone: '(1) 562 254 5591',
//             sender_country_code: 'US',
//             sender_create_date: '2012-12-09T 19:14:55.277-0:00'
//           }
//         }
//       }
//     })
//   })
}

// Promise를 사용하는 경우
loadPaymentWidget(clientKey, customerKey).then(paymentWidget => {
  // ...
})
