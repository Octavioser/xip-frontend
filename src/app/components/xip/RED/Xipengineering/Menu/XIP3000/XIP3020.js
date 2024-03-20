import React, {useState, useEffect} from 'react';
import {useCommon} from 'app/components/xip/REDCommon/Common'
import {PBtn} from 'app/components/xip/REDCommon/CommonStyle';
import XIP3020ProdCode from './XIP3020ProdCode';
import XIP3020ImageUpload from './XIP3020ImageUpload';

const XIP3020 = () => {

    const { commonShowLoading, commonHideLoading, commonApi, commonConfirm} = useCommon();

    const [prodItem, setProdItem] = useState({size:[0,0,0,0,0,0]});     
    // 각 파일 입력 필드의 파일을 객체로 관리
    const [base64File, setBase64File] = useState({});


    const apiList = {
        insertProdItem: {
            api: '/xipengineering/incuC101',
            param: (param, base64Img) => {
                return (
                    {
                        ...param,
                        img:base64Img
                    }
                )
            }
        },
    }

    useEffect(() => {
        // 상태가 업데이트되고 나서 실행할 코드
        commonHideLoading();
    }, [base64File, commonHideLoading]); 

    // 이미지 업로드
    const handleFileChange = (event) => {
        commonShowLoading();
        const { name, files } = event.target;
        const file = files[0]; // 첫 번째 파일을 선택\
        if(name === 'image0') {
            if (file.type !== 'image/gif') {
                let item = {...base64File}
                delete item[name]
                setBase64File({...item})

                alert('gif 확장자로 변환 후 올려주세요.');
                event.target.value = ''; 
                return;
            }
        }
        else if (file.type !== 'image/webp') {
            let item = {...base64File}
            delete item[name]
            setBase64File({...item})

            alert('webp 확장자로 변환 후 올려주세요.');
            event.target.value = ''; 
            return;
        } 

        if (file) {
            readFileAsDataURL(file).then(base64String  =>{
                setBase64File(base64File => ({...base64File, [name]: base64String })); // Base64 문자열을 상태에 저장
            })
            .catch(error => {
                console.error('파일 읽기 오류', error);
                commonHideLoading();
            });
        }
    };

    // base64로 이미지 바꾸기
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                resolve(reader.result);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
    
            reader.readAsDataURL(file);
        });
    }

    const filedelete = (name) => {
        let item = {...base64File}
        if(item[name]) {
            delete item[name]
            setBase64File({...item})
        }
    };

    const validateField = (field, message, length = true) => {
        if (!field || !length) {
            alert(message);
            return false;
        }
        return true;
    }
    // api 호출
    const insertProd= async() => {
        try{
            await commonShowLoading();

            let product = JSON.parse(JSON.stringify(prodItem))

            let imgItem = JSON.parse(JSON.stringify(base64File))

            if (!validateField(product.line, 'line을 입력하세요')) return;
            if (!validateField(product.sex, 'sex를 입력하세요')) return;
            if (!validateField(product.year, 'year를 올바르게 입력하세요', product.year.length === 2)) return;
            if (!validateField(product.season, 'season을 입력하세요')) return;
            if (!validateField(product.item, 'item을 입력하세요')) return;
            if (!validateField(product.itemCode, 'itemCode를 입력하세요', product.itemCode.length === 2)) return;
            if (!validateField(product.textile, 'textile을 입력하세요', product.textile.length === 2)) return;
            if (!validateField(product.colorCode, 'colorCode를 입력하세요')) return;
            if (!validateField(product.name, 'name을 입력하세요')) return;
            if (!validateField(product.price, 'price를 입력하세요')) return;
            if (!validateField(product.usPrice, 'usPrice를 입력하세요')) return;
            if (!validateField(product.status, 'status를 입력하세요')) return;
            if (!validateField(product.total, 'total를 입력하세요')) return;
            if (!validateField(product.prodDesc, 'prodDesc를 입력하세요')) return;
            if (!validateField(product.prodDescD0, 'prodDesc1을 입력하세요')) return;
            
            
            let base64 = Object.keys(imgItem)
            if(base64.length < 2) {
                alert('사진을 올려주세요')
                return;
            }

            let base64Check = false;

            for(let i=0; i<base64.length; i++) {
                if(!(imgItem['image' + i])){
                    base64Check = true
                    alert('사진' + i + ' 올려주세요.')
                    break;
                }
            }

            if(base64Check) {
                return;
            }

            let seasonName = product.year + (product.season === 'S' ? 'SS' : 'FW')
            let sizeCheck = 0;
            let sizeValue = '';
            let prodCdDSize = [];
            let sizeList = {'0':'XS', '1':'S', '2':'M', '3':'L', '4':'XL', '5':'ONE SIZE'}

            product.size.forEach((e, index) => {
                sizeCheck = sizeCheck + e
                if(e > 0) {
                    if(sizeValue === '') {
                        sizeValue = sizeValue + sizeList[index+'']
                    }
                    else {
                        sizeValue = sizeValue + '|' + sizeList[index+'']
                    }
                    prodCdDSize.push({sizeNum:index + '', sizeName:sizeList[index+'']})
                }
            })

            if(sizeCheck < 1) {
                alert('size 입력하세요');
                return;
            }

            let prodDescD = ''

            for(let i = 0; i<10; i++) {
                if(!!(prodItem['prodDescD' + i])) {
                    if(prodDescD === '') {
                        prodDescD = prodDescD + prodItem['prodDescD' + i]
                    }
                    else {
                        prodDescD = prodDescD + '|' + prodItem['prodDescD' + i]
                    }
                }
            }

            let prodCd = (
                product.line + 
                product.sex + 
                product.year + 
                product.season + 
                product.item + 
                product.itemCode +
                product.textile +
                product.colorCode
            );

            let prodCdDFront = (
                product.line + 
                product.sex + 
                product.year + 
                product.season + 
                product.item 
            )
            
            let proCdDBack = product.itemCode + product.textile +product.colorCode

            let totalQty = Number(product.total)

            let prodCdD = []
            
            prodCdDSize.forEach(e => {
                prodCdD.push({
                    prodCdD:(prodCdDFront + e.sizeNum + proCdDBack), 
                    prodSize:e.sizeName,
                    prodCd: prodCd,
                    totalQty: totalQty
                })
            })

            let prodDesc1 = '';

            if(!!(product.prodDesc1)) {
                prodDesc1 = '|' + product.prodDesc1
            }

            let param = {
                prodCd: prodCd,
                name: product.name,
                price: Number(product.price),
                usPrice: Number(product.usPrice),
                sizeOpt: sizeValue,
                status: product.status,
                line: product.line,
                season: seasonName,
                prodDesc: product.prodDesc + prodDesc1,
                prodDescD: prodDescD,

                prodCdD:prodCdD,
            };

            commonConfirm(<><p>제품코드: {param.prodCd}</p>  <p>저장하시겠습니까?</p></>, () => {insertProdApi(param, imgItem)});
        } catch (error) {
                
        } finally {
            commonHideLoading();
        }
    }

    const insertProdApi = async(param, imgItem) => {
        try {
            await commonApi(apiList.insertProdItem.api, apiList.insertProdItem.param(param, imgItem));    
            alert('등록되었습니다.')
        } catch (error) {
            alert('오류입니다. 다시 시도해주세요.')
        }
        
        
    }

    return (
        <>
             <div style={{display:'flex', position:'relative', width:'100%' ,height:'12%', textAlign:'center', border:'3px solid #E1E1E1'}}>
                {/* 검색 창 */}
                
                <div style={{position:'relative', width:'94%' ,height:'100%', textAlign:'center', alignItems: 'center'}}>
                    <p style={{padding:2, margin:2}}>사진은 png 파일을 webp로 변환 후 올리기
                        <a 
                            style={{textDecoration: 'underline', color:'red'}} 
                            href='https://convertio.co/kr/png-webp/'
                            target="_blank" // 새 탭에서 링크를 열도록 설정
                            rel='noopener noreferrer'
                            >
                            사이트
                        </a>
                    </p>
                    <p style={{padding:1, margin:1}}>영어로만 입력하시고  사진은 크기 800 x 1200</p>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',position:'relative', width:'6%' ,height:'100%', textAlign:'center'}}>
                    <PBtn 
                        className= 'pBtnNoRed'
                        style={{ margin: 0, padding: 0, fontSize:'2rem',backgroundColor: '#F4F4F4', border: '2px solid #E8E8E8'}}
                        labelText='저장'
                        alt='저장'
                        onClick={(e) =>{
                            insertProd();
                        }}
                    >
                    </PBtn>
                </div>
            </div>
            <div style={{position:'relative', backgroundColor:'white',width:'100%', height:'3%'}}></div> {/* XBTSearchFrame 사이 */}

            <div  
                style={{
                    display:'flex',
                    position:'relative', 
                    backgroundColor:'#FAFAFA',
                    width:'100%', 
                    height:'84%' , 
                    borderRight:'2px solid #E1E1E1', 
                    borderLeft:'2px solid #E1E1E1', 
                    borderBottom:'2px solid #E1E1E1', 
                    borderTop:'2px solid black', 
                    fontSize:'0.8rem',
                }}>
                <XIP3020ProdCode prodItem={prodItem} setProdItem={setProdItem}/>
                <XIP3020ImageUpload handleFileChange={handleFileChange} filedelete={filedelete}/>
            </div>
        </>
    )
}
export default XIP3020;