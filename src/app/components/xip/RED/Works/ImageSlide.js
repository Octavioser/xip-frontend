import React, { useRef, useState, useEffect } from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';

const bucketName = 'xip-bucket';
const folderName = 'xItem/i/works/image/fetus/';

// 정보
const ImageSlide = (props) => {
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
        const s3 = props.s3

        const params = {
            Bucket: bucketName,
            Prefix: folderName,
            Delimiter: '/',
        };
        
        s3.listObjectsV2(params).promise().then((e)=>{
            try {
                s3.listObjectsV2(params).promise().then((e)=>{
                    setImageList(e.Contents);
                });  // 폴더 전체 이미지 갖고오기
                
            } catch (error) {
                console.error(error);
            }
        })
    }, [props.s3]);

    const setImg = () => {
        const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';
        let list = []
        const imageWidth = isMobile ? '30vw' : '20vw'
        console.log(imageList)
        for(let i=0; i<imageList.length; i++) {
            if(i % 3 === 0) {
                list = 
                list.concat([
                    <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "0.5vh" }}>
                            <img style={{ width: imageWidth }} src={awsUrl + imageList[i].Key} alt={i} />
                        </div>
                        <div style={{ marginRight: "0.5vh" }}>
                            <img style={{ width: imageWidth }} src={awsUrl + imageList[i + 1].Key} alt={i + 1} />
                        </div>
                        <div>
                            <img style={{ width: imageWidth }} src={awsUrl + imageList[i + 2].Key} alt={i + 2} />
                        </div>
                    </div>
                ]) 
            }
        }
        
        return (list)
    }
    const divImageWidth = isMobile ? '45vw' : '20vw'
    return (    
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center', minHeight: '85vh'}}>
                <div>
                <div style={{width: divImageWidth, height: isMobile ? '18vh' : '10vh'}}>  
                </div>
                    {setImg()}
                </div>
            </div>
    );
};

export default ImageSlide;
