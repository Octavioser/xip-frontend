import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import CreateAccount from './CreateAccount';
import {ImgBtn} from '../../REDCommon/CommonStyle';

const LoginModal = (props) => {

    const [showCreateAccount, setShowCreateAccount] = useState(false) // 회원가입

    const showCreateAccountBtn = () => { // 로그인 팝업창 열기닫기 버튼
        if(showCreateAccount) {
            setShowCreateAccount(false)
        }
        else{
            setShowCreateAccount(true)
        }
    }

    return (
        <Modal 
            isOpen={true} 
            onRequestClose={() => props.loginModalBtn()}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    zIndex: 999 // 최상위
                },
                content: {
                    left: '50%',  /* 왼쪽에서 중앙 */
                    top: '50%',    /* 위에서 중앙*/
                    width: '25vw',
                    height: '40vw',
                    backgroundColor: 'rgba(255, 0, 0, 0.66)',
                    transform: 'translate(-50%, -50%)'
                }
            }}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={false} // 팝업창이 아닌 바깥부분 클릭시 닫히게 할것인지
        >
        {/*닫기버튼*/}
        <ImgBtn  
            src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/closeSlideBtn.webp'} 
            alt='menuButton' 
            style={{height: '3vh'}}
            onClick={() =>{props.loginModalBtn()}}
        >
        </ImgBtn>
        {showCreateAccount ?
            <CreateAccount loginModalBtn={props.loginModalBtn}/>
        :
            <Login showCreateAccountBtn={showCreateAccountBtn} loginModalBtn={props.loginModalBtn}/>
        }
        </Modal>
    )
}

export default LoginModal;