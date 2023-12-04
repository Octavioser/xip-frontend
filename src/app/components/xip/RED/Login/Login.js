import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import { isMobile } from 'react-device-detect';

const Login = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [email, setEmail] = useState('');            // 이메일
    const [pw, setPw] = useState('');                // 비밀번호
    const [msg, setMsg] = useState('');      // 이메일 패스워드 틀릴시

    const {setCookie } = useCookie();        

    const apiList = {
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

    const continueBtn = async() => {
        setMsg('')
        if(!pw) {
            setMsg('Incorrect email or password.')
            return
        }
        if(!email) {
            setMsg('Incorrect email or password.')
            return
        }
        if(!!email && !!pw) {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                setMsg('Incorrect email or password.')
                return
            }
        }

        let resultData;

        try {
            await commonShowLoading();
            // setLoading(true)
            // 로그인(비밀번호까지)
            resultData = await commonApi(apiList.login.api, await apiList.login.param())
            if(resultData && resultData.length > 0) {
                const expiresTime =  new Date();
                expiresTime.setTime(expiresTime.getTime() + (12 * 60 * 60 * 1000))
                setMsg('')
                setCookie('xipToken', resultData[0].token, {path: '/', expires: expiresTime}); // 쿠키 저장
                props.loginModalBtn(false)
            }
            else {
                // 로그인 실패 
                setMsg('Incorrect email or password')
                console.log('resultData==>', resultData)
            }
        } catch (error) {

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
            <p style={{color:'black'}}>{msg}</p>
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
                    onKeyDown={(e)=> {  
                        if(e.code === "Enter") {
                            continueBtn(); // 엔터 클릭
                        }
                    }}
                />
            </form>
            <br/><br/>
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
            <br/>
            <PBtn
                className= 'pBtnNoRed'
                labelText='FACE ID LOGIN' 
                alt='faceId'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={async()=>{
                    props.showWebAuthnBtn();
                }}
            >
            </PBtn>
            <br/>
            <PBtn
                className= 'pBtnNoRed'
                labelText='CREATE ACCOUNT' 
                alt='create account'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={()=>{
                    props.showCreateAccountBtn();
                }}
            >
            </PBtn>
            <br/>
            <PBtn
                className= 'pBtnNoRed'
                labelText='FORGOT PASSWORD' 
                alt='forgotPassword'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={()=>{
                    
                }}
            >
            </PBtn>
            
        </div>
    )
}

export default Login;