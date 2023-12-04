import React, { useState} from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import { isMobile } from 'react-device-detect';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';

const WebAuthn = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const {setCookie } = useCookie();  

    const [showCreateBtn ,setShowCreateBtn] = useState(false);

    const [email, setEmail] = useState('');            // 이메일

    const [pw, setPw] = useState('');                // 비밀번호

    const [msg, setMsg] = useState('');      // 이메일 패스워드 틀릴시

    const [emailDisabled, setEmailDisabled] = useState(false); // 이메일 입력 가능여부

    const apiList = {
        checkWebAuthEmail: {
            api: '/login/loginR004',
            param: () => {
                return (
                    {email: email}
                )
            }
        },
        createWebAuth: {
            api: '/login/loginR005',
            param: async() => {
                const encodePw = await commonEncode(pw);
                return (
                    {
                        email: email,
                        pw:encodePw
                    }
                )
            }
        },
        saveCreateWebAuth: {
            api: '/login/loginU201',
            param: (publicKeyCredentialJSON) => {
                return (
                    publicKeyCredentialJSON
                )
            }
        },
        webAuthLoginCheck: {
            api: '/login/loginR006',
            param: (publicKeyCredential) => {
                return (
                    publicKeyCredential
                )
            }
        }
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

    // webAuth 등록
    const handelCreate = async() =>{
        setMsg('')
        await commonShowLoading();
        const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!!isAvailable) {
            // 생체 인증 기능이 사용 가능하면 등록 또는 로그인 프로세스 진행
            let userIdBase64 = '';
            let challenge = '';
            try {
                if(!pw) {
                    setMsg('Please enter your password.')
                    return
                }
                // 비번 체크 및 webAuth등록에 필요한값 가져오기
                let resultData = await commonApi(apiList.createWebAuth.api, await apiList.createWebAuth.param()); 

                if(!resultData || resultData.length < 1) { // 없는 이메일
                    setMsg('Incorrect email or password.')
                    return
                }

                if(!!(resultData[0]?.userIdBase64)) {   // 회원가입이 된 사용자
                    userIdBase64 = resultData[0].userIdBase64
                    challenge = resultData[0].challenge

                    const publicKeyCredential  = await navigator.credentials.create({ 
                        publicKey: {
                            rp: { name: process.env.REACT_APP_API_DOMAIN },
                            user: {
                                name: email,
                                id: await base64ToArrayBuffer(userIdBase64), // 사용자를 식별하는 데 사용되는 ArrayBuffer
                                displayName: email.substring(0,email.indexOf('@'))
                            },
                            pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }], // 사용할 암호 알고리즘
                            challenge: await base64ToArrayBuffer(challenge), // 인증 챌린지, ArrayBuffer
                            authenticatorSelection: { authenticatorAttachment: "platform" }, // 플랫폼에 내장된 인증 수단 사용
                            attestation: "direct" // 공개키 증명서 반환 방법
                        }
                    })
                    let credentialId = publicKeyCredential?.id
                    if(!!credentialId) {
                        const response = publicKeyCredential.response;

                        // Access attestationObject ArrayBuffer
                        const attestationObj = response.attestationObject;

                        // Access client JSON
                        const clientJSON = response.clientDataJSON;

                        // Return public key ArrayBuffer
                        const pk = response.getPublicKey();

                        // Return public key algorithm identifier
                        const pkAlgo = response.getPublicKeyAlgorithm();

                        let publicKeyCredentialJSON = {
                            email: email,
                            clientDataJSON: await arrayBufferToBase64(clientJSON),
                            attestationObject: await arrayBufferToBase64(attestationObj),
                            pk: await arrayBufferToBase64(pk),
                            pkAlgo: pkAlgo
                        }
                        let result = await commonApi(apiList.saveCreateWebAuth.api, apiList.saveCreateWebAuth.param(publicKeyCredentialJSON))
                        if(result < 1) {
                            setMsg('Please try again.')
                        }
                        else {
                            setMsg('Registration is complete.')
                            setShowCreateBtn(false);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                commonHideLoading();
            }
        }
        else {
            setMsg('This device is not supported.')
        }
    }

    // webAuth 로그인
    const handleLogin = async (challenge, webAuthId) => {
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
                             transports: ["internal"]
                        }]
                    }
                });
                
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
                    setMsg('')
                    setCookie('xipToken', resultData[0].token, {path: '/', expires: expiresTime}); // 쿠키 저장
                    props.loginModalBtn(false)
                }
                else {
                    // 로그인 실패 
                    setMsg('Authentication failed.')
                    console.log('resultData==>', resultData)
                }
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setMsg('This device is not supported.')
        }
       
    };

    // face id 함수
    const continueBtn = async() => {
        setMsg('')
        if(!email) {
            setMsg('Please enter your email address.')
            return ;
        }
        if(!!email) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                setMsg('Incorrect email.')
                return;
            }
        }

        // 이메일 체크 및 인증
        try {
            await commonShowLoading();
            let resultData = await commonApi(apiList.checkWebAuthEmail.api, apiList.checkWebAuthEmail.param()); 

            if(!resultData || resultData.length < 1) { // 없는 이메일
                setMsg('Please proceed with registration first.')
                return
            }

            if(!!(resultData[0]?.email)) {   // 회원가입이 된 사용자
                if(!(resultData[0]?.webAuthId)){ // 등록이 되지 않은 사용자
                    setShowCreateBtn(true);
                    setEmailDisabled(true);
                    setMsg('Face ID registration is required.')
                    return
                }
                else {  // faceId 로그인 진행
                    await handleLogin(resultData[0].challenge, resultData[0].webAuthId)
                }   
            }
            else {
                return
            }

        } catch (error) {
            console.log(error);
        } finally {
            commonHideLoading();
        }
    }

    const textWidth = isMobile? '60vw' : '15vw'

    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 제출 로직 처리
    };

    return (
        <>
            <div className='logoImage' style={{height: '35vh',width: textWidth, textAlign: 'center'}}>
            <p style={{color:'black'}}>{msg}</p>
            <p style={{textAlign: 'left'}}>EMAIL</p>
            <input 
                id='id'
                type='text' 
                style={{width: textWidth}} 
                value={email}
                disabled={emailDisabled}
                onChange={(e)=>{
                    setEmail(e.target.value.trim())
                }}
                onKeyUp={(e)=> {  
                    if(e.code === "Enter") {
                        continueBtn(); // 엔터 클릭
                    }
                }}
            />
            {showCreateBtn ?
            <>
                <p style={{textAlign: 'left'}}>PASSWORD</p> 
                <form onSubmit={handleSubmit}>
                    <input 
                        autoComplete="off"
                        id='newpassword' 
                        type='password'
                        style={{width: textWidth}} 
                        value={pw}
                        onChange={(e)=>{
                            setPw(e.target.value.trim())
                        }}
                    />
                </form>
                <br/><br/><br/><br/>
                <PBtn
                    className= 'pBtnNoRed'
                    labelText='CREATE FACE ID' 
                    alt='create account'
                    style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                    onClick={()=>{
                        handelCreate();
                    }}
                >
                </PBtn>
            </>
                :
            <>
                <br/><br/><br/><br/>
                <PBtn 
                    className= 'pBtnNoRed'
                    labelText='CONTINUE' 
                    alt='continue'
                    style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                    onClick={async()=>{
                        continueBtn();
                    }}
                >
                </PBtn>
            </>
            }
            
            </div>
        </>
    )
}

export default WebAuthn;