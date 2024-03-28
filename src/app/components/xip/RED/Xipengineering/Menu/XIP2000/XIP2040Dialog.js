import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common'
const XIP2040Dialog = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, commonConfirm} = useCommon();

    const [dataItem, setDataItem] = useState([]);

    const [dataInfo,] = useState({...props.item})

    const [reason, setReason] = useState('');

    const [cancelPrice, setCancelPrice] = useState(0)

    useEffect(() => {
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/xipengineering/incuR008', {orderCd: props.item.orderCd});
                if(resultData.length > 0) {
                    let totalPrice = 0
                    resultData.forEach((e) => {
                        totalPrice = e.price + totalPrice
                    })
                    setCancelPrice(totalPrice)
                    setDataItem(resultData)
                }
                else {
                    alert('데이터없음 오류')
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
        }
        getItem();
        /* eslint-disable */
    },[])

    const apiList = {
        updateCanceled: {
            api: '/xipengineering/incuU202',
            param: (cancelamount) => {
                return (
                    {
                        cancelAmount: cancelamount,
                        reason: reason,
                        orderCd: dataInfo.orderCd
                    }
                )
            }
        }
    }


    const getProdTd = () => {
        if(!dataItem || dataItem.length < 0) {
            return(<></>)
        }
        let data = [...dataItem]
        return (
            <>
                {data.map((e, index) =>
                <tr  key={'prodtr' + index}>
                    <td key={'prodcd' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodCdD}</td>
                    <td key={'prodnm' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.name}</td>
                    <td key={'prodsz' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodSize}</td>
                    <td key={'prodqty' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodQty}</td>
                    <td key={'price' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.price}</td>
                    <td key={'currency' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.currency}</td>
                </tr>
                )}
            </>
        )
    }

    const cancelOrder = async(e) => {
        let total = dataInfo.totalAmount.replace(/[^0-9]/g, '');
        let cancelamount = Number(cancelPrice)
        if( cancelamount > total) {
            alert('총금액보다 취소금액이 큽니다.')
            return;
        }
        if(!reason || reason === '') {
            alert('사유를 입력하세요')
            return;
        }
        commonConfirm(`총금액:${dataInfo.totalAmount} 취소금액:${cancelPrice}`, async() => {
            try{
                await commonShowLoading();
                await commonApi(apiList.updateCanceled.api, apiList.updateCanceled.param(cancelamount));
                alert('취소 완료')
                props.modalBtn();
                props.getCancelItem();
            } catch (error) {
                alert('Please try again.')   
            } finally {
                commonHideLoading();
            }
        })
        
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
                <div style={{display:'flex', width:'100%', height:'70%', overflow: 'auto'}}>
                    <div style={{width:'100%', height:'100%'}}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F4F4F4'}}>
                                <tr>
                                    <th style={{ border: '2px solid #E8E8E8'}}>주문번호</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>총금액</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>배송비</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>주문금액</th>
                                </tr>
                            </thead>
                            <tbody  style={{ backgroundColor: 'white', textAlign:'center'}}>
                            <td key={'orderCd'} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{dataInfo?.orderCd}</td>
                            <td key={'totalPrice'} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{dataInfo?.totalAmount}</td>
                            <td key={'shipee'} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{dataInfo?.shippingAmount}</td>
                            <td key={'subTotal'} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{dataInfo?.subTotal}</td>
                            </tbody>
                        </table>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F4F4F4'}}>
                                <tr>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품코드</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품이름</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품사이즈</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품수량</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>상품가격</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>통화</th>
                                </tr>
                            </thead>
                            <tbody  style={{ backgroundColor: 'white', textAlign:'center'}}>
                                {getProdTd()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{width:'100%', height:'30%', border: '2px solid #E8E8E8', fontWeight:'700'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center',height:'85%'}}>
                        <p style={{padding:20}}>사유:</p>
                        <textarea 
                            cols="40" 
                            rows="5"
                            maxLength="100"
                            value={reason}
                            onChange={(e)=>(
                                setReason(e.target.value)
                            )}
                        >
                        </textarea>
                        <p style={{padding:20}}>취소금액:</p>
                        <input 
                            id='number'
                            type='number'
                            name='text'
                            value={cancelPrice}
                            onChange={(e)=>{         
                                setCancelPrice(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div style={{width: '100%', padding:0, margin:0, textAlign: 'right', height:'15%'}}>
                        <button style={{fontSize:'0.8rem'}} onClick={() => {cancelOrder()}}>주문 취소</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default XIP2040Dialog;