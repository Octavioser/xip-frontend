import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import ProductSlider from "./ProductSlider";
import ProductDescription from "./ProductDescription";
import { isMobile } from 'react-device-detect';

const DetailProduct = () => {

    const {prodCd} = useParams();

    const [productListItem, setProductListItem] = useState([]);   //  상품 정보 state 에 저장

    const [imgList, setImgList] = useState([]); // s3 이미지

    const {navigate, commonApi, commonShowLoading, commonHideLoading} = useCommon();

    useEffect(() => {       
        const getItem = async() => {
            await commonShowLoading();
            try {
                let list = [];
                let resultData = await commonApi('/shop/shopR003', {prodCd: prodCd});
                if(!!resultData && resultData.length > 0) {
                    setProductListItem(resultData)
                    list = (resultData[0].imgSrc).split('|')
                    setImgList(list);
                }
                else {
                    navigate('/shop')
                }
            } catch (error) {
                navigate('/shop')
            } finally {
                commonHideLoading();
            }
            
        }
        getItem();
        /* eslint-disable */
    },[]);

    const parentDivStyle = () => {

        let item = 
            isMobile ?
                    {
                        width: '100%', 
                        minHeight: '100vh'
                    }
                    :
                    {
                        display:'flex',  
                        width: '100%', 
                        minHeight: '100vh', 
                        flexDirection: 'row',
                    }   
        return(item)
    }

    const productSliderStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  position: 'relative', marginTop:'20vh', width:'100%'}
                :
                {display:'flex', justifyContent: 'center',  position: 'relative', width:'50%', top:'7vh'}
        return(item)
    }

    const productDescriptionStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  alignItems: 'center', position: 'relative', marginTop:'10vh'}
                :
                {display:'flex', position:'relative', justifyContent: 'center',  alignItems: 'center', width:'50%', height:'40&', top:'10vh'}
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