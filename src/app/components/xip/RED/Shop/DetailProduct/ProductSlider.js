import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { isMobile } from 'react-device-detect';

const ProductSlider = () => {
  const settings = {
    arrows: false,
    dots: true, // 인디케이터 점 표시
    infinite: true, // 무한 루프
    speed: 500, // 전환 속도
    slidesToShow: 1, // 한 번에 보여지는 슬라이드 수
    slidesToScroll: 1, // 스크롤할 때 넘어가는 슬라이드 수
    variableWidth: true,
  };

  const imageWidth = isMobile? '59.9vw':'29.9vw';

  return (
    <div className="carousel" style={{width:isMobile? '60vw':'30vw'}}>
        <Slider {...settings}>
            <img src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif" alt="1111"
                style={{width: imageWidth}}
            />
            <img src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testpants.gif" alt="2222"
                style={{width: imageWidth}}/>
            <img src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif" alt="3333"
                style={{width: imageWidth}}/>
        {/* 추가 슬라이드 ... */}
        </Slider>
    </div>
  );
};

export default ProductSlider;
