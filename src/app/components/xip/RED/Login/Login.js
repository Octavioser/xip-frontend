import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import Common from '../../REDCommon/Common';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';


const Login = (props) => {

    const [email, setEmail] = useState('');            // 이메일
    const [pw, setPw] = useState('');                // 비밀번호
    const [loginFail, setLoginFail] = useState('');      // 이메일 패스워드 틀릴시

    const [, setCookie] = useCookies(['token']); // 쿠키 훅           

    const apiList = {
        login: {
            api: '/login/loginR001',
            param: async() => {
                const encodePw = await Common.CommonEncode(pw);
                return (
                    {email: email, pw: encodePw}
                )
            }
        }
    }

    const continueBtn = async() => {
        if(!pw) {
            setLoginFail(1)
            return
        }
        if(!email) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                setLoginFail(1)
                return
            }
            setLoginFail(1)
            return
        }
        // 로그인(비밀번호까지)
        let resultData = await Common.CommonApi(apiList.login.api, await apiList.login.param());
        if(resultData && resultData.length > 0) {
            
            const expiresTime =  new Date();
            expiresTime.setMinutes(expiresTime.getMinutes() + 10)
            setLoginFail(0)
            setCookie('token', resultData[0].token, {expires: expiresTime}); // 쿠키 저장
            props.loginModalBtn(false)
        }
        else {
            // 로그인 실패 
            setLoginFail(1)
            console.log('resultData==>', resultData)
        }

    }

    const textWidth = isMobile? '35vw' : '15vw'

    return (
        <div className='logoImage' style={{height: '35vh',width: textWidth, textAlign: 'center'}}>
            {loginFail ? <p style={{color:'black'}}>Incorrect email or password</p> : <></>}
            <p style={{textAlign: 'left'}}>EMAIL</p>
            <input 
                id='id'
                type='text' 
                style={{width: textWidth}} 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value.trim())
                }}
                onKeyUp={(e)=> {  
                    if(e.code === "Enter") {
                        continueBtn(); // 엔터 클릭
                    }
                }}
            />
            <p style={{textAlign: 'left'}}>PASSWORD</p>  
            <input 
                id='password' 
                type='password'
                style={{width: textWidth}} 
                value={pw}
                onChange={(e)=>{
                    setPw(e.target.value.trim())
                }}
                onKeyUp={(e)=> {  
                    if(e.code === "Enter") {
                        continueBtn(); // 엔터 클릭
                    }
                }}
            />
            <br/><br/>
            <PBtn 
                labelText='CONTINUE' 
                alt='continue'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={async()=>{
                    continueBtn();
                }}
            >
            </PBtn>
            <br/>
                <PBtn
                    labelText='CREATE ACCOUNT' 
                    alt='create account'
                    style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                    onClick={()=>{
                        props.showCreateAccountBtn();
                    }}
                >
                </PBtn>
        </div>
    )
}

export default Login;