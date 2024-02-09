import React, {useState} from 'react';

import MainShopBtn from 'app/components/xip/RED/Shop/MainShopBtn';
import AuthShopBtn from 'app/components/xip/RED/Shop/AuthShopBtn';

const Shop = () => {

    const [mobileMenu, setMobileMenu] = useState(false); // 모바일 햄버거 버튼 클릭

    return (
        <>
                {!mobileMenu && <MainShopBtn/>} {/* 오른쪽상단 버튼 */}
                <AuthShopBtn setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/> {/* 오른쪽상단 버튼 */}
        </>
    )
}
export default Shop;