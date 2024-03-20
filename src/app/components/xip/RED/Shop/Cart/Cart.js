import React, { useEffect, useState, useCallback } from 'react';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common'

const Cart = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonRegion } = useCommon();

    const [totalPrice, setTotalPrice] = useState(0); // 전체 가격

    const [totalUsPrice, setTotalUsPrice] = useState(0); // 달러 전체 가격
 
    const getTotalPrice = useCallback((list) => {
        let totalPrice = 0;
        let totalUsPrice = 0;
        let item = [...list]    
        item.forEach((e) => {
            totalPrice = totalPrice + (e.price * e.prodQty)
            totalUsPrice = totalUsPrice + (e.usPrice * e.prodQty)
        })
        
        setTotalPrice('₩' + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
        setTotalUsPrice('$' + totalUsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
    },[])

    useEffect(() => {       
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/shop/shopR004', {}); 
                if(!resultData && resultData.length < 0) { 
                    props.setCartList([]) // app.js에서 관리
                }
                else {
                    getTotalPrice(resultData)
                    props.setCartList(resultData)
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


    useEffect(() => {
        // 페이지 벗어날시
        const handleBeforeUnload = () => {
            props.savedCart();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // 컴포넌트 언마운트 시 삭제
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [props.cartList]);// props.savedCart 함수가 props.cartList의 변경 사항에 의존적이므로 추가


    // 바뀐 데이터 state 저장
    const changeCartListSetting = (prodCdD, value) => {
        let item = {...props.changeCartList}

        if(value === 'X') {
            item[prodCdD] = 'X'
        }
        else {
            let result  = (item[prodCdD] || 0) + value
            if(result === 0) {
                delete item[prodCdD]
                props.setChangeCartList({...item}) 
                return;          
            }
            item[prodCdD] = result
        }
        props.setChangeCartList({...item})
    }
    

    const productQty = {
        // 제품 수량 업 
        up: (index) => {
            // 보여줄 데이터 적용
            let data = [...props.cartList]
            let prodCdD = data[index].prodCdD
            data[index].prodQty = data[index].prodQty +1 
            if(data[index].prodQty > data[index].maxQty) {
                alert('You\'ve added more items than available in stock.')
                return;
            }
            props.setCartList(data)

            // 바뀐 데이터 state 저장
            changeCartListSetting(prodCdD,1)
            
        },
        // 제품 수량 다운 1미만이면 삭제
        down: (index) => {
            // 보여줄 데이터 적용
            let data = [...props.cartList]
            let prodCdD = data[index].prodCdD
            data[index].prodQty = data[index].prodQty -1 
            if(data[index].prodQty  < 1) {
                productQty.delete(index);
            }
            else {
                props.setCartList(data)
                // 바뀐 데이터 state 저장
                changeCartListSetting(prodCdD,-1)
            }

            
            
        },
        // 제품 삭제
        delete: (index) => {
            // 보여줄 데이터 적용
            let prodCdD = [...props.cartList][index].prodCdD
            let data = [...props.cartList].filter((e,i) => i !== index) // 해당 인덱스 제품 삭제
            props.setCartList([...data])

            // 바뀐 데이터 state 저장
            changeCartListSetting(prodCdD,'X')
        }
    }

    const clickCheckout = async() => {  // PROCEED TO CHECKOUT 클릭시
        if(!props.cartList || props.cartList.length < 1) {
            alert('Please select a product before adding to cart.')
            return;
        }

        // 장바구니 담기
        navigate('/shop/purchase', {state: {item: props.cartList, orderMethod:'cart'}})  // putchase에 state 값 넘겨주기
    }

    const productColumn = () => {
        
        
        return(
            <>
                {props.cartList.map((e, index)=> 
                    { 
                        return(
                            <div key={'0div'+index} style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '10px'}}>
                                <ImgBtn  
                                    key={'ImgBtn'+index} 
                                    className='imgBtnNoRed'
                                    style={{width: '3%'}} 
                                    src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/cart/closeSlideBtn.webp" 
                                    alt="x"
                                    onClick={()=>{
                                        productQty.delete(index, e.prodCdD)
                                    }}
                                    > 
                                </ImgBtn>
                                <img key={'img'+index} src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/' + e.imageSrc} alt={e.name} style={{width: '15%'}}/>
                                <div key={'1div'+index} style={{width: '20%'}}>{e.name}</div>
                                <div key={'2div'+index} style={{width: '5%'}}>{e.prodSize}</div>
                                <div key={'3div'+index} style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between', border: '2px solid white', width:'8%'}}>
                                    <div key={'4div'+index} style={{display: 'inline-block', padding: '1px 10px', width:'100%'}}>{e.prodQty}</div>
                                    <div key={'5div'+index} style={{display: 'inline-block', padding: '1px 3px', textAlign:'right'}}>
                                        <PBtn 
                                            key={'1PBtn'+index} 
                                            className= 'pBtnNoRed' 
                                            style={{display: 'table-cell'}} 
                                            labelText='▲' 
                                            onClick={()=>{
                                                productQty.up(index, e.prodCdD)
                                            }}>
                                        </PBtn>
                                        <PBtn 
                                            key={'2PBtn'+index} 
                                            className= 'pBtnNoRed' 
                                            style={{display: 'inline'}} 
                                            labelText='▼'
                                            onClick={()=>{
                                                productQty.down(index, e.prodCdD)
                                            }}>
                                        </PBtn>
                                    </div>
                                </div>
                                <div key={'6div'+index} style={{textAlign:'right',width: '10%'}}>
                                    {commonRegion() === 'KOR' ? 
                                        '₩' + (e.price * e.prodQty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        :
                                        '$' + (e.usPrice * e.prodQty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }    
                                </div>
                            </div>
                        )
                    }
                )}
            </>

        )
    }

    return (
        <>
            <div style={{width:'100%', height:'10vh'}}></div>
            <div style={{display:'flex', width: '100%', minHeight:'90vh',flexDirection: 'row',justifyContent: 'center'}}>
                <div style={{ width:isMobile? '90%':'60%', height:'100%'}}>
                    <div style={{ width:'100%', height:isMobile? '10%':'10%'}}/>

                    <div>
                        <p style={{fontSize:'1.5rem',textAlign:'center'}}>CART</p>
                    </div>
                    <div>
                        {productColumn()}
                    </div>
                    <br/>
                    <div style={{borderTop: '2px solid #ccc',textAlign:'right'}}>
                        <p style={{margin: 0, padding: '2px', fontSize:'1.1rem', textAlign:'right', display: 'inline-block', marginRight: '10px'}}>SUBTOTAL</p>
                        <p style={{margin: 0, padding: '2px', fontSize:'0.9rem', textAlign:'right', display: 'inline-block'}}>{commonRegion() === 'USA' ? totalUsPrice : totalPrice }</p>                  
                    </div>
                    <br/><br/>
                    <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'center'}}>
                        <PBtn
                            className= 'pBtnNoRed'
                            style={{ 
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '1.2rem'
                            }}
                            labelText= 'CONTINUE SHOPPING'
                            onClick={() => {
                                navigate('/shop')
                            }}
                        >
                        </PBtn>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <PBtn
                            className= 'pBtnNoRed'
                            style={{ 
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '1.2rem'
                            }}
                            labelText= 'PROCEED TO CHECKOUT'
                            onClick={() => {
                                clickCheckout()
                            }}
                        >
                        </PBtn>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;