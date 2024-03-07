import Modal from 'react-modal';
import {PBtn} from '../../REDCommon/CommonStyle';
import {isMobile} from 'react-device-detect';
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';

const RegionModal = (props) => {
    const {setRegion} = useAppContext();
    return (
        <Modal 
            isOpen={true} 
            onRequestClose={() => {
                if(props.shopStart){props.setShopStart(false);}
                props.closeConfirm();
            }}
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
        {/*닫기버튼*/}
        <PBtn  
            labelText= 'X'
            alt='menuButton' 
            style={{
                fontSize: '1rem',
                position: 'absolute',  // 절대적 위치 설정
                top: '2vh',           // 상단으로부터의 거리
                right: '1vw',         // 오른쪽으로부터의 거리
                height: '3vh'
            }}
            onClick={() =>{
                if(props.shopStart){props.setShopStart(false);}
                props.closeConfirm();
            }}
        >
        </PBtn>
        <PBtn  
            labelText= 'South Korea, KRW'
            alt='menuButton' 
            style={{
                position: 'absolute',
                textAlign: 'center', 
                display: 'inline-block', 
                padding: '3px 6px',
                border: '2px solid white',  
                fontSize: '1.2rem',  
                margin: 'auto',
                bottom: '10vh',           // 상단으로부터의 거리
                left: '1vw',         // 오른쪽으로부터의 거리
            }}
            onClick={async() =>{
                setRegion('KOR');
                localStorage.setItem('shopRegion', 'KOR');  // 로컬 스토리지에 저장
                if(props.shopStart){props.setShopStart(false);}
                props.closeConfirm();
            }}
        >
        </PBtn>
        <PBtn  
            labelText= 'International, USD'
            alt='menuButton' 
            style={{
                position: 'absolute',
                textAlign: 'center', 
                display: 'inline-block', 
                padding: '3px 6px',
                border: '2px solid white',  
                fontSize: '1.2rem',  
                margin: 'auto',
                bottom: '10vh',           // 상단으로부터의 거리
                right: '1vw',         // 오른쪽으로부터의 거리
            }}
            onClick={() =>{
                setRegion('USA');
                localStorage.setItem('shopRegion', 'USA');  // 로컬 스토리지에 저장
                if(props.shopStart){props.setShopStart(false);}
                props.closeConfirm();
            }}
        >
        </PBtn>
        </Modal>
    )
}
export default RegionModal;