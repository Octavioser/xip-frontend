import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import {useCommon} from '../../REDCommon/Common';
import EmailAuthCode from 'app/components/xip/RED/Login/EmailAuthCode';

const CreateAccount = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [email, setEmail] = useState(props.email || '');                 // 이메일
    const [pw, setPw] = useState('');                       // 비밀번호
    const [confirmPw, setConfirmPw] = useState('');                       // 확인 비밀번호
    const [firstNm, setFirstNm] = useState('');            // 이름(성) 
    const [lastNm, setLastNm] = useState('');            // 이름


    const [authCd, setAuthCd] = useState('');            // 이메일 코드

    const [page1, setPage1] = useState(true);          // 첫번째 페이지 새로운 이메일 입력창 보이는 페이지

    const [page2, setPage2] = useState(false);          // 두번째 페이지 인증번호 입력창 페이지

    const [page3, setPage3] = useState(false);          // 세번째 페이지 회원정보 입력창 페이지


    const apiList = {
        checkEmail: {
            api: '/login/loginR002',
            param: () => {
                return (
                    {email: email}
                )
            }
        },
        emailAuthCodeCheck: {
            api: '/login/loginR003'
        },
        insertCreateAccount: {
            api: '/login/loginC101',
            param: async () => {
                const encodePw = await commonEncode(pw);
                return (
                    {email: email, pw: encodePw, firstNm:firstNm, lastNm:lastNm, authCd: authCd}
                )
            }
        }
    }

    // 이메일 확인버튼
    const continueBtn = async(e) => {
        let msg = ''
        if(page2){ // 새로운 이메일을 입력하고 인증번호 받는 상태
            if( !!e && String(e).length === 6) {  // 검사
                try {
                    await commonShowLoading();
                    setAuthCd(e) // 싱크가 안맞다 회원가입 할때 필요
                    let resultData = await commonApi(apiList.emailAuthCodeCheck.api, {email: email, authCd: e});
                    if (resultData > 0) { // 인증코드가 맞으면
                        msg = ''
                        setPage2(false)    // 인증코드 입력창 닫기
                        setPage3(true)     // 회원정보 기입 창 보이게하기
                    }
                    else {
                        msg = 'Invalid authentication code. Please try again.'
                    }
                    props.setMsg(msg)
                } catch (error) {
                    console.log(error);    
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
        else { // 이메일 검증 단계 page1
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                msg = 'Please enter a valid email address.'
                props.setMsg(msg)
                return
            }
            // 이메일 체크 및 인증
            try {
                await commonShowLoading();
                let resultData = await commonApi(apiList.checkEmail.api, apiList.checkEmail.param());    // 없으면 0 있으면 1
                if(resultData ===1) { // 이미 가입된 이메일이다.
                    props.setMsg('You already have an account.')
                }
                else if(resultData ===0){ // 새로운 이메일
                    setPage1(false);  // 첫번째 페이지 이메일 검사 창   안보이게하기
                    setPage2(true);
                    props.setMsg('Enter the verification code received via email')
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
        }
        
    }

    // 회원가입 버튼
    const creatBtn = async() => {
        let msg = ''
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!emailRegex.test(email)) { // 이메일 유효성 검사
            msg = 'Registration failed. Please try again.'
            props.setMsg(msg)
            return
        }
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
        
        //  이름 검사
        if(firstNm.trim() === '' || lastNm.trim() === '') {
            msg = 'Enter your name.'
            props.setMsg(msg)
            return
        }

        // 회원가입
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.insertCreateAccount.api, await apiList.insertCreateAccount.param());
            if(resultData === -1) {
                msg = 'Registration failed. Please try again.'
                props.setMsg(msg)
            }
            else {
                props.loginModalBtn()
            }
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
            
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 제출 로직 처리
    };


    return (
        <div style={{display: 'grid', justifyContent: 'center', width:'100%', height:'80%'}}>
            <div style={{ width: '100%', textAlign: 'center'}}>
                <p style={{color:'black'}}>Create a XIP Account</p>
                
                { (page1 || page3) &&  // 이메일 input
                    <>
                        <p style={{textAlign: 'left'}}>EMAIL</p>
                        <input 
                            id='email'
                            type='email'
                            name='email'
                            style={{width: '100%'}} 
                            value={email}
                            disabled={!page1}
                            maxLength="50"
                            onChange={(e)=>{         
                                setEmail(e.target.value.trim())
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                    </>
                }
                { page2 && // 새로운 이메일한테 인증번호 보낸 상태
                        <EmailAuthCode checkAuthCodeBtn={continueBtn}/>
                }
                { page3 && // 회원가입이 가능한 이메일이면
                <>
                    <p style={{textAlign: 'left'}}>PASSWORD</p>  
                    <form onSubmit={handleSubmit}>
                        <input 
                            id='password' 
                            type='password'
                            autoComplete="off"
                            style={{width: '100%'}} 
                            value={pw}
                            maxLength="50"
                            onChange={(e)=>{
                                setPw(e.target.value.trim())
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter") {
                                    creatBtn(); // 엔터 클릭
                                }
                            }}
                        />
                    </form>
                    <p style={{textAlign: 'left'}}>CONFIRM PASSWORD</p>  
                    <form onSubmit={handleSubmit}>
                        <input 
                            id='confirm password' 
                            type='password'
                            autoComplete="off"
                            style={{width: '100%'}} 
                            value={confirmPw}
                            maxLength="50"
                            onChange={(e)=>{
                                setConfirmPw(e.target.value.trim())
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter") {
                                    creatBtn(); // 엔터 클릭
                                }
                            }}
                        />
                    </form>
                    <p style={{textAlign: 'left'}}>FIRST NAME</p>  
                    <input 
                        id='firstNm' 
                        type='text' 
                        style={{width: '100%'}} 
                        value={firstNm}
                        maxLength="20"
                        onChange={(e)=>{
                            setFirstNm(e.target.value)
                        }}
                        onKeyUp={(e)=> {  
                            if(e.code === "Enter") {
                                creatBtn(); // 엔터 클릭
                            }
                        }}
                    />
                    <p style={{textAlign: 'left'}}>LAST NAME</p>  
                    <input 
                        id='lastNm' 
                        type='text' 
                        style={{width: '100%'}} 
                        value={lastNm}
                        maxLength="20"
                        onChange={(e)=>{
                            setLastNm(e.target.value)
                        }}
                        onKeyUp={(e)=> {  
                            if(e.code === "Enter") {
                                creatBtn(); // 엔터 클릭
                            }
                        }}
                    />
                </>
                }
                <p></p>
                {   !page2 &&  
                    <PBtn
                        labelText={'CREAT ACCOUNT'}
                        alt='continue'
                        style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                        onClick={async()=>{
                            if(page3) { // 새로운 이메일이면 1 있으면 0
                                creatBtn();
                            }
                            else {
                                continueBtn();
                            }
                        }}
                    >
                    </PBtn>
                }       
            </div>
        </div>
    )
}

export default CreateAccount;