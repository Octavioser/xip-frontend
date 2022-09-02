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
 * @param className 적용받을 클래스 이름 
 * @param src       이미지 주소
 * @param alt       이미지 설명
 * @param onClick   클릭함수 
 * @param style     ex)style={{top:0, left:0, width:'100px'}}
 * @param onMouseOver 
 */
export class ImgBtn extends Component {

    render() {
        const classNames = this.props.className ? ('imgBtn ' + this.props.className) : 'imgBtn'
        return (
            <img 
                className = {classNames} 
                src={this.props.src}
                alt={this.props.alt} 
                onClick={this.props.onClick}
                style={this.props.style}
            ></img>
        )
    }

}


export default Btn;