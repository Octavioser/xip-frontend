import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common';

const ProductList = () => {

    const {navigate, commonApi, commonShowLoading, commonHideLoading, commonRegion} = useCommon();

    const [productListItem, setProductListItem] = useState([]);   //  상품 정보 state 에 저장

    const [season, setSeason] = useState('ALL');                     // 시즌

    const {state} = useLocation();   // 메인버튼에서 state 값 받아오기

    // 판매전-0 판매중-1 판매중단-2 프리오더-3
    useEffect(() => {
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/shop/shopR002', {season: state});
                if(!!resultData || resultData.length > 0) {
                    setProductListItem(resultData);
                }
                else {
                    setProductListItem([]);
                }
            } catch (error) {
                setProductListItem([]);
            } finally {
                commonHideLoading();
            }
            
        }
        if(season !== state) { // 파라미터가 바뀌었을 경우
            setSeason(state);
            getItem();
        }
        /* eslint-disable */
    },[state]); // state 값이 바뀌었을경우

    
    
    const onClick = (e) => {
        if(e.status === '0') { //status=2 판매완료 status=0 커밍순
            return;
        }
        else {
            navigate(`./detailproduct/${e.prodCd}`)
        }
    }
    

    return (
        <>
        <div style={{width:'100%', height:'10vh'}}></div>
        <div style={{display: 'flex', justifyContent: 'center', width:'100%', minHeight: '90vh'}}>
            <div 
                style={{
                    display:'flex', 
                    flexWrap: 'wrap',
                    width:'84vw',
                    height: 'auto'
                }}
            >
                {productListItem.map((e, index) => 
                    <div // 사진 640 x 480
                        key={index}
                        style={{ 
                            display: 'block', 
                            position: 'relative', 
                            margin : '0.3vw',
                            width:  isMobile? '40vw':'20vw',  
                            height: isMobile? '53.2vw': '26.6vw'
                        }}
                    >
                        <ImgBtn
                            id={index}
                            src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/' + e.imageSrc} 
                            className='imgBtnNoRed'
                            alt={e.name}
                            style={{ width: '100%',height: '100%', objectFit: 'contain'}}
                        >  
                        </ImgBtn>
                            <>
                            {e.status === '1'|| e.status === '3'  ? // status=1 판매중 status=3 프리오더
                                <div 
                                    key={index}
                                    className='prodHover'
                                    onClick={()=>{
                                        onClick(e);
                                    }}
                                >
                                    <div style={{display:'flex', alignItems:'center', width:'100%', height:'35%',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
                                        <div style={{width:'100%'}}>
                                        {e.status === '3' && <>Pre-order<br/></>}
                                        {e.name}<br/>
                                        {commonRegion() === 'KOR' ? 
                                            '₩' + e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            :
                                            '$' + e.usPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        </div>
                                    </div>
                                </div>
                                :
                                <div 
                                    key={index}
                                    className='prodHover'
                                    onClick={()=>{
                                        onClick(e);
                                    }}
                                >
                                    <div style={{display:'flex', alignItems:'center', width:'100%', height:'35%',backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
                                        <div style={{width:'100%'}}>
                                        {e.status === '2' ?
                                            <>SOLD OUT</>
                                        :
                                            <>Coming<br></br>Soon</>
                                        }
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
export default ProductList;