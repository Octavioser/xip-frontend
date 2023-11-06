import React from 'react';

import MainShopBtn from 'app/components/xip/RED/Shop/MainShopBtn';
import AuthShopBtn from 'app/components/xip/RED/Shop/AuthShopBtn';

const Shop = () => {

    return (
        <div style={{position: 'absolute', width: '100%'}}>
                <MainShopBtn/> {/* 오른쪽상단 버튼 */}
                <AuthShopBtn/> {/* 오른쪽상단 버튼 */}
        </div>
    )
}
export default Shop;