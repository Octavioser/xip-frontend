import React, { useState } from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';
import { isMobile } from 'react-device-detect';
import {useCommon} from 'app/components/xip/REDCommon/Common';


const ProductDescription = (props) => {

    const [prodCdD, setProdCdD] = useState(''); // 제품코드안에 사이즈가 있음

    const {getCookie, removeCookie} = useCookie();

    const [loginModal, setLoginModal] = useState(false);

    const { commonShowLoading, commonHideLoading, commonApi, navigate } = useCommon();

    const apiList = {
        insertCart: {
            api: '/shop/shopC102',
            param: () => {
                return (
                    { 
                        prodCdD:prodCdD
                    }
                )
            }
        }
    }
    
    const clickAddToCart = async() => {  // add to cart 클릭시
        if(!getCookie('xipToken')) {
            setLoginModal(true);
        }
        else {
            if(!prodCdD) {
                alert('Please select a product before adding to cart.')
                return;
            }
            // 장바구니 담기
            try{
                await commonShowLoading();
                let resultData = await commonApi(apiList.insertCart.api, apiList.insertCart.param());
                if(resultData === -1) {
                    alert('Registration failed. Please try again.')
                }
                else if(resultData === -2 || !resultData || resultData.length < 1){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else {
                    alert('Added the product to the cart.');
                }
            } catch (error) {
                alert('Please try again.');
            } finally {
                commonHideLoading();
            } 
        }
    }

    const clickPurchase = async() => {  // add to cart 클릭시
        if(!getCookie('xipToken')) {
            setLoginModal(true);
        }
        else {
            if(!prodCdD) {
                alert('Please select a product before adding to cart.')
                return;
            }
            let item = [{...props.productListItem.find(e => e.prodCdD === prodCdD), prodQty: 1}]
            

            // 장바구니 담기
            navigate('/shop/purchase', {state: item})  // putchase에 state 값 넘겨주기
        }
    }

    const loginModalBtn = () => { // 로그인 팝업창 열기닫기 버튼
        setLoginModal(loginModal ? false : true)
    }



    const downListStyle = {
            width: '100%', // 전체 너비를 사용합니다.
            padding: '10px', // 안쪽 여백을 줍니다.
            margin: 0, // 바깥 여백을 없앱니다.
            border: 'solid 2px black', // 테두리를 검은색으로 설정합니다.
            borderRadius: '0', // 둥근 모서리를 없앱니다.
            appearance: 'none', // 네이티브 스타일을 제거합니다.
            backgroundColor: 'white', // 배경색을 흰색으로 설정합니다.
            color: 'black', // 글자 색상을 검은색으로 설정합니다.
            fontSize: '1.1rem', // 글자 크기를 지정합니다.
            fontWeight: 'bold',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg%20width%3D\'10\'%20height%3D\'10\'%20viewBox%3D\'0%200%2010%2010\'%20xmlns%3D\'http://www.w3.org/2000/svg\'><path%20d%3D\'M0%2C0%20L10%2C0%20L5%2C10%20z\'%20fill%3D\'%23000\'/></svg>")', // 화살표 아이콘을 배경 이미지로 사용합니다.
            backgroundRepeat: 'no-repeat', // 배경 이미지 반복을 없앱니다.
            backgroundPosition: 'right 20px center', // 배경 이미지 위치를 오른쪽 가운데로 설정합니다.
            backgroundSize: '10px 10px', // 배경 이미지 크기를 지정합니다.
            WebkitAppearance: 'none', // 크롬, 사파리 브라우저에 대한 네이티브 스타일을 제거합니다.
            MozAppearance: 'none', // 파이어폭스 브라우저에 대한 네이티브 스타일을 제거합니다.
    }

    const btnStyle =  {
            textAlign: 'center', 
            padding: '10px',
            border: '2px solid black',  
            fontSize: '1.2rem',  
            fontWeight: 'bold',
            width: '40%'
    }

    const prodDescription = () => {
        let item = props?.productListItem
        let titleItem = item[0]

        let name = titleItem?.name 
        let price = titleItem?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let prodDesc = titleItem?.prodDesc
        let prodDescD = titleItem?.prodDescD || ''

        const getSizeDownlist = () => {
            return (
                <select 
                    value={prodCdD} 
                    style={downListStyle}
                    onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const status = selectedOption.getAttribute('status');
                        if(status === '1') { // 판매중인 상태
                            console.log(e)
                            setProdCdD(e.target.value);
                        } 
                    }}
                >
                    <option value="">SELECT A SIZE</option>
                    {item.map(e =>
                        <option key={e.prodCdD} value={e.prodCdD} style={{color:e.prodStatus === '2' ?'red' : 'black'}} status={e.prodStatus}>
                            {e.prodSize + (e.prodStatus === '2' ? '(SOLD OUT)' : '')} 
                        </option>
                    )}
                </select>
            )
        }

        const getProdDescD = () => {
            let descDList = prodDescD.split('|')
            return (
                <>
                    {descDList.map((e, index) =>
                        <li key={index} style={{ marginBottom: '5px' }}>{e}</li>
                    )}
                </>
            )
        }

        return (
            <>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '5px'}}>{name}</h2>
                <h2 style={{ textAlign: 'center', margin: '5px'}}>{'₩' + price}</h2>
                <br/><br/>

                <br/><br/>
                <h2 style={{ margin: '5px' }}>{prodDesc}</h2>
                <br/><br/>
                
                <div> {/* 사이즈 고르기 */}
                    {getSizeDownlist()} 
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                    <PBtn 
                        style={btnStyle} 
                        labelText={'ADD TO CART'}
                        onClick={() => {
                            clickAddToCart();
                        }}
                    />
                    <PBtn 
                        style={btnStyle} 
                        labelText={'PURCHASE'}
                        onClick={() => {
                            clickPurchase();
                        }}
                    />
                </div>

                <ul style={{ listStyle: 'none', padding: '0', textAlign: isMobile?'center':'left' }}>
                    {getProdDescD()}
                </ul>
            </>
        )
    }

    return (
        <div style={{ width: isMobile? '90vw':'25vw', margin: isMobile? '0' : 'auto', marginLeft: isMobile?'0':'18vw'}}>
            <br/>
            {prodDescription()}
            {loginModal && <LoginModal loginModalBtn={loginModalBtn}/>}
        </div>
    );
};

export default ProductDescription;
