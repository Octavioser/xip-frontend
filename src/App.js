import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './index.css';
import './App.js';
import {ImgBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Start from './app/components/xip/RED/Start';
import Video from './app/components/xip/RED/Video';
import NotFound from './app/components/xip/RED/NotFound'
import Works from './app/components/xip/RED/Works'
import Credit from './app/components/xip/RED/Credit'  
import NightKidsMv from './app/components/xip/RED/Video/NightKidsMv';
import Masterinnovation from './app/components/xip/RED/Video/Masterinnovation';
import MasterinnovationBunka from './app/components/xip/RED/Video/MasterinnovationBunka';
import GreenCardMv from './app/components/xip/RED/Video/GreenCardMv';
import { isMobile } from 'react-device-detect';
import ImageSlide from './app/components/xip/RED/Works/ImageSlide';


    
// 메뉴 컴포넌트 (경로이동)
const Root = () => {
    // 메뉴
    const menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8_2.png'
    const worksBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/works.png'
    const creditBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/credit.png'
    const musicBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/sound.png'
    const shopBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/shop.png'
    const videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/video.png'

    const backgroundMusicUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    const [soundBtn, setSoundBtn] = useState('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png');

    const [menuOpen, setMenuOpen] = useState('0');                 // 헤더 메뉴 버튼 닫음 0 열림 1

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const [backgroundMusic] = useState(new Audio(backgroundMusicUrl));

    const [play, setPlay] = useState(false);


    const navigate = useNavigate();

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
    const menuSize = {height: isMobile ? '3vh':'6vh'}
    
    return (
        <>
        {/* 메뉴버튼 */}
        <header>
            {window.location.pathname === './' ?
            <></>
            :
            <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', width:'10vw'}}>
                {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                {window.location.pathname === '/home' ?
                    <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                        src={menuMainBtn} 
                        className='imgBtnNoRed'
                        alt='menuButton' 
                        style={{top:'10vw', left: '10vh', height: isMobile ? '15vh':'10vh'}}
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
                            style={{top:0, left:0, height: isMobile ? '15vh':'10vh'}}
                            onClick={() =>{
                                goBack()
                            }}
                        >
                        </ImgBtn>
                }
                {menuOpen === '1' ?
                <>
                <Link to="./works"> 
                    <ImgBtn //works
                        src={worksBtn}
                        alt='worksBtn'
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) 
                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
                <Link to="./video"> 
                    <ImgBtn //비디오
                        src={videoBtn}
                        alt='videoBtn'
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) 
                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
                {/* <Link to="./music"> */}
                    <ImgBtn //음악 사이트 이동
                        src={musicBtn}
                        alt='musicBtn'
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue)
                            window.open('https://ffm.to/cuechoi_twelvedrives', '_blank') 
                        }}
                        style={menuSize}
                    >
                </ImgBtn>
                {/* </Link> */}
                <Link to="./shop"> 
                    <ImgBtn // 샵
                        src={shopBtn}
                        alt='shopBtn'
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) 
                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
                <Link to="./credit"> 
                    <ImgBtn // contact
                        src={creditBtn}
                        alt='creditBtn'
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) 
                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </Link>
                </>
                :
                <></>
                }
            </div>
            }
        </header>
        <music.soundBtn></music.soundBtn>
        <Routes>
            {/* 맨처음화면 */}
            <Route path='/' element={<Start music={music}></Start>}></Route>
            <Route path="/home" element={<Home startClickValue={startClickValue} soundBtn={music.play}/>}></Route>
            <Route path="/video" element={<Video/>}></Route>
            <Route path="/works" element={<Works/>}></Route>
            <Route path="/credit" element={<Credit/>}></Route>
            <Route path="/video/nightKidsMv" element={<NightKidsMv/>}></Route>
            <Route path="/video/masterinnovation" element={<Masterinnovation/>}></Route>
            <Route path="/video/masterinnovationBunka" element={<MasterinnovationBunka/>}></Route>
            <Route path="/video/greenCardMv" element={<GreenCardMv/>}></Route>
            {/* <Route path="/works/ImageSlide" element={<ImageSlide/>}></Route> */}
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


