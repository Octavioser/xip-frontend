import React, {useState} from 'react';


const XIP3020ProdCode = (props) => {

    const [desc, setDesc] = useState([]);

    const addDesc = () => {
        if(desc.length > 8) {
            alert('상품 설명은 10개까지 만들 수 있습니다. (prodDescD0 포함)')
            return;
        }
        let item = 'prodDescD' + (desc.length + 1);
        setDesc([...desc, item]);
    }

    const deletDesc = () => {
        if(desc.length > 0) {
            // 현재 state 값 지우기
            let descItem = [...desc]
            descItem.pop()
            setDesc(descItem)

            // 상위 저장한 값 지우기
            let item = props.prodItem
            delete item['prodDescD' + desc.length];
            props.setProdItem({...item})
        }
    }
        

    let itemColumns = [
        {
            name:'line', 
            type: 'dropDown',
            list: [
                {name:'', value:''},
                {name:'XIP Mainline', value:'XM'},
                {name:'XIPro', value:'XP'},
                {name:'Xskin', value:'XS'},
                {name:'Cue choi', value:'CC'},
                {name:'Jun Valentine', value:'JV'}
            ]
        },
        {
            name:'sex', 
            type:'dropDown',
            list: [
                {name:'', value:''},
                {name:'Homme', value:'H'},
                {name:'Femme', value:'F'},
                {name:'Unisex', value:'U'}
            ]
        },
        {name:'year', type:'number',description: '2글자 ex) 24 25', maxLength:2},
        {
            name:'season', 
            type:'dropDown',
            list: [
                {name:'', value:''},
                {name:'Spring Summer', value:'S'},
                {name:'Fall Winter', value:'F'}
            ]
        },
        {
            name:'item', 
            type:'dropDown',
            list: [
                {name:'', value:''},
                {name:'Jacket', value:'J'},
                {name:'Coat', value:'C'},
                {name:'Vest', value:'V'},
                {name:'Tshirts', value:'T'},
                {name:'Overall/Dress', value:'O'},
                {name:'Skirt', value:'S'},
                {name:'Pants', value:'P'},
                {name:'Shirt', value:'Y'},
                {name:'Knit', value:'K'},
                {name:'Bag/Pouch', value:'B'},
                {name:'Accessory', value:'A'}
            ]
        },
        {
            name:'size', 
            type:'',
            list: [
                {name:'XS', index:0},
                {name:'S', index:1},
                {name:'M', index:2},
                {name:'L', index:3},
                {name:'XL', index:4},
                {name:'One Size', index:5}
            ]
        },
        {name:'itemCode', type:'number', description: '2글자 ex)01, 09, 78', maxLength:2},
        {name:'textile', type:'text', description: ' 2글자 ex)NT', maxLength:2, UpperCase:true},
        {
            name:'colorCode', 
            type:'dropDown',
            list: [
                {name:'', value:''},
                {name:'Red', value:'00'},
                {name:'Orange', value:'01'},
                {name:'Yellow', value:'02'},
                {name:'Green', value:'03'},
                {name:'Blue', value:'04'},
                {name:'Purple', value:'05'},
                {name:'Gray', value:'06'},
                {name:'White', value:'07'},
                {name:'Black', value:'08'},
                {name:'Metallic/Others', value:'09'},
            ]
        },
        {name:'name', type:'text', description: '제품이름', maxLength:30},
        {name:'price', type:'number', description: '원화가격', maxLength:10},
        {name:'usPrice', type:'number', description: '달러가격', maxLength:10},
        {
            name:'status', 
            type:'dropDown',
            list: [
                {name:'', value:''},
                {name:'판매중단', value:'-1'},
                {name:'판매전', value:'0'},
                {name:'판매중', value:'1'},
                {name:'판매완료', value:'2'},
                {name:'프리오더', value:'3'},
            ]
        },
        {name:'total', type:'number',description: '사이즈당 수량(사이드마다 다르면 재고관리에서 수정)', maxLength:4},
        {name:'prodDesc', type:'text', description: '한줄설명 ex) ZIP-UP VEST IN BLACK', maxLength:50},
        {name:'prodDesc1', type:'text', description: '한줄설명 ex) ZIP-UP VEST IN BLACK', maxLength:50},
        {name:'prodDescD0', type:'text', description: '상품 설명 1 ex) 100% NYLON', maxLength:50},
    ]

    const itemSetting = () => {
        return(
            <>
                {itemColumns.map(e =>
                    <div 
                        key={e.name + 'div1'}
                        style={{
                            display:'flex', 
                            alignItems: 'center', 
                            width:'100%', 
                            borderBottom:'2px solid #E1E1E1'
                        }}
                        >
                        <p key={e.name + 'p1'} style={{width:'10%'}}/>
                        <p key={e.name + 'p2'} style={{width:'20%'}}>{e.name}</p>
                        <p key={e.name + 'p3'} style={{width:'10%'}}/>

                        {(e.type === 'text' || e.type === 'number')&& 
                            <input 
                                key={e.name + 'text'}
                                id={e.name}
                                type='text'
                                name={e.name}
                                value={props.prodItem?.[e.name] || ''}
                                maxLength={e.maxLength}
                                onChange={(e2)=>{  
                                    if(!!e.UpperCase) {
                                        props.setProdItem({...props.prodItem, [e.name] : e2.target.value.toUpperCase().replace(/[^A-Za-z0-9 !@#$%^&*()_+\-=[]{};':"|,.<>?]/g, '')})
                                    }
                                    else if (e.type === 'number') {
                                        props.setProdItem({...props.prodItem, [e.name] : e2.target.value.replace(/[^-0-9]/g, '')})
                                    }
                                    else {
                                        props.setProdItem({...props.prodItem, [e.name] : e2.target.value.replace(/[^A-Za-z0-9 !@#$%^&*()_+\-=[]{};':"|,.<>?]/g, '')})
                                    }
                                    
                                }}
                            >

                            </input>
                        }
                        {e.type === 'dropDown' &&
                            <select  
                                key={e.name + 'dropDown'}
                                    style={{ width: '15%'}}
                                    value={props.prodItem?.[e.name] || ''}
                                    onChange={(e2)=>{
                                        props.setProdItem({...props.prodItem, [e.name] : e2.target.value})
                                    }}
                                >
                                    {(e.list).map(item => 
                                        <option key={item.name} value={item.value}>
                                            {item.name}
                                        </option>
                                    )}
                            </select>
                        }
                        {e.name === 'size' &&
                            <>
                            {(e.list).map(item => 
                                <label key={item.name + 'label'}>
                                    <input
                                        type="checkbox"
                                        value={item.name}
                                        checked={(props.prodItem?.[e.name]?.[item.index]) === 1}
                                        onChange={() => {
                                            if(item.index === 5) {
                                                let oneSize = props.prodItem?.[e.name][5]
                                                let sizeItem = [0,0,0,0,0,0]
                                                oneSize === 0 ? (sizeItem[5] = 1) : (sizeItem[5] = 0)
                                                props.setProdItem({...props.prodItem, [e.name]:sizeItem})
                                            }
                                            else {
                                                let sizeItem = props.prodItem?.[e.name]
                                                sizeItem[item.index] = sizeItem[item.index]  === 0 ? 1 : 0
                                                sizeItem[5] = 0
                                                props.setProdItem({...props.prodItem, [e.name]:sizeItem})
                                            }
                                        }}
                                    />
                                    {item.name}
                            </label>
                          )}
                          </>
                        }
                        <p  key={e.name + 'p4'} style={{width:'30%'}}>{e.description || ''}</p>
                    </div>
                )}
            </>
        )
    }
    return (
        <div style={{width:'50%', borderRight:'2px solid #E1E1E1',overflow: 'auto'}}>
            {itemSetting()}
            <div 
                key={'prodDetailAdddiv1'}
                style={{
                    display:'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width:'100%', 
                    borderBottom:'2px solid #E1E1E1'
                }}
                >
                <button style={{marginRight:10}} onClick={addDesc}>ADD DESC</button>
                <button style={{marginLeft:10}} onClick={deletDesc}>DELETE DESC</button>
            </div>
            {desc.map(name => 
                <div 
                    key={name}
                    style={{
                        display:'flex', 
                        alignItems: 'center', 
                        width:'100%', 
                        borderBottom:'2px solid #E1E1E1'
                    }}
                    >
                    <p key={name + 'p1'} style={{width:'10%'}}/>
                    <p key={name + 'p2'} style={{width:'20%'}}>{name}</p>
                    <p key={name + 'p3'} style={{width:'10%'}}/>
                    <input 
                        key={name + 'text'}
                        type='text'
                        name={name}
                        value={props.prodItem?.[name] || ''}
                        maxLength={50}
                        onChange={(e2)=>{  
                            props.setProdItem({...props.prodItem, [name] : e2.target.value.replace(/[^A-Za-z0-9 !@#$%^&*()_+\-=[]{};':"|,.<>?]/g, '')})
                        }}
                    >
                    </input>
                </div>
            )

            }
        </div>
    )
}
export default XIP3020ProdCode;