import React, { useState } from 'react';
import Modal from 'react-modal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common'
const XIP3020Dialog = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [descItem, setDescItem] = useState(props.item.prodDesc || []);

    const [descDItem, setDescDItem] = useState(props.item.prodDescD  || []);

    const apiList = {
        updateProdDesc: {
            api: '/xipengineering/incuU204',
            param: (desc, descD) => {
                return (
                    {
                        prodCd: props.item.prodCd,
                        prodDesc: desc,
                        prodDescD: descD
                    }
                )
            }
        }
    }

    const setDesc = () => {  // 제품 한줄설명이며 최대 2개
        return (
            <>
                <div>
                    <input 
                        key={'desc0'}
                        style={{
                            height:'10%',
                            width: '50%',      /* 입력 필드의 너비를 100%로 설정 */
                            boxSizing: 'border-box', /* border와 padding이 width에 포함되도록 설정 */
                            padding: 0,     /* 적당한 padding 설정 */
                            margin: 0        /* margin을 0으로 설정 */
                        }} 
                        maxLength={50}
                        type={'text'}
                        value={descItem[0]}
                        onChange={(item)=>{
                            let data = [...descItem]
                            data[0] = item.target.value
                            setDescItem(data);
                        }} 
                    />
                </div>
                <div>
                    <input 
                        key={'desc1'}
                        style={{
                            height:'10%',
                            width: '50%',      /* 입력 필드의 너비를 100%로 설정 */
                            boxSizing: 'border-box', /* border와 padding이 width에 포함되도록 설정 */
                            padding: 0,     /* 적당한 padding 설정 */
                            margin: 0        /* margin을 0으로 설정 */
                        }} 
                        maxLength={50}
                        type={'text'}
                        value={descItem[1]}
                        onChange={(item)=>{
                            let data = [...descItem]
                            data[1] = item.target.value
                            setDescItem(data);
                        }} 
                    />
                </div>
           </>
        )
    }

    const descDFoam = {
        addFoam : () => {
            let list = [...descDItem]
            list.push('')
            setDescDItem(list)
        },
        deleteFoam : () => {
            let list = [...descDItem]
            list.pop();
            setDescDItem(list)
        },
    }
    const setDescD = () => {
        return (
            <>
            {descDItem.map((e, index)=>
                <div key={'divdescd' + index}>
                    <input 
                        key={'descd' + index}
                        style={{
                            height:'10%',
                            width: '50%',      /* 입력 필드의 너비를 100%로 설정 */
                            boxSizing: 'border-box', /* border와 padding이 width에 포함되도록 설정 */
                            padding: 0,     /* 적당한 padding 설정 */
                            margin: 0        /* margin을 0으로 설정 */
                        }} 
                        maxLength={50}
                        type={'text'}
                        value={e}
                        onChange={(item)=>{
                            let data = [...descDItem]
                            data[index] = item.target.value
                            setDescDItem(data);
                        }} 
                    />
                </div>
           )}
           </>
        )
    }
    // 제품설명 저장
    const descSave = async() => {
        // 제품 설명 값 
        let descStr = descItem[0]

        if(!!(descItem[1])) { // 2번째설명이 값이 있을경우
            descStr =  descStr + '|' + descItem[1]
        }

        // 제품 상세 설명 값
        let descDdata = descDItem;
        let descDStr = ''
        
        descDdata.forEach((e)=> {
            if(descDStr === '') {
                descDStr = descDStr + e
            }
            else {
                descDStr = descDStr + '|' + e
            }
        })

        // 그리드에 데이터 넣어주기 
        let data = [...props.dataList] || [];
        props.dataList.forEach((e,i)=> {
            if(e.prodCd === props.item.prodCd) {
                data[i].prodDesc = descStr
                data[i].prodDescD = descDStr
            }
        })
        props.setDataList(data);

        // 데이터 저장하기 
        try{
            await commonShowLoading();
            await commonApi(apiList.updateProdDesc.api, apiList.updateProdDesc.param(descStr, descDStr));
            alert('저장 완료')
            props.modalBtn();
        } catch (error) {
            console.log(error)
            alert('Please try again.')   
        } finally {
            commonHideLoading();
        }
    }

    return (
        <Modal 
            isOpen={true} 
            onRequestClose={() => props.modalBtn()}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 99
                },
                content: {
                    left: '50%',  /* 왼쪽에서 중앙 */
                    top: '50%',    /* 위에서 중앙*/
                    width: '60vw',
                    height: '80vh',
                    backgroundColor: 'rgba(255, 255, 255)',
                    transform: 'translate(-50%, -50%)'
                }
            }}
            ariaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={true} // 팝업창이 아닌 바깥부분 클릭시 닫히게 할것인지
        >
            {/*닫기버튼*/}
            <PBtn  
                labelText= 'X'
                alt='menuButton' 
                style={{
                    fontSize: '2rem',
                    position: 'absolute',  // 절대적 위치 설정
                    top: '1px',           // 상단으로부터의 거리
                    right: '2px',         // 오른쪽으로부터의 거리
                    height: '3vh',
                    color:'black'
                }}
                onClick={() =>{
                    props.modalBtn()
                }}
            >
            </PBtn>
            <div style={{width:'99%', height:'99%', color:'black', border:'2px solid #E1E1E1'}}>
                <div style={{display:'flex', width:'100%', height:'30%'}}>
                    <div style={{height:'100%', width:'20%', fontWeight:'700'}}>제품설명</div>
                    <div style={{height:'100%', width:'70%', overflow: 'auto'}}>
                        <div style={{height:'10%', width:'100%'}}></div>    
                            {setDesc()}
                    </div>
                </div>
                <div style={{display:'flex', width:'100%', height:'70%',border: '2px solid #E8E8E8'}}>
                    <div style={{height:'100%', width:'20%', fontWeight:'700'}}>제품설명</div>
                    <div style={{height:'100%', width:'70%', overflow: 'auto'}}>
                        <div style={{height:'10%', width:'100%'}}></div>    
                            {setDescD()}
                    </div>
                    <div style={{height:'100%', width:'10%'}}>
                        <div style={{height:'50%', width:'100%'}}>
                            <button style={{width:'100%', height:'50%'}} onClick={()=>{descDFoam.addFoam()}}>추가</button>
                            <button style={{width:'100%', height:'50%'}}onClick={()=>{descDFoam.deleteFoam()}}>삭제</button>
                        </div>
                        <div style={{height:'50%', width:'100%'}}>
                            <div style={{width:'100%', height:'75%'}}></div>
                            <button style={{width:'100%', height:'20%'}}onClick={()=>{descSave()}}>저장</button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default XIP3020Dialog;