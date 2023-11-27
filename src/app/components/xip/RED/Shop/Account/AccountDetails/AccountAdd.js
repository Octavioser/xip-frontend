import React, { useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import { useCookie } from 'app/components/xip/RED/Login/Cookie';
import { PBtn, ImgBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {getCountryDataList} from 'countries-list'
import { isMobile } from 'react-device-detect';

const AccountAdd = (props) => {
    const [userItem, setUserItem] = useState(props.userItem);

    const {removeCookie} = useCookie();

    const { commonShowLoading, commonHideLoading, commonApi, navigate } = useCommon();

    const [edit, setEdit] = useState(false);

    const [msg, setMsg] = useState(false);

    const [userEditItem, setUserEditItem] = useState({});

    const apiList = {
        insertAdd: {
            api: '/shop/shopC102',
            param: () => {
                return (
                    { 
                        email: userItem.email,
                        addFirstNm: userEditItem?.addFirstNm,
                        addLastNm: userEditItem?.addLastNm,
                        phone: userEditItem?.phone,
                        company: userEditItem?.company,
                        add1: userEditItem?.add1,
                        add2: userEditItem?.add2,
                        city: userEditItem?.city,
                        addCountry: userEditItem?.addCountry,
                        state: userEditItem?.state,
                        postalCd: userEditItem?.postalCd,
                    }
                )
            }
        }
    }


    const saveAddChange = async() => {

        let message = '';
        setMsg(message);

        const addFirstNm = userEditItem?.addFirstNm || ''
        const addLastNm = userEditItem?.addLastNm || ''
        const phone = userEditItem?.phone || ''
        const add1 = userEditItem?.add1 || ''
        const add2 = userEditItem?.add2 || ''
        const city = userEditItem?.city || ''
        const addCountry = userEditItem?.addCountry || ''
        const state = userEditItem?.state || ''
        const postalCd = userEditItem?.postalCd || ''

        //  이름 검사
        if(addFirstNm.trim() === '' || addLastNm.trim() === '') {
            message = 'Enter your name.'
            setMsg(message)
            return
        }

        //  전화번호 검사
        if(phone.trim() === '') {
            message = 'Enter your phone number.'
            setMsg(message)
            return
        }

        //  주소 검사
        if(add1.trim() === '' || add2.trim() === '') {
            message = 'Enter your address.'
            setMsg(message)
            return
        }

        //  이름 검사
        if(city.trim() === '') {
            message = 'Enter your city.'
            setMsg(message)
            return
        }

        //  이름 검사
        if(addCountry.trim() === '') {
            message = 'Enter your country.'
            setMsg(message)
            return
        }

        //  이름 검사
        if(state.trim() === '') {
            message = 'Enter your state.'
            setMsg(message)
            return
        }

        //  이름 검사
        if(postalCd.trim() === '') {
            message = 'Enter your zip postalCd.'
            setMsg(message)
            return
        }

        // 회원가입
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.insertAdd.api, apiList.insertAdd.param());
            if(resultData === -1) {
                message = 'Registration failed. Please try again.'
                setMsg(message)
            }
            else if(resultData === -2 || !resultData || resultData.length < 1){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else {
                setUserItem({...userItem,
                    addFirstNm: addFirstNm,
                    addLastNm: addLastNm,
                    phone: phone,
                    company: userEditItem?.company,
                    add1: add1,
                    add2: add2,
                    city: city,
                    addCountry: addCountry,
                    state: state,
                    postalCd: postalCd
                })
                setEdit(false);
            }
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }

    const wdithLength = '48%'

    const heigthLength = '35px'

    const textBox = {
        setTopic: (text) => {
            return (
                <div style={{ display:'flex', width: isMobile? 'auto' : wdithLength, height: heigthLength, justifyContent: isMobile? 'center' : 'right', alignItems: 'center' }}>
                    <p style={{textAlign: 'right'}}>{text}</p>
                </div>
            )
        },
    
        setValue: (value, id, maxLength, type) => {
            let inputWidth = '65%'
            if(!isMobile && (id ==='add1' || id === 'add2')){
                inputWidth = '100%'
            }
            return (
                <div style={{ display:'flex', width: 'auto', flexGrow: 1, marginLeft: isMobile? '' :'10%', height: heigthLength, justifyContent: isMobile? 'center' :'left', alignItems: 'center'}}>
                    <input 
                        type={"text"}
                        style={{ width: inputWidth}} 
                        id={id} 
                        value={value} 
                        maxLength={maxLength}
                        onChange={(e)=>{
                            if(type === "number") {
                                const numberRegex = /^[0-9]+$/
                                if(numberRegex.test(e.target.value)) {
                                    setUserEditItem({...userEditItem, [id]: e.target.value})
                                }
                            }
                            else {
                                setUserEditItem({...userEditItem, [id]:e.target.value})
                            }
                        }}
                        >
                    </input>
                </div>
            )
        },
        
        setEmpty: () => {
            return (
                <div style={{ display:'flex', width: wdithLength, height: heigthLength, justifyContent: 'right', alignItems: 'center' }}></div>
            )
        },

        setCountryDropDown: (id) => {
            let array = getCountryDataList()
            array.sort((a, b) => {
                if(a.iso3 === 'KOR') {
                    return -1;
                }
                else if(b.iso3 === 'KOR') {
                    return 1;
                }
                else if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                else if(a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                else {
                    return 0;
                }       
            });
            return(
            <>
                <div style={{ display:'flex', width: 'auto', flexGrow: 1, marginLeft: isMobile? '' :'10%', height: heigthLength, justifyContent: isMobile? 'center' :'left', alignItems: 'center'}}>
                    <select  
                        style={{ width: '67%'}}
                        onChange={(e)=>{
                            setUserEditItem({...userEditItem, [id]:e.target.value})
                        }}
                    >
                        {array.map(item => (
                            <option key={item.iso3} value={item.iso3}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </>
            )
        }
    }
    
    return(
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p style={{ fontSize: '1.3rem', textAlign: 'left' }}>ADDRESS</p>
                    {edit  ? // 이름변경 비밀번호 변경하는 화면일때
                        <ImgBtn
                            style={{width: isMobile? '5vw':'2vw', height: isMobile? '5vw':'2vw', paddingRight:'2vw', paddingTop:isMobile? '5vw':'2vw'}}
                            src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/backArrow.png'}
                            alt={'backArrrow'}
                            onClick={() => {
                                setEdit(false);
                            }}
                        >
                        </ImgBtn>
                        :
                        <></>
                    }
            </div>
            { edit ? 
                <>
                    <div style={{display: isMobile? '' :'flex', flexWrap: 'wrap',  justifyContent: 'space-between', marginRight: isMobile? '' :'15%'}}>

                        {textBox.setTopic('First Name')}
                        {textBox.setValue(userEditItem?.addFirstNm, 'addFirstNm', 16, 'text')}

                        {textBox.setTopic('Last Name')}
                        {textBox.setValue(userEditItem?.addLastNm, 'addLastNm', 16, 'text')}

                        {textBox.setTopic('Phone')}
                        {textBox.setValue(userEditItem?.phone, 'phone', 20, 'number')}

                        {textBox.setTopic('Company')}
                        {textBox.setValue(userEditItem?.company, 'company', 85, 'text')}

                        {isMobile? '' :textBox.setEmpty()}
                        {isMobile? '' :textBox.setEmpty()}

                        {textBox.setTopic('Street address')}
                        {textBox.setValue(userEditItem?.add1, 'add1', 100, 'text')}
                        {isMobile? '' :textBox.setEmpty()}
                        {textBox.setValue(userEditItem?.add2, 'add2', 100, 'text')}

                        {textBox.setTopic('City')}
                        {textBox.setValue(userEditItem?.city, 'city', 33, 'text')}

                        {textBox.setTopic('Country/Region')}
                        {textBox.setCountryDropDown('addCountry')}

                        {textBox.setTopic('State/Province')}
                        {textBox.setValue(userEditItem?.state, 'state', 33, 'text')}

                        {textBox.setTopic('Zip or postal code')}
                        {textBox.setValue(userEditItem?.postalCd, 'postalCd', 10, 'number')}

                    </div>
                    </>
                :
                    <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                        {(!!userItem?.addCount) ? 
                            <>
                                <p>{userItem?.addLastNm + ', ' + userItem?.addFirstNm}</p>
                                <p>{userItem?.company}</p>
                                <p>{userItem?.add1}</p>
                                <p>{userItem?.add2}</p>
                                <p>{userItem?.state + ', ' + userItem?.city}</p>
                                <p>{userItem?.addCountry + ', ' + userItem?.postalCd}</p>
                                <p>{userItem?.phone}</p>
                            </>
                        :
                            <></>
                        }
                    </div>
            }
            <br/>
            <br/>
            <p style={{color:'black'}}>{msg}</p>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                { edit ? 
                    <PBtn
                        className= 'pBtnNoRed'
                        style={{ 
                            textAlign: 'center', 
                            display: 'inline-block', 
                            padding: '3px 6px',
                            border: '2px solid white',  
                            fontSize: '1.2rem',  
                            margin: 'auto',
                        }}
                        labelText= 'SAVE CHANGES'
                        onClick={() => {
                            saveAddChange();
                        }}
                    >
                    </PBtn>
                    :
                    <>
                        <PBtn
                            className= 'pBtnNoRed'
                            style={{ 
                                textAlign: 'center', 
                                display: 'inline-block', 
                                padding: '3px 6px',
                                border: '2px solid white',  
                                fontSize: '1.2rem',  
                                margin: 'auto',
                            }}
                            labelText= 'EDIT'
                            onClick={() => {
                                setUserEditItem({...userItem, addCountry:'KOR'});
                                setEdit(true)
                            }}
                        >
                        </PBtn>
                    </>
                }
            </div>
        </>
    )
}
export default AccountAdd;
