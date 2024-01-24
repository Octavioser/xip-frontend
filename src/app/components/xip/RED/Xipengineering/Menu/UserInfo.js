import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {XBTDataGrid, XBTSearchFrame, XBTTextField, XBTDatePicker} from '../XipengineeringXBT'

const UserInfo = () => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {getCookie, removeCookie} = useCookie();

    const [dataList, setDataList] = useState([])

    const [name, setName] = useState('')

    const [fromDt, setFromDt] = useState('')

    const [toDt, setTodt] = useState('')

    const apiList = {
        selectUsers: {
            api: '/xipengineering/incuR002',
            param: () => {
                return (
                    {
                        name: name,
                        fromDt: fromDt,
                        toDt: toDt
                    }
                )
            }
        }
    }

    const getUserItem = async() => {
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectUsers.api, apiList.selectUsers.param());
            if(resultData === -2) {
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else {
                setDataList(resultData)
            }
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    


    let columnList = [  {name:'firstNm', header:'이름', type: 'text'},
                        {name:'lastNm', header:'성', type: 'text'},
                        {name:'email', header:'이메일', type: 'text'},
                        {name:'creatDt', header:'가입일시', type: 'text'}]

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getUserItem();
                }}
            >
                <XBTTextField
                    labelText={'이름'}
                    onChange={(e) => {
                        setName(e)
                    }}
                />
                <XBTDatePicker
                    required={true}
                    labelText={'가입일시'}
                    onChange={(e) => {
                        setFromDt(e)
                    }}
                />
                <XBTDatePicker
                    required={true}
                    labelText={'~'}
                    onChange={(e) => {
                        setTodt(e)
                    }}
                />
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
                onChange= {(e) => {
                    console.log(e)
                }}
            >
            </XBTDataGrid>
        </>
    )
}
export default UserInfo;