import React, { useState, useEffect } from 'react';
import '../../../../../App.css';
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../../REDCommon/CommonStyle';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {useCommon} from 'app/components/xip/REDCommon/Common';

// 정보
const Gallery = () => {

    const {commonApi, commonShowLoading, commonHideLoading} = useCommon();

    const {galleryType} = useParams();
    
    const [selectedImage, setSelectedImage] = useState(0);          // 이미지 슬라이드 index

    const [isOpen, setIsOpen] = useState(false);                    // 이미지 슬라이드 닫기, 열기

    const [galleryList, setGalleryList] = useState([]);             // 이미지 슬라이드 데이터

    const [displayList, setDisplayList] = useState([]);             // 화면에 보여줄 이미지 슬라이드x
    
    const awsUrl = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/';
    


    useEffect(() => { 

        // 이미지 데이터 갖고오기기
        const getData = async () => {       

            try {
                await commonShowLoading();

                // 슬라이드 팝업 용 리스트
                let resultList = []

                // 이미지 갖고오기
                let resultData = await commonApi('/main/mainR001', {imageCd: galleryType});

                let list = (resultData[0].imgSrc).split('|')

                // 슬라이드 팝업 열기 함수
                const setImgTag = (imageWidth, awsUrl, i) => {  
                    return (
                        <ImgBtn     
                            key={i + 'imagBtn'}
                            id={i + 'imagBtnid'}
                            style={{ width: imageWidth }} 
                            src={awsUrl + list[i]} alt={i}
                            onClick={(event)=>{
                                setSelectedImage(parseInt(event.target.alt));
                                setIsOpen(true) // 슬라이드 열기
                            }}
                        />
                    )
                }
                

                // 화면에 뿌려줄 이미지데이터 가공
                const pFolderName = galleryType;
                const imageWidth = isMobile ? '30vw' : '20vw';
                let displaylistData = [];
                for(let i=0; i<list.length; i++) {  
                    // 이미지 3개씩 한줄로 넣어주고 사진팝업 데이터 넣어주기
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

                    // 슬라이드 팝업 이미지 url 값도 넣어주기
                    let url = list[i]
                    url = url.replace('low', 'high')
                    resultList = resultList.concat([
                        {
                            original: awsUrl + url, // 원본 이미지 URL
                        }
                    ])
                }

                // 화면에 뿌려줄 html 저장
                setDisplayList(displaylistData)
                
                // 슬라이드 팝업 이미지 데이터 state 저장
                setGalleryList (resultList)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                commonHideLoading();
            }
        }
        getData();
        /* eslint-disable */
    },[]);


    const arrowSize = isMobile? '5vw' : '2vw' ;

    const arrow  ='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/arrowCircle.webp'
    
        
    const  renderLeftNav = ( onClick, disabled ) => { // 왼쪽화살표
        return ([
            <ImgBtn
                id={'leftArrow'}
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
                id={'rightArrow'}
                src={arrow}
                alt="Custom Rigth Arrow"
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
                    id={'closeBtn'}
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
                    lazyLoad={true}
                />
            </div>}
        </>  
    );
};

export default Gallery;
