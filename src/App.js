import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {Credit,Works, Video, StartPage, Home, NotFound,Masterinnovation,MasterinnovationBunka,Gallery, Shop, MainBtn} from 'app/components/xip/RED'; //index.js
import ProductList from 'app/components/xip/RED/Shop/ProductList';
import Account from 'app/components/xip/RED/Shop/Account/Account';
import AccountDetails from 'app/components/xip/RED/Shop/Account/AccountDetails/AccountDetails';
import { LoadingProvider, useLoading } from 'app/components/xip/REDCommon/Loading/LoadingContext'
import Loading from 'app/components/xip/REDCommon/Loading/Loading';

function preloadImage(url) { // 이미지 미리 불러오기
    const img = new Image();
    img.src = url;
}
preloadImage('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/loadingLogo.gif');

// 메뉴 컴포넌트 (경로이동)
const Root = () => {

    const { loading } = useLoading();

    const location = useLocation ();

    useEffect(() => {
        // 배경화면 변경
        if(location.pathname.substring(0,5) === '/shop' ) {
            // shop 이용시 배경화면 변경
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = 'red';
        }
        else {
            document.body.style.backgroundImage = 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/backgroundVideo.gif)'; // 여기에 원하는 이미지 URL을 넣습니다.
            document.body.style.backgroundColor = 'transparent'; // background-color 제거
        }
    })

    const backgroundMusicUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    const [backgroundMusic] = useState(new Audio(backgroundMusicUrl));

    const [play, setPlay] = useState(false);

    const [soundBtn, setSoundBtn] = useState('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundControl.webp');


    const music = {
        play: () =>{ // 음악 재생
            let playValue = play === true ? false : true ;
            setPlay(playValue)
            if(playValue) {
                backgroundMusic.play();   //재생
                setSoundBtn('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundControl.webp')
            }
            else{
                backgroundMusic.pause();  //멈춤
                setSoundBtn('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/soundStop.webp')
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
            {loading ? 
                <Loading/>
            :
                <></>
            }
            {/* shop 일경우 버튼 삭제 */}
            {location.pathname.substring(0,5) === '/shop' ?
                <Shop/>
            :
                <MainBtn setStartClick={setStartClick}/>
            }

            <music.soundBtn></music.soundBtn>

            <Routes>
            {/*  페이지이동 */}
                {/* 맨처음화면 */}
                <Route path='/' element={<StartPage music={music}></StartPage>}></Route>
                <Route path="/home" element={<Home startClickValue={startClickValue} soundBtn={music.play}/>}></Route>
                <Route path="/video">
                    <Route path="" element={<Video/>}></Route>
                    <Route path=":masterinnovation" element={<Masterinnovation/>}></Route>
                    <Route path=":masterinnovationBunka" element={<MasterinnovationBunka/>}></Route>
                </Route>
                <Route path="/credit" element={<Credit/>}></Route>
                <Route path="/works">
                    <Route path="" element={<Works/>}></Route>
                    <Route path=":gallery" element={<Gallery/>}></Route>
                </Route>
                <Route path="/shop">
                    <Route path="" element={<ProductList/>}/>
                    {/* <Route path=":account" element={<Account/>}/> */}
                    <Route path=":acoount">
                        <Route path="" element={<Account/>}/>
                        <Route path=":accountDetails" element={<AccountDetails/>}/>
                    </Route>
                </Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
};
const App  = () => {
    return (
        <LoadingProvider>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </LoadingProvider>
    );
}
export default App


