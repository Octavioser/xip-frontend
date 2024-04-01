import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common'
const XIP2010Dialog = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi} = useCommon();

    const [prodItem, setProdItem] = useState([]);

    useEffect(() => {
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/xipengineering/incuR013', {orderCd: props.orderCd});
                if(resultData.length > 0) {
                    setProdItem(resultData)
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


    const getProdTd = () => {
        if(!!prodItem) {
            let data = [...prodItem]
            return (
                <>
                    {data.map((e, index) =>
                    <tr  key={'prodtr' + index}>
                        <td key={'prodcd' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodCdD}</td>
                        <td key={'prodnm' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.name}</td>
                        <td key={'prodsz' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodSize}</td>
                        <td key={'prodqty' + index} style={{ border: '2px solid #E8E8E8', height: '40px', fontSize:'0.9rem'}}>{e.prodQty}</td>
                    </tr>
                    )}
                </>
            )
        }
        
        return(<></>)        
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
                <div style={{display:'flex', width:'100%', height:'100%'}}>
                    <div style={{width:'100%', height:'100%'}}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F4F4F4'}}>
                                <tr>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품코드</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품이름</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품사이즈</th>
                                    <th style={{ border: '2px solid #E8E8E8'}}>제품수량</th>
                                </tr>
                            </thead>
                            <tbody  style={{ backgroundColor: 'white', textAlign:'center'}}>
                                {getProdTd()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default XIP2010Dialog;