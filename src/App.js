import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './index.css';
import './App.js';
import {ImgBtn, PBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Start from './app/components/xip/RED/Start';
import Video from './app/components/xip/RED/Video';
import NotFound from './app/components/xip/RED/NotFound';
import Works from './app/components/xip/RED/Works';
import Credit from './app/components/xip/RED/Credit';
import Login from './app/components/xip/RED/Login/Login';
import CreateAccount from './app/components/xip/RED/Login/CreateAccount';  
// import NightKidsMv from './app/components/xip/RED/Video/NightKidsMv';
import Masterinnovation from './app/components/xip/RED/Video/Masterinnovation';
import MasterinnovationBunka from './app/components/xip/RED/Video/MasterinnovationBunka';
// import GreenCardMv from './app/components/xip/RED/Video/GreenCardMv';
import { isMobile } from 'react-device-detect';
import Gallery from './app/components/xip/RED/Works/Gallery';
import { useCookies } from 'react-cookie';

import imgLogo from './loginLog.png';

    
// 메뉴 컴포넌트 (경로이동)
const Root = () => {
    const AWS = require('aws-sdk');
    // s3 권한
    const s3 = new AWS.S3({ // 보안 자격 증명 엑세스 키
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: 'ap-northeast-2',
    });


    // 메뉴
    const menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8_2.png'

    const backgroundMusicUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    const [soundBtn, setSoundBtn] = useState('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png');

    const [menuOpen, setMenuOpen] = useState('0');                 // 헤더 메뉴 버튼 닫음 0 열림 1

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const [backgroundMusic] = useState(new Audio(backgroundMusicUrl));

    const [play, setPlay] = useState(false);

    const [lgBtn, setLgBtn] = useState(false);    //  토큰 있을 시 로그인버튼

    const [cookies, setCookie, removeCookie] = useCookies(['token']); // 쿠키 훅


    const navigate = useNavigate();

    // 뒤로가기
    const goBack = () => {
        navigate(-1)
    }

    const music = {
        play: () =>{ // 음악 재생
            let playValue = play === true ? false : true ;
            setPlay(playValue)
            if(playValue) {
                backgroundMusic.play();   //재생
                setSoundBtn('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png')
            }
            else{
                backgroundMusic.pause();  //멈춤
                setSoundBtn('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundStop.png')
            }		
            backgroundMusic.loop = true;  // 반복
        },
        soundBtn: () =>{
            return(
                <ImgBtn  
                    className='soundBtn imgBtnNoHover'
                    style={{width: isMobile ?'6vw':'3vw', right: '20px', bottom: '20px'}}
                    src={soundBtn} 
                    alt='startBtn' 
                    onClick={()=>{
                        music.play();
                    }}
                    >
                </ImgBtn>
            )
        }
    }    
    return (
        <>
        {window.location.pathname === '/' ?  //처음 화면
        <></>  /* start.js*/
        :
        <>
            {/* x 메뉴버튼 */}
            <nav>
                <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', width:'10vw'}}>
                    {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                    {window.location.pathname === '/home' ?
                        <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                            src={menuMainBtn} 
                            className='imgBtnNoRed'
                            alt='menuButton' 
                            style={{top:'10vw', left: '10vh', height: isMobile ? '10vh':'15vh'}}
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue) // 메인 메뉴버튼 클릭시 열리고 닫기
                                setStartClickValue('1')// 스타트 버튼 클릭햇으면
                            }}
                        >
                        </ImgBtn> 
                    :
                            <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                                src={menuMainBtn} 
                                alt='menuButton' 
                                className='imgBtnNoRed'
                                style={{top:0, left:0, height: isMobile ? '10vh':'15vh'}}
                                onClick={() =>{
                                    goBack()
                                }}
                            >
                            </ImgBtn>
                    }
                    {menuOpen === '1' ?
                    <>
                    <Link to="./works"> 
                        <PBtn //works
                            labelText='works'
                            alt='worksBtn'
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue) 
                            }}
                        >
                        </PBtn>
                    </Link>
                    <Link to="./video"> 
                        <PBtn //비디오
                        labelText='video'
                        alt='videoBtn'
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue) 
                            }}
                        >
                        </PBtn>
                    </Link>
                    {/* <Link to="./music"> */}
                        <PBtn //음악 사이트 이동
                            labelText='sound'
                            alt='soundBtn'
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue)
                                window.open('https://ffm.to/cuechoi_twelvedrives', '_blank') 
                            }}
                        >
                        </PBtn>
                    {/* </Link> */}
                    <Link to="./shop"> 
                        <PBtn // 샵
                            labelText='shop'
                            alt='shopBtn'
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue) 
                            }}
                        >
                        </PBtn>
                    </Link>
                    <Link to="./credit"> 
                        <PBtn className='pbtn'// contact
                            labelText='credit'
                            alt='creditBtn'
                            onClick={() =>{
                                let menuValue = menuOpen === '1' ? '0' : '1'
                                setMenuOpen(menuValue) 
                            }}
                        >
                        </PBtn>
                    </Link>
                    
                    </>
                    :
                    <></>
                    }
                </div>
            </nav>
            <div style={{right:'0.5vw', marginTop:'0.5vh', width:'5vw', position: 'fixed', zIndex: 10}}>
                {/* 로그인 버튼 */}
                {!cookies.token ?
                <Link to= "./login">   
                    {/* 로그인안되어있으면 로그인창으로 이동 */}
                    <ImgBtn  
                        style={{width:'70px'}}
                        src={imgLogo} 
                        alt='login' 
                        onClick={()=>{
                            setMenuOpen('0') 
                        }}
                    >
                    </ImgBtn>
                </Link>
                : 
                <ImgBtn  
                    style={{width:'70px'}}
                    src={imgLogo} 
                    alt='login' 
                    onClick={()=>{
                        if(lgBtn===0) {
                            setLgBtn(1)
                        }
                        else {
                            setLgBtn(0)
                        }
                        
                    }}
                >
                </ImgBtn>
                }
                { lgBtn ?
                    <>
                    {/* 로그인 되어있으면 로그아웃 mypage 버튼 보이게 */}
                        <PBtn  
                            labelText='logout'
                            alt='logout'
                            style={{fontSize: '1.5em'}}
                            onClick={() =>{
                                removeCookie('token'); // 쿠키를 삭제
		                        navigate('/home'); // 메인 페이지로 이동
                                setLgBtn(0)
                            }}
                        >
                        </PBtn>
                    {/* 로그인 되어있으면 로그아웃 mypage 버튼 보이게 */}
                        <PBtn  
                            labelText='mypage'
                            alt='mypage'
                            style={{fontSize: '1.5em'}}
                            onClick={() =>{
                                setMenuOpen('0') 
                                setLgBtn(0)
                                console.log('cookie==>', cookies)
                            }}
                        >
                        </PBtn>
                    </>
                    :<></>
                }
            </div>
        </>
        }               
        <music.soundBtn></music.soundBtn>
        <Routes>
            {/* 맨처음화면 */}
            <Route path='/' element={<Start music={music}></Start>}></Route>
            <Route path="/home" element={<Home startClickValue={startClickValue} soundBtn={music.play}/>}></Route>
            <Route path="/video" element={<Video/>}></Route>
            <Route path="/works" element={<Works/>}></Route>
            <Route path="/credit" element={<Credit/>}></Route>
            <Route path="/login" element={<Login navigate={navigate}/>}></Route>
            <Route path="/createAccount" element={<CreateAccount navigate={navigate}/>}></Route>
            {/* <Route path="/video/nightKidsMv" element={<NightKidsMv/>}></Route> */}
            <Route path="/video/masterinnovation" element={<Masterinnovation/>}></Route>
            <Route path="/video/masterinnovationBunka" element={<MasterinnovationBunka/>}></Route>
            {/* <Route path="/video/greenCardMv" element={<GreenCardMv/>}></Route> */}
            <Route path="/works/Gallery" element={<Gallery s3={s3}/>}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
        </>
    );
};
const App  = () => {
    return (
        <BrowserRouter>
        <Root />
        </BrowserRouter>
    );
}
export default App


