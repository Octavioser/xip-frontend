import React from 'react';
import { isMobile } from 'react-device-detect';

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


/**
 * p태그 버튼 
 * @param labelText 텍스트
 * @param onClick   클릭함수 
 * @param style     ex)style={{top:0, left:0, width:'100px'}}
 * @param ref       ref
 * @param noHover   true로 주면 hover기능 없음
 */
export const PBtn = (props) => {
  let style = props.style ? props.style : ({ fontSize: isMobile? '2rem':'55px'})
  let className = ((props.noHover || false) === true) ? 'pBtnNoHover' : 'pBtn'
  return (
    <p
      className={className}
      onClick={props.onClick}
      style={style}
      ref={props.ref || null}
    >
      {props.labelText}
    </p>
  )
};

