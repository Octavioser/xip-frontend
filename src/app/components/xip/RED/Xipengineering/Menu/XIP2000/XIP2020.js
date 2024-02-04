import React, {useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker} from '../../XipengineeringXBT'

const XIP2020 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {removeCookie} = useCookie();

    const [dataList, setDataList] = useState([])

    const [name, setName] = useState('')

    const [fromDt, setFromDt] = useState(props.date.startDate)

    const [toDt, setTodt] = useState(props.date.endDate)

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
                      {name:'address', header:'주소', type: 'text'},
                      {name:'prodCdD', header:'상품코드', type: 'text'},
                      {name:'name', header:'상품명', type: 'text'},
                      {name:'prodQty', header:'수량', type: 'text'},
                      {name:'trackingNum', header:'운송장번호', type:'input'}]


    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getUserItem();
                }}
            >
                <XBTDatePicker
                    required={true}
                    labelText={'구매일시'}
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
export default XIP2020;