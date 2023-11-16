import React, { useEffect, useState} from 'react';
import { useCommon }  from 'app/components/xip/REDCommon/Common';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import {getCountryDataList} from 'countries-list'
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'

const AccountAdd = () => {

    const { commonApi } = useCommon();

    const [, , removeCookie] = useCookies(['token']); // 쿠키 훅
    const navigate = useNavigate(); // 페이지 이동

    const [start, setStart] = useState(0);

    const [addLastNm, setAddLastNm] = useState('');
    const [addFirstNm, setAddFirstNm] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [add1, setAdd1] = useState('');
    const [add2, setAdd2] = useState('');
    const [city, setCity] = useState('');
    const [addCountry, setAddCountry] = useState('');
    const [state, setState] = useState('');
    const [postalCd, setPostalCd] = useState('');
    

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
                    let resultData = await commonApi(apiList.selectDetailAccount.api, apiList.selectDetailAccount.param());
                    if (resultData === -2 || !resultData || resultData.length < 1){
                        removeCookie('token') // 토큰 오류시 로그아웃
                        navigate('/shop')
                    }
                    else {
                        setAddFirstNm(resultData[0].addFirstNm);
                        setAddLastNm(resultData[0].addLastNm);
                        setPhone(resultData[0].phone);
                        setCompany(resultData[0].company);
                        setAdd1(resultData[0].add1);
                        setAdd2(resultData[0].add2);
                        setCity(resultData[0].city);
                        setAddCountry(resultData[0].addCountry);
                        setState(resultData[0].state);
                        setPostalCd(resultData[0].postalCd);
                    }
                    setStart(1);
                } catch (error) {
                    setStart(1);
                }
            }
        }
        getUserItem();
    },[navigate, removeCookie, start, commonApi]);

    return(
        <>
            <p style={{display:'flex', fontSize:'1.3rem', textAlign: 'left'}}>ADDRESS</p>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                <p>{addLastNm + ', ' + addFirstNm}</p>
                <p>{company}</p>
                <p>{add1}</p>
                <p>{add2}</p>
                <p>{state + ', ' + city}</p>
                <p>{addCountry + ', ' + postalCd}</p>
                <p>{phone}</p>
            </div>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                <PBtn
                    className= 'pBtnNoRed'
                    style={{ 
                        textAlign: 'center', 
                        width:'4vw', 
                        height:'2vw',
                        border: '2px solid white',  
                        fontSize: '1.3rem',  
                        margin: 'auto',
                    }}
                    labelText= 'EDIT'
                >
                </PBtn>
            </div>
        </>
    )
}
export default AccountAdd;
