import React, {useState, useEffect} from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; // 한국어 변환


export const XBTDropDown = (props) => {
    return (
        <>
            <p style={{margin:'10px',fontSize:'0.8rem', fontWeight:'600'}}>{props.labelText}</p>
            <select  
                style={{ width: '15%'}}
                value={props.value}
                onChange={(e)=>{
                    props.onChange(e.target.value)
                }}
            >
                {props.list.map(item => (
                    <option key={item.key} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    )
}


export const XBTDatePicker = (props) => {

    const getTimeType = (time) => {
        try {
            let value = new Date(time.slice(0,4) + '-' + time.slice(4,6) + '-' + time.slice(6,8))
            if(String(value) === 'Invalid Date') {
                return '';
            }
            else {
                return value
            }
        } catch (error) {
            return '';
        }
    }

    return (
        <>
            <p style={{margin:'10px',fontSize:'0.8rem', fontWeight:'600'}}>{props.labelText}</p>
            <DatePicker
                className={props?.required && "requiredDatepicker"}
                selected={getTimeType(props.value)}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                minDate={new Date('2023-10-01')} // 데이터가 이때부터 생성됨
                onChange={(date) => {
                    if(!!date) {
                        date.setHours(date.getHours() + 9); // 9시간 더하기
                        props.onChange(date.toISOString().substring(0,10).replace(/-/g,''))
                    }
                    else {
                        props.onChange('')
                    }
                }}
            />
        </>
    );
}

export const XBTTextField = (props) => {

    return (
        <>
            <p style={{margin:'10px',fontSize:'0.8rem', fontWeight:'600'}}>{props.labelText}</p>
            <input 
                style={{margin:'10px'}}
                type="text" 
                value={props.value} 
                onChange={(e)=>{
                    props.onChange(e.target.value)
                }} 
            />
        </>
    )
}


export const XBTSearchFrame = (props) => {

    return (
        <>
            <div style={{display:'flex', position:'relative', width:'100%' ,height:'12%', textAlign:'center', border:'3px solid #E1E1E1'}}>
                {/* 검색 창 */}
                
                <div style={{display: 'flex', position:'relative', width:'94%' ,height:'100%', textAlign:'center', alignItems: 'center'}}>
                    {props.children}
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',position:'relative', width:'6%' ,height:'100%', textAlign:'center'}}>
                    <PBtn 
                        className= 'pBtnNoRed'
                        style={{width: '40px', height:'40px', margin: 0, padding: 0, fontSize:'2rem',backgroundColor: '#F4F4F4', borderRadius:'10px', border: '2px solid #E8E8E8'}}
                        labelText='⌕'
                        alt='검색'
                        onClick={(e) =>{
                            props.onClick(e);
                        }}
                    >
                    </PBtn>
                </div>
            </div>
        </>
    )
}

export const XBTDataGrid = (props) => {

    const [data, setData] = useState([])

    const [isEditing, setIsEditing] = useState(''); 

    const [modifyDisabled, setModifyDisabled] = useState({}); // 변경사항이 있는지 확인용

    const [checkDropDownOpen, setCheckDropDownOpen] = useState('')

    useEffect(()=>{
        let item = JSON.parse(JSON.stringify(props.dataList))
        setData(item)
    }, [props.dataList]); // 의존성 배열로 props.dataList를 전달


    // 헤더 컬럼 
    const setColumns = () => {
        let columnList = [...props.columnList] || []
        return (
            <tr>
            <th key={'cth' + 0} style={{ border: '2px solid #E8E8E8'}}>순번</th>
            {columnList.map((e, index) =>
                <th key={'cth' + (index + 1)} style={{ border: '2px solid #E8E8E8'}}>{e.header}</th>
            )}
            </tr>
        )
    }
    
   
    
    //데이터 세팅
    const setTable = () => {

        let columnList = [...props.columnList]

         // 데이터 입력시 
        const onChangeSetData = async(e, index, j) => {
            let dataItem = [...data]
            // let oldList = [...props.dataList]
            dataItem[index][j.name] = j.type === 'number' ? Number(e.target.value) : e.target.value
            setData(dataItem)  
            // return({   // 이전 리턴값
            //     oldData : oldList,
            //     newData : data,
            //     column: j.name,
            //     targetData : dataItem[index],
            //     targetOldData : oldList[index]
            // });
        }

        // 입력 완료 및 포커스 잃었을 때의 이벤트 핸들러
        const handleBlur = (index) => {
            setIsEditing('');
            completeModify(index); // 수정완료시
        };

        // 엔터 키 입력 처리
        const handleKeyPress = (e, index) => {
            if (e.key === 'Enter') {
                setIsEditing(false); // 편집 모드 종료
                completeModify(index); // 수정완료시
            }
            
        };
        // 버튼 타입시 변경사항에 따라 diabled값 리턴  (변경이 있을 때마다 실행됨)
        const handleDisabled = (e, index) => {

            if(!modifyDisabled[index + '']) { // 변경사항 없는 index일경우
                return true;
            }

            // 현재 타켓 데이터와 원본데이터의 데이터를 비교
            if(JSON.stringify(e) !== JSON.stringify([...props.dataList][index])) {
                return false
            }
            else {
                // 같으면 삭제
                delete modifyDisabled[index + '']; 
                return true
            }
        }

        // 변경사항 적용 종료시점
        const completeModify = (index) => {
            let item = modifyDisabled;
            item[index + ''] = true;   // handleDisabled 최적화용
            setModifyDisabled(item)   // 수정 버튼 전용
        }

        // 체크 드랍다운 onchange
        const checkDropDownOnChange = (value, checked, stateValue, list) => { // 체크 로직
            let data = stateValue.split('|')
            let result = '';

            list.forEach(e => {
                if(checked && value === e.value) { // 체크한값
                    if(result === '') { 
                        result = value
                    }
                    else {
                        result = result + '|' + value
                    }
                }
                else if(data.includes(e.value) && e.value !== value){ // 체크해당 데이터 아님 원래 있는 데이터
                    if(result === '') { 
                        result = e.value
                    }
                    else {
                        result = result + '|' + e.value
                    }
                }
                
            })
            return result;
        }

        return (
            data.map((e, index) => { 
                return (
                    <tr key={'dtr' + index}>
                        <td key={'dtd' + index} style={{ border: '2px solid #E8E8E8' }}>{index + 1}</td>
                        {columnList.map((j) => {  // 1개 로우 데이터 만들기
                            if(j.type === 'text' || j.type === 'number') {
                                let textValue = e?.[j.name]
                                if(!!j.currency) { // 통화단위가 있을경우
                                    textValue = j.currency + textValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                if(j.name === 'orderCd') {  // 주문번호 일경우 
                                    textValue = 'XIP' + textValue
                                }
                                return (
                                    <td onDoubleClick={() =>{setIsEditing(index + j.name)}} key={'text' + j.name + index} style={{ border: '2px solid #E8E8E8' }}>
                                    {!!j?.editable && isEditing === index + j.name ? // 수정 가능
                                        <input 
                                            key={'input' + j.name + index}
                                            style={{
                                                width: '90%',      /* 입력 필드의 너비를 100%로 설정 */
                                                boxSizing: 'border-box', /* border와 padding이 width에 포함되도록 설정 */
                                                padding: 0,     /* 적당한 padding 설정 */
                                                margin: 0        /* margin을 0으로 설정 */
                                            }} 
                                            type={j.type}
                                            value={e?.[j.name]}
                                            onBlur={()=>handleBlur(index)} 
                                            onKeyDown={(e)=>handleKeyPress(e,index)}
                                            onChange={async(item)=>{
                                               await onChangeSetData(item, index, j );
                                            }} 
                                            autoFocus // 자동으로 포커스 잡아줌
                                        />
                                        :
                                        <>{textValue}</>
                                    }
                                    </td>
                                )
                            }
                            if(j.type === 'button') {
                                return (
                                    <td key={'btn' + j.name + index} style={{ border: '2px solid #E8E8E8' }}>
                                        <button
                                            type="button" 
                                            disabled={j.modifyDisabled && handleDisabled(e, index)}
                                            onClick={()=> {
                                                j.onClick({targetData:e, targetOldData : [...props.dataList][index]})
                                            }}>
                                                {e?.[j.name]}
                                            </button>
                                    </td>
                                )
                            }
                            if(j.type === 'link') {
                                return (
                                    <td key={'link' + j.name + index} style={{ border: '2px solid #E8E8E8'}}>
                                        <PBtn
                                            style={{fontSize:'0.8rem', textDecoration: 'underline' }}
                                            labelText={j.labelText}
                                            onClick={()=>{window.open(`https://trace.cjlogistics.com/next/tracking.html?wblNo=${e?.[j.name]}`, '_blank')}}
                                        >
                                        </PBtn>
                                    </td>
                                )
                            }

                            if(j.type === 'dropDown') {
                                return (
                                    <td key={'dropDown' + j.name + index} style={{ border: '2px solid #E8E8E8'}}>
                                        <select  
                                            value={e?.[j.name]}
                                            onChange={async(item)=>{
                                                completeModify(index); // 수정완료시
                                                await onChangeSetData(item, index, j);
                                            }}
                                        >
                                            {j.list.map(item => (
                                                <option key={'dropDown' + j.name + index + item.value} value={item.value}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                )
                            }

                            if(j.type === 'checkDropDown') {
                                return (
                                        
                                            <td key={'checkDropDowntd1' + j.name + index} style={checkDropDownOpen ===  j.name + index ? { position:'relative'} : { border: '2px solid #E8E8E8'}}>
                                                {checkDropDownOpen ===  j.name + index ? 
                                                    <ul style={{ 
                                                        position: 'absolute', 
                                                        width: '100%', 
                                                        top:0,
                                                        left:0,
                                                        margin:0, 
                                                        padding:0, 
                                                        listStyleType: 'none', 
                                                        backgroundColor:'white'
                                                    }}>
                                                        <div style={{width:'100%', height:'100%',boxSizing: 'border-box', border: '2px solid #E8E8E8'}}>
                                                            <PBtn 
                                                                className='pBtnNoHover'
                                                                style={{fontSize:'1rem', padding: 0, margin:0, textAlign:'right',  borderBottom:'2px solid #E8E8E8'}} 
                                                                labelText={'∧'} 
                                                                onClick={()=>{
                                                                    setCheckDropDownOpen('');
                                                                }}>
                                                            </PBtn>
                                                            {j.list.map(option => (
                                                                <li key={'checkDropDownLi' + j.name + index + option.value} style={{textAlign:'left'}}>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            value={option.value}
                                                                            checked={e?.[j.name].split('|').includes(option.value)}
                                                                            onChange={(item)=>{
                                                                                const { value, checked } = item.target;
                                                                                let result = checkDropDownOnChange(value, checked, e?.[j.name], j.list);
                                                                                let dataItem = [...data]
                                                                                dataItem[index][j.name] = result
                                                                                completeModify(index); // 수정완료시
                                                                                setData(dataItem)  
                                                                            }}
                                                                        />
                                                                        {option.name}
                                                                    </label>
                                                                </li>
                                                            ))}
                                                        </div>
                                                    </ul>
                                                    :
                                                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                                                        <span key={'checkDropDownspan' + j.name + index} style={{width:'100%'}}>{e?.[j.name].replaceAll('|', ', ')}</span>
                                                        <PBtn 
                                                            key={'checkDropDownPBtn' + j.name + index}
                                                            className='pBtnNoHover'
                                                            style={{fontSize:'1rem', padding:0, margin:0}} 
                                                            labelText={'∨'} 
                                                            onClick={()=>{
                                                                setCheckDropDownOpen(j.name + index);
                                                            }}>
                                                        </PBtn> 
                                                    </div>
                                                }
                                            </td>
                                )
                            }
                            // j.type이 'text'나 'input' 이외의 경우에 대한 처리
                            return <td key={'default' + [j.name] + index}>N/A</td>;
                        })}
                    </tr>
                )
            })
            
        )                                
        
    }

    // 푸터
    const setFooter = () => {
        if(! props.footer) {
            return <></>
        }

        let columnList = [...props.columnList] || []

        let footerItem = {}
        
        for(let i=0; i<data.length; i++) {
            for(let j=0; j<columnList.length; j++) {
                let columnName = columnList[j]['name']
                if(!!columnList[j].footer) {
                    footerItem[columnName] = Number(footerItem[columnName] || 0) + Number(data[i][columnName] || 0)
                }
                else {
                    footerItem[columnName] = '' 
                }
           }
        }

        return (
            <tfoot style={{position:'relative', backgroundColor:'#F3E2A9',width:'100%', height: '4%' 
            , borderRight:'2px solid #E1E1E1', borderLeft:'2px solid #E1E1E1', borderBottom:'2px solid #E1E1E1', fontSize:'0.8rem'}}>
                <tr>
                    <th key={'fth' + 0} style={{ border: '2px solid #E8E8E8'}}>합계</th>
                {columnList.map((e, index) => 
                    <th key={'fth' + (index + 1)} style={{ border: '2px solid #E8E8E8'}}>{footerItem[e.name]}</th>
                )}
                </tr>
            </tfoot>
        )
    }

    return (
        <>
            <div style={{position:'relative', backgroundColor:'white',width:'100%', height:'3%'}}></div> {/* XBTSearchFrame 사이 */}

            <div  
                style={{
                    position:'relative', 
                    backgroundColor:'#FAFAFA',
                    width:'100%', 
                    height:'84%' , 
                    borderRight:'2px solid #E1E1E1', 
                    borderLeft:'2px solid #E1E1E1', 
                    borderBottom:'2px solid #E1E1E1', 
                    borderTop:'2px solid black', 
                    fontSize:'0.8rem',
                    overflow: 'auto'
                }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#F4F4F4'}}>
                        {setColumns()}
                    </thead>
                    <tbody  style={{ backgroundColor: 'white'}}>
                        {setTable()}
                    </tbody>
                    {setFooter()}
                </table>
            </div>
    </>
    )
}