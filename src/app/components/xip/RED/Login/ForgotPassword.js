import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import EmailAuthCode from 'app/components/xip/RED/Login/EmailAuthCode';

const ForgotPassword = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [email, setEmail] = useState(props.email || '');            // 이메일

    const [authCd, setAuthCd] = useState('');            // 이메일 코드

    const [canChangePw, sewCanChangePw] = useState(false)           // 인증코드 확인해서 이메일 변경가능상태

    const [authCdStatus, setAuthCdStatus] = useState(false);          // 이메일 코드 입력창 상태

    const [pw, setPw] = useState('');                       // 비밀번호
    const [confirmPw, setConfirmPw] = useState('');                       // 확인 비밀번호


    const apiList = {
        checkEmail: {
            api: '/login/loginR008',
            param: () => {
                return (
                    {email: email}
                )
            }
        },
        emailAuthCodeCheck: {
            api: '/login/loginR003'
        },
        updatePw: {
            api: '/login/loginU202',
            param: async () => {
                const encodePw = await commonEncode(pw);
                return (
                    {email: email, pw: encodePw, authCd: authCd}
                )
            }
        }
    }

    // 인증코드 보내기
    const sendAuthCodeEmail = async() => {
        if(!email) {
            props.setMsg('Incorrect email.')
            return
        }
        if(!!email ) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                props.setMsg('Incorrect email.')
                return
            }
        }

        // 이메일 체크 및 인증
        try {
            await commonShowLoading();
            let resultData = await commonApi(apiList.checkEmail.api, apiList.checkEmail.param());    // 없으면 0 있으면 1
            if(resultData > 0) {     // 이미 가입된 이메일이여서 이메일 발송
                setAuthCdStatus(true); 
                props.setMsg('Enter the verification code received via email.')
            }
            else if(resultData === 0){   // 새로운 이메일
                // 이메일 코드 입력창 보이게 하기
                props.setMsg('Please register first.')
            }
        } catch (error) {
            props.setMsg('Please try again.')
        } finally {
            commonHideLoading();
        }
    }


    // 인증코드가 맞는 지 확인
    const checkAuthCodeBtn = async(e) => {
        let msg ='';
        if( !!e && String(e).length === 6) {  // 검사
            try {
                await commonShowLoading();
                setAuthCd(e) // 싱크가 안맞다 회원가입 할때 필요
                let resultData = await commonApi(apiList.emailAuthCodeCheck.api, {email: email, authCd: e});
                if (resultData > 0) { // 인증코드가 맞으면
                    msg = 'Please enter a new password.'
                    sewCanChangePw(true);   // 이메일 변경가능
                    setAuthCdStatus(false); // 인증코드 텍스트창 가리기
                }
                else {
                    msg = 'Invalid authentication code. Please try again.'
                }
                props.setMsg(msg)
            } catch (error) {
                props.setMsg('Please try again.')
            } finally {
                commonHideLoading();
            }
        }
        else {
            let msg = 'Incomplete verification code entered.'
            props.setMsg(msg)
            return false;
        }
    }

    // 비밀번호 변경하기 
    const changePw = async() => {
        let msg = ''
        // 비밀번호 검사
        if(!pw || !confirmPw) {
            msg = 'Enter your password.'
            props.setMsg(msg)
            return
        }

        // 비밀번호 동일한지 검사
        if(pw !== confirmPw) {
            msg = 'Passwords does not match.'
            props.setMsg(msg)
            return
        }
        
        if(!(/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw))) { // 8글자 이상 대문자, 숫자 포함
            msg = 'passwords must be at least 8 characters containing one uppercase character and one number'
            props.setMsg(msg)
            return
        }

         // 회원가입
         try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.updatePw.api, await apiList.updatePw.param());
            if(resultData === -1) {
                msg = 'The password has not been changed. Please try again.'
                props.setMsg(msg)
            }
            else {
                props.loginModalBtn()
            }
        } catch (error) {
            props.setMsg('Please try again.')     
        } finally {
            commonHideLoading();
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 제출 로직 처리
    };
    const textWidth = isMobile? '60vw' : '15vw'
    return (
        <div className='logoImage' style={{height: '45vh',width: textWidth, textAlign: 'center'}}>
            <br/>
            {authCdStatus | canChangePw ? <></> : <p style={{color:'black'}}>Forgot Password</p>}
            { authCdStatus ? // // 인증번호 보낸 상태 (확인전)
                <></>
                :
                <>
                    <p style={{textAlign: 'left'}}>EMAIL</p>
                    <input 
                        id='email'
                        type='email'
                        name='email'
                        style={{width: textWidth}} 
                        disabled={canChangePw}
                        value={email}
                        maxLength="50"
                        onChange={(e)=>{
                            setEmail(e.target.value.trim())
                        }}
                        onKeyUp={(e)=> {  
                            if(e.code === "Enter") {
                                changePw();
                            }
                        }}
                    />
                </>
            }
            { authCdStatus && <EmailAuthCode checkAuthCodeBtn={checkAuthCodeBtn}/>}   {/*인증번호 보낸 상태 (확인전)*/ }
            { canChangePw && // 인증번호 보내고 확인한 상태
                <>
                    <p style={{textAlign: 'left'}}>NEW PASSWORD</p>  
                    <form onSubmit={handleSubmit}>
                        <input 
                            id='password' 
                            type='password'
                            autoComplete="off"
                            style={{width: textWidth}} 
                            value={pw}
                            maxLength="50"
                            onChange={(e)=>{
                                setPw(e.target.value.trim())
                            }}
                        />
                    </form>
                    <p style={{textAlign: 'left'}}>CONFIRM PASSWORD</p>  
                    <form onSubmit={handleSubmit}>
                        <input 
                            id='confirm password' 
                            type='password'
                            autoComplete="off"
                            style={{width: textWidth}} 
                            value={confirmPw}
                            maxLength="50"
                            onChange={(e)=>{
                                setConfirmPw(e.target.value.trim())
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter") {
                                    changePw()
                                }
                            }}
                        />
                    </form>
                </>
            }
            <br/><br/><br/>
            { authCdStatus ? // // 인증번호 보낸 상태 (확인전)
                <></>
                :
                <>
                    <PBtn 
                        className= 'pBtnNoRed'
                        labelText='CONTINUE' 
                        alt='continue'
                        style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                        onClick={async()=>{
                            canChangePw ? changePw() : sendAuthCodeEmail()
                        }}
                    >
                    </PBtn>
                </>
            }
            
        </div>
        
    )
}
export default ForgotPassword;