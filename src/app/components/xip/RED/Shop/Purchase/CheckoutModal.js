import Modal from 'react-modal';
import CheckoutPage from './Checkout';

const CheckoutModal = (props) => {

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
                    width: '80vw',
                    height: '80vh',
                    backgroundColor: 'rgba(255, 255, 255)',
                    transform: 'translate(-50%, -50%)'
                }
            }}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={true} // 팝업창이 아닌 바깥부분 클릭시 닫히게 할것인지
        >
            <CheckoutPage/>
        </Modal>
    )
}
export default CheckoutModal