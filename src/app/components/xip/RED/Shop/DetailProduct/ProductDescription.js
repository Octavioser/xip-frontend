import React, { useState } from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import LoginModal from 'app/components/xip/RED/Login/LoginModal';

const ProductDescription = () => {

    const [size, setSize] = useState('');

    const {getCookie} = useCookie();

    const [loginModal, setLoginModal] = useState(false);

    const downListStyle = () => {
        return (
            {
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
        )
    }

    const btnStyle = () => {
        return (
            { 
                textAlign: 'center', 
                padding: '10px',
                border: '2px solid black',  
                fontSize: '1.2rem',  
                fontWeight: 'bold',
                width: '40%'
            }
        )
    }

    const clickAddToCart = () => {
        if(!getCookie('xipToken')) {
            setLoginModal(true);
        }
        else {
            alert('Added the product to the cart.');
        }
    }

    const loginModalBtn = () => { // 로그인 팝업창 열기닫기 버튼
        setLoginModal(loginModal ? false : true)
    }

    return (
        <div style={{ width: '25vw', margin: 'auto', marginLeft:'18vw'}}>
            <br/>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '5px'}}>PAD VEST - BLACK</h2>
            <h2 style={{ textAlign: 'center', margin: '5px'}}>₩427,000</h2>
            <br/><br/>

            <h2 style={{ margin: '5px' }}>PAD VEST</h2>
            <h2 style={{ margin: '5px' }}>ZIP-UP VEST IN BLACK</h2>
            <br/><br/><br/>
            
            <div>
                <select 
                    value={size} 
                    style={downListStyle()}
                    onChange={(e) => {
                        setSize(e.target.value);
                    }}
                >
                <option value="">SELECT A SIZE</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <PBtn 
                    style={btnStyle()} 
                    labelText={'ADD TO CART'}
                    onClick={() => {
                        clickAddToCart();
                    }}
                />
                <PBtn style={btnStyle()} labelText={'PURCHASE'}/>
            </div>

            <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '5px' }}>UNISEX</li>
                <li style={{ marginBottom: '5px' }}>REGULAR FIT</li>
                <li style={{ marginBottom: '5px' }}>SHOULDER PADS</li>
                <li style={{ marginBottom: '5px' }}>CARBON FIBER TEXTILE</li>
                <li style={{ marginBottom: '5px' }}>100% NYLON</li>
            </ul>
            {loginModal ? <LoginModal loginModalBtn={loginModalBtn}/> : <></>}
        </div>
    );
};

export default ProductDescription;
