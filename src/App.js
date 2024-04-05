import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { AppProvider } from 'app/components/xip/REDCommon/CommonContext'

import {
    Loading, ConfirmModal,
    Credit, Works, Video, StartPage, Home, NotFound,Masterinnovation,MasterinnovationBunka,Gallery, Shop, MainBtn, MusicBtn,
    ProductList, Account, AccountDetails, DetailProduct, Cart, OrderHistory, Purchase, OrderDetails, Xipengineering, Service, 
    TermsOfUse, Privacy, ShipReturn, Success, Fail, NewtypeHome, Newtype, Fetus, Footer} from 'app/components/xip/RED'; //index.js
import { useCookie } from 'app/components/xip/RED/Login/Cookie';
import ComingSoon from 'app/components/xip/RED/Shop/ComingSoon';

function preloadImage(url) { // 이미지 미리 불러오기
    const img = new Image();
    img.src = url;
}
preloadImage('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/loadingLogo.gif');

const backgroundMusic = new Audio('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav');
backgroundMusic.loop = true;  // 반복 

const newTypeMusic = new Audio('https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/netypeMusic.wav')
newTypeMusic.loop = true;

// 메뉴 컴포넌트 (경로이동)
const Root = () => {

    const {getCookie} = useCookie();

    const { pathname } = useLocation();

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const [display, setDisPlay] = useState(false);  // 음악아이콘 상태

    const [beforePathName, setBeforePathName] = useState('') // 바뀌기기 직전 pathName

    const [cartList, setCartList] = useState([]);   //  cart 상품 정보 state 에 저장

    const [changeCartList, setChangeCartList] = useState({});   //  바뀐상품

    useEffect(() => {
        document.body.style.color = 'white'; //폰트
        // newtype 배경화면 변경
        if(pathname.toLowerCase().indexOf('newtype') > -1 ) {
            document.body.style.backgroundImage = 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/background/newtypeBackground.webp)'; // 여기에 원하는 이미지 URL을 넣습니다.
            document.body.style.backgroundSize = "130% 100%"
            return;
        }

        if(pathname.substring(0,5).toLowerCase() === '/shop' ) {
            // shop 이용시 배경화면 변경
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = 'red';

            if((pathname.toLowerCase()).startsWith('/shop/detailproduct')) {
                document.body.style.color = 'black';
                document.body.style.backgroundColor = 'white';
            }
        }
        else {
            document.body.style.backgroundImage = 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/backgroundVideo.gif)'; // 여기에 원하는 이미지 URL을 넣습니다.
            document.body.style.backgroundColor = 'transparent'; // background-color 제거
        }
        
        
    },[pathname])

   
   
    useEffect(() => { 
        window.scrollTo(0, 0); // 스크롤 초기화

         // 페이지 이동시 스크롤 초기화 및 장바구니저장
        if(beforePathName === '/shop/cart') { // 페이지 전환시 전환전 페이지가 장바구니면 저장하기
            savedCart();
            setChangeCartList({}) // 값 초기화
        }


         // 노래 체인지
        if(display && pathname.toLowerCase().indexOf('newtype') > -1 && beforePathName.toLowerCase().indexOf('newtype') === -1) { // 오리지널 - > 뉴타입 
            backgroundMusic.pause();
            newTypeMusic.play();
        }

         // 노래 체인지
         if(display && beforePathName.toLowerCase().indexOf('newtype') > -1 && pathname.toLowerCase().indexOf('newtype') === -1) { // 뉴타입 - >  오리지널
            backgroundMusic.play();
            newTypeMusic.pause();
        }

        setBeforePathName(pathname)
        /* eslint-disable */
    }, [pathname]);// path name만 바뀔때 실행


    // cart 정보 저장하기
    const savedCart = async() => {
        console.log('전송시작')
        if(!changeCartList || Object.keys(changeCartList).length < 1) {    // 바뀐게 없으면 동작 x
            console.log('실패')
            return;
        }
        // api로 넘겨줄 데이터 객체에서 배열로 변환
        let list = {...changeCartList}
        let keyItem = Object.keys(changeCartList);
        let item = [];
        
        keyItem.forEach(e => { 
            item.push({prodCdD:e, prodQty:list[e]})
        })

        // 저장 api
        fetch(process.env.REACT_APP_API_URL +'/shop/shopU203', 
			{
				method: "POST",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${getCookie('xipToken')}`
				},
				body: JSON.stringify({cartList: item})
			}
        )
    }


    const setStartClick = () =>{setStartClickValue('1')}
    
    const musicSwitch = (e , type) =>{ // 음악 재생
        if(e && (type === 'newtype' || pathname.toLowerCase().indexOf('newtype') > -1) ) {
            backgroundMusic.pause();
            newTypeMusic.play();
            setDisPlay(true) 
            return;
        }
        else if(e) {
            newTypeMusic.pause();
            backgroundMusic.play();   //재생
            setDisPlay(true)          //재생하는 버튼 보여주기
            return;
        }
        else{
            newTypeMusic.pause();
            backgroundMusic.pause();  //멈춤
            setDisPlay(false)         //멈춰있는 버튼 보여주기
            return;
        }		 
    }

    

    return (
        <>
            <ConfirmModal/>  {/* 컨펌창 */} 
            <Loading/>       {/* 로딩창 */}
            {/* shop 일경우 버튼 삭제 */}            
            {pathname.substring(0,5).toLowerCase() === '/shop' ?
                <Shop/>
            :
                <>
                {pathname.substring(0,15).toLowerCase() !== '/xipengineering' && <MainBtn setStartClick={setStartClick} musicSwitch={musicSwitch} display={display}/>}
                </>
            }


            <MusicBtn musicSwitch={musicSwitch} playState={display}/>

            <Routes>
            {/*  페이지이동 */}
                {/* 맨처음화면 */}
                <Route path='/' element={<StartPage musicSwitch={musicSwitch}></StartPage>}/>
                {pathname.substring(0,5).toLowerCase() === '/home' && <Route path="/home" element={<Home startClickValue={startClickValue}/>}/>}
                <Route path="newtypehome" element={<NewtypeHome/>}/>
                <Route path="/video">
                    <Route path="" element={<Video/>}/>
                    <Route path="masterinnovation" element={<Masterinnovation/>}/>
                    <Route path="masterinnovationBunka" element={<MasterinnovationBunka/>}/>
                </Route>
                <Route path="/credit" element={<Credit/>}/>
                <Route path="/works">
                    <Route path="" element={<Works/>}/>
                    <Route path="newtype" element={<Newtype/>}/>
                    <Route path="fetus" element={<Fetus/>}/>
                    <Route path="gallery/:galleryType" element={<Gallery/>}/>
                </Route>
                <Route path="/shop">
                    {/* <Route path="" element={<ProductList/>}/> */}
                    <Route path="" element={<ComingSoon/>}/>
                    <Route path="account">
                        <Route path="" element={<Account/>}/>
                        <Route path="accountdetails" element={<AccountDetails/>}/>
                        <Route path="orderhistory" element={<OrderHistory/>}/>
                        <Route path="orderDetails/:orderCd" element={<OrderDetails/>}/>
                    </Route> 
                    <Route path="detailproduct/:prodCd" element={<DetailProduct/>}/>
                    <Route path="cart" element={<Cart setCartList={setCartList} cartList={cartList} changeCartList={changeCartList} setChangeCartList={setChangeCartList} savedCart={savedCart}/>}/>
                    <Route path="purchase" element={<Purchase/>}/>
                    <Route path="success/:orderMethod" element={<Success/>}/>
                    <Route path="fail/:orderMethod" element={<Fail/>}/>
                    <Route path="service" element={<Service/>}/>
                    <Route path="termsofuse" element={<TermsOfUse/>}/>
                    <Route path="privacy" element={<Privacy/>}/>
                    <Route path="shipReturn" element={<ShipReturn/>}/>
                </Route>
                <Route path="/xipengineering" element={<Xipengineering/>}/>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <Footer/>
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


