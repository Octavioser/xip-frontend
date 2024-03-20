import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTTextField, XBTDatePicker} from '../../XipengineeringXBT'

const XIP1010 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([])

    const [name, setName] = useState('')

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

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

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectUsers.api, apiList.selectUsers.param());
            setDataList(resultData)

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
                    value={name}
                    onChange={(e) => {
                        setName(e)
                    }}
                />
                <XBTDatePicker
                    required={true}
                    labelText={'가입일시'}
                    value={fromDt}
                    onChange={(e) => {
                        setFromDt(e)
                    }}
                />
                <XBTDatePicker
                    required={true}
                    labelText={'~'}
                    value={toDt}
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
export default XIP1010;