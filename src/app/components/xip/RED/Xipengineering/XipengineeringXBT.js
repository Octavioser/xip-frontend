import React, {useState, useEffect} from 'react';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale'; // 한국어 변환

export const XBTDatePicker = (props) => {

    const [startDate, setStartDate] = useState('');

    return (
        <>
            <p style={{margin:'10px',fontSize:'0.8rem', fontWeight:'600'}}>{props.labelText}</p>
            <DatePicker
                className={props?.required && "requiredDatepicker"}
                selected={startDate}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                minDate={new Date('2023-10-01')}
                onChange={(date) => {
                    setStartDate(date)
                    date.setHours(date.getHours() + 9); // 9시간 더하기
                    props.onChange(date.toISOString().substring(0,10).replace(/-/g,''))
                }}
            />
        </>
    );
}

export const XBTTextField = (props) => {

    const [text, setText] = useState(['']);

    return (
        <>
            <p style={{margin:'10px',fontSize:'0.8rem', fontWeight:'600'}}>{props.labelText}</p>
            <input 
                style={{margin:'10px'}}
                type="text" 
                value={text} 
                onChange={(e)=>{
                    setText(e.target.value)
                    props.onChange(e.target.value)
                }} 
            />
        </>
    )
}


export const XBTSearchFrame = (props) => {

    return (
        <>
            <div style={{position:'relative', width:'100%' ,height:'3%', textAlign:'center'}}></div>

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

    const [dataList, setDataList] = useState([])

    useEffect(()=>{
        setDataList([...props.dataList])
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
            let datastr = [...dataList]
            let oldList = [...props.dataList]
            datastr[index][j.name] = e.target.value
            setDataList(datastr)  
            return({
                oldData : oldList,
                newData : dataList,
                column: j.name,
                targetData : datastr[index],
                targetOldData : oldList[index]
            });
        }
        return (
            dataList.map((e, index) => { 
                return (
                    <tr key={'dtr' + index}>
                        <td key={'dtd' + index} style={{ border: '2px solid #E8E8E8' }}>{index + 1}</td>
                        {columnList.map((j) => {  // 1개 로우 데이터 만들기
                            if(j.type === 'text') {
                                return (
                                    <td key={'text' + [j.name] + index} style={{ border: '2px solid #E8E8E8' }}>{dataList[index]?.[j.name]}</td>
                                )
                            }
                            if(j.type === 'input') {
                                return (
                                    <td key={'inputtd' + [j.name] + index} style={{ border: '2px solid #E8E8E8' }}>
                                        <input 
                                            key={'input' + [j.name] + index}
                                            style={{
                                                width: '100%',      /* 입력 필드의 너비를 100%로 설정 */
                                                boxSizing: 'border-box', /* border와 padding이 width에 포함되도록 설정 */
                                                padding: 0,     /* 적당한 padding 설정 */
                                                margin: 0        /* margin을 0으로 설정 */
                                            }} 
                                            type="text" 
                                            value={dataList[index]?.[j.name]} 
                                            onChange={async(item)=>{
                                                props.onChange(await onChangeSetData(item, index, j))
                                            }} 
                                        />
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

    return (
        <>
            <div style={{position:'relative', backgroundColor:'white',width:'100%', height:'3%'}}></div>
                <div  style={{position:'relative', backgroundColor:'#FAFAFA',width:'100%', height:'87%' 
                            , borderRight:'2px solid #E1E1E1', borderLeft:'2px solid #E1E1E1', borderBottom:'2px solid #E1E1E1', borderTop:'2px solid black', fontSize:'0.8rem'}}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#F4F4F4'}}>
                        {setColumns()}
                    </thead>
                    <tbody  style={{ backgroundColor: 'white'}}>
                        {setTable()}
                    </tbody>
                </table>
            </div>
        </>
    )
}