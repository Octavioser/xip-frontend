import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker, XBTTextField, XBTDropDown} from '../../XipengineeringXBT'
import XIP2040Dialog from './XIP2040Dialog';


const XIP2040 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([]);

    const [orderStatus, setOrderStatus] = useState('0');

    const [email, setEmail] = useState('');

    const [fromDt, setFromDt] = useState(props.date.beforeMonth);

    const [toDt, setTodt] = useState(props.date.today);

    const [dialog, setDialog] = useState(false);

    const [dialogItem, setDialogItem] = useState(false);

    const apiList = {
        selectCancelling: {
            api: '/xipengineering/incuR007',
            param: () => {
                return (
                    {
                        orderStatus: orderStatus,
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
            let resultData = await commonApi(apiList.selectCancelling.api, apiList.selectCancelling.param());
            setDataList(resultData)
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    

    const openDialog = (e) => {
        setDialogItem(e)
        setDialog(true);
    }

    let columnList = [{name:'orderCd', header:'주문번호', type: 'text'},
                      {name:'orderStatus', header:'주문상태', type: 'text'},
                      {name:'userNm', header:'유저이름', type: 'text'},
                      {name:'email', header:'이메일', type: 'text'},
                      {name:'orderDt', header:'주문날짜', type: 'text'},
                      {name:'addNm', header:'주소성함', type: 'text'},
                      {name:'totalAmount', header:'총금액', type: 'text'},
                      {name:'shippingAmount', header:'배송비', type: 'text'},
                      {name:'subTotal', header:'제품금액', type: 'text'},
                      {name:'cancelBtn', header:'취소버튼', type:'button', labelText:'취소',
                      onClick:(e)=>{
                        openDialog(e.targetData)
                      }}]

    let dropDownList = [{key:'배송전', name: '배송전', value:'1'},
                      {key:'배송후', name:'배송후', value:'2'},
                      {key:'취소요청', name:'취소요청', value:'0'}]
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
                <XBTDropDown
                    labelText={'구매상태'}
                    list={dropDownList}
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e)
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
                onChange= {(e) => {

                }}
            >
            </XBTDataGrid>
            {dialog && <XIP2040Dialog item={dialogItem} modalBtn={() => setDialog(false)} getCancelItem={() => getCancelItem()}/>}
        </>
    )
}
export default XIP2040;