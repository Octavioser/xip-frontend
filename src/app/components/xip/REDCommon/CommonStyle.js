import React, { Component} from 'react';


/**
 * 이미지 버튼 
 * @param className 적용받을 클래스 이름 '2'만 입력시 hover기능 없음
 * @param src       이미지 주소
 * @param alt       이미지 설명
 * @param onClick   클릭함수 
 * @param style     ex)style={{top:0, left:0, width:'100px'}}
 * @param ref       ref
 */
export const ImgBtn = (props) => {
    const classNames = props.className ? props.className : 'imgBtn'
    return (
      <img
        className={classNames}
        src={props.src}
        alt={props.alt}
        onClick={props.onClick}
        style={props.style}
        ref={props.ref || null}
      ></img>
    )
};

