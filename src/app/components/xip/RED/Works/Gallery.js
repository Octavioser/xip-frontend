import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../../REDCommon/CommonStyle';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


const AWS = require('aws-sdk');
// s3 권한
const s3 = new AWS.S3({ // 보안 자격 증명 엑세스 키
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

// 정보
const Gallery = () => {

    const {galleryType} = useParams();
    
    const [selectedImage, setSelectedImage] = useState(0);          // 이미지 슬라이드 index

    const [isOpen, setIsOpen] = useState(false);                    // 이미지 슬라이드 닫기, 열기

    const [galleryList, setGalleryList] = useState([]);             // 이미지 슬라이드 데이터

    const [displayList, setDisplayList] = useState([]);             // 화면에 보여줄 이미지 슬라이드x
    
    const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';
    


    useEffect(() => {
        console.log('갤러리 실행')
        let list = []

        // 이미지 데이터 갖고오기기
        const getData = async () => {       
            const bucketName = 'xip-bucket'; 
            const params = {  // s3 파람
                Bucket: bucketName,
                Prefix: `xItem/i/works/image/${galleryType}/low/`,
                Delimiter: '/',
            };

            const images = await s3.listObjectsV2(params).promise();
            list = images.Contents

            let resultList = []

            // 슬라이드 이미지 파라미터 
            for(let i=0; i<list.length; i++) {
                let url = list[i].Key
                url = url.replace('low', 'high')
                resultList = resultList.concat([
                    {
                        original: awsUrl + url, // 원본 이미지 URL
                        thumbnail: awsUrl + url, // 썸네일 이미지 URL
                    }
                ])
            }

            // 슬라이드 이미지 데이터 state 저장
            setGalleryList (resultList)

            // 이미지 태그 세팅함수
            const setImgTag = (imageWidth, awsUrl, i) => {  // 이미지 태그 반환 함수
                return (
                    <ImgBtn     
                        id={i}
                        style={{ width: imageWidth }} 
                        src={awsUrl + list[i].Key} alt={i}
                        onClick={(event)=>{
                            setSelectedImage(parseInt(event.target.alt));
                            setIsOpen(true) // 슬라이드 열기
                        }}
                    />
                )
            }
            

            // 화면에 뿌려줄 이미지데이터 가공 (슬라이드x)
            const pFolderName = galleryType;
            const imageWidth = isMobile ? '30vw' : '20vw';
            let displaylistData = [];
            for(let i=0; i<list.length; i++) {  // 이미지 3개씩 한줄로 넣어주고 사진팝업 데이터 넣어주기
                // fetus trauma fetusDtail 만 3열로
                if((pFolderName === 'fetus')||(pFolderName === 'trauma')) {
                    if((i % 3 === 0)) {
                        displaylistData = 
                        displaylistData.concat([
                            <div id={i} key={i} style={{ display: "flex" }}>
                                <div id={i} key={i + 'a'} style={{ marginRight: "0.5vh" }}>
                                    {setImgTag(imageWidth, awsUrl, i)}  
                                </div>
                                <div id={i} key={i + 'b'}style={{ marginRight: "0.5vh" }}>
                                    {setImgTag(imageWidth, awsUrl, i+1)}
                                </div>
                                <div id={i} key={i + 'c'}>
                                    {setImgTag(imageWidth, awsUrl, i+2)}
                                </div>
                            </div>
                        ]) 
                    }
                }
                // 3열이 아닌 works
                else {
                    displaylistData = 
                    displaylistData.concat([
                        <div id={i} key={i} style={{ display: "flex", justifyContent: 'center'}}>
                            <div id={i} key={i}style={{ marginRight: "0.5vh" }}>
                                {setImgTag(isMobile ? '70vw' : '35vw', awsUrl, i)}  
                            </div>
                        </div>
                    ]) 
                }
            }
            setDisplayList(displaylistData)
        }
        
        getData()


    },[galleryType]);  // useEffect(() => { },[]) 처음에만 동작


    const arrowSize = isMobile? '5vw' : '2vw' ;

    const arrow  ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/arrowCircle.webp'
    
        
    const  renderLeftNav = ( onClick, disabled ) => { // 왼쪽화살표
        return ([
            <ImgBtn
              src={arrow}
              alt="Custom Left Arrow"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                fontSize: '50px',
                cursor: 'pointer',
                width: arrowSize,
                height: arrowSize,
            }}
              onClick={onClick}
              disabled={disabled}
            />
        ]) 
    }

    const  renderRightNav = ( onClick, disabled ) => {  // 오른쪽화살표
        return ([
            <ImgBtn
              src={arrow}
              alt="Custom Left Arrow"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                fontSize: '30px',
                cursor: 'pointer',
                width: arrowSize,
                height: arrowSize,
            }}
              onClick={onClick}
              disabled={disabled}
            />
        ]) 
    }
    
    const divImageWidth = isMobile ? '45vw' : '20vw'
    return (
        <>
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center', minHeight: '85vh'}}>
                <div>
                <div style={{width: divImageWidth, height: isMobile ? '18vh' : '10vh'}}>  
                </div>
                    {displayList}
                </div>
            </div>
            {isOpen && <div className={'popUp'} style={{ display: isOpen ? 'flex' : 'none' }}>
                <ImgBtn
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/closeSlideBtn.webp'}
                    alt= 'closeBtn'
                    onClick={()=>{
                        setIsOpen(false);
                    }}
                    style={{ position: 'absolute', top: '1.5vh', right: isMobile ?'2vw' : '1vw', width: isMobile ?'7vw':'3vw' , height:isMobile ?'7vw':'3vw', zIndex: 1}}
                >
                </ImgBtn>
                <ImageGallery
                    items={galleryList}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={true}
                    showThumbnails={false}
                    showBullets={false}
                    startIndex={selectedImage}
                    onSlide={(currentIndex) => setSelectedImage(currentIndex)}
                    renderLeftNav={renderLeftNav}
                    renderRightNav={renderRightNav}
                />
            </div>}
        </>  
    );
};

export default Gallery;
