
import React, {useState} from 'react';
import { isMobile } from 'react-device-detect';
import { useCommon } from '../../REDCommon/Common';

import 'App.css';

import {ImgBtn, PBtn} from 'app/components/xip/REDCommon/CommonStyle';


const MainShopBtn = () => {
    
     // 메뉴
    const menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/main/shopMainBtn.webp'

    const [menuOpen, setMenuOpen] = useState('0');                 // 헤더 메뉴 버튼 닫음 0 열림 1
    const [shopSubOpen, setShopSubOpen] = useState(false);         // 샵 클릭시 시즌별 버튼 보이게

    const {navigate} = useCommon();                                // 페이지 이동


    const mainfont = isMobile? '1.5rem':'20px'
    const subfont = isMobile? '1.3rem':'15px'

    const seasonItem = () => {
        const item = 
        [
            {id: 1, key:'3', name: 'Pre Order'},
            {id: 2, key:'1', name: 'On Sale'},
            {id: 3, key:'0', name: 'Coming Soon'}
        ]
        return(
            <div key={'div1'} style={{textAlign:'left',paddingLeft:'30px'}}>
                <p key='empty' style={{fontSize: '5px'}}></p>
                <PBtn //상품 나열 버튼
                    id='all'
                    className='pBtnNoRed'
                    labelText='Shop All'
                    alt='shopAllBtn'
                    style={{fontSize: subfont}}
                    onClick={() =>{
                        navigate('/shop')
                    }}
                >
                </PBtn>
                {item.map((e) => {
                    return(
                        <PBtn //상품 나열 버튼
                            key={e.id}
                            id={e.id}
                            className='pBtnNoRed'
                            labelText={e.name}
                            alt='e'
                            style={{fontSize: subfont}}
                            onClick={() =>{
                                navigate('./shop', {state: e.key})  // ProductList에 state 값 넘겨주기
                            }}
                        >
                        </PBtn>
                    )
                }
                )}
                <p key='empty2' style={{fontSize: '5px'}}></p>
            </div>
        )
    }
    

    return (
        <>
            {/* x 메뉴버튼 */}
            <nav>
                <div style={{position: 'fixed', left:isMobile? '5vw':'1vw', top:isMobile? '4vw': '1vw', width:'10%'}}>
                    {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                    <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                        src={menuMainBtn} 
                        className='imgBtnNoRed'
                        alt='menuButton' 
                        style={{height: isMobile ? '15vh':'15vh'}}
                        onClick={() =>{
                            let menuValue = menuOpen === '1' ? '0' : '1'
                            setMenuOpen(menuValue) // 메인 메뉴버튼 클릭시 열리고 닫기
                        }}
                    >
                    </ImgBtn> 
                    {menuOpen === '1' &&
                        <>  
                            <p key='empty3'></p>
                                <PBtn //home
                                    key='home'
                                    className='pBtnNoRed'
                                    labelText='HOME'
                                    alt='homeBtn'
                                    style={{fontSize: mainfont}}
                                    onClick={() =>{
                                        let menuValue = menuOpen === '1' ? '0' : '1'
                                        setMenuOpen(menuValue) 
                                        navigate('/home')
                                    }}
                                >
                                </PBtn>
                                <PBtn //상품 나열 버튼
                                    key='shop'
                                    className='pBtnNoRed'
                                    labelText='SHOP'
                                    alt='shopBtn'
                                    style={{fontSize: mainfont}}
                                    onClick={() =>{
                                        setShopSubOpen(shopSubOpen ? false : true) 
                                    }}
                                >
                                </PBtn>
                                {shopSubOpen && 
                                <>
                                    {seasonItem()}
                                </>
                                } 
                                <PBtn 
                                    key='service'
                                    className='pBtnNoRed'
                                    labelText='SERVICE'
                                    alt='service'
                                    style={{fontSize: mainfont}}
                                    onClick={() =>{
                                        let menuValue = menuOpen === '1' ? '0' : '1'
                                        navigate('/shop/service')
                                        setMenuOpen(menuValue)
                                    }}
                                    >
                                </PBtn>
                        </>
                    }
                </div>
            </nav>       
        </>
    );
}
export default MainShopBtn;