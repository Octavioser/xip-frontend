import React, {useState, useMemo} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTDropDown} from '../../XipengineeringXBTProvider'
import XIP2010Dialog from './XIP2010Dialog';

const XIP2010 = (props) => {
    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([])

    const [orderStatus, setOrderStatus] = useState('')

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

    const [dialog, setDialog] = useState(false);

    const [dialogOrderCd, setDialogOrderCd] = useState(false);

    const apiList = {
        selectOrders: {
            api: '/xipengineering/incuR003',
            param: () => {
                return (
                    {
                        orderStatus: orderStatus,
                        fromDt: fromDt,
                        toDt: toDt
                    }
                )
            }
        }
    }

    const getOrderItem = async() => {

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectOrders.api, apiList.selectOrders.param());
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
        {name:'orderDt', header:'주문날짜', type: 'text'},
        {name:'orderStatus', header:'주문상태', type: 'text'},
        {name:'krwSubTotal', header:'원화_제품금액', type: 'text', currency:'₩',footer: true},
        {name:'krwShippingAmount', header:'원화_배송비', type: 'text', currency:'₩',footer: true},
        {name:'krwTotalAmount', header:'원화_총금액', type: 'text', currency:'₩',footer: true},
        {name:'usdSubTotal', header:'달러_제품금액', type: 'text', currency:'$',footer: true},
        {name:'usdShippingAmount', header:'달러_배송비', type: 'text', currency:'$',footer: true},
        {name:'usdTotalAmount', header:'달러_총금액', type: 'text', currency:'$',footer: true},
        {name:'productDetails', header:'제품정보', type:'button', labelText:'제품정보', 
            onClick:(e)=>{
                openDialog(e.targetData)
        }}
    ],[])

    let dropDownList = [{key:'전체', name: '전체', value:''},
                        {key:'배송전', name: '배송전', value:'1'},
                        {key:'배송후', name:'배송후', value:'2'},
                        {key:'완료', name:'완료', value:'3'},
                        {key:'취소요청', name:'취소요청', value:'0'},
                        {key:'취소완료', name:'취소완료', value:'-1'}]


    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getOrderItem();
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
                footer={true}
                columnList={columnList}
                dataList={dataList}
            >
            </XBTDataGrid>
            {dialog && <XIP2010Dialog orderCd={dialogOrderCd} modalBtn={() => setDialog(false)}/>}
        </>
    )
}
export default XIP2010;