import React, {useState} from 'react';
import { useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useCommon } from '../REDCommon/Common';

import {ImgBtn, PBtn} from 'app/components/xip/REDCommon/CommonStyle';

// 메뉴 컴포넌트 (경로이동)
const MainBtn = (props) => {
         
    // 메뉴
    const { pathname } = useLocation();
    const menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/mainXLogo.webp'

    const [menuOpen, setMenuOpen] = useState(false);                 // 헤더 메뉴 버튼 닫음 0 열림 1

    const {navigate} = useCommon();

    // 뒤로가기
    const goBack = () => {
        navigate(-1)
    }
    return (
        <>
            { !(pathname === '/') &&  //처음 화면
                <>
                    {/* x 메뉴버튼 */}
                    <nav>
                        <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', width:'10vw'}}>
                            {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                            {pathname === '/home' ?
                                <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                                    src={menuMainBtn} 
                                    className='imgBtnNoRed'
                                    alt='menuButton' 
                                    style={{top:'10vw', left: '10vh', height: isMobile ? '10vh':'15vh'}}
                                    onClick={() =>{
                                        setMenuOpen(!menuOpen) // 메인 메뉴버튼 클릭시 열리고 닫기
                                        props.setStartClick()// 스타트 버튼 클릭햇으면
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

                            {menuOpen &&
                            <>
                                <Link to="./newtype"> 
                                    <PBtn 
                                        labelText='new+ype'
                                        alt='newtypeBtn'
                                        onClick={() =>{
                                            props.musicSwitch(true, 'newtype');
                                            setMenuOpen(false) 
                                        }}
                                    >
                                    </PBtn>
                                </Link>
                                <Link to="./works"> 
                                    <PBtn //works
                                        labelText='works'
                                        alt='worksBtn'
                                        onClick={() =>{
                                            setMenuOpen(false) 
                                        }}
                                    >
                                    </PBtn>
                                </Link>
                                <Link to="./video"> 
                                    <PBtn //비디오
                                        labelText='video'
                                        alt='videoBtn'
                                        onClick={() =>{
                                            setMenuOpen(false) 
                                        }}
                                    >
                                    </PBtn>
                                </Link>
                                {/* <Link to="./music"> */}
                                    <PBtn //음악 사이트 이동
                                        labelText='sound'
                                        alt='soundBtn'
                                        onClick={() =>{
                                            setMenuOpen(false)
                                            window.open('https://linktr.ee/cuechoi', '_blank') 
                                        }}
                                    >
                                    </PBtn>
                                {/* </Link> */}
                                <Link to="./shop"> 
                                    <PBtn // 샵
                                        labelText='shop'
                                        alt='shopBtn'
                                        onClick={() =>{
                                            setMenuOpen(false) 
                                        }}
                                    >
                                    </PBtn>
                                </Link>
                                <Link to="./credit"> 
                                    <PBtn 
                                        labelText='credit'
                                        alt='creditBtn'
                                        onClick={() =>{
                                            setMenuOpen(false) 
                                        }}
                                    >
                                    </PBtn>
                                </Link>
                                
                            </>}
                        </div>
                    </nav>
                </>
            }               
        </>
    );
}
export default MainBtn


