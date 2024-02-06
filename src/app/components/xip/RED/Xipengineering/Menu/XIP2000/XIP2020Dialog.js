import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
const XIP2020Dialog = (props) => {

    const { commonShowLoading, commonHideLoading, commonApi, navigate} = useCommon();

    const {removeCookie} = useCookie();

    const [useEffectCheck, setUseEffectCheck] = useState(0);

    const [trackItem, setTrackItem] = useState({});

    const [trackingNum, setTrackingNum] = useState('')

    useEffect(() => {
        const getItem = async() => {
            await commonShowLoading();
            try {
                let resultData = await commonApi('/xipengineering/incuR005', {orderCd: props.orderCd});
                if(resultData === -2){
                    removeCookie('xipToken') // 토큰 오류시 로그아웃
                    navigate('/shop')
                }
                else if(resultData.length > 0) {
                    console.log(resultData[0]?.trackingNum || '')
                    setTrackingNum(resultData[0]?.trackingNum || '')
                    setTrackItem(resultData[0])
                }
                else {
                    alert('데이터없음 오류')
                }
            } catch (error) {
                
            } finally {
                commonHideLoading();
            }
            
        }
        if(useEffectCheck === 0) { // 처음시작인지 
            setUseEffectCheck(1);
            getItem();
        }
    },[commonShowLoading, commonHideLoading, commonApi, useEffectCheck, navigate,removeCookie,props.orderCd])

    const setAddPtag = (text) => {
        return (
            <p style={{margin:'0px', padding:'4px', border:'2px solid #E1E1E1', wordBreak: 'break-word'}}>{text}</p>
        )
    }

    const getProdTd = () => {
        if(!!(trackItem.trackingProd) && trackItem.trackingProd) {
            let data = [...(trackItem.trackingProd)]
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

    const saveTracking = async() => {
        await commonShowLoading();
        try {
            let resultData = await commonApi('/xipengineering/incuU001', {orderCd: props.orderCd, trackingNum: trackingNum});
            if(resultData === -2){
                removeCookie('xipToken') // 토큰 오류시 로그아웃
                navigate('/shop')
            }
            else if(resultData === 1) {
                alert('저장완료')
            }
            else {
                alert('오류입니다. 다시 시도해주세요.')
            }
        } catch (error) {
            
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
                <div style={{display:'flex', width:'100%', height:'80%'}}>
                    <div style={{width:'50%', height:'100%', overflow: 'auto'}}>
                        {setAddPtag(`배송방법 : ${trackItem?.shippingMethod}`)}
                        {setAddPtag(`lastNm : ${trackItem?.addLastNm}`)}
                        {setAddPtag(`firstNm : ${trackItem?.addFirstNm}`)}
                        {setAddPtag(`phone : ${trackItem?.phone}`)}
                        {setAddPtag(`company : ${trackItem?.company}`)}
                        {setAddPtag('add1 :')}
                        {setAddPtag(`${trackItem?.add1}`)}
                        {setAddPtag('add1 :')}
                        {setAddPtag(`${trackItem?.add2}`)}
                        {setAddPtag(`city : ${trackItem?.city}`)}
                        {setAddPtag(`contry : ${trackItem?.addCountry}`)}
                        {setAddPtag(`state : ${trackItem?.state}`)}
                        {setAddPtag(`우편번호 : ${trackItem?.postalCd}`)}
                    </div>
                    <div style={{width:'50%', height:'100%'}}>
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
                <div style={{width:'100%', height:'20%', border: '2px solid #E8E8E8', fontWeight:'700'}}>
                    <div style={{border: '2px solid #E8E8E8', display: 'inline-block', height:'33%'}}>운송장 등록</div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center',height:'33%'}}>
                        <input 
                            id='text'
                            type='text'
                            name='text'
                            value={trackingNum}
                            onChange={(e)=>{         
                                setTrackingNum(e.target.value.trim())
                            }}
                        ></input>
                    </div>
                    <div style={{height:'33%', textAlign:'right'}}>
                        <button style={{margin:'5px'}} onClick={() => {saveTracking()}}>운송장 등록</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default XIP2020Dialog;