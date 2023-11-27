import React, { useEffect, useState } from 'react';
import {ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const ProductList = () => {

    const navigate = useNavigate(); // 페이지 이동

    const [productHover, setProductHover] = useState(''); // 마우스 올렸을시 바뀌는 값

    const [productListItem, setProductListItem] = useState([]);   //  상품 정보 state 에 저장

    useEffect(() => {
       
        const item = [
            {id:1, key:'t1', name:'testT', status:'0', price:'300000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif'}, 
            {id:2, key:'t2', name:'testT', status:'0', price:'300000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif'}, 
            {id:3, key:'t3', name:'testT', status:'0', price:'300000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif'}, 
            {id:4, key:'t4', name:'testT', status:'0', price:'300000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testT.gif'}, 
            {id:5, key:'t5',name:'testpants', status:'0', price:'100000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testpants.gif'},
            {id:6, key:'t6',name:'xipPants', status:'0', price:'275000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testpants.gif'},
            {id:7, key:'t7',name:'testpants', status:'0', price:'100000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testpants.gif'},
            {id:8, key:'t8',name:'testpants', status:'0', price:'100000', src:'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/testpants.gif'}
        ]
        setProductListItem(item);
    },[]);
    
    const onClick = (e) => {
        if(e.status === '2') { //status=2 판매완료
            return;
        }
        else {
            navigate('./detailProduct?type=dfd')
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
            {productListItem.map((e) => 
                <div 
                    key={e.id}
                    style={{ flex: isMobile? '100 0 calc(100%)' : '0 0 calc(25% - 10px)', margin: '5px', position: 'relative'}}
                    // onMouseOver={()=>(setProductHover(productHover[e.key]=1))}
                    // onMouseLeave={()=>(setProductHover(productHover[e.key]=0))}
                    onMouseOver={()=>{
                        setProductHover(e.key)
                    }}
                    onMouseLeave={()=>{
                        setProductHover('')
                    }}
                    >
                    <ImgBtn
                        id={e.id}
                        src={e.src} 
                        className='imgBtnNoRed'
                        alt={e.name}
                        style={{ maxWidth: '100%',height: 'auto', opacity: productHover === e.key && (e.status === '2' || e.status === '0')? 0.5 : 1}}
                        onClick={()=>{
                            onClick(e);
                        }}
                    >  
                    </ImgBtn>
                    {productHover === e.key ?
                        <>
                            {e.status === '1'  ? // status=2 판매완료
                                <div 
                                    key={e.id}
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
                                    {'₩' + e.price}    
                                </div>
                                :
                                <div 
                                    key={e.id}
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
                        
                    :
                        <></>
                    }
                </div>
            )}
        </div>
    )
}
export default ProductList;