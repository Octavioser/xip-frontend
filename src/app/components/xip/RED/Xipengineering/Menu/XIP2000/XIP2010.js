import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTDropDown} from '../../XipengineeringXBT'

const XIP2010 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {removeCookie} = useCookie();

    const [dataList, setDataList] = useState([])

    const [orderStatus, setOrderStatus] = useState('')

    const [fromDt, setFromDt] = useState(props.date.startDate)

    const [toDt, setTodt] = useState(props.date.endDate)

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


    let columnList = [{name:'orderCd', header:'주문번호', type: 'text'},
                      {name:'orderDt', header:'주문날짜', type: 'text'},
                      {name:'orderStatus', header:'주문상태', type: 'text'},
                      {name:'krwSubTotal', header:'원화_제품금액', type: 'text', footer: true},
                      {name:'krwShippingAmount', header:'원화_배송비', type: 'text', footer: true},
                      {name:'krwTotalAmount', header:'원화_총금액', type: 'text', footer: true},
                      {name:'usdSubTotal', header:'달러_제품금액', type: 'text', footer: true},
                      {name:'usdShippingAmount', header:'달러_배송비', type: 'text', footer: true},
                      {name:'usdTotalAmount', header:'달러_총금액', type: 'text', footer: true}]

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
                onChange= {(e) => {
                    
                }}
            >
            </XBTDataGrid>
        </>
    )
}
export default XIP2010;