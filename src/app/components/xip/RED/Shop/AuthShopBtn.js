import React, {useState} from 'react';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import { useCommon } from '../../REDCommon/Common';
import { useLocation } from 'react-router-dom';
import RegionModal from './RegionModal';

const AuthShopBtn = (props) => {

    const location = useLocation ();

    const {navigate} = useCommon();

    const {getCookie, removeCookie} = useCookie();

    const [loginModal,setLoginModal] = useState(false) // 로그인 팝업창

    const [logout, setLogout] = useState(0); // 서버오류로 인한 로그아웃 변경안될시 리프레쉬용

    const [regionOpen, setRegionOpen] = useState(false) // 리전 서브창

    const loginCheck = (e) => { // 로그인이 되어있지 않을 시 cart acoount 로그인창 띄우기
        if(!!getCookie('xipToken')) {
            navigate('shop/' + e);
        }
        else {
            setLoginModal(true);
        }
    }

    const loginModalBtn = () => { // 로그인 팝업창 열기닫기 버튼
        setLoginModal(loginModal ? false : true)
    }

    
    const fontSize = isMobile? '1.3rem':'15px'

    const authBtnStyle = 
        isMobile ? 
        {textAlign: 'right', margin: '10px', fontSize:fontSize, fontWeight: 700}
        :
        {textAlign: 'right', margin: '2px', fontSize:fontSize};

    const authBtn = {
        cart: () => {
            return (
                <PBtn  
                    className='pBtnNoRed'
                    style={authBtnStyle}
                    labelText='CART'
                    alt='CART' 
                    onClick={()=>{
                        loginCheck('cart')
                        props.setMobileMenu(false)
                    }}
                >
                </PBtn>
            )
        },
        login: () => {
            return (
                <>
                    {!!getCookie('xipToken') ?
                        <PBtn  
                            className='pBtnNoRed'
                            style={authBtnStyle}
                            labelText='LOGOUT'
                            alt='LOGOUT' 
                            onClick={()=>{
                                setLogout(1 + logout); // 서버오류로 인한 로그아웃 변경안될시 리프레쉬용
                                removeCookie('xipToken')
                                navigate('shop/')
                                props.setMobileMenu(false)
                            }}
                        >
                        </PBtn>
                        :
                        <PBtn  
                            className='pBtnNoRed'
                            style={authBtnStyle}
                            labelText='LOGIN'
                            alt='LOGIN' 
                            onClick={()=>{
                                setLoginModal(true);
                                props.setMobileMenu(false)
                            }}
                        >
                        </PBtn>
                    }
                </>
            )
        },
        acoount: () => {
            return (
                <PBtn  
                    className='pBtnNoRed'
                    style={authBtnStyle}
                    labelText='ACCOUNT'
                    alt='ACCOUNT' 
                    onClick={()=>{
                        loginCheck('account')
                        props.setMobileMenu(false)
                    }}
                >
                </PBtn>
            )
        },
        region: () => {
            return (
                <>
                    <PBtn  
                        className='pBtnNoRed'
                        style={authBtnStyle}
                        labelText='REGION'
                        alt='REGION' 
                        onClick={()=>{
                            setRegionOpen(!regionOpen)
                        }}
                    >
                    </PBtn>
                </>
            )
        },
        closeConfirm: () => {
            setRegionOpen(false);
        }
    }

      // 메뉴 스타일 정의
    const menuStyle = {
        color: 'red',
        position: 'fixed',
        top: 0,
        right: props.mobileMenu ? '0' : '-100%', // 메뉴 상태에 따라 위치 변경
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        transition: 'right 0.3s ease', // 부드러운 슬라이드 애니메이션
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px', // 추가된 스타일
        boxSizing: 'border-box', // 추가된 스타일
    };

    const hambugerBtnm = (location.pathname.toLowerCase()).startsWith('/shop/detailproduct') ? 
        'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/main/authHamburgerBlk.webp'
        :
        'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/main/authHamburger.webp';
    
    return (
        <div style={{position: 'absolute', width:'10vw', right: '1vw', top: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex:1}}> 
            <>
                {isMobile ?
                    <>
                        <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                            src={hambugerBtnm} 
                            className='imgBtnNoRed'
                            alt='authmenuButton' 
                            style={{top:'1vw', right: '1vh', width: '15vw'}}
                            onClick={() =>{
                                props.setMobileMenu(true)
                            }}
                        >
                        </ImgBtn> 
                        <div style={menuStyle}>
                            {/*닫기버튼*/}
                            <PBtn  
                                labelText= 'X'
                                alt='menuButton' 
                                style={{
                                    fontSize: '2rem',
                                    position: 'absolute',  // 절대적 위치 설정
                                    top: '2vh',           // 상단으로부터의 거리
                                    right: '3vh',         // 오른쪽으로부터의 거리
                                    height: '3vh'
                                }}
                                onClick={() =>{props.setMobileMenu(false)}}
                            >
                            </PBtn>
                            {authBtn.cart()}
                            {authBtn.login()}
                            {authBtn.acoount()}
                            {authBtn.region()}
                            <br/><br/>
                        </div>
                    </>
                    :
                    <>
                        {authBtn.cart()}
                        {authBtn.login()}
                        {authBtn.acoount()}
                        {authBtn.region()}
                    </>
                }
            </>     
            {loginModal && <LoginModal loginModalBtn={loginModalBtn}/> }  
            {regionOpen && <RegionModal closeConfirm={authBtn.closeConfirm}/>}
        </div>
    )
}
export default AuthShopBtn;