import React, {useState, useMemo} from 'react';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';

import {XIP1010, XIP2010, XIP2020, XIP2030, XIP2040, XIP2050, XIP3010, XIP3020, XIP3030} from 'app/components/xip/RED/Xipengineering';

const XipengineeringMenu = () => {

    const [category, setCategory] = useState('');

    const [title, setTitle] = useState('');

    let list = 
            [
                {key:'XIP1010', name:'회원'},
                {key:'XIP2010', name:'주문내역'},
                {key:'XIP2020', name:'운송장등록'},
                {key:'XIP2030', name:'발송완료'},
                {key:'XIP2040', name:'주문취소'},
                {key:'XIP2050', name:'취소내역'},
                {key:'XIP3010', name:'재고관리'},
                {key:'XIP3020', name:'제품상태'},
                {key:'XIP3030', name:'제품등록'}
            ]

    const categoryColumns = () => {
        
        return (
            list.map((e, index) => 
                <PBtn 
                    id={index}
                    key={index}
                    className= 'pBtnNoRed'
                    style={{border: '2px solid #E8E8E8', fontSize: '0.9rem', backgroundColor:'white', padding: '7px', margin:'3px', borderRadius:'10px', fontWeight:'600'}}
                    labelText={e.name}
                    alt={e.name}
                    onClick={() =>{
                        setCategory(e.key)
                        setTitle(e.name + '(' + e.key + ')')
                    }}
                >
                </PBtn>
            )
        )
    }


    const timeValue = useMemo(() =>{ 
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth();
        let d = date.getDate();
        let startMonth = new Date(y, m , 1)
        let endMonth = new Date(y, m + 1, 0)
        let beforeMonth = new Date(y, m - 1, d)

        const dateStrType = (date) => {
            return (
                date.getFullYear().toString() + 
                (date.getMonth() + 1).toString().padStart(2, '0') + 
                date.getDate().toString().padStart(2, '0')
            )
        }

        return {
            startDate : dateStrType(startMonth),
            endDate : dateStrType(endMonth),
            today : dateStrType(date),
            beforeMonth: dateStrType(beforeMonth)
        }
    },[])

    

    return(
        <>
            <div style={{position:'relative', width:'100%', height:'10%', borderBottom:'3px solid #E1E1E1'}}>
                <h2 style={{position:'absolute', margin:0, padding:0, bottom:5, left:40}}>{title}</h2>
                <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/xipengineering/main/email_icon.webp'} 
                    className='imgBtnNoRed'
                    alt='email'
                    style={{position:'absolute', margin:0, padding:0, bottom:5, right:40, width:'50px'}}
                    onClick={() =>{
                        window.open('https://pix.awsapps.com/mail', '_blank') 
                    }}
                ></ImgBtn>
            </div>
            <div style={{position:'relative', width:'100%', height:'4%'}}></div>
            <div style={{position:'relative', width:'100%', height:'83%', display: 'flex'}}>

                <div style={{position:'relative', width:'10%' ,height:'100%' }}>
                    {/* 왼쪽 목록 */}
                    <div style={{position:'relative', backgroundColor:'#FAFAFA', width:'100%' ,height:'100%', textAlign:'center'
                                , borderRight:'2px solid #E1E1E1', borderLeft:'2px solid #E1E1E1', borderBottom:'2px solid #E1E1E1', borderTop:'2px solid black'}}>
                        <div style={{position:'relative', width:'100%', height:'5px'}}></div>
                        {categoryColumns()}
                    </div>
                    
                </div>

                <div style={{position:'relative', width:'1%' ,height:'100%'}}></div>{/* 목록 과 조회사이빈칸 */}
                
                <div style={{position:'relative', width:'88%' ,height:'100%', textAlign:'center'}}>
                    {/* 오른쪽  */}
                    {category === 'XIP1010' && <XIP1010 date={timeValue}/>}
                    {category === 'XIP2010' && <XIP2010 date={timeValue}/>}
                    {category === 'XIP2020' && <XIP2020 date={timeValue}/>}
                    {category === 'XIP2030' && <XIP2030 date={timeValue}/>}
                    {category === 'XIP2040' && <XIP2040 date={timeValue}/>}
                    {category === 'XIP2050' && <XIP2050 date={timeValue}/>}
                    {category === 'XIP3010' && <XIP3010 date={timeValue}/>}
                    {category === 'XIP3020' && <XIP3020 date={timeValue}/>}
                    {category === 'XIP3030' && <XIP3030 date={timeValue}/>}
                </div>
            </div>
            <div style={{position:'relative', width:'100%' ,height:'3%'}}></div>{/* 맨밑빈칸 */}
        </>
    )
} 
export default XipengineeringMenu;