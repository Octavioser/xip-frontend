import React, { useState } from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import Common from '../../REDCommon/Common';
import { isMobile } from 'react-device-detect';
import {getCountryDataList} from 'countries-list'

const CreateAccount = (props) => {

    const [email, setEmail] = useState('');                 // 이메일
    const [pw, setPw] = useState('');                       // 비밀번호
    const [country, setCountry] = useState('');               // 성별
    const [firstNm, setFirstNm] = useState('');            // 이름(성) 
    const [lastNm, setLastNm] = useState('');            // 이름
    const [errorMsg, setErrorMsg] = useState('');        // 이메일 있는지 체크
    const [authCd, setAuthCd] = useState('');          // 이메일 코드 입력창 
    const [authCdStatus, setAuthCdStatus] = useState(0);          // 이메일 코드 입력창 
    const [newEmail, setNewEmail] = useState(0);         // 이메일 없으면 패스워드 입력 보이기

    const countriesArray = Object.values(getCountryDataList()); // 나라 데이터

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
            api: '/login/loginR003',
            param: () => {
                return (
                    {email: email, authCd: authCd}
                )
            }
        },
        insertCreateAccount: {
            api: '/login/loginR101',
            param: async () => {
                console.log('비밀번호 ==>', pw)
                const encodePw = await Common.CommonEncode(pw);
                console.log('encodePw ==>', encodePw)
                return (
                    {email: email, pw: encodePw, country:country, firstNm:firstNm, lastNm:lastNm}
                )
            }
        }
    }

    // 이메일 확인버튼
    const continueBtn = async() => {
        let msg = ''
        if(authCdStatus === 1){
            console.log('인증코드 체크')
            try {
                let resultData = await Common.CommonApi(apiList.emailAuthCodeCheck.api, apiList.emailAuthCodeCheck.param());
                if (resultData > 0) { // 인증코드가 맞으면
                    msg = ''
                    setAuthCdStatus(0); // 인증코드 텍스트창 가리기
                    setNewEmail(1);      // 회원가입 입력창 보이게하기
                }
                else {
                    msg = 'Invalid authentication code. Please try again.'
                   
                }
                setErrorMsg(msg)
            } catch (error) {
                console.log(error);    
            }
        }    
        else {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(email)) { // 이메일 유효성 검사
                msg = 'Please enter a valid email address.'
                setErrorMsg(msg)
                return
            }
            // 이메일 체크 및 인증
            try {
                let resultData = await Common.CommonApi(apiList.checkEmail.api, apiList.checkEmail.param());    // 없으면 0 있으면 1
                if(resultData ===1) { // 이미 가입된 이메일이다.
                    setErrorMsg('You already have an account.')
                }
                else { // 새로운 이메일
                    setAuthCdStatus(1); // 이메일 코드 입력창 보이게 하기
                    setErrorMsg('Enter the verification code received via email')
                }
            } catch (error) {
                
            }
        }
        
    }

    // 회원가입 버튼
    const creatBtn = async() => {
        let msg = ''
        // 비밀번호 검사
        if(!pw) {
            msg = 'Enter your password.'
            setErrorMsg(msg)
            return
        }
        
        //  이름 검사
        if(! (firstNm && lastNm)) {
            msg = 'Enter your name.'
            setErrorMsg(msg)
            return
        }

        // 성별 검사
        // if(!(gender === 'MEN' || gender === 'WOMEN')) {
        //     msg = 'Please select a gender.'
        //     setErrorMsg(msg)
        //     return
        // }

        // 회원가입
        try {
            await Common.CommonApi(apiList.insertCreateAccount.api, await apiList.insertCreateAccount.param());
            props.loginModalBtn()
        } catch (error) {
            console.log('error==>',error)
        }
    }

    const textWidth = isMobile? '35vw' : '15vw'

    return (
        <div className='logoImage' style={{height: '35vh', width: textWidth, top: '40%', textAlign: 'center'}}>
            <p style={{color:'black'}}>Create a XIP Account</p>
            <p style={{color:'black'}}>{errorMsg}</p>
            <p style={{textAlign: 'left'}}>EMAIL</p>
            <input 
                id='email'
                type='email' 
                style={{width: textWidth}} 
                value={email}
                disabled={newEmail || authCdStatus}
                maxLength="30"
                onChange={(e)=>{              
                    setEmail(e.target.value)
                }}
                onKeyUp={(e)=> {  
                    if(e.code === "Enter" && email) {
                        continueBtn(); // 엔터 클릭
                    }
                }}
            />
            { authCdStatus && !newEmail? 
                <>
                    <p style={{textAlign: 'left'}}>CODE</p>
                    <input 
                        id='authCd'
                        type='test' 
                        style={{width: textWidth}} 
                        value={authCd}
                        maxLength="30"
                        onChange={(e)=>{
                            setAuthCd(e.target.value)
                        }}
                        onKeyUp={(e)=> {  
                            if(e.code === "Enter" && email) {
                                continueBtn(); // 엔터 클릭
                            }
                        }}
                    />
                </>
                :
                <></>
            }
            {newEmail ? // 회원가입이 가능한 이메일이면
            <>
                <p style={{textAlign: 'left'}}>PASSWORD</p>  
                <input 
                    id='password' 
                    type='password'
                    style={{width: textWidth}} 
                    value={pw}
                    onChange={(e)=>{
                        setPw(e.target.value)
                    }}
                    onKeyUp={(e)=> {  
                        if(e.code === "Enter") {
                            creatBtn(); // 엔터 클릭
                        }
                    }}
                />
                <p style={{textAlign: 'left'}}>COUNTRY</p>  
                <select  
                    style={{width: textWidth}}
                    onChange={(e)=>{
                        setCountry(e.target.value)
                    }}
                >
                    {countriesArray.map(item => (
                        <option key={item.iso3} value={item.iso3}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <p style={{textAlign: 'left'}}>FIRST NAME</p>  
                <input 
                    id='firstNm' 
                    type='text' 
                    style={{width: textWidth}} 
                    value={firstNm}
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
                    style={{width: textWidth}} 
                    value={lastNm}
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
                :
            <></>
            }
            <p></p>
            <PBtn
                labelText={newEmail ?'CREAT ACCOUNT':'CONTINUE' }
                alt='continue'
                style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                onClick={async()=>{
                    if(newEmail) { // 새로운 이메일이면 1 있으면 0
                        creatBtn();
                    }
                    else {
                        continueBtn();
                    }
                }}
            >
            </PBtn>
        </div>
    )
}

export default CreateAccount;