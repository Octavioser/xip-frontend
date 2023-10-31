import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {getCookie} from 'app/components/xip/RED/Login/cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';

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
            navigate('./' + e)
        }
        else {
            setLoginModal(true);
        }
    }

    const loginModalBtn = () => { // 로그인 팝업창 열기닫기 버튼
        setLoginModal(loginModal ? false : true)
    }

    return (
        <div style={{position: 'fixed', width:'10vw', right: '1vw', top: '1vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}> 
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px'}}
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
                    style={{textAlign: 'right', margin: '2px'}}
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
                    style={{textAlign: 'right', margin: '2px'}}
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
                    style={{textAlign: 'right', margin: '2px'}}
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