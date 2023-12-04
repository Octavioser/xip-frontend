import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import CreateAccount from './CreateAccount';
import WebAuthn from './WebAuthn';
import {PBtn} from '../../REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';


const LoginModal = (props) => {

    const [showCreateAccount, setShowCreateAccount] = useState(false) // 회원가입

    const [showWebAuthn, setShowWebAuthn] = useState(false) // 회원가입

    const showCreateAccountBtn = () => { // 회원가입 화면
        setShowCreateAccount(true)
    }

    const showWebAuthnBtn = () => { // face id 화면
        setShowWebAuthn(true)
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
                    zIndex: 99
                },
                content: {
                    left: '50%',  /* 왼쪽에서 중앙 */
                    top: '50%',    /* 위에서 중앙*/
                    width: isMobile? '90vw':'25vw',
                    height: isMobile? '80vh':'80vh',
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
                fontSize: '2rem',
                position: 'absolute',  // 절대적 위치 설정
                top: '2vh',           // 상단으로부터의 거리
                right: '1vw',         // 오른쪽으로부터의 거리
                height: '3vh'
            }}
            onClick={() =>{props.loginModalBtn()}}
        >
        </PBtn>
        {(showCreateAccount ||  showWebAuthn)?
        <>
            { showCreateAccount ?
                <CreateAccount loginModalBtn={props.loginModalBtn}/>
                :
                <></>
            }
            { showWebAuthn ?
                <WebAuthn loginModalBtn={props.loginModalBtn}/>
                :
                <></>
            }
        </>
        :
            <Login showCreateAccountBtn={showCreateAccountBtn} showWebAuthnBtn={showWebAuthnBtn} loginModalBtn={props.loginModalBtn}/>
        }
        </Modal>
    )
}

export default LoginModal;