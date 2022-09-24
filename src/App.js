import React, { Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import './App.js';
import {ImgBtn} from './app/components/xip/REDCommon/CommonStyle';
import Home from './app/components/xip/RED/Home';
import Video from './app/components/xip/RED/Video';
import NotFound from './app/components/xip/RED/NotFound'
import Works from './app/components/xip/RED/Works'
import Credit from './app/components/xip/RED/Credit'  
import { isMobile } from 'react-device-detect';


    
// 메뉴 컴포넌트 (경로이동)
export default class App extends Component {
    // 메뉴
    menuMainBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/menu8_2.png'
    worksBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/works.png'
    creditBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/credit.png'
    musicBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/sound.png'
    shopBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/shop.png'
    videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/home/video.png'

    // 소리제어
    soundBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png'
    backgroundMusic = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    state= {
        menuOpen: '0', // 헤더 메뉴 버튼 닫음 0 열림 1
        startClickValue: '0', // 처음시작화면 클릭했는지 

        backgroundMusic: '',
        play: false

    }
    
    constructor(props){
        super(props);
        this.props =props
    }

    componentDidMount(){
        this.default();
    }

    default() {
        this.setState({ // 음악 생성자
            backgroundMusic : new Audio(this.backgroundMusic), // 배경 음악
        })
    }

    music = {
        play: () =>{ // 음악 재생
            let {play, backgroundMusic} = this.state;
            let playValue = play === true ? false : true ;
            this.setState({ play: playValue})
            if(playValue) {
                backgroundMusic.play();   //재생
                this.soundBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png'
            }
            else{
                backgroundMusic.pause();  //멈춤
                this.soundBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundStop.png'
            }		
            backgroundMusic.loop = true;  // 반복
        },
        soundBtn: () =>{
            return(
                <ImgBtn  
                    className='soundBtn'
                    style={{width: isMobile ?'6vw':'3vw', right: '20px', bottom: '20px'}}
                    src={this.soundBtn} 
                    alt='startBtn' 
                    onClick={()=>{
                        this.music.play();
                    }}
                    hover = {false}
                    >
                </ImgBtn>
            )
        }
    }    

  	render() {
        const menuSize = {height: isMobile ? '3vh':'6vh'}
        
		return (
			<BrowserRouter>
            {/* 메뉴버튼 */}
            <header> 
                <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', width:'10vw'}}>
                    {/* 홈화면이면 리스트를 보여주고 아니면 뒤로가기 */}
                    {window.location.pathname === '/' ?
                        <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                            src={this.menuMainBtn} 
                            alt='menuButton' 
                            style={{top:'10vw', left: '10vh', height: isMobile ? '15vh':'10vh'}}
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
            <this.music.soundBtn></this.music.soundBtn>
            <Routes>
                {/* 맨처음화면 */}
                <Route path="/" element={<Home startClickValue={this.state.startClickValue} soundBtn={this.music.play}/>}></Route>
                <Route path="/video" element={<Video/>}></Route>
                <Route path="/works" element={<Works/>}></Route>
                <Route path="/credit" element={<Credit/>}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </BrowserRouter>
            
		);
  	}
};


