
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import 'App.css';

import {ImgBtn, PBtn} from 'app/components/xip/REDCommon/CommonStyle';


const MainShopBtn = () => {

     // 메뉴
    const menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/shopMainBtn.png'

    const [menuOpen, setMenuOpen] = useState('0');                 // 헤더 메뉴 버튼 닫음 0 열림 1
    const [shopSubOpen, setShopSubOpen] = useState(false);           // 샵 클릭시 시즌별 버튼 보이게

    const mainfont = isMobile? '1.5rem':'20px'
    const subfont = isMobile? '1.3rem':'15px'

    return (
        <>
            {/* x 메뉴버튼 */}
            <nav>
                <div style={{position: 'fixed', left:isMobile? '5vw':'1vw', top:isMobile? '4vw': '1vw', width:'30vw'}}>
                    {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                    <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                        src={menuMainBtn} 
                        className='imgBtnNoRed'
                        alt='menuButton' 
                        style={{top:'10vw', left: '10vh', height: isMobile ? '15vh':'15vh'}}
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) // 메인 메뉴버튼 클릭시 열리고 닫기
                        }}
                    >
                    </ImgBtn> 
                    {menuOpen === '1' ?
                        <>  
                            <p></p>
                            <Link to="/home"> 
                                <PBtn //home
                                    className='pBtnNoRed'
                                    labelText='HOME'
                                    alt='homeBtn'
                                    style={{fontSize: mainfont}}
                                    onClick={() =>{
                                        let menuValue = menuOpen === '1' ? '0' : '1'
                                        setMenuOpen(menuValue) 
                                    }}
                                >
                                </PBtn>
                            </Link>
                                <PBtn //상품 나열 버튼
                                    className='pBtnNoRed'
                                    labelText='SHOP'
                                    alt='shopBtn'
                                    style={{fontSize: mainfont}}
                                    onClick={() =>{
                                        setShopSubOpen(shopSubOpen ? false : true) 
                                    }}
                                >
                                </PBtn>
                                {shopSubOpen ? 
                                    <>
                                        <p style={{fontSize: '5px'}}></p>
                                        <Link to="/shop"> 
                                            <PBtn //상품 나열 버튼
                                                className='pBtnNoRed'
                                                labelText='&nbsp;&nbsp;&nbsp;&nbsp;Shop All'
                                                alt='shopAllBtn'
                                                style={{fontSize: subfont}}
                                                onClick={() =>{
                                                    console.log('shopAllBtn')
                                                }}
                                            >
                                            </PBtn>
                                        </Link>
                                        <PBtn //상품 나열 버튼
                                            className='pBtnNoRed'
                                            labelText='&nbsp;&nbsp;&nbsp;&nbsp;S/S 2024'
                                            alt='ss24'
                                            style={{fontSize: subfont}}
                                            onClick={() =>{
                                                console.log('ss24')
                                            }}
                                        >
                                        </PBtn>
                                        <p style={{fontSize: '5px'}}></p>
                                    </>
                                :
                                    <></>
                                } 
                                

                            <Link to="./customerCare"> 
                                <PBtn 
                                    className='pBtnNoRed'
                                    labelText='SERVICE'
                                    alt='customerCareBtn'
                                    style={{fontSize: mainfont}}
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
        </>
    );
}
export default MainShopBtn;