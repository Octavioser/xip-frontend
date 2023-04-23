import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../../REDCommon/CommonStyle';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

// 정보
const Gallery = (props) => {
    
    const [selectedImage, setSelectedImage] = useState(0);          // 이미지 슬라이드 index

    const [isOpen, setIsOpen] = useState(false);                    // 이미지 슬라이드 닫기, 열기

    const [galleryList, setGalleryList] = useState([]);             // 이미지 슬라이드 데이터

    const [displayList, setDisplayList] = useState([]);             // 화면에 보여줄 이미지 슬라이드x
    
    const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';
    
    // 이미지 갖고오기위한 파라미터 정보 (폴더경로)
    const getForderParam  = async() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const typeParam = urlParams.get('type');
        const folderName = `xItem/i/works/image/${typeParam}/low/`;
        return [folderName, typeParam];
    }


    useEffect(() => {

        let list = []

        // 이미지 데이터 갖고오기기
        const getData = async () => {       
            const bucketName = 'xip-bucket'; 
            const param = await getForderParam()
            const params = {  // s3 파람
                Bucket: bucketName,
                Prefix: param[0],
                Delimiter: '/',
            };
            console.log('이미지 콜')

            console.log('parma==>', param[0])

            const images = await props.s3.listObjectsV2(params).promise();
            list = images.Contents

            let resultList = []

            // 슬라이드 이미지 파라미터 
            for(let i=0; i<list.length; i++) {
                let url = list[i].Key
                url = url.replace('low', 'high')
                console.log(url)
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
                console.log('list[i]=>', list[i])
                console.log('[i]=>', i)
                return (
                    <ImgBtn style={{ width: imageWidth }} src={awsUrl + list[i].Key} alt={i}
                        onClick={(event)=>{
                            setSelectedImage(parseInt(event.target.alt));
                            setIsOpen(true) // 슬라이드 열기
                        }}
                    />
                )
            }
            

            // 화면에 뿌려줄 이미지데이터 가공 (슬라이드x)
            const pFolderName = param[1];
            const imageWidth = isMobile ? '30vw' : '20vw';
            let displaylistData = [];
            for(let i=0; i<list.length; i++) {  // 이미지 3개씩 한줄로 넣어주고 사진팝업 데이터 넣어주기
                // fetus trauma fetusDtail 만 3열로
                if((pFolderName === 'fetus')||(pFolderName === 'trauma')) {
                    if((i % 3 === 0)) {
                        displaylistData = 
                        displaylistData.concat([
                            <div key={i} style={{ display: "flex" }}>
                                <div style={{ marginRight: "0.5vh" }}>
                                    {setImgTag(imageWidth, awsUrl, i)}  
                                </div>
                                <div style={{ marginRight: "0.5vh" }}>
                                    {setImgTag(imageWidth, awsUrl, i+1)}
                                </div>
                                <div>
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
                        <div key={i} style={{ display: "flex", justifyContent: 'center'}}>
                            <div key={i}style={{ marginRight: "0.5vh" }}>
                                {setImgTag(isMobile ? '70vw' : '35vw', awsUrl, i)}  
                            </div>
                        </div>
                    ]) 
                }
            }
            setDisplayList(displaylistData)
        }
        
        getData()


    },[props.s3]);


    const arrowSize = isMobile? '5vw' : '1.5vw' ;

    const arrow  ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/slideArrow.svg'
    
        
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
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/closeSlideBtn.webp'}
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
