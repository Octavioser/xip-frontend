import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import { isMobile } from 'react-device-detect';

const Login = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [email, setEmail] = useState('');            // 이메일
    const [pw, setPw] = useState('');                // 비밀번호

    const [showPw, setShowPw] = useState(false) // 패스워드 칸 보이기

    const {setCookie } = useCookie();        


    const apiList = {
        checkEmail:{
            api: '/login/loginR007',
            param: async() => {
                return (
                    {email: email}
                )
            }
        },

        login: {
            api: '/login/loginR001',
            param: async() => {
                const encodePw = await commonEncode(pw);
                return (
                    {email: email, pw: encodePw}
                )
            }
        }
    }

    const emailCheckBtn = async() => {
        props.setMsg('')
        if(!email) {
            props.setMsg('Incorrect email.')
            return
        }
        if(!!email) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                props.setMsg('Incorrect email.')
                return
            }
        }

        let resultData;

        try {
            await commonShowLoading();
            // setLoading(true)
            // 로그인(비밀번호까지)
            resultData = await commonApi(apiList.checkEmail.api, await apiList.checkEmail.param())
            if(resultData && resultData.length > 0) {
                if(!!resultData[0].webAuthId) {  // 생체인증 로그인 등록 되어있는 사람
                    await props.webAuthLogin(email, resultData[0].challenge, resultData[0].webAuthId).then((e)=>{
                        if(!e) { // 실패시 패스워드 창 보이게
                            setShowPw(true);
                        }
                    })
                }
                else{  // 회원가입은 되어있지만 생체인증 등록이 되어있지 않은 사람
                    setShowPw(true);
                }
            }
            else {
                // 신규 고객
                props.showCreateAccountBtn(email);
            }
        } catch (error) {
            props.setMsg('Please try again.')
        } finally {
            commonHideLoading(false)
        }
    }

    const continueBtn = async() => {
        props.setMsg('')
        if(!pw) {
            props.setMsg('Incorrect email or password.')
            return
        }
        if(!email) {
            props.setMsg('Incorrect email or password.')
            return
        }
        if(!!email && !!pw) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                props.setMsg('Incorrect email or password.')
                return
            }
        }

        let resultData;

        try {
            await commonShowLoading();
            // setLoading(true)
            // 로그인(비밀번호까지)
            resultData = await commonApi(apiList.login.api, await apiList.login.param())
            if(!!resultData && resultData.length > 0) {
                const expiresTime =  new Date();
                expiresTime.setTime(expiresTime.getTime() + (12 * 60 * 60 * 1000)) // 12시간 후
                props.setMsg('')
                setCookie('xipToken', resultData[0].token, {path: '/', expires: expiresTime}); // 쿠키 저장
                props.loginModalBtn(false)
            }
            else {
                // 로그인 실패 
                props.setMsg('Incorrect email or password')
            }
        } catch (error) {
            // 로그인 실패 
                props.setMsg('Incorrect email or password')
        } finally {
            commonHideLoading(false)
        }

    }

    

    const textWidth = isMobile? '60vw' : '15vw'

    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 제출 로직 처리
    };

    return (
        <div className='logoImage' style={{height: '35vh',width: textWidth, textAlign: 'center'}}>
            <p style={{textAlign: 'left'}}>EMAIL</p>
            <input 
                id='email'
                type='email'
                name='email'
                autoFocus={true}
                style={{width: textWidth}} 
                value={email}
                maxLength="50"
                onChange={(e)=>{
                    setEmail(e.target.value.trim())
                }}
                onKeyUp={(e)=> {  
                    if(e.code === "Enter") {
                        showPw ? continueBtn() : emailCheckBtn(); // 엔터 클릭
                    }
                }}
            />
            {showPw&&
            <>
                <p style={{textAlign: 'left'}}>PASSWORD</p>  
                <form onSubmit={handleSubmit}>
                    <input 
                        autoComplete="off"
                        id='password' 
                        type='password'
                        style={{width: textWidth}} 
                        value={pw}
                        maxLength="50"
                        onChange={(e)=>{
                            setPw(e.target.value.trim())
                        }}
                        onKeyDown={(e)=> {  
                            if(e.code === "Enter") {
                                continueBtn(); // 엔터 클릭
                            }
                        }}
                    />
                </form>
            </>
            }
            <br/><br/><br/>
            
            <PBtn 
                className= 'pBtnNoRed'
                labelText='CONTINUE' 
                alt='continue'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={async()=>{
                    showPw ? continueBtn() : emailCheckBtn();
                }}
            >
            </PBtn>
            <br/>
            {showPw &&
            <>
            <PBtn
                className= 'pBtnNoRed'
                labelText='FACE ID LOGIN' 
                alt='faceId'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={async()=>{
                    props.showWebAuthnBtn(email);
                }}
            >
            </PBtn>
            <br/><br/><br/><br/><br/>

            
                <PBtn
                    className= 'pBtnNoRed'
                    labelText='CREATE ACCOUNT' 
                    alt='create account'
                    style={{fontSize: '0.7em', whiteSpace:'nowrap'}} 
                    onClick={()=>{
                        props.showCreateAccountBtn(email);
                    }}
                >
                </PBtn>
                <br/>
                <PBtn
                    className= 'pBtnNoRed'
                    labelText='FORGOT PASSWORD' 
                    alt='forgotPassword'
                    style={{fontSize: '0.7em', whiteSpace:'nowrap'}} 
                    onClick={()=>{
                        props.showForgotPasswordBtn(email)
                    }}
                >
                </PBtn>
            </>
            }
        </div>
    )
}

export default Login;