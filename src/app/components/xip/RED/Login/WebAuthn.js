import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import { isMobile } from 'react-device-detect';

const WebAuthn = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [showCreateBtn ,setShowCreateBtn] = useState(false);

    const [email, setEmail] = useState(props.email || '');            // 이메일

    const [pw, setPw] = useState('');                // 비밀번호

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
        props.setMsg('')
        await commonShowLoading();
        const isAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (!!isAvailable) {
            // 생체 인증 기능이 사용 가능하면 등록 또는 로그인 프로세스 진행
            let userIdBase64 = '';
            let challenge = '';
            try {
                if(!pw) {
                    props.setMsg('Please enter your password.')
                    return
                }
                // 비번 체크 및 webAuth등록에 필요한값 가져오기
                let resultData = await commonApi(apiList.createWebAuth.api, await apiList.createWebAuth.param()); 

                if(!resultData || resultData.length < 1) { // 없는 이메일
                    props.setMsg('Incorrect email or password.')
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
                            props.setMsg('Please try again.')
                        }
                        else {
                            props.setMsg('Registration is complete.')
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
            props.setMsg('This device is not supported.')
        }
    }

    // face id 함수
    const continueBtn = async() => {
        props.setMsg('')
        if(!email) {
            props.setMsg('Please enter your email address.')
            return ;
        }
        if(!!email) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                props.setMsg('Incorrect email.')
                return;
            }
        }

        // 이메일 체크 및 인증
        try {
            await commonShowLoading();
            let resultData = await commonApi(apiList.checkWebAuthEmail.api, apiList.checkWebAuthEmail.param()); 

            if(!resultData || resultData.length < 1) { // 없는 이메일
                props.setMsg('Please proceed with registration first.')
                return
            }

            if(!!(resultData[0]?.email)) {   // 회원가입이 된 사용자
                if(!(resultData[0]?.webAuthId)){ // 등록이 되지 않은 사용자
                    setShowCreateBtn(true);
                    setEmailDisabled(true);
                    props.setMsg('Face ID registration is required.')
                    return
                }
                else {  // faceId 로그인 진행
                   await props.webAuthLogin(email, resultData[0].challenge, resultData[0].webAuthId).then((e)=>{
                        if(!e) { // 실패시 패스워드 창 보이게
                            props.setMsg('Please try again.')
                        }
                    })
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
            <p style={{textAlign: 'left'}}>EMAIL</p>
            <input 
                id='email'
                type='email'
                name='email'
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