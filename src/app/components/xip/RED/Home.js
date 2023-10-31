import React, {useState, useEffect} from 'react';
import '../../../../App.css';
import ModelViewer from '../REDCommon/3D/ModelViewer'
import model from '../REDCommon/3D/XIP_ALUMINUM_EMISSION4.glb'
import { isMobile } from 'react-device-detect';




const Home = () => {

    // 정자 커서 관련
    const [x , setX] = useState('50vw');
    const [y , setY] = useState('50vh');
    const [degree, setDegree] = useState('');

    useEffect(() => {
        if(isMobile){  // 모바일 상태에서는 커서 x

        }
        else{
            window.addEventListener('mousemove', (e)=>{ // 알아서 혼자 실행됨 
                let degree = calculateRotate(x, y, e.clientX, e.clientY)
    
                setDegree(degree);//위치 
                setX(e.clientX);
                setY(e.clientY);
            })
        } 
    });

    const calculateRotate = (oldX, oldY, x, y) => {   // 마우스 커서 꼬리 방향 구하기
        let radians = Math.atan2(x - oldX, y - oldY)
        let degree = ((radians * (180 / Math.PI) * -1) + 180) +'deg';
        return degree;
    }

    const spermCursor = () =>{ // 커서 컴포넌트
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


    return(
        <div> 
            {/* 가운데 3D 로고  */}
            <div className='logoImage'> 
                <ModelViewer scale= {isMobile ? '0.8':"1.5"} modelPath={model}></ModelViewer>
                {/* scale은 크기 modelPath는 glb경로 */}
                {/* 참고사이트 https://victordibia.com/blog/blender-to-react/#step-1-export-your-3d-model-as-gltf-20 */}
            </div>
            <div style={{overflow: 'hidden'}}>
                {/* 모바일 상태에서는 커서 x */}
                {isMobile ? 
                    <></> 
                : 
                    <>{spermCursor()}</>
                }
            </div>
        </div>
    )
} 
export default Home