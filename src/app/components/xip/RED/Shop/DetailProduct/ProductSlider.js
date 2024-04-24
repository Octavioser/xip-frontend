import React, { useEffect, useState} from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { isMobile } from 'react-device-detect';

const ProductSlider = (props) => {

    const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';

    const [imageList, setImageList] = useState([]);   //  상품 정보 state 에 저장\

    useEffect(() => {
        
        // 이미지 데이터 갖고오기기
        const getData = async () => {     
            let displaylistData = []; 
            
            let list = props.imgList
            for(let i=0; i<list.length; i++) {
                displaylistData = displaylistData.concat([
                    <img 
                        key={'img' + i} 
                        style={{ height: '719px', width: '575px', objectFit: 'contain' }}
                        src={awsUrl + list[i]} 
                        alt={'image' + i}
                    />
                ])
            }
            
            setImageList(displaylistData)
        }

        getData();
    },[props.imgList]);  // useEffect(() => { },[]) 처음에만 동작


    const settings = {
        arrows: false,
        dots: true, // 인디케이터 점 표시
        infinite: true, // 무한 루프
        speed: 500, // 전환 속도
        slidesToShow: 1, // 한 번에 보여지는 슬라이드 수
        slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
        variableWidth: false, //  슬라이드의 너비가 다를 수 있음
        adaptiveHeight: false // 이미지 높이
    };

    return (
        <div style={{display:'flex', justifyContent:'right', width:'99.9%', height:'100%'}}>
            <div className="carousel" style={{width: isMobile ? '100%':'70%'}}>
                <Slider {...settings}>
                {imageList}
                {/* 추가 슬라이드 ... */}
                </Slider>
            </div>
        </div>
    );
};

    export default ProductSlider;
