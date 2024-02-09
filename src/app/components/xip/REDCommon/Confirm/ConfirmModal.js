import Modal from 'react-modal';
import {PBtn} from '../../REDCommon/CommonStyle';
import {isMobile} from 'react-device-detect';
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';

const ConfirmModal = () => {
    
    const { closeConfirm, confirmAction, confirmMessage } = useAppContext();

    return (
        <Modal 
            isOpen={true} 
            onRequestClose={() => closeConfirm()}
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
                    width: isMobile? '90vw':'25vw',
                    height: '20vh',
                    backgroundColor: 'rgba(255, 0, 0, 0.66)',
                    transform: 'translate(-50%, -50%)'
                }
            }}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={false} // 팝업창이 아닌 바깥부분 클릭시 닫히게 할것인지
        >
        <div style={{textAlign: 'center'}}>
            <h3>{confirmMessage}</h3>
        </div>
        {/*닫기버튼*/}
        <PBtn  
            labelText= 'X'
            alt='menuButton' 
            style={{
                fontSize: '2rem',
                position: 'absolute',  // 절대적 위치 설정
                top: '2vh',           // 상단으로부터의 거리
                right: '1vw',         // 오른쪽으로부터의 거리
                height: '3vh'
            }}
            onClick={() =>{closeConfirm()}}
        >
        </PBtn>
        <PBtn  
            labelText= 'YES'
            alt='menuButton' 
            style={{
                fontSize: '2rem',
                position: 'absolute',  // 절대적 위치 설정
                bottom: '2vh',           // 상단으로부터의 거리
                left: '8vw',         // 오른쪽으로부터의 거리
            }}
            onClick={async() =>{
                await confirmAction();
                closeConfirm()
            }}
        >
        </PBtn>
        <PBtn  
            labelText= 'NO'
            alt='menuButton' 
            style={{
                fontSize: '2rem',
                position: 'absolute',  // 절대적 위치 설정
                bottom: '2vh',           // 상단으로부터의 거리
                right: '8vw',         // 오른쪽으로부터의 거리
            }}
            onClick={() =>{closeConfirm()}}
        >
        </PBtn>
        </Modal>
    )
}
export default ConfirmModal;