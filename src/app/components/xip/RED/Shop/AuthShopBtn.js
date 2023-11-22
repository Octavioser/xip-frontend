import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';

const AuthShopBtn = () => {
    const navigate = useNavigate(); // 페이지 이동

    const {getCookie, removeCookie} = useCookie();

    const [loginModal,setLoginModal] = useState(false) // 로그인 팝업창

    const [logout, setLogout] = useState(0); // 서버오류로 인한 로그아웃 변경안될시 리프레쉬용

    const loginCheck = (e) => { // 로그인이 되어있지 않을 시 cart acoount 로그인창 띄우기
        if(!!getCookie('xipToken')) {
            navigate('shop/' + e);
            window.location.reload();
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
        <div style={{position: 'absolute', width:'10vw', right: '1vw', top: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex:1}}> 
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
            {!!getCookie('xipToken') ?
                <PBtn  
                    className='pBtnNoRed'
                    style={{textAlign: 'right', margin: '2px', fontSize:fontSize}}
                    labelText='LOGOUT'
                    alt='LOGOUT' 
                    onClick={()=>{
                        setLogout(1 + logout); // 서버오류로 인한 로그아웃 변경안될시 리프레쉬용
                        removeCookie('xipToken')
                        navigate('shop/')
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