import React, { Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import {ImgBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Video from './app/components/xip/RED/Video';
import Music from './app/components/xip/RED/Music';
import NotFound from './app/components/xip/RED/NotFound' 
import { isMobile } from 'react-device-detect';


// 메뉴 컴포넌트 (경로이동)
export default class App extends Component {

    menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8_2.png'
    worksBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/worksBtn.png'
    contactBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/contactBtn.png'
    musicBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/musicBtn.png'
    shopBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop.png'
    videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/videoBtn.png'
    state= {
        menuOpen: 0
    }
    
  	render() {
        const menuSize = {height: isMobile ? '6vh':'10vh'}
		return (
			<BrowserRouter>
            {/* 메뉴버튼 */}
            <header> 
                <div style={{width:'10vw'}}>
                    <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                        src={this.menuMainBtn} 
                        alt='menuButton' 
                        style={{top:0, left:0, height: isMobile ? '15vw':'10vw'}}
                        onClick={() =>{
                            this.setState({
                                menuOpen: this.state.menuOpen === 1 ? 0 : 1  // 메인 메뉴버튼 클릭시 열리고 닫기
                            })
                        }}
                    >
                    </ImgBtn>
                    {this.state.menuOpen === 1 ?
                    <>
                    <Link to="./works"> 
                        <ImgBtn //works
                            src={this.worksBtn}
                            alt='worksBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === 1 ? 0 : 1
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                    </Link>
                    <Link to="./video"> 
                        <ImgBtn //비디오
                            src={this.videoBtn}
                            alt='videoBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === 1 ? 0 : 1
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                    </Link>
                    <Link to="./music">
                        <ImgBtn //음악 사이트 이동
                            src={this.musicBtn}
                            alt='musicBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === 1 ? 0 : 1
                                })
                            }}
                            style={menuSize}
                        >
                    </ImgBtn>
                    </Link>
                    <Link to="./shop"> 
                        <ImgBtn // 샵
                            src={this.shopBtn}
                            alt='shopBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === 1 ? 0 : 1
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                    </Link>
                    <Link to="./contact"> 
                        <ImgBtn // contact
                            src={this.contactBtn}
                            alt='contactBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === 1 ? 0 : 1
                                })
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
            </header>
            <Routes>
                {/* 맨처음화면 */}
                <Route path="/" element={<Home/>}></Route>
                <Route path="/video" element={<Video/>}></Route>
                <Route path="/music" element={<Music link='https://ffm.to/cuechoi_twelvedrives'/>}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </BrowserRouter>
		);
  	}
    
  

};


