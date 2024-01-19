import React, {useState, useEffect} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {useCookie} from 'app/components/xip/RED/Login/Cookie';
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import {XBTDataGrid, XBTSearchFrame, XBTTextField} from '../XipengineeringXBT'

const UserInfo = () => {

    const [changeList, setChangeList] = useState([])

    let columnList = [  {name:'firstNm', header:'이름', type: 'text'},
                            {name:'lastNm', header:'성', type: 'text'},
                            {name:'email', header:'이메일', type: 'text'},
                            {name:'creatDt', header:'가입일시', type: 'text'},
                            {name:'nickNm', header:'별명', type: 'input'}]
    let dataList = [{firstNm:'lim', lastNm:'hyusuk', email:'limtotal@xip.red', creatDt:'20230101', nickNm:'111'},
                    {firstNm:'이창민', lastNm:'개새끼', email:'gaeseki@xip.red', creatDt:'20231001', nickNm:''},
                    {firstNm:'쥐', lastNm:'강', email:'injungson@xip.red', creatDt:'20240101', nickNm:''}]    
                    

    return (
        <>
            <XBTSearchFrame>
                <XBTTextField
                    labelText={'이름'}
                    onChange={(e) => {
                        console.log(e)
                    }}
                />
            </XBTSearchFrame>
            <XBTDataGrid
                columnList={columnList}
                dataList={dataList}
                onChange= {(e) => {
                    console.log(e)
                }}
            >
            </XBTDataGrid>
        </>
    )
}
export default UserInfo;