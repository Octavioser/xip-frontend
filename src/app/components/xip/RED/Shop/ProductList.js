import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common';

const ProductList = () => {

    const {navigate, commonApi, commonShowLoading, commonHideLoading} = useCommon();

    const [productHover, setProductHover] = useState('');         // 마우스 올렸을시 바뀌는 값

    const [productListItem, setProductListItem] = useState([]);   //  상품 정보 state 에 저장

    const [season, setSeason] = useState('ALL');                     // 시즌

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    const {state} = useLocation();   // 메인버튼에서 state 값 받아오기

    // 판매전-0 판매중-1 판매중단-2 프리오더-3
    useEffect(() => {
        if(useEffectCheck === 0){
            setSeason(state || 'ALL')
        }

        
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/shop/shopR002', {season: state});
                if(!!resultData && resultData !== -1) {
                    setProductListItem(resultData);
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
            
        }
        if(useEffectCheck === 0 || season !== state) { // 처음시작인지 아니면 파라미터가 바뀌었을 경우
            setUseEffectCheck(1);
            setSeason(state);
            getItem();
        }
    },[state, commonShowLoading, commonHideLoading, commonApi, season, useEffectCheck]);

    
    
    const onClick = (e) => {
        if(e.status === '0') { //status=2 판매완료 status=0 커밍순
            return;
        }
        else {
            navigate(`./detailProduct/${e.prodCd}`)
        }
    }
    

    return (
        <div 
            style={{
                display:'flex', 
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                margin: isMobile? '15vh 5vh 0 5vh':'15vh 20vh 0 20vh',  /* 위, 오른쪽, 아래, 왼쪽 순서대로 마진 값을 설정 */
                height: '100%'
            }}> 
            {productListItem.map((e, index) => 
                <div 
                    key={index}
                    style={{ flex: isMobile? '100 0 calc(100%)' : '0 0 calc(25% - 10px)', margin: '5px', position: 'relative'}}
                    onMouseOver={()=>{
                        setProductHover(e.prodCd)
                    }}
                    onMouseLeave={()=>{
                        setProductHover('')
                    }}
                    >
                    <ImgBtn
                        id={index}
                        src={e.imageSrc} 
                        className='imgBtnNoRed'
                        alt={e.name}
                        style={{ maxWidth: '100%',height: 'auto', opacity: productHover === e.prodCd && (e.status === '2' || e.status === '0')? 0.5 : 1}}
                        onClick={()=>{
                            onClick(e);
                        }}
                    >  
                    </ImgBtn>
                    {productHover === e.prodCd &&
                        <>
                            {e.status === '1'|| e.status === '3'  ? // status=1 판매중 status=3 프리오더
                                <div 
                                    key={index}
                                    style={{
                                        position:'absolute',  
                                        width: '90%', 
                                        height:'30%', 
                                        top: '45%', 
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)', 
                                        backgroundColor:'rgba(255, 255, 255, 0.5)',
                                        display: 'flex',          // flexbox 활성화
                                        justifyContent: 'center', // 가로 중앙 정렬
                                        alignItems: 'center',      // 세로 중앙 정렬
                                        color:'black',
                                        textAlign: 'center',
                                        fontSize: '1.2rem'
                                    }}
                                    onClick={()=>{
                                        onClick(e);
                                    }}
                                >
                                    {e.name}<br></br>
                                    {'₩' + e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}    
                                </div>
                                :
                                <div 
                                    key={index}
                                    style={{
                                    position:'absolute',  
                                    width: '90%', 
                                    height:'30%', 
                                    top: '45%', 
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)', 
                                    display: 'flex',          // flexbox 활성화
                                    justifyContent: 'center', // 가로 중앙 정렬
                                    alignItems: 'center',      // 세로 중앙 정렬
                                    color:'white',
                                    textAlign: 'center',
                                    fontSize: '1.5rem'
                                    }}
                                    onClick={()=>{
                                        onClick(e);
                                    }}
                                >
                                    {e.status === '2' ?
                                        <>SOLD OUT</>
                                    :
                                        <>Coming<br></br>Soon</>
                                    }
                                </div>
                            }
                        </>
                    }
                </div>
            )}
        </div>
    )
}
export default ProductList;