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
            const imageWidth = isMobile? '59.9vw':'29.9vw'; 
            
            let list = props.imgList
            for(let i=0; i<list.length; i++) {
                displaylistData = displaylistData.concat([
                    <img key={i} src={awsUrl + list[i]} alt={'image' + i}
                            style={{width: imageWidth}}/>
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
        variableWidth: true,
    };

    return (
        <div className="carousel" style={{width:isMobile? '60vw':'30vw'}}>
            <Slider {...settings}>
            {imageList}
            {/* 추가 슬라이드 ... */}
            </Slider>
        </div>
    );
};

    export default ProductSlider;
