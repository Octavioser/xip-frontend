import React, { useEffect, useState} from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common';


const ProductSlider = (props) => {

    const {commonGetS3Img, commonShowLoading, commonHideLoading} = useCommon();

    const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const [imageList, setImageList] = useState([]);   //  상품 정보 state 에 저장\

    useEffect(() => {
        
        // 이미지 데이터 갖고오기기
        const getData = async () => {     
            let displaylistData = []; 
            try {
                await commonShowLoading();
                const imageWidth = isMobile? '59.9vw':'29.9vw'; 
                
                let list = await commonGetS3Img('product', props.prodCd);
                for(let i=0; i<list.length; i++) {
                    console.log(list[i])
                    displaylistData = displaylistData.concat([
                        <img key={i} src={awsUrl + list[i]} alt={'image' + i}
                                style={{width: imageWidth}}/>
                    ])
                }
            } catch (error) {
                console.log(error)
            } finally {
                commonHideLoading();
            }
            
            setImageList(displaylistData)
        }
        if(useEffectCheck === 0) { // 처음시작인지 아니면 파라미터가 바뀌었을 경우
            setUseEffectCheck(1);
            getData();
        }
    },[props.prodCd,commonGetS3Img,commonHideLoading,commonShowLoading,useEffectCheck]);  // useEffect(() => { },[]) 처음에만 동작


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
