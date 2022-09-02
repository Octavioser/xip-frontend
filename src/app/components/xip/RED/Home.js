import React, { Component} from 'react';
import '../../../../App.css';
import ModelViewer from '../REDCommon/3D/ModelViewer'
import model from '../REDCommon/3D/XIP_ALUMINUM_EMISSION4.glb'
import { isMobile } from 'react-device-detect';
// import model from '../REDCommon/3D/cheeseBurger.glb'
export default class Home extends Component {

    state = {
        x : '50vw',
        y : '50vh',
        oldX : 0,
        oldY : 0,
        degree: ''
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
    
                this.setState({
                    degree : degree,
                    x: e.clientX,
                    y: e.clientY
                })
            })
        } 
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
                    transition: 'all 3s',
                    // transformOrigin: 'right bottom',
                    transform: `rotateZ(${degree}) translate(0%, 0%)`
                }}
            >
            <div className='spermCursor' ></div>
            </div>
        )
        
    }
    
    render() {
        return (
            <div>
                <div className='logoImage'>
                    <ModelViewer scale= {isMobile ? '0.8':"1.5"} modelPath={model}></ModelViewer>
                    {/* scale은 크기 modelPath는 glb경로 */}
                    {/* 참고사이트 https://victordibia.com/blog/blender-to-react/#step-1-export-your-3d-model-as-gltf-20 */}
                </div>
                <div>
                    {/* 모바일 상태에서는 커서 x */}
                    {isMobile ? <></> : <this.spermCursor></this.spermCursor>} 
                </div>
            </div>
        )
    }
}