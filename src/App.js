import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { AppProvider, useAppContext } from 'app/components/xip/REDCommon/CommonContext'

import {
    Loading, ConfirmModal,
    Credit, Works, Video, StartPage, Home, NotFound,Masterinnovation,MasterinnovationBunka,Gallery, Shop, MainBtn, MusicBtn,
    ProductList, Account, AccountDetails, DetailProduct, Cart, OrderHistory, Purchase, OrderDetails, Xipengineering, Service, 
    TermsOfUse, Privacy, ShipReturn, Success, Fail, NewtypeHome, Newtype, Fetus} from 'app/components/xip/RED'; //index.js
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle';
import { useCommon }  from 'app/components/xip/REDCommon/Common';

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

    const { pathname } = useLocation();

    const [startClickValue, setStartClickValue] = useState('0'); // 처음시작화면 클릭했는지 

    const [display, setDisPlay] = useState(false);  // 음악아이콘 상태

    const [beforePathName, setBeforePathName] = useState('') // 바뀌기기 직전 pathName

    const [cartList, setCartList] = useState([]);   //  cart 상품 정보 state 에 저장

    const [changeCartList, setChangeCartList] = useState({});   //  바뀐상품

    const { navigate, commonApi} = useCommon();
        
    useEffect(() => {
        document.body.style.color = 'white'; //폰트
        // 배경화면 변경
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
    })

    // 페이지 이동시 스크롤 초기화 및 장바구니저장
    useEffect(() => { 
        window.scrollTo(0, 0); // 스크롤 초기화
        if(beforePathName === '/shop/cart') { // 페이지 전환시 전환전 페이지가 장바구니면 저장하기
            savedCart();
            setChangeCartList({}) // 값 초기화
        }
        setBeforePathName(pathname)
        /* eslint-disable */
    }, [pathname]);// path name만 바뀔때 실행


    // cart 정보 저장하기
    const savedCart = async() => {
        if(!changeCartList || Object.keys(changeCartList).length < 1) {    // 바뀐게 없으면 동작 x
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
        commonApi('/shop/shopU203', {cartList: item});
    }


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

    const footerStyle = {color:'black', padding:'1px', margin:'1px'};

    return (
        <>
            {confirm && <ConfirmModal/>}  {/* 컨펌창 */} 
            {loading && <Loading/>}       {/* 로딩창 */}
            {/* shop 일경우 버튼 삭제 */}            
            {pathname.substring(0,5).toLowerCase() === '/shop' ?
                <Shop/>
            :
                <>
                {pathname.substring(0,15).toLowerCase() !== '/xipengineering' && <MainBtn setStartClick={setStartClick}/>}
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
                    <Route path="" element={<ProductList/>}/>
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
            {pathname.substring(0,5).toLowerCase() === '/shop'  && 
                <div style={{position: 'relative', bottom:0, left:0, width:'100%', minHeight:'7vh', fontSize:'0.7rem', textAlign:'center'}}>
                    <p style={footerStyle}><span style={{fontSize:'1rem'}}>ⓒ XIP</span> BUSINESS NUMBER 424-19-02088 | MAIL-ORDER-SALES REGISTRATION NUMBER 2024-성남분당A-0198 |  CEO PARK JUNHEE | CONTACT 010-5160-6202</p>
                    <p style={footerStyle}>804-52, 124, Unjung-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <PBtn  style={footerStyle} labelText='AGREEMENT' onClick={()=>navigate('/shop/termsofuse')}></PBtn>
                        <PBtn  style={footerStyle} labelText='PRIVACY' onClick={()=>navigate('/shop/privacy')}></PBtn>
                        <PBtn  style={footerStyle} labelText='SHIPPING & RETURN POLICY' onClick={()=>navigate('/shop/shipReturn')}></PBtn>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            }
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


