import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { AppProvider, useAppContext } from 'app/components/xip/REDCommon/CommonContext'

import {
    Loading, ConfirmModal,
    Credit, Works, Video, StartPage, Home, NotFound,Masterinnovation,MasterinnovationBunka,Gallery, Shop, MainBtn, MusicBtn,
    ProductList, Account, AccountDetails, DetailProduct, Cart, OrderHistory, Purchase, OrderDetails, Xipengineering} from 'app/components/xip/RED'; //index.js

function preloadImage(url) { // 이미지 미리 불러오기
    const img = new Image();
    img.src = url;
}
preloadImage('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/loadingLogo.gif');

const backgroundMusic = new Audio('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav');
backgroundMusic.loop = true;  // 반복

// 메뉴 컴포넌트 (경로이동)
const Root = () => {

    const { loading, confirm} = useAppContext();

    const location = useLocation ();

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const [display, setDisPlay] = useState(false);  // 음악아이콘 상태

    

    useEffect(() => {
        document.body.style.color = 'white'; //폰트
        // 배경화면 변경
        if(location.pathname.substring(0,5).toLowerCase() === '/shop' ) {
            // shop 이용시 배경화면 변경
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = 'red';

            if((location.pathname.toLowerCase()).startsWith('/shop/detailproduct') ) {
                document.body.style.color = 'black';
                document.body.style.backgroundColor = 'white';
            }
        }
        else {
            document.body.style.backgroundImage = 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/backgroundVideo.gif)'; // 여기에 원하는 이미지 URL을 넣습니다.
            document.body.style.backgroundColor = 'transparent'; // background-color 제거
        }
    })

    const setStartClick = () =>{setStartClickValue('1')}
    
   

    const musicSwitch = (e) =>{ // 음악 재생
        if(e) {
            backgroundMusic.play();   //재생
            setDisPlay(true)          //재생하는 버튼 보여주기
            return true;
        }
        else{
            backgroundMusic.pause();  //멈춤
            setDisPlay(false)         //멈춰있는 버튼 보여주기
            return false;
        }		
        
    }

    return (
        <>
            {confirm && <ConfirmModal/>}  {/* 컨펌창 */} 
            {loading && <Loading/>}       {/* 로딩창 */}
            {/* shop 일경우 버튼 삭제 */}            
            {location.pathname.substring(0,5).toLowerCase() === '/shop' ?
                <Shop/>
            :
                <>
                {location.pathname.substring(0,15).toLowerCase() !== '/xipengineering' && <MainBtn setStartClick={setStartClick}/>}
                </>
            }


            <MusicBtn musicSwitch={musicSwitch} playState={display}/>

            <Routes>
            {/*  페이지이동 */}
                {/* 맨처음화면 */}
                <Route path='/' element={<StartPage musicSwitch={musicSwitch}></StartPage>}/>
                <Route path="/home" element={<Home startClickValue={startClickValue}/>}/>
                <Route path="/video">
                    <Route path="" element={<Video/>}/>
                    <Route path="masterinnovation" element={<Masterinnovation/>}/>
                    <Route path="masterinnovationBunka" element={<MasterinnovationBunka/>}/>
                </Route>
                <Route path="/credit" element={<Credit/>}/>
                <Route path="/works">
                    <Route path="" element={<Works/>}/>
                    <Route path="gallery/:galleryType" element={<Gallery/>}/>
                </Route>
                <Route path="/shop">
                    <Route path="" element={<ProductList/>}/>
                    <Route path="account">
                        <Route path="" element={<Account/>}/>
                        <Route path="accountdetails" element={<AccountDetails/>}/>
                        <Route path="orderhistory" element={<OrderHistory/>}/>
                        <Route path="orderDetails" element={<OrderDetails/>}/>
                    </Route> 
                    <Route path="detailproduct/:prodCd" element={<DetailProduct/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="purchase" element={<Purchase/>}/>
                </Route>
                <Route path="/xipengineering" element={<Xipengineering/>}/>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </>
    );
};
const App  = () => {
    return (
        <AppProvider>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </AppProvider>
    );
}
export default App


