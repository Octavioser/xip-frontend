import React, { useState, useRef} from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import Common from '../../REDCommon/Common';
import { isMobile } from 'react-device-detect';
import {getCountryDataList} from 'countries-list'

const CreateAccount = (props) => {

    const [email, setEmail] = useState('');                 // 이메일
    const [pw, setPw] = useState('');                       // 비밀번호
    const [confirmPw, setConfirmPw] = useState('');                       // 확인 비밀번호
    const [country, setCountry] = useState('KOR');               // 성별
    const [firstNm, setFirstNm] = useState('');            // 이름(성) 
    const [lastNm, setLastNm] = useState('');            // 이름
    const [errorMsg, setErrorMsg] = useState('');        // 이메일 있는지 체크

    const [authCd1, setAuthCd1] = useState('');          // 이메일 코드1 입력창 
    const [authCd2, setAuthCd2] = useState('');          // 이메일 코드2 입력창
    const [authCd3, setAuthCd3] = useState('');          // 이메일 코드3 입력창
    const [authCd4, setAuthCd4] = useState('');          // 이메일 코드4 입력창
    const [authCd5, setAuthCd5] = useState('');          // 이메일 코드5 입력창
    const [authCd6, setAuthCd6] = useState('');          // 이메일 코드6 입력창

    const authCd1Ref = useRef(null);
    const authCd2Ref = useRef(null);
    const authCd3Ref = useRef(null);
    const authCd4Ref = useRef(null);
    const authCd5Ref = useRef(null);
    const authCd6Ref = useRef(null);

    const [authCdStatus, setAuthCdStatus] = useState(0);          // 이메일 코드 입력창 상태

    const [newEmail, setNewEmail] = useState(0);         // 이메일 없으면 패스워드 입력 보이기

    

    

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
                    {email: email, authCd: authCd1 + authCd2 + authCd3 + authCd4 + authCd5 + authCd6}
                )
            }
        },
        insertCreateAccount: {
            api: '/login/loginC101',
            param: async () => {
                console.log('비밀번호 ==>', pw)
                const encodePw = await Common.CommonEncode(pw);
                console.log('encodePw ==>', encodePw)
                return (
                    {email: email, pw: encodePw, country:country, firstNm:firstNm, lastNm:lastNm, authCd: authCd1 + authCd2 + authCd3 + authCd4 + authCd5 + authCd6}
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
                else if(resultData ===0){ // 새로운 이메일
                    setAuthCdStatus(1); // 이메일 코드 입력창 보이게 하기
                    setErrorMsg('Enter the verification code received via email')
                    authCd1Ref.current.focus();
                }
            } catch (error) {
                
            }
        }
        
    }

    // 회원가입 버튼
    const creatBtn = async() => {
        let msg = ''
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!emailRegex.test(email)) { // 이메일 유효성 검사
            msg = 'Registration failed. Please try again.'
            setErrorMsg(msg)
            return
        }
        // 비밀번호 검사
        if(!pw) {
            msg = 'Enter your password.'
            setErrorMsg(msg)
            return
        }

        // 비밀번호 동일한지 검사
        if(pw !== confirmPw) {
            msg = 'Passwords does not match.'
            setErrorMsg(msg)
            return
        }

        if(!(/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw))) { // 8글자 이상 대문자, 숫자 포함
            msg = 'passwords must be at least 8 characters containing one uppercase character and one number'
            setErrorMsg(msg)
            return
        }
        
        //  이름 검사
        if(firstNm.trim() === '' || lastNm.trim() === '') {
            msg = 'Enter your name.'
            setErrorMsg(msg)
            return
        }

        // 국가 검사
        if(!(country)) {
            msg = 'Please select a country.'
            setErrorMsg(msg)
            return
        }

        // 회원가입
        try {
            try{
                let resultData = await Common.CommonApi(apiList.insertCreateAccount.api, await apiList.insertCreateAccount.param());
                if(resultData === -1) {
                    msg = 'Registration failed. Please try again.'
                    setErrorMsg(msg)
                }
                else {
                    props.loginModalBtn()
                }
            } catch (error) {
                    
            }
            
        } catch (error) {
            console.log('error==>',error)
        }
    }

    

    // 세계나라 드랍다운리스트
    const countryDropDown = () => {
        let array = Object.values(getCountryDataList())
        array.sort((a, b) => {
            if(a.iso3 === 'KOR') {
                return -1;
            }
            else if(b.iso3 === 'KOR') {
                return 1;
            }
            else if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            else if(a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            else {
                return 0;
            }       
        });
        console.log(array)
        return(
        <>
            <p style={{textAlign: 'left'}}>COUNTRY</p>  
            <select  
                style={{width: textWidth}}
                onChange={(e)=>{
                    setCountry(e.target.value.trim())
                }}
            >
                {array.map(item => (
                    <option key={item.iso3} value={item.iso3}>
                        {item.name}
                    </option>
                ))}
            </select>
        </>
        )
    }


    const textWidth = isMobile? '60vw' : '15vw'

    const codeWidth = isMobile? '6vw' : '1.5vw'

    const codeStyle = {
        height: codeWidth, 
        width: codeWidth,
        border: '1px solid #ddd', 
        textAlign: 'center',
    }

    return (
        <div className='logoImage' style={{height: '35vh', width: textWidth, top: '30%', textAlign: 'center'}}>
            <p style={{color:'black'}}>Create a XIP Account</p>
            <p style={{color:'black'}}>{errorMsg}</p>
            
            { authCdStatus && !newEmail? 
            <></>
            :
                <>
                    <p style={{textAlign: 'left'}}>EMAIL</p>
                    <input 
                        id='email'
                        type='email' 
                        style={{width: textWidth}} 
                        value={email}
                        disabled={newEmail || authCdStatus}
                        maxLength="30"
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
            { authCdStatus && !newEmail? 
                <>  
                    <p style={{textAlign: 'center'}}>VERIFICATION CODE</p>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1vw'}}>
                        <input 
                            id='authCd1'
                            type='text' 
                            ref={authCd1Ref}
                            style={codeStyle} 
                            value={authCd1}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd1(String(e.target.value))
                                if(String(e.target.value) !== '') {
                                    authCd2Ref.current.focus();
                                }
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                        <input 
                            id='authCd2'
                            type='text' 
                            ref={authCd2Ref}
                            style={codeStyle} 
                            value={authCd2}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd2(String(e.target.value))
                                if(String(e.target.value) !== '') {
                                    authCd3Ref.current.focus();
                                }
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                        <input 
                            id='authCd3'
                            type='text' 
                            ref={authCd3Ref}
                            style={codeStyle} 
                            value={authCd3}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd3(String(e.target.value))
                                if(String(e.target.value) !== '') {
                                    authCd4Ref.current.focus();
                                }
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                        <input 
                            id='authCd4'
                            type='text' 
                            ref={authCd4Ref}
                            style={codeStyle} 
                            value={authCd4}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd4(String(e.target.value))
                                if(String(e.target.value) !== '') {
                                    authCd5Ref.current.focus();
                                }
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                        <input 
                            id='authCd5'
                            type='text' 
                            ref={authCd5Ref}
                            style={codeStyle} 
                            value={authCd5}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd5(String(e.target.value))
                                if(String(e.target.value) !== '') {
                                    authCd6Ref.current.focus();
                                }
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                        <input 
                            id='authCd6'
                            type='text' 
                            ref={authCd6Ref}
                            style={codeStyle} 
                            value={authCd6}
                            maxLength="1"
                            onChange={(e)=>{
                                setAuthCd6(String(e.target.value))
                            }}
                            onKeyUp={(e)=> {  
                                if(e.code === "Enter" && email) {
                                    continueBtn(); // 엔터 클릭
                                }
                            }}
                        />
                    </div>
                    <br></br>
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
                        setPw(e.target.value.trim())
                    }}
                    onKeyUp={(e)=> {  
                        if(e.code === "Enter") {
                            creatBtn(); // 엔터 클릭
                        }
                    }}
                />

                <p style={{textAlign: 'left'}}>CONFIRM PASSWORD</p>  
                <input 
                    id='password' 
                    type='password'
                    style={{width: textWidth}} 
                    value={confirmPw}
                    onChange={(e)=>{
                        setConfirmPw(e.target.value.trim())
                    }}
                    onKeyUp={(e)=> {  
                        if(e.code === "Enter") {
                            creatBtn(); // 엔터 클릭
                        }
                    }}
                />
                {countryDropDown()}
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