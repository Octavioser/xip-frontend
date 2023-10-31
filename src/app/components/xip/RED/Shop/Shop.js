import React, {useEffect} from 'react';
import MainShopBtn from 'app/components/xip/RED/Shop/MainShopBtn';
import ProductList from 'app/components/xip/RED/Shop/ProductList';
import AuthShopBtn from 'app/components/xip/RED/Shop/AuthShopBtn';

const Shop = () => {

    useEffect(() => {
        // 배경화면 변경
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'red';
    })

    return (
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <MainShopBtn/>
                <AuthShopBtn/>
                <ProductList/>
        </div>
    )
}
export default Shop;