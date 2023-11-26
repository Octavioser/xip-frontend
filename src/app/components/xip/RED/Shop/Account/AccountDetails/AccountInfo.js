import React, { useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common';
import { useNavigate } from 'react-router-dom';
import { useCookie } from 'app/components/xip/RED/Login/Cookie';
import { PBtn, ImgBtn } from 'app/components/xip/REDCommon/CommonStyle'

const AccountInfo = (props) => {

    const [userItem, setUserItem] = useState(props.userItem);

    const navigate = useNavigate(); // 페이지 이동

    const {removeCookie} = useCookie();

    const [edit, setEdit] = useState(false);

    const [changePw, setChangePw] = useState(false);

    const { commonShowLoading, commonHideLoading, commonApi, commonEncode } = useCommon();

    const [userEditItem, setUserEditItem] = useState({});

    const [msg, setMsg] = useState('');

    const handleSubmit = (event) => { // 폼 제출 로직 처리
        event.preventDefault();
    };

    const apiList = {
        updateInfoNm: {
            api: '/shop/shopU201',
            param: () => {
                return (
                    { 
                        firstNm: userEditItem?.firstNm, 
                        lastNm: userEditItem?.lastNm, 
                        email: userEditItem?.email
                    }
                )
            }
        },
        updateInfoPw: {
            api: '/shop/shopU202',
            param: async(accountPw, newPw) => {
                const encodePw = await commonEncode(accountPw);
                const endcodeNewPw = await commonEncode(newPw);
                return (
                    { 
                        email: userEditItem?.email,
                        pw: encodePw, 
                        newPw: endcodeNewPw
                    }
                )
            }
        }
    }

    const saveNmChange = async() => {
        
        console.log('saveNmChange 호출!!')
        let message = '';

        const firstNm  = !(userEditItem?.firstNm) || ''
        const lastNm  = !(userEditItem?.lastNm) || ''

        if(firstNm === userItem?.firstNm && lastNm === userItem?.lastNm) { // 변경사항이 없을시
            setEdit(false);
        }  

            //  이름 검사
        if(userEditItem?.firstNm.trim() === '' || userEditItem?.lastNm.trim() === '') {
            message = 'Enter your name.'
            setMsg(message)
            return
        }

        // 이름 바꾸기
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.updateInfoNm.api, apiList.updateInfoNm.param());
            if(resultData === -1) {
                message = 'Please try again.'
                setMsg(message)
            }
            else if(resultData === -2 || !resultData || resultData.length < 1){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else {
                setEdit(false);
                setUserItem({...userItem, firstNm: firstNm, lastNm:lastNm})
            }
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }

    // 비밀번호 변경
    const savePwChange = async() => {

        let message = '';

        const accountPw  = !(userEditItem?.accountPw) ? '' : userEditItem?.accountPw.trim()
        const newPw  = !(userEditItem?.newPw) ? '' : userEditItem?.newPw.trim()
        const confirmPw  = !(userEditItem?.confirmPw) ? '' : userEditItem?.confirmPw.trim()

        //비밀번호칸에 입력시 빈칸이 없는 지 확인
        if(accountPw === '' || newPw  === '' || confirmPw  === '') {
            message = 'Please enter a password.'
            setMsg(message)
            return
        }
        // 비밀번호 동일한지 검사
        if(newPw !== confirmPw) {
            message = 'Passwords does not match.'
            setMsg(message)
            return
        }

        // 기존 비밀번호 동일한지 검사
        if(newPw === accountPw) {
            message = 'Your new password cannot be the same as your current password. Please choose a different password.'
            setMsg(message)
            return
        }

        if(!(/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPw))) { // 8글자 이상 대문자, 숫자 포함
            message = 'passwords must be at least 8 characters containing one uppercase character and one number'
            setMsg(message)
            return
        }

        // 비밀번호 바꾸기
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.updateInfoPw.api, await apiList.updateInfoPw.param(accountPw, newPw));
            if(resultData === -1) {
                message = 'Registration failed. Please try again.'
                setMsg(message)
            }
            else if(resultData === -2 || !resultData || resultData.length < 1){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else {
                setChangePw(false);
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
                <div style={{ display:'flex', width: wdithLength, height: heigthLength, justifyContent: 'right', alignItems: 'center' }}>
                    <p style={{textAlign: 'right'}}>{text}</p>
                </div>
            )
        },
    
        setValue: (type, value, id, pw) => {
            if(type === 'text') {
                return (
                    <div style={{ display:'flex', width: wdithLength, height: heigthLength, justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{textAlign: 'center'}}>{value}</p>
                    </div>
                )
            }
    
            if(type === 'input') {
                if(!!pw) {
                    return (
                        <div style={{ display:'flex', width: wdithLength, height: heigthLength, justifyContent: 'center', alignItems: 'center'}}>
                            <form onSubmit={handleSubmit} style={{ width: '100%'}}>
                                <input 
                                    style={{ width: '60%'}}
                                    id={id + 'password'}
                                    type='password'
                                    autoComplete="off"
                                    value={value}
                                    onChange={(e)=>{
                                        setUserEditItem({...userEditItem, [id]:e.target.value.trim()})
                                    }}
                                />
                            </form>
                        </div>
                    )
                }
                else {
                    return (
                        <div style={{ display:'flex', width: wdithLength, height: heigthLength, justifyContent: 'center', alignItems: 'center'}}>
                            <input 
                                style={{ width: '60%'}} 
                                id={id} 
                                value={value} 
                                disabled={id === 'email' ? true : false}
                                onChange={(e)=>{
                                    setUserEditItem({...userEditItem, [id]:e.target.value})
                                }}
                                >
                            </input>
                        </div>
                    )
                }
            }
        } 
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p style={{ fontSize: '1.3rem', textAlign: 'left' }}>ACCOUNT INFORMATION</p>
                {edit || changePw ? // 이름변경 비밀번호 변경하는 화면일때
                    <ImgBtn
                        style={{width: '2vw', height: '2vw', paddingRight:'2vw'}}
                        src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/shop/backArrow.png'}
                        alt={'backArrrow'}
                        onClick={() => {
                            setChangePw(false);
                            setEdit(false);
                        }}
                    >
                    </ImgBtn>
                    :
                    <></>
                }
            </div>
            <div style={{display:'flex', flexWrap: 'wrap',  justifyContent: 'space-between', marginRight: '15%'}}>
                { edit ?  // edit 클릭 할 경우
                    <>  
                        {textBox.setTopic('First Name')}
                        {textBox.setValue('input', userEditItem?.firstNm, 'firstNm')}


                        {textBox.setTopic('Last name')}
                        {textBox.setValue('input', userEditItem?.lastNm, 'lastNm')} 

                        {textBox.setTopic('Email address')} 
                        {textBox.setValue('input', userEditItem?.email, 'email')} 
                    </>
                    :
                    <></>
                }
                { changePw ? // chage password 클릭한 경우
                    <>  
                        {textBox.setTopic('Account password')}
                        {textBox.setValue('input', userEditItem?.accountPw, 'accountPw', true)} 

                        {textBox.setTopic('New password')}
                        {textBox.setValue('input', userEditItem?.newPw, 'newPw', true)} 

                        {textBox.setTopic('Confirm password')} 
                        {textBox.setValue('input', userEditItem?.confirmPw, 'confirmPw', true)} 
                    </>
                    :
                    <></>
                }
                { (!edit && !changePw) ? // info 처음화면
                    <>
                        {textBox.setTopic('First Name')}
                        {textBox.setValue('text',userItem?.firstNm)}

                        {textBox.setTopic('Last name')}
                        {textBox.setValue('text',userItem?.lastNm)}   

                        {textBox.setTopic('Email address')}
                        {textBox.setValue('text',userItem?.email)}
                    </>
                   :
                   <></>
                }
            </div>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                <br/>
                <p style={{color:'black'}}>{msg}</p>
                {edit || changePw?  // 이름변경 비밀번호 변경하는 화면일때
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
                            if(edit) {
                                saveNmChange();
                            }
                            if(changePw) {
                                savePwChange();
                            }
                        }}
                    >
                    </PBtn>
                :
                    <>      {/* 처음 info 화면 */}
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
                            labelText= 'CHANGE PASSWORD'
                            onClick={() => {
                                setUserEditItem({...userItem, accountPw: '', newPw: '', confirmPw: ''});
                                setChangePw(true)
                            }}
                        >
                        </PBtn>
                        <br/><br/>
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
                                setUserEditItem({...userItem, accountPw: '', newPw: '', confirmPw: ''});
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
export default AccountInfo;