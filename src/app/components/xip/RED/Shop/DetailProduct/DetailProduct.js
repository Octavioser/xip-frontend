import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import ProductSlider from "./ProductSlider";
import ProductDescription from "./ProductDescription";
import { isMobile } from 'react-device-detect';

const DetailProduct = () => {

    const {prodCd} = useParams();

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const [productListItem, setProductListItem] = useState([]);   //  상품 정보 state 에 저장

    const [imgList, setImgList] = useState([]); // s3 이미지

    const {navigate, commonApi, commonShowLoading, commonHideLoading, commonGetS3Img} = useCommon();

    useEffect(() => {       
        const getItem = async() => {
            await commonShowLoading();
            try {
                let list = [];
                let resultData = await commonApi('/shop/shopR003', {prodCd: prodCd});
                if(!!resultData && resultData !== -1 && resultData.length > 0) {
                    setProductListItem(resultData)
                    list = (resultData[0].imgSrc).split('|')
                    setImgList(list);
                }
                else {
                    navigate('/shop')
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
            
        }
        if(useEffectCheck === 0) { // 처음시작인지 아니면 파라미터가 바뀌었을 경우
            setUseEffectCheck(1);
            getItem();
        }
    },[commonShowLoading, commonHideLoading, commonApi, useEffectCheck, navigate, prodCd, commonGetS3Img]);

    const parentDivStyle = () => {

        let item = 
            isMobile ?
                    {
                        width: '100vw', 
                        height: '100vh'
                    }
                    :
                    {
                        display:'flex',  
                        overflow: 'hidden', 
                        width: '100vw', 
                        height: '100vh', 
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }   
        return(item)
    }

    const productSliderStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  alignItems: 'center', position: 'relative', top:'10vh'}
                :
                {display:'flex', justifyContent: 'center',  alignItems: 'center'}
        return(item)
    }

    const productDescriptionStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  alignItems: 'center', position: 'relative', top:'10vh'}
                :
                {display:'flex', justifyContent: 'center',  alignItems: 'center', width:'50vw', height:'40vw'}
        return(item)
    }



    return (
        <div style={parentDivStyle()}
        >
            <div style={productSliderStyle()}>
                <ProductSlider imgList={imgList}/>
            </div>
            <div style={productDescriptionStyle()}>
                <ProductDescription productListItem={productListItem}/>
            </div>
        </div>
    )
}
export default DetailProduct;