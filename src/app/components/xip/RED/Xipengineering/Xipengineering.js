import React, {useState, useEffect} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import XipengineeringMenu from './XipengineeringMenu';



const Xipengineering = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {removeCookie, getCookie, setCookie} = useCookie();

    const [useEffectCheck, setUseEffectCheck] = useState(0);      // 처음에만 api 호출하도록

    useEffect(()=> {
        if(!getCookie('xipToken')) {
            navigate('/shop')
        }
       

        const roleCheck = async() => {
            try {
                await commonShowLoading();
                // 관리자 로그인 (로그인되어잇어야함)
                let resultData = await commonApi('/xipengineering/incuR001', {})
                if(resultData !== 1) {
                    removeCookie('xipToken')
                    navigate('/shop')
                }
            } catch (error) {
                console.log(error);
            } finally {
                commonHideLoading(false)
            }
        }
        if(useEffectCheck === 0) { // 처음시작인지 
            setUseEffectCheck(1);
            roleCheck();
        }
    },[commonApi, commonHideLoading, commonShowLoading, getCookie, navigate, useEffectCheck, removeCookie, setCookie])

    return(
        <div className="default-cursor-page" style={{position:'fixed',backgroundColor:'white', width:'100%', height:'100%', color:'black'}}>
            <XipengineeringMenu/>
        </div>
    )

} 
export default Xipengineering