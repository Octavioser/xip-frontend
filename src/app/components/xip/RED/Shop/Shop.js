import React, {useState, useEffect} from 'react';

import MainShopBtn from 'app/components/xip/RED/Shop/MainShopBtn';
import AuthShopBtn from 'app/components/xip/RED/Shop/AuthShopBtn';
import RegionModal from './RegionModal';
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';

const Shop = () => {

    const {setRegion} = useAppContext();

    const [mobileMenu, setMobileMenu] = useState(false); // 모바일 햄버거 버튼 클릭
    const [shopStart, setShopStart] = useState(false); 

    useEffect(() => {
        const storedShopStart = localStorage.getItem('shopRegion'); // 로컬 스토리지 가져오기
        if (storedShopStart === null) {
            setShopStart(true);
            
        } else {
            setRegion(storedShopStart);
        }
    }, [setRegion]);

    const closeConfirm = () => {
        setShopStart(false);
    };

    return (
        <>
                {!mobileMenu && <MainShopBtn/>} {/* 햄버거 클릭시 안보이게 */}
                <AuthShopBtn setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/> {/* 오른쪽상단 버튼 */}
                {shopStart && <RegionModal setShopStart={setShopStart} shopStart={shopStart} closeConfirm={closeConfirm}/>}
        </>
    )
}
export default Shop;