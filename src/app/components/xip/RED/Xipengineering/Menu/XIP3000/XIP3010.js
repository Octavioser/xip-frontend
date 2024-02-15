import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker} from '../../XipengineeringXBT'

const XIP3010 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {removeCookie} = useCookie();

    const [dataList, setDataList] = useState([])

    const [fromDt, setFromDt] = useState(props.date.beforeMonth)

    const [toDt, setTodt] = useState(props.date.today)

    const apiList = {
        selectProdOrder: {
            api: '/xipengineering/incuR010',
            param: () => {
                return (
                    {
                        fromDt: fromDt,
                        toDt: toDt
                    }
                )
            }
        }
    }

    const getProdOrder= async() => {

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectProdOrder.api, apiList.selectProdOrder.param());
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

    let columnList = [{name:'prodCdD', header:'제품코드', type: 'text'},
                      {name:'name', header:'제품이름', type: 'text'},
                      {name:'prodSize', header:'사이즈', type: 'text'},
                      {name:'soldQty', header:'판매수량', type: 'text'},
                      {name:'totalQty', header:'총 수량', type: 'input'},
                      {name:'stockQty', header:'재고수량(총수량 - 판매수량)', type: 'text'},
                      {name:'prodQty', header:'주문수량', type: 'text'},
                      {name:'krwSubTotal', header:'원화 판매금액', type: 'text'},
                      {name:'usdSubTotal', header:'달러 판매금액', type: 'text'},
                      {name:'editBtn', header:'수정버튼', type:'button', 
                      onClick:(e)=>{
                        console.log(e)
                      }}]

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getProdOrder();
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
export default XIP3010;