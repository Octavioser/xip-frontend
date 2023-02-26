import React, { useRef, useState } from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import f01 from './f01.jpg';
import f02 from './f02.jpg';
import f03 from './f03.jpg';

// 정보
const ImageSlide = () => {
    // const swiperRef = useRef<HTMLDivElement>(null);
    // const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
    // const [loop, setLoop] = useState<any>(null);
    const imageList = [{index:1,imageSrc:f01}, {index:2, imageSrc:f02}, {index:3, imageSrc:f03}]
    const imageWidth = isMobile ? '95vw' : '50vw'
    return (    
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center', minHeight: '85vh', top: isMobile ? '30vh': '0vh'}}>
                    <div>
                        {imageList.map(e => 
                            <div key={'f'+e.index.toString()}><img style={{width: imageWidth}} src={e.imageSrc} alt={e.index} ></img></div>    
                        )}
                        {imageList.map(e => 
                            <div key={'f'+e.index.toString()}><img style={{width: imageWidth}} src={e.imageSrc} alt={e.index} ></img></div>    
                        )}
                        {/* <div><img style={{width: '50vw'}} src={f01} alt='f01'></img></div>
                        <div><img style={{width: '50vw'}} src={f02} alt='f02'></img></div>
                        <div><img style={{width: '50vw'}} src={f03} alt='f03'></img></div> */}
                    </div>
            </div>
    );
};
export default ImageSlide;
