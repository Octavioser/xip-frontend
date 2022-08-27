import React, { Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import {ImgBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Video from './app/components/xip/RED/Video';
import NotFound from './app/components/xip/RED/NotFound' 


const burger = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8.png'
const worksBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/worksBtn.png'
const contactBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/contactBtn.png'
const musicBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/musicBtn.png'
const shopBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop.png'
const videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/videoBtn.png'

// 메뉴 컴포넌트 (경로이동)
export default class App extends Component {

    state= {
        menuOpen: 0
    }
    
  	render() {
        const menuSize = {width:'100px', height:'45px'}
		return (
			<BrowserRouter>
            {/* 메뉴버튼 */}
            <header style={{width:'100px'}}> 
                <div style={{width:'100px'}}>
                    <ImgBtn 
                        src={burger} 
                        alt='menuButton' 
                        style={{top:0, left:0, width:'100px'}}
                        onClick={() =>{
                            console.log('1111')
                            this.setState({
                                menuOpen: this.state.menuOpen === 1 ? 0 : 1
                            })
                        }}
                    >
                    </ImgBtn>
                    {this.state.menuOpen === 1 ?
                    <>
                    <Link to="./works"> 
                        <ImgBtn //works
                            src={worksBtn}
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
                        <ImgBtn
                            src={videoBtn}
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
                        <ImgBtn
                            src={musicBtn}
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
                        <ImgBtn
                            src={shopBtn}
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
                        <ImgBtn //
                            src={contactBtn}
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
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </BrowserRouter>
		);
  	}
    
  

};


