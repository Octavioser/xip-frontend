import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common';

const NewtypeHome = () => {
    const [rotation, setRotation] = useState(0); // 회전 각도 상태
    const [startX, setStartX] = useState(0);  // 터치 시작 X 좌표

    const {navigate} = useCommon();

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); // 터치 시작 좌표 설정
    };

    const handleTouchMove = (e) => {
        const touchX = e.touches[0].clientX; // 현재 터치 좌표
        const diffX = (touchX - startX)/8; // 이동한 거리
        setRotation((currentRotation) => currentRotation + diffX / 10); // 회전 각도 업데이트
    };

    const menuStyle = {
        fontSize: isMobile ? '2rem' : '2.7rem',
        textAlign: 'center',
        position: 'absolute',
        width: '10%',
        height: '20%',
        left: '45%',
        top: '45%',
        transition: 'transform 0.5s ease'
    };

    return (
        <div 
            style={{ 
                position: 'fixed', 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/background/newtypeBackground.webp)',
                // backgroundPosition: "center",
                backgroundSize: "130% 100%",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    perspective: '600px',
                }}
            >
                { !isMobile && <div
                    style={{
                        display: 'flex',
                        width: '80%',
                        height: '70%',
                        justifyContent: 'space-between',
                        alignItems:'center'
                    }}
                >
                    <PBtn
                        style={{textAlign:'left', fontSize:'2.3rem'}}
                        labelText='◀'
                        onClick={()=>{
                            setRotation(rotation - 72)
                        }}
                    />
                    <PBtn
                        style={{textAlign:'right', fontSize:'2.3rem'}}
                        labelText="▶"
                        onClick={()=>{
                            setRotation(rotation + 72)
                        }}
                    />
                </div>}

                <div
                    style={{
                        width: '70%',
                        height: '70%',
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <PBtn
                        style={{ transform: `rotateY(${rotation + 0}deg) translateZ(${isMobile? '200px' : '300px'})`, ...menuStyle }}
                        labelText="collection"
                        onClick={()=>{
                            navigate('/works/newtype')
                        }}
                    />
                    <PBtn
                        style={{ transform: `rotateY(${rotation + 72}deg) translateZ(${isMobile? '200px' : '300px'})`, ...menuStyle }}
                        labelText="sound"
                        onClick={()=>{
                            window.open('https://linktr.ee/cuechoi', '_blank') 
                        }}
                    />
                    <PBtn
                        style={{ transform: `rotateY(${rotation + 144}deg) translateZ(${isMobile? '200px' : '300px'})`, ...menuStyle }}
                        labelText="shop"
                        onClick={()=>{
                            navigate('/shop')
                        }}
                    />
                    <PBtn
                        style={{ transform: `rotateY(${rotation + 216}deg) translateZ(${isMobile? '200px' : '300px'})`, ...menuStyle }}
                        labelText="video"
                        
                    />
                    <PBtn
                        style={{ transform: `rotateY(${rotation + 288}deg)translateZ(${isMobile? '200px' : '300px'})`, ...menuStyle }}
                        labelText="illust"
                    />
                    <div
                        style={{
                            position: 'absolute',
                            width: isMobile ? '70vw' : '30vw',
                            height: isMobile ? '70vw' : '30vw',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundImage: 'url(https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/main/newtypeMain.webp)',
                            backgroundSize: 'cover',
                        }}
                    />
                </div>
                
            </div>
        </div>
    );
};

export default NewtypeHome;
