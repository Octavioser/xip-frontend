import React, { useState, useEffect, useRef} from 'react';
import { PBtn } from '../../REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';

const EmailAuthCode = (props) => {

    const [seconds, setSeconds] = useState(180);

    const [codeTimeOut, setCodeTimeOut] = useState(false);

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
    

    useEffect(() => {
        // 타이머가 0이 되면 중단
        if (seconds === 0) {
            alert('Your verification code has timed out.');
            setCodeTimeOut(true)
            return;
        }

        // 1초마다 시간을 감소
        const intervalId = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000);

        // Cleanup 함수 컴포넌트가 사라진 후에도 계속 실행되지 않도록 하여 메모리 누수를 방지
        return () => clearInterval(intervalId);
    }, [seconds]);


    const codeStyle = {
        height: isMobile? '6vw' : '1.5vw', 
        width: isMobile? '6vw' : '1.5vw',
        border: '1px solid #ddd', 
        textAlign: 'center',
    }

    const makeAuthCd = async() => {
        return String(authCd1) + String(authCd2) + String(authCd3) + String(authCd4) + String(authCd5) + String(authCd6)
    }

    const clickContinueBtn = async() => {
       let auchCd = await makeAuthCd();
        props.continueBtn(auchCd); // 인증번호 확인
    }

    return (
        <>
            <p style={{textAlign: 'center'}}>VERIFICATION CODE</p>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1vw'}}>
                <input 
                    id='authCd1'
                    type='number' 
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
                />
                <input 
                    id='authCd2'
                    type='number' 
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
                    onKeyDown={(e)=> {
                        if(e.key === 'Backspace') {
                            authCd1Ref.current.focus();
                        }
                    }}
                />
                <input 
                    id='authCd3'
                    type='number' 
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
                    onKeyDown={(e)=> {
                        if(e.key === 'Backspace') {
                            authCd2Ref.current.focus();
                        }
                    }}
                />
                <input 
                    id='authCd4'
                    type='number' 
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
                    onKeyDown={(e)=> {
                        if(e.key === 'Backspace') {
                            authCd3Ref.current.focus();
                        }
                    }}
                />
                <input 
                    id='authCd5'
                    type='number' 
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
                    onKeyDown={(e)=> {
                        if(e.key === 'Backspace') {
                            authCd4Ref.current.focus();
                        }
                    }}
                />
                <input 
                    id='authCd6'
                    type='number' 
                    ref={authCd6Ref}
                    style={codeStyle} 
                    value={authCd6}
                    maxLength="1"
                    onChange={(e)=>{
                        setAuthCd6(String(e.target.value))
                    }}
                    onKeyDown={(e)=> {
                        if(e.key === 'Backspace') {
                            setAuthCd6('')
                            authCd5Ref.current.focus();
                        }
                        if(e.key === 'Enter') {
                            clickContinueBtn();
                        }
                    }}
                />
            </div>
            { !!codeTimeOut ?
                <></>
                :
                <>
                    <p>Time Left: {seconds}s</p>
                    <br></br>
                    <PBtn
                        labelText={'CONTINUE'}
                        alt='continue'
                        style={{fontSize: '1em', whiteSpace:'nowrap'}} 
                        onClick={()=>{
                            clickContinueBtn();
                        }}
                    >
                    </PBtn>
                </>
            }
        </>
    )
}
export default EmailAuthCode;