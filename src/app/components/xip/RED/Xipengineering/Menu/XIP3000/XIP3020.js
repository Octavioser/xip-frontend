import React, {useEffect, useState} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {XBTDataGrid, XBTSearchFrame, XBTTextField, XBTDropDown} from '../../XipengineeringXBTProvider'
import XIP3020Dialog from './XIP3020Dialog'

const XIP3020 = () => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [dataList, setDataList] = useState([])

    const [dropDownList, setDropDownList] = useState([]);

    const [season, setSeason] = useState('');

    const [line, setLine] = useState('');

    const [name, setName] = useState('');

    const [openDialog, setOpenDialog] = useState(false);

    const [dialogItem, setDialogItem] = useState({});

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
        selectProdStatus: {
            api: '/xipengineering/incuR012',
            param: () => {
                return (
                    {
                        season: season,
                        line:line,
                        name:name
                    }
                )
            }
        },
        updateProd: {
            api: '/xipengineering/incuU205',
            param: (param) => {
                return (
                    param
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

    // 그리드 데이터 조회
    const getProdStatus= async() => {
        try{
            await commonShowLoading();
            let resultData = await commonApi(apiList.selectProdStatus.api, apiList.selectProdStatus.param());
            if(!!resultData && resultData.length > 0) {

            }
            else {
                resultData = [];
            }
            setDataList(resultData)
        } catch (error) {
            alert('Please try again.')   
        } finally {
            commonHideLoading();
        }
    }                    

    // 저장하기
    const saveData = async(e) => {
        let param = {prodCd: e.prodCd, name:e.name, price: e.price, usPrice:e.usPrice, sizeOpt:e.sizeOpt, status: e.status}
        try{
            await commonShowLoading();
            await commonApi(apiList.updateProd.api, apiList.updateProd.param(param));
            alert('저장완료')   
            getProdStatus();
        } catch (error) {
            alert('Please try again.')       
        } finally {
            commonHideLoading();
        }
    }

    // 체크함수 조건 
    const checkCondition = (e) => {
        // oneSize를 체크하거나 onesize가 체크 되어있으면 
        if((!!e.checked && e.value === 'One Size') ) 
        {
            return 'One Size';
        }
        else if (!!e.checked && e.value !== 'One Size' && e.data.includes('One Size')) {
            return e.value;
        }
        return false;
    }

    const listItem = {
        propStatus: [
            {name:'판매중단', value:'-1'},
            {name:'판매전', value:'0'},
            {name:'판매중', value:'1'},
            {name:'판매완료', value:'2'},
            {name:'프리오더', value:'3'},
        ],
    
        Sizelist: [
            {name:'XS', value:'XS', index:0},
            {name:'S', value:'S', index:1},
            {name:'M', value:'M', index:2},
            {name:'L', value:'L', index:3},
            {name:'XL', value:'XL', index:4},
            {name:'One Size', value:'One Size', index:5}
        ],

        prodLineList: [
            {key:'전체',name:'전체', value:''},
            {key:'XM',name:'XIP Mainline', value:'XM'},
            {key:'XP',name:'XIPro', value:'XP'},
            {key:'XS',name:'Xskin', value:'XS'},
            {key:'CC',name:'Cue choi', value:'CC'},
            {key:'JV',name:'Jun Valentine', value:'JV'}
        ]
    }

    let columnList = [
                        {name: 'prodCd', header: '제품코드', type: 'text'},
                        {name: 'name', header: '이름', type: 'text', editable:true},
                        {name: 'price', header: '가격', type: 'number', currency:'₩', editable:true},
                        {name: 'usPrice', header: '미국 가격', type: 'number', currency:'$', editable:true},
                        {name: 'sizeOpt', header: '사이즈 옵션', type: 'checkDropDown', list: listItem.Sizelist, func:(e)=>{return checkCondition(e)}},
                        {name: 'status', header: '상태', type: 'dropDown', list: listItem.propStatus},
                        {name:'prodDescBtn', header:'제품 설명', type:'button', labelText:'제품 설명 수정',
                            onClick: async(e)=>{
                                let descItem = (e.targetData.prodDesc || []).split('|')
                                let descDItem = (e.targetData.prodDescD || []).split('|')
                                let prodCd = e.targetData.prodCd
                                setDialogItem({prodDesc: descItem, prodDescD:descDItem, prodCd:prodCd})
                                setOpenDialog(true)
                            }
                        },
                        {name:'saveBtn', header:'저장', type:'button', modifyDisabled: true, labelText:'저장',
                            onClick: async({targetData})=>{
                                saveData(targetData);
                            }
                        },
                        // {name:'deleteBtn', header:'제품삭제', type:'button', labelText:'삭제',
                        //     onClick: async({targetData})=>{
                        //         console.log(targetData)
                        //     }
                        // }
                    ]
    

    const closeDialog = () => {
        setDialogItem({})
        setOpenDialog(false)
    }

    return (
        <>
            <XBTSearchFrame
                onClick={()=>{
                    getProdStatus();
                }}
            >
                <XBTDropDown
                    labelText={'제품시즌'}
                    list={dropDownList}
                    value={season}
                    onChange={(e) => {
                        setSeason(e)
                    }}
                />

                <XBTDropDown
                    labelText={'제품라인'}
                    list={listItem.prodLineList}
                    value={line}
                    onChange={(e) => {
                        setLine(e)
                    }}
                />

                <XBTTextField
                    labelText={'제품명(제품코드)'}
                    value={name}
                    onChange={(e) => {
                        setName(e)
                    }}
                />
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
            >
            </XBTDataGrid>
            {openDialog && <XIP3020Dialog modalBtn={closeDialog} item={dialogItem} dataList={dataList} setDataList={setDataList}/>}
        </>
    )
}
export default XIP3020;