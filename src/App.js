import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {Credit,Works, Video, StartPage, Home, NotFound,Masterinnovation,MasterinnovationBunka,Gallery, Shop, MainBtn} from 'app/components/xip/RED'; //index.js

// 메뉴 컴포넌트 (경로이동)
const Root = () => {

    const backgroundMusicUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    const [backgroundMusic] = useState(new Audio(backgroundMusicUrl));

    const [play, setPlay] = useState(false);

    const [soundBtn, setSoundBtn] = useState('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png');


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
                    style={{width: isMobile ?'6vw':'2vw', right: '20px', bottom: '20px'}}
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

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const setStartClick = () =>{setStartClickValue('1')}

    return (
        <>
        {/* shop 일경우 버튼 삭제 */}
        <MainBtn setStartClick={setStartClick}/>

        <music.soundBtn></music.soundBtn>

        <Routes>
        {/*  페이지이동 */}
            {/* 맨처음화면 */}
            <Route path='/' element={<StartPage music={music}></StartPage>}></Route>
            <Route path="/home" element={<Home startClickValue={startClickValue} soundBtn={music.play}/>}></Route>
            <Route path="/video" element={<Video/>}></Route>
            <Route path="/video/masterinnovation" element={<Masterinnovation/>}></Route>
            <Route path="/video/masterinnovationBunka" element={<MasterinnovationBunka/>}></Route>
            <Route path="/works" element={<Works/>}></Route>
            <Route path="/credit" element={<Credit/>}></Route>
            <Route path="/works/gallery" element={<Gallery/>}></Route>
            <Route path="/shop/*" element={<Shop/>}></Route>
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


