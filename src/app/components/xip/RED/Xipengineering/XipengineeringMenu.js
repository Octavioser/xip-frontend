import React, {useState, useMemo, createElement} from 'react';
import {PBtn, ImgBtn} from 'app/components/xip/REDCommon/CommonStyle';

import {XIP1010, XIP2010, XIP2020, XIP2030, XIP2040, XIP2050, XIP3010, XIP3020, XIP3030} from 'app/components/xip/RED/Xipengineering';

const XipengineeringMenu = () => {
    const [category, setCategory] = useState('');

    const [title, setTitle] = useState('');

    const [openTab, setOpenTab] = useState([]);

    // 메뉴 리스트
    let menuList = [{key:'XIP1010', name:'회원', components : XIP1010},
                    {key:'XIP2010', name:'주문내역', components : XIP2010},
                    {key:'XIP2020', name:'운송장등록', components : XIP2020},
                    {key:'XIP2030', name:'발송완료', components : XIP2030},
                    {key:'XIP2040', name:'주문취소', components : XIP2040},
                    {key:'XIP2050', name:'취소내역', components : XIP2050},
                    {key:'XIP3010', name:'재고관리', components : XIP3010},
                    {key:'XIP3020', name:'제품상태', components : XIP3020},
                    {key:'XIP3030', name:'제품등록', components : XIP3030}]

    // 메뉴 선택시 state 저장하는 함수
    const chooseMenu = (key, name) => {
        setCategory(key)
        setTitle(name + '(' + key + ')')
    }

    // 왼쪽 사이드 메뉴 
    const categoryColumns = () => {
        return (
            menuList.map((e, index) => 
                <PBtn 
                    id={index}
                    key={index}
                    className= 'pBtnNoRed'
                    style={{border: '2px solid #E8E8E8', fontSize: '0.9rem', 
                        backgroundColor: category === e.key ? 'white' : '#E8E8E8', 
                        padding: '7px', margin:'3px', borderRadius:'10px', fontWeight:'600'
                    }}
                    labelText={e.name}
                    alt={e.name}
                    onClick={() =>{
                        chooseMenu(e.key, e.name);
                        const exists = openTab.some(obj => obj['key'] === e.key);
                        if(!exists) {
                            setOpenTab(prev => ([
                                ...prev,
                                {'key': e.key, 'name': e.name, components: e.components}
                            ]))
                        }
                    }}
                >
                </PBtn>
            )
        )
    }

    // 시간 props로 넘겨주기위한 데이터
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


    const setTabMenu = () => {
        return (
            <>
            {openTab.map((e,i) => {
                return (
                    <div 
                        key={'tabDiv' + i}
                        style={{
                            display:'flex', 
                            position:'relative', 
                            width:'7%', 
                            height:'60%',
                            alignItems:'center', 
                            justifyContent:'center', 
                            border:  category === e.key ? '2px solid black' : '2px solid #E1E1E1',
                            color: category === e.key ? 'black' : '#E1E1E1', 
                            borderRadius:'10px'
                        }}>
                        <PBtn
                            key={'tabXBtn' + i}
                            style={{position: 'absolute' , right:'0px', top:'0px'}}
                            labelText='x'
                            onClick={()=>{
                                // 해당 메뉴 탭 지우기
                                let data = openTab
                                let item = data.filter((obj) => obj['key'] !== e.key)
                                setOpenTab(item);

                                // 선택된 메뉴를 삭제시 제일 뒤에 있는 메뉴 선택
                                let len = item.length;
                                if(e.key === category && len >0) {
                                    chooseMenu(item[len-1].key, item[len-1].name);
                                }
                            }}
                        >
                        </PBtn>
                        
                        <PBtn
                            key={'tabBtn' + i}
                            className='pBtnNoHover'
                            style={{width:'100%', fontSize:'1rem', fontWeight:'600', textAlign:'center'}}
                            labelText={e.name}
                            onClick={()=>{
                                // 탭 누르면 해당하는 메뉴 보여주기
                                chooseMenu(e.key, e.name);
                            }}
                        >
                        </PBtn>
                    </div>
                )
                }
            )}
            </>
        )
    }

    const ComponentLoader = () => {
    
        return (
            <>
                {openTab.map(item => (
                    <div key={item.key} style={{ width: '100%', height: '100%', display: category === item.key ? 'block' : 'none' }}>
                        {createElement(item.components, { date: timeValue })}
                    </div>
                ))}
            </>
        );
    };
                        

    return(
        <>
            <div style={{display:'flex', justifyContent:'ceter', alignItems:'center', width:'100%', height:'10%', borderBottom:'3px solid #E1E1E1'}}>
                <div style={{width:'1%', height:'100%',display:'flex'}}></div>
                <div style={{width:'12%', height:'100%',display:'flex', justifyContent:'ceter', alignItems:'center'}}>
                    <h2>{title}</h2>
                </div>
                <div style={{display:'flex', alignItems:'center',  width:'77%', height:'100%'}}>
                    {setTabMenu()}
                </div>
                
                <div style={{width:'10%', height:'100%',display:'flex', alignItems:'center'}}>
                    <ImgBtn  //맨 왼쪽 위 메뉴 버튼
                        src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/xipengineering/main/email_icon.webp'} 
                        className='imgBtnNoRed'
                        alt='email'
                        style={{width:'50px', position:'fixed', right:'20px'}}
                        onClick={() =>{
                            window.open('https://pix.awsapps.com/mail', '_blank') 
                        }}
                    >
                    </ImgBtn>
                </div>
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
                    
                {ComponentLoader()}
                </div>
            </div>
            <div style={{position:'relative', width:'100%' ,height:'3%'}}></div>{/* 맨밑빈칸 */}
        </>
    )
} 
export default XipengineeringMenu;