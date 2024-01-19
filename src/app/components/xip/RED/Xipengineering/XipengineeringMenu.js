import React, {useState, useEffect} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import UserInfo from './Menu/UserInfo'

const XipengineeringMenu = () => {

    const [category, setCategory] = useState('');

    const [title, setTitle] = useState('테스트');

    const categoryColumns = () => {
        let list = [{key:'user', name:'회원'}]
        return (
            list.map((e, index) => 
                <PBtn 
                    id={index}
                    key={index}
                    className= 'pBtnNoRed'
                    style={{border: '2px solid #E8E8E8', fontSize: '1rem', backgroundColor:'white', padding: '7px', borderRadius:'10px'}}
                    labelText={e.name}
                    alt={e.name}
                    onClick={() =>{
                        setCategory(e.key)
                        setTitle(e.name)
                    }}
                >
                </PBtn>
            )
        )
    }

    return(
        <>
            <div style={{position:'relative', width:'100%', height:'10%', borderBottom:'3px solid #E1E1E1', backgroundColor:'#FA0000'}}>
                <h2 style={{position:'absolute', margin:0, padding:0, bottom:5, left:5}}>{title}</h2>
            </div>
            <div style={{position:'relative', width:'100%', height:'2%'}}></div>
            <div style={{position:'relative', width:'100%', height:'88%', display: 'flex'}}>

                <div style={{position:'relative', width:'10%' ,height:'100%' }}>
                    {/* 왼쪽 목록 */}
                    <div style={{position:'relative', width:'100%', height:'3%'}}></div>
                    <div style={{position:'relative', backgroundColor:'#FAFAFA', width:'100%' ,height:'97%', textAlign:'center'
                                , borderRight:'2px solid #E1E1E1', borderLeft:'2px solid #E1E1E1', borderBottom:'2px solid #E1E1E1', borderTop:'2px solid black'}}>
                        <div style={{position:'relative', width:'100%', height:'5px'}}></div>
                        {categoryColumns()}
                    </div>
                    
                </div>

                <div style={{position:'relative', width:'1%' ,height:'100%'}}></div>
                
                <div style={{position:'relative', width:'88%' ,height:'100%', textAlign:'center'}}>
                    {/* 오른쪽  */}
                    {category === 'user' && <UserInfo/>}
                </div>
            </div>
        </>
    )
} 
export default XipengineeringMenu;