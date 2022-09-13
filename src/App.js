import React, { Component, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import {ImgBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Video from './app/components/xip/RED/Video';
import NotFound from './app/components/xip/RED/NotFound'
import Works from './app/components/xip/RED/Works'  
import { isMobile } from 'react-device-detect';



// 메뉴 컴포넌트 (경로이동)
export default class App extends Component {
    menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8_2.png'
    worksBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/works.png'
    creditBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/credit.png'
    musicBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/sound.png'
    shopBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/shop.png'
    videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/video.png'
    state= {
        menuOpen: '0',
        startClickValue: '0' // 처음시작화면 클릭했는지 
    }
    
    constructor(props){
        super(props);
        this.props =props
    }

    location = () => {
        
    }

  	render() {
        const menuSize = {height: isMobile ? '3vh':'6vh'}
        
		return (
			<BrowserRouter>
            {/* 메뉴버튼 */}
            <header> 
                <div style={{width:'10vw'}}>
                    {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                    {window.location.pathname === '/' ?
                        <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                            src={this.menuMainBtn} 
                            alt='menuButton' 
                            style={{top:0, left:0, height: isMobile ? '15vh':'10vh'}}
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1',  // 메인 메뉴버튼 클릭시 열리고 닫기
                                    startClickValue: '1' // 스타트 버튼 클릭햇으면
                                })
                            }}
                        >
                        </ImgBtn> 
                    :
                        <Link to="./"> 
                            <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                                src={this.menuMainBtn} 
                                alt='menuButton' 
                                style={{top:0, left:0, height: isMobile ? '15vh':'10vh'}}
                                onClick={() =>{
                                    this.setState({
                                        menuOpen: this.state.menuOpen === '1' ? '0' : '1',  // 메인 메뉴버튼 클릭시 열리고 닫기
                                        startClickValue: '1' // 스타트 버튼 클릭햇으면
                                    })
                                }}
                            >
                            </ImgBtn>
                        </Link>
                    }
                    {this.state.menuOpen === '1' ?
                    <>
                    <Link to="./works"> 
                        <ImgBtn //works
                            src={this.worksBtn}
                            alt='worksBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1'
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
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1'
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                    </Link>
                    {/* <Link to="./music"> */}
                        <ImgBtn //음악 사이트 이동
                            src={this.musicBtn}
                            alt='musicBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1'
                                },()=>{
                                    window.open('https://ffm.to/cuechoi_twelvedrives', '_blank')
                                })
                            }}
                            style={menuSize}
                        >
                    </ImgBtn>
                    {/* </Link> */}
                    <Link to="./shop"> 
                        <ImgBtn // 샵
                            src={this.shopBtn}
                            alt='shopBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1'
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                    </Link>
                    <Link to="./credit"> 
                        <ImgBtn // contact
                            src={this.creditBtn}
                            alt='creditBtn'
                            onClick={() =>{
                                this.setState({
                                    menuOpen: this.state.menuOpen === '1' ? '0' : '1'
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
                <Route path="/" element={<Home startClickValue={this.state.startClickValue}/>}></Route>
                <Route path="/video" element={<Video/>}></Route>
                <Route path="/works" element={<Works/>}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </BrowserRouter>
		);
  	}
};


