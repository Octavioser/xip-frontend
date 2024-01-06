import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import CreateAccount from './CreateAccount';
import WebAuthn from './WebAuthn';
import ForgotPassword from './ForgotPassword';
import {PBtn} from '../../REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from '../../REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const LoginModal = (props) => {

    const { commonApi } = useCommon();

    const [showCreateAccount, setShowCreateAccount] = useState(false) // 회원가입

    const [showWebAuthn, setShowWebAuthn] = useState(false)           // 생체인증 

    const [showForgotPassword, setShowForgotPassword] = useState(false) // 비밀번호 변경

    const [email, setEmail] = useState('') // 전달할 이메일

    const [message, setMessage] = useState('');      // 이메일 패스워드 틀릴시

    const {setCookie } = useCookie();  

    const apiList = {
        webAuthLoginCheck: {
            api: '/login/loginR006',
            param: (publicKeyCredential) => {
                return (
                    publicKeyCredential
                )
            }
        }
    }

    const setMsg = (e) => {
        setMessage(e)
    }

    const showCreateAccountBtn = (e) => { // 회원가입 화면
        setEmail(e)
        setShowCreateAccount(true)
    }

    const showWebAuthnBtn = (e) => { // face id 화면
        setEmail(e)
        setShowWebAuthn(true)
    }

    const showForgotPasswordBtn = (e) => { // 비밀번호 변경
        setEmail(e)
        setShowForgotPassword(true)
    }

    // arraybuffer를 base64로 만들어주기
    const arrayBufferToBase64 = async(buffer) => {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    }


    // base64를 arraybuffer 만들어주기
    const base64ToArrayBuffer = async(base64) => {
        const binaryString = window.atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // webAuth 로그인
    const webAuthLogin = async (email, challenge, webAuthId) => {
        const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

        if (!!isAvailable) {
            // 생체 인증 기능이 사용 가능하면 등록 또는 로그인 프로세스 진행
            try {
                const publicKeyCredential = await navigator.credentials.get({
                    publicKey: {
                        challenge: await base64ToArrayBuffer(challenge),
                        allowCredentials: [{
                            type: "public-key",
                            id: await base64ToArrayBuffer(webAuthId),
                            // transports: ["internal"]
                        }]
                    }
                });

                if(!publicKeyCredential) {
                    return false
                }
                
                const response = publicKeyCredential.response;
                let publicKeyCredentialJSON = {
                    webAuthId: publicKeyCredential.id,
                    clientDataJSON: await arrayBufferToBase64(response.clientDataJSON),
                    authenticatorData: await arrayBufferToBase64(response.authenticatorData),
                    signature: await arrayBufferToBase64(response.signature),
                    userHandle: await arrayBufferToBase64(response.userHandle), 
                    email: email
                }
                let resultData = await commonApi(apiList.webAuthLoginCheck.api, apiList.webAuthLoginCheck.param(publicKeyCredentialJSON)); 
                if(resultData && resultData.length > 0) {
                    const expiresTime =  new Date();
                    expiresTime.setTime(expiresTime.getTime() + (12 * 60 * 60 * 1000))
                    setMessage('')
                    setCookie('xipToken', resultData[0].token, {path: '/', expires: expiresTime}); // 쿠키 저장
                    props.loginModalBtn(false)
                }
                else {
                    // 로그인 실패 
                    setMessage('Authentication failed.')
                    return false;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        }
        else {
            setMessage('This device is not supported.')
            return false;
        }
       
    };

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
        { showCreateAccount ? <br/> : <><br/><br/><br/><br/><br/></>}
        <p style={{color:'black', textAlign:'center'}}>{message}</p>
        {(showCreateAccount ||  showWebAuthn || showForgotPassword)?
        <>
            { showCreateAccount &&
                <CreateAccount loginModalBtn={props.loginModalBtn} email={email} setMsg={setMsg}/>
            }
            { showWebAuthn &&
                <WebAuthn loginModalBtn={props.loginModalBtn} email={email} setMsg={setMsg} webAuthLogin={webAuthLogin}/>
            }
            { showForgotPassword &&
                <ForgotPassword loginModalBtn={props.loginModalBtn} email={email} setMsg={setMsg} />
            }
        </>
        :
            <Login 
                showCreateAccountBtn={showCreateAccountBtn} 
                showWebAuthnBtn={showWebAuthnBtn} 
                showForgotPasswordBtn={showForgotPasswordBtn}
                loginModalBtn={props.loginModalBtn} 
                webAuthLogin={webAuthLogin} 
                setMsg={setMsg}
            />
        }
        </Modal>
    )
}

export default LoginModal;