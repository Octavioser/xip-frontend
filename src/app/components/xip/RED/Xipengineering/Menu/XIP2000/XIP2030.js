import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTTextField} from '../../XipengineeringXBTProvider'

const XIP2030 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([])

    const [email, setEmail] = useState('')

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

    const apiList = {
        selectShipped: {
            api: '/xipengineering/incuR006',
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

    const getPurchaseOrder = async() => {

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectShipped.api, apiList.selectShipped.param());
            
            setDataList(resultData)
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    

    let columnList = [{name:'orderCd', header:'주문번호', type: 'text'},
                      {name:'userNm', header:'유저이름', type: 'text'},
                      {name:'email', header:'이메일', type: 'text'},
                      {name:'orderDt', header:'주문날짜', type: 'text'},
                      {name:'addNm', header:'주소성함', type: 'text'},
                      {name:'shipDt', header:'운송장입력날짜', type: 'text'},
                      {name:'trackingNum', header:'운송장번호', type:'link', labelText:'운송장조회'}]

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getPurchaseOrder();
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
export default XIP2030;