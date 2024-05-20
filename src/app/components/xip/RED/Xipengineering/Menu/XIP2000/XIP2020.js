import React, {useMemo, useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTDropDown} from '../../XipengineeringXBTProvider'
import XIP2020Dialog from './XIP2020Dialog';

const XIP2020 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dialog, setDialog] = useState(false);

    const [dialogOrderCd, setDialogOrderCd] = useState(false);

    const [dataList, setDataList] = useState([])

    const [orderStatus, setOrderStatus] = useState('1')

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

    const apiList = {
        selectPurchaseOrder: {
            api: '/xipengineering/incuR004',
            param: () => {
                return (
                    {
                        orderStatus:orderStatus,
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
            let resultData = await commonApi(apiList.selectPurchaseOrder.api, apiList.selectPurchaseOrder.param());
            setDataList(resultData)
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    

    const openDialog = (e) => {
        setDialogOrderCd(e.orderCd)
        setDialog(true);
    }


    const columnList = useMemo(()=>[
        {name:'orderCd', header:'주문번호', type: 'text'},
        {name:'userNm', header:'유저이름', type: 'text'},
        {name:'email', header:'이메일', type: 'text'},
        {name:'orderDt', header:'주문날짜', type: 'text'},
        {name:'trackingInput', header:'운송장', type:'button', labelText:'운송장 등록', 
        onClick:(e)=>{
            openDialog(e.targetData)
        }}
    ],[])
    
    const dropDownList = [{key:'배송전', name: '배송전', value:'1'},
                        {key:'배송후', name:'배송후', value:'2'}]

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getPurchaseOrder();
                }}
            >
                <XBTDropDown
                    labelText={'구매상태'}
                    list={dropDownList}
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e)
                    }}
                />
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
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
            >
            </XBTDataGrid>
            {dialog && <XIP2020Dialog orderCd={dialogOrderCd} modalBtn={() => setDialog(false)} getPurchaseOrder={() => getPurchaseOrder()}/>}
        </>
    )
}
export default XIP2020;