import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { PBtn } from '../../REDCommon/CommonStyle';
import Common from '../../REDCommon/Common';
import { useCookies } from 'react-cookie';


const CreateAccount = (props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');                 // 이메일
    const [pw, setPw] = useState('');                       // 비밀번호
    const [gender, setGender] = useState('');               // 성별
    const [firstNm, setFirstNm] = useState('');            // 이름(성) 
    const [lastNm, setLastNm] = useState('');            // 이름
    const [errorMsg, setErrorMsg] = useState('');        // 이메일 있는지 체크
    const [newEmail, setNewEmail] = useState(0);              // 이메일 없으면 패스워드 입력 보이기

    const apiList = {
        checkEmail: {
            api: 'http://localhost:8080/login/loginR002',
            param: () => {
                return (
                    {email: email}
                )
            }
        },
        insertCreateAccount: {
            api: 'http://localhost:8080/login/loginR101',
            param: () => {
                return (
                    {email: email, pw: pw, gender:gender, firstNm:firstNm, lastNm:lastNm}
                )
            }
        }
    }

    // 이메일 확인버튼
    const continueBtn = async() => {
        let msg = ''
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!emailRegex.test(email)) { // 이메일 유효성 검사
            msg = 'Please enter a valid email address.'
            setErrorMsg(msg)
            return
        }
        // 이메일 체크
        try {
            let resultData = await Common.CommonApi(apiList.checkEmail.api, apiList.checkEmail.param());    // 없으면 0 있으면 1
            msg = resultData === 0 ? '' : 'You already have an account.'
            setErrorMsg(msg)
            let newEmailFg = resultData === 0 ? 1 : 0
            setNewEmail(newEmailFg)
        } catch (error) {
            
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
        if(!(gender === 'MEN' || gender === 'WOMEN')) {
            msg = 'Please select a gender.'
            setErrorMsg(msg)
            return
        }

        // 회원가입
        try {
            let resultData = await Common.CommonApi(apiList.insertCreateAccount.api, apiList.insertCreateAccount.param());    // 없으면 0 있으면 1
            navigate('/home')
        } catch (error) {
            console.log('error==>',error)
        }
    }

    return (
        <div className='logoImage' style={{height: '35vh',width:'50%', top: '40%', textAlign: 'center'}}>
            <p style={{color:'red'}}>Create a XIP Account</p>
            <p style={{color:'red'}}>{errorMsg}</p>
            <p>EMAIL</p>
            <input 
                id='email'
                type='email' 
                value={email}
                disabled={newEmail}
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
            {newEmail ?
            <>
                <p>PASSWORD</p>  
                <input 
                    id='password' 
                    type='text' 
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
                <p>FIRST NAME</p>  
                <input 
                    id='firstNm' 
                    type='text' 
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
                <p>LAST NAME</p>  
                <input 
                    id='lastNm' 
                    type='text' 
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
                <br/>
                <label>
                    MEN
                    <input
                        type="radio"
                        value={gender}
                        name={'MEN'}
                        onClick={(e)=> {
                            setGender('MEN')
                        }}
                    />
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                    WOMEN
                    <input
                        type="radio"
                        value={gender}
                        name={'WOMEN'}
                        onClick={(e)=> {
                            setGender('WOMEN')
                        }}
                    />
                </label>
                <br/>
                <br/>
            </>
                :
            <></>
            }
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