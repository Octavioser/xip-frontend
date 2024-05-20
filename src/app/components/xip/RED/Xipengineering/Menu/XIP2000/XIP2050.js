import React, {useMemo, useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTTextField} from '../../XipengineeringXBTProvider'

const XIP2050 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([])

    const [email, setEmail] = useState('')

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

    const apiList = {
        selectCanceled: {
            api: '/xipengineering/incuR009',
            param: () => {
                return (
                    {
                        userEmail:email,
                        fromDt: fromDt,
                        toDt: toDt
                    }
                )
            }
        }
    }

    const getCancelItem = async() => {

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectCanceled.api, apiList.selectCanceled.param());
            
            setDataList(resultData)
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    

    const columnList = useMemo(()=>[
        {name:'orderCd', header:'주문번호', type: 'text'},
        {name:'userNm', header:'유저이름', type: 'text'},
        {name:'email', header:'이메일', type: 'text'},
        {name:'orderDt', header:'주문날짜', type: 'text'},
        {name:'cancelDt', header:'취소날짜', type: 'text'},
        {name:'cancelAmount', header:'취소금액', type: 'text'},
        {name:'totalAmount', header:'총금액', type: 'text'},
        {name:'shippingAmount', header:'배송비', type: 'text'},
        {name:'subTotal', header:'제품금액', type: 'text'}
    ],[])

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getCancelItem();
                }}
            >
                <XBTDatePicker
                    required={true}
                    labelText={'주문날짜'}
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
                <XBTTextField
                    labelText={'이메일'}
                    value={email}
                    onChange={(e) => {
                        setEmail(e)
                    }}
                />
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
            >
            </XBTDataGrid>
        </>
    )
}
export default XIP2050;