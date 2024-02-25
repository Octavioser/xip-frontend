import React, {useState} from 'react';

const XIP3020ImageUpload = (props) => {

    const [forms, setForms] = useState([]);

    const addForm = () => {
        let index = forms.length + 2
        const newForm = (
            <div key={index + 'form'} style={{display: 'flex', width:'100%', borderBottom:'2px solid #E1E1E1', alignItems:'center'}}>
                <p key={index + 'p'} style={{width:'30%'}}>{'사진 ' + index}</p>
                <input style={{width:'50%', border: '1px solid black'}} type="file" name={'image' + index} accept="image/*" onChange={insertImage} />
            </div>
        );
        setForms([...forms, newForm]);
    };

    const deleteForm = () => {
        if(forms.length > 0) {
            let item = [...forms]
            let name = 'image'  + (forms.length + 1)
            item.pop()
            setForms([...item])
            props.filedelete(name)
        }
    };

    const insertImage = (e) => {
        props.handleFileChange(e)
    }

    return (
        <div style={{width:'50%', borderRight:'2px solid #E1E1E1',overflow: 'auto'}}>
            <h2>{'메인 이미지 ex) gif '}</h2>
            <div>
                <input type="file" name="image0" accept="image/*" onChange={insertImage} />
            </div>
            <h2>{'제품 상세 이미지 ex) webp'}</h2>
            <button style={{marginRight:10, marginBottom: 20}}onClick={addForm}>Add Form</button>
            <button style={{marginLeft:10, marginBottom:20}} onClick={deleteForm}>Delete Form</button>
            <div style={{display: 'flex', width:'100%', borderTop:'2px solid #E1E1E1', borderBottom:'2px solid #E1E1E1', alignItems:'center'}}>
                <p style={{width:'30%'}}> 사진 1</p>
                <input style={{width:'50%', border: '1px solid black'}} type="file" name="image1" accept="image/*" onChange={insertImage} />
            </div>
            {forms}
        </div>
    )
}
export default XIP3020ImageUpload;