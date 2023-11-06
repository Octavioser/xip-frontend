import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {getCookie} from 'app/components/xip/RED/Login/Cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';

const AuthShopBtn = () => {
    const navigate = useNavigate(); // 페이지 이동

    const [loginModal,setLoginModal] = useState(false) // 로그인 팝업창
    const [cookies, , removeCookie] = useCookies(['token']); // 쿠키 훅

    useEffect(() => {
        if(cookies.token !== getCookie('token')) {
            removeCookie('token')
        }
    });

    const loginCheck = (e) => { // 로그인이 되어있지 않을 시 cart acoount 로그인창 띄우기
        if(!!getCookie('token')) {
            navigate('shop/' + e)
        }
        else {
            setLoginModal(true);
        }
    }

    const loginModalBtn = () => { // 로그인 팝업창 열기닫기 버튼
        setLoginModal(loginModal ? false : true)
    }

    const fontSize = isMobile? '1.3rem':'15px'

    return (
        <div style={{position: 'fixed', width:'10vw', right: '1vw', top: isMobile?'2vh':'1vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}> 
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px', fontSize:fontSize}}
                    labelText='CART'
                    alt='CART' 
                    onClick={()=>{
                        loginCheck('cart')
                    }}
                >
                </PBtn>
            {!!getCookie('token') ?
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px', fontSize:fontSize}}
                    labelText='LOGOUT'
                    alt='LOGOUT' 
                    onClick={()=>{
                        removeCookie('token')
                    }}
                >
                </PBtn>
                :
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px', fontSize:fontSize}}
                    labelText='LOGIN'
                    alt='LOGIN' 
                    onClick={()=>{
                        setLoginModal(true);
                    }}
                >
                </PBtn>
            }
            
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px', fontSize:fontSize}}
                    labelText='ACCOUNT'
                    alt='ACCOUNT' 
                    onClick={()=>{
                        loginCheck('account')
                    }}
                >
                </PBtn>
            {loginModal ? <LoginModal loginModalBtn={loginModalBtn}/> : <></>}  
        </div>
    )
}
export default AuthShopBtn;