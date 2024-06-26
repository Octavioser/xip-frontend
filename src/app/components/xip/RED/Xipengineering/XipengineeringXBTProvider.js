import {useCallback, useMemo} from 'react';
import {DataGrid, SearchFrame, DateSearch, DropDown, TextField} from './XipengineeringXBT'


export const XBTDropDown = ({labelText, value, list, onChange}) => {
    return (
        <DropDown
            labelText={labelText}
            list={list}
            value={value}
            onChange={onChange}
        />
    )
}


export const XBTDatePicker = ({labelText, required, onChange, value}) => {
    return (
        <DateSearch
            required={required}
            labelText={labelText}
            value={value}
            onChange={onChange}
        />
    )
}

export const XBTTextField = ({labelText, value, onChange}) => {

    return (
        <TextField
            labelText={labelText}
            value={value}
            onChange={onChange}
        />
    )
}


export const XBTSearchFrame = ({children, onClick}) => {

    return (
        <SearchFrame
            onClick={onClick}
        >
            {children}
        </SearchFrame>
    )
}

export const XBTDataGrid = ({columnList, dataList, footer, onClick}) => {
    const columnListData = useMemo(() => { 
        return columnList;
        /* eslint-disable */
    },[columnList]);

    const dataListData = useMemo(() => { // 그리드 데이터가 바뀔시에만 렌더링
        return dataList;
    },[dataList]);

    const footerData = useMemo(() => {
        return footer;
        /* eslint-disable */
    },[]);

    const clickBtn = useCallback((e)=>{
        return onClick(e);
    },[])

    return (
        <DataGrid
            footer = {footerData}
            columnList={columnListData}
            dataList={dataListData}
            onClick={!!onClick ? clickBtn : false}
        >
        </DataGrid>
    )
}