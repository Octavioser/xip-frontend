import React, { useEffect, useState} from 'react';
import { isMobile } from 'react-device-detect';
import Common from 'app/components/xip/REDCommon/Common';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {
    
    const [, , removeCookie] = useCookies(['token']); // 쿠키 훅
    const navigate = useNavigate(); // 페이지 이동

    const [start, setStart] = useState(0);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCd, setPostalCd] = useState('');
    const [addCountry, setAddCountry] = useState('');

    useEffect(() => {

        const getUserItem = async() => {
            const apiList = {
                selectDetailAccount: {
                    api: '/shop/shopR001',
                    param: () => {
                        return (
                            {}
                        )
                    }
                }
            }

            if(start === 0) {
                try{
                    let resultData = await Common.CommonApi(apiList.selectDetailAccount.api, apiList.selectDetailAccount.param());
                    if (resultData === -2 || !resultData || resultData.length < 1){
                        removeCookie('token') // 토큰 오류시 로그아웃
                        navigate('/shop')
                    }
                    else {
                        setEmail(resultData[0].email);
                        setName(resultData[0].firstNm + resultData[0].lastNm);
                        setAdd1(resultData[0].add1);
                        setAdd2(resultData[0].add2);
                        setCity(resultData[0].city);
                        setState(resultData[0].state);
                        setPostalCd(resultData[0].postalCd);
                        setAddCountry(resultData[0].addCountry);
                    }
                    setStart(1);
                } catch (error) {
                    setStart(1);
                }
            }
        }
        getUserItem();
    },[navigate, removeCookie, start]);

    

    const textWidth = isMobile? '50vw' : '20vw'


    return (
        /* 위, 오른쪽, 아래, 왼쪽 순서대로 마진 값을 설정 */
        <div style={{display:'flex', flexWrap: 'wrap',margin:'15vh 20vh 0 20vh',  justifyContent: 'space-between', marginLeft: '20%'}}> 
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>EMAIL</p>
                <input 
                    id='email'
                    type='email' 
                    value={email}
                    disabled={true}
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
            <p style={{textAlign: 'left'}}>ADD_NAME</p>  
            <input 
                id='name' 
                type='name'
                value={name}
                disabled={true}
                style={{width: textWidth}} 
            />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>ADDRESS1</p>
                <input 
                    id='address1'
                    type='address1'
                    value={add1}
                    disabled={true} 
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>ADDRESS2</p>  
                <input 
                    id='address2' 
                    type='address2'
                    value={add2}
                    disabled={true}
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>CITY</p>
                <input 
                    id='city'
                    type='city'
                    value={city}
                    disabled={true} 
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>STATE</p>  
                <input 
                    id='state' 
                    type='state'
                    value={state}
                    disabled={true}
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>POSTAL CODE</p>  
                <input 
                    id='postalCode' 
                    type='postalCode'
                    value={postalCd}
                    disabled={true}
                    style={{width: textWidth}} 
                />
            </div>
            <div style={{ width: '48%' }}>
                <p style={{textAlign: 'left'}}>COUNTRY</p>  
                <input 
                    id='addCountry' 
                    type='addCountry'
                    value={addCountry}
                    disabled={true}
                    style={{width: textWidth}} 
                />
            </div>
        </div>
    )
}
export default AccountDetails;