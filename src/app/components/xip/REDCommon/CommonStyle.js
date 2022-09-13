import React, { Component} from 'react';


class Btn extends Component{
    render() {
        return (
            <button> 테스트 12312312</button>
        )
    }
}


/**
 * 이미지 버튼 
 * @param className 적용받을 클래스 이름 '2'만 입력시 hover기능 없음
 * @param src       이미지 주소
 * @param alt       이미지 설명
 * @param onClick   클릭함수 
 * @param style     ex)style={{top:0, left:0, width:'100px'}}
 * @param onMouseOver
 * @param hover     false로 주면 hover 안됨
 * @param ref       ref
 */
export class ImgBtn extends Component {

    render() {
        const classNames = this.props.className ? (
            this.props.hover ? ('imgBtn ' + this.props.className) : ('imgBtnNoHover ' + this.props.className)
        )
        : 'imgBtn'
        return (
            <img 
                className = {classNames} 
                src={this.props.src}
                alt={this.props.alt} 
                onClick={this.props.onClick}
                style={this.props.style}
                ref={this.props.ref || null}
            ></img>
        )
    }

}


export default Btn;