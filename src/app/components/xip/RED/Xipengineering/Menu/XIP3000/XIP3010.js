import React, {useState,useEffect} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTDatePicker,XBTDropDown} from '../../XipengineeringXBT'

const XIP3010 = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([]);

    const [dropDownList, setDropDownList] = useState([]);

    const [fromDt, setFromDt] = useState(props.date.today);

    const [toDt, setTodt] = useState(props.date.today);

    const [season, setSeason] = useState('');

    const [sizeStatus, setSizeStatus] = useState(''); // 사용여부

    const apiList = {
        selectSeasonLst: {
            api: '/xipengineering/incuR011',
            param: () => {
                return (
                    {

                    }
                )
            }
        },
        selectProdOrder: {
            api: '/xipengineering/incuR010',
            param: () => {
                return (
                    {
                        fromDt: fromDt,
                        toDt: toDt,
                        season: season,
                        sizeStatus: sizeStatus
                    }
                )
            }
        },
        updateProdOrder: {
            api: '/xipengineering/incuU203',
            param: (soldQty,totalQty,prodCd) => {
                return (
                    {
                        soldQty: soldQty,
                        totalQty: totalQty,
                        prodCd: prodCd
                    }
                )
            }
        },
    }

    useEffect(()=>{
        const getSeasonlist = async() => {
            await commonShowLoading();
            try {
                let result = await commonApi(apiList.selectSeasonLst.api, apiList.selectSeasonLst.param());    
                if(!!result && result.length > 0) {
                    let item = [{key:'전체', name:'전체', value:''}];
                    result.forEach((e)=>{
                        item.push( {key:e.season, name:e.season, value:e.season})
                    })
                    setDropDownList(item);
                }
            } catch (error) {
                setDataList([])
            } finally {
                commonHideLoading();
            }
        }
        getSeasonlist();
         /* eslint-disable */
    },[])

    const useList = [
        {key:'전체',name:'전체', value:''},
        {key:'use',name:'사용중', value:'1'},
    ]

    const getProdOrder= async() => {

        if(fromDt === '' || toDt === '') {
            alert('날짜를 입력해주세요.')
            return;
        }

        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectProdOrder.api, apiList.selectProdOrder.param());
            
            setDataList(resultData)
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }                    

    let columnList = [
                        {name:'prodCdD', header:'제품코드', type: 'text'},
                        {name:'name', header:'제품이름', type: 'text'},
                        {name:'prodSize', header:'사이즈', type: 'text'},
                        {name:'sizeStatus', header:'사용여부(사이즈)', type:'text'},
                        {name:'soldQty', header:'판매수량', type: 'number', editable:true},
                        {name:'totalQty', header:'총 수량', type: 'number', editable:true},
                        {name:'stockQty', header:'재고수량(총수량 - 판매수량)', type: 'text'},
                        {name:'prodQty', header:'주문수량(기간)', type: 'text'},
                        {name:'krwSubTotal', header:'원화 판매금액(기간)', type: 'text',currency:'₩'},
                        {name:'usdSubTotal', header:'달러 판매금액(기간)', type: 'text', currency:'$'},
                        {name:'saveBtn', header:'수정버튼', type:'button', modifyDisabled: true, 
                            onClick: async(e)=>{
                                let soldQty = Number(e.targetData.soldQty) 
                                let totalQty = Number(e.targetData.totalQty)
                                if(soldQty > totalQty) { // 판매수량이 총 수량보다 많을경우
                                    alert('판매수량이 총 수량보다 많습니다.')
                                }
                                try{
                                    await commonShowLoading();
                                    await commonApi(apiList.updateProdOrder.api, apiList.updateProdOrder.param(soldQty, totalQty, e.targetData.prodCdD));
                                    alert('수정되었습니다.')
                                } catch (error) {
                                    alert('오류입니다. 다시시도해주세요')
                                } finally {
                                    commonHideLoading();
                                }
                            }
                        }
                    ]

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
                <XBTDropDown
                    labelText={'제품시즌'}
                    list={dropDownList}
                    value={season}
                    onChange={(e) => {
                        setSeason(e)
                    }}
                />
                <XBTDropDown
                    labelText={'사이즈 사용여부'}
                    list={useList}
                    value={sizeStatus}
                    onChange={(e) => {
                        setSizeStatus(e)
                    }}
                />
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
                onChange= {(e) => {
                    // console.log(e)
                }}
            >
            </XBTDataGrid>
        </>
    )
}
export default XIP3010;