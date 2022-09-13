import React, { Component} from 'react';
import '../../../../App.css';
import ModelViewer from '../REDCommon/3D/ModelViewer'
import model from '../REDCommon/3D/XIP_ALUMINUM_EMISSION4.glb'
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';
// import model from '../REDCommon/3D/cheeseBurger.glb'

const startBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/start.png'
const soundBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/soundControl.png'
export default class Home extends Component {

    backgroundMusic = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/wow.wav'

    state = {

        // 정자 커서 관련
        x : '50vw',
        y : '50vh',
        oldX : 0,
        oldY : 0,
        degree: '',

        // 시작화면 0 일때는 처음 1일이면 스타트버튼클릭상태
        startValue: '0',

        // 음악
        backgroundMusic: ''
    }

    componentDidMount() {
        this.default();
      }

    constructor(props) {
        super(props);
        this.props = props;
    }

    default() { // 처음에 커서 위치로 이동 하기위해 defalut 넣어줌
        if(isMobile){  // 모바일 상태에서는 커서 x

        }
        else{
            window.addEventListener('mousemove', (e)=>{ // 알아서 혼자 실행됨 
                let {x,y} = this.state; 
                let degree = this.calculateRotate(x, y, e.clientX, e.clientY)
    
                this.setState({  //위치 
                    degree : degree,
                    x: e.clientX,
                    y: e.clientY
                })
            })
        } 

        this.setState({ // 음악 생성자
            backgroundMusic : new Audio(this.backgroundMusic), // 배경 음악
        })
    }

    calculateRotate(oldX, oldY, x, y) {   // 마우스 커서 꼬리 방향 구하기
        let radians = Math.atan2(x - oldX, y - oldY)
        let degree = ((radians * (180 / Math.PI) * -1) + 180) +'deg';
        return degree;
    }

    spermCursor = (props) =>{ // 커서 컴포넌트
        let {x,y,degree} = this.state; 

        return(
            <div 
                style={{
                    position:"absolute",
                    left: x,
                    top:y,
                    transition: 'all 3s',  // 딜레이
                    // transformOrigin: 'right bottom',
                    transform: `rotateZ(${degree}) translate(0%, 0%)`
                }}
            >
            <div className='spermCursor' ></div>
            </div>
        )
        
    }

    music = {
        play: () =>{ // 음악 재생
            let {play, backgroundMusic} = this.state;
            let playValue = play === true ? false : true ;
            this.setState({ play: playValue})
            if(playValue) {
                backgroundMusic.play();   //재생
            }
            else{
                backgroundMusic.pause();  //멈춤
            }		
            backgroundMusic.loop = true;  // 반복
        },
        // 스타트 버튼 클릭 이벤트
        clickStartBtn: () => {
            this.setState({
                startValue: '1'     // 홈화면 보이기
            },() => {
                setTimeout(() => {
                    this.music.play(); //배경음악 2초뒤 실행
                },1500)
            })
        }
    }
    
    render() {
        return (
            
            <div> 
                {this.state.startValue === '0' && this.props.startClickValue === '0'?
                // 맨 처음 화면 노클리
                <div className='beforeStart'>
                    <ImgBtn 
                        className='logoImage'
                        style={{width: isMobile ?'20vw':'10vw', height: 'auto'}}
                        src= {startBtn} 
                        alt='startBtn' 
                        onClick={()=>{
                            this.music.clickStartBtn();
                        }}
                        hover = {false}
                        >
                    </ImgBtn>
                </div>
                :
                <>
                    {/* 가운데 3D 로고  */}
                    <div className='logoImage'> 
                        <ModelViewer scale= {isMobile ? '0.8':"1.5"} modelPath={model}></ModelViewer>
                        {/* scale은 크기 modelPath는 glb경로 */}
                        {/* 참고사이트 https://victordibia.com/blog/blender-to-react/#step-1-export-your-3d-model-as-gltf-20 */}
                    </div>
                    <div>
                        {/* 모바일 상태에서는 커서 x */}
                        {isMobile ? <></> : <this.spermCursor></this.spermCursor>} 
                    </div>

                    <ImgBtn  
                        style={{width: isMobile ?'6vw':'3vw', position: 'absolute', right: '20px', bottom: '20px'}}
                        src= {soundBtn} 
                        alt='startBtn' 
                        onClick={()=>{
                            this.music.play();
                        }}
                        hover = {false}
                        >
                    </ImgBtn>
                </> 
                }
            </div>
            
            
        )
    }
}