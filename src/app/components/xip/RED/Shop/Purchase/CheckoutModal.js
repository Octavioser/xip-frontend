import Modal from 'react-modal';
import CheckoutPage from './TossPayments/Checkout';
import CheckoutPagePaypal from './TossPayments/CheckoutPaypal';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import { isMobile } from 'react-device-detect';

const CheckoutModal = (props) => {
    
    const {commonRegion} = useCommon();
    return (
        <Modal 
            isOpen={true} 
            onRequestClose={() => props.seModal()}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    zIndex: 99
                },
                content: {
                    left: '50%',  /* 왼쪽에서 중앙 */
                    top: '50%',    /* 위에서 중앙*/
                    width: isMobile?'80vw' :'30vw',
                    height:'80vh',
                    backgroundColor: 'rgba(255, 255, 255)',
                    transform: 'translate(-50%, -50%)'
                }
            }}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={true} // 팝업창이 아닌 바깥부분 클릭시 닫히게 할것인지
        >
        {commonRegion() === 'KOR' ? 
            <CheckoutPage item={props.prodItem} totalPrice={props.totalPrice} userItem={props.userItem} orderMethod={props.orderMethod}/> 
            : 
            <CheckoutPagePaypal item={props.prodItem} totalPrice={props.totalPrice} userItem={props.userItem} orderMethod={props.orderMethod} shippingPrice={props.shippingPrice}/>}
        </Modal>
    )
}
export default CheckoutModal