import React, { Component} from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';

const inUteroBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/in+utero.png'
const HomoMechanicus = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/homo+mechanicus.png'
const ArticulatedAnatomy = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/Articulated+Anatomy.png'
const trauma = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/trauma.png'
const IsetanDenimProject = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/isetan+Denim+project.png'
const Fetus = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/fetus.png'
export default class Works extends Component {

    state = {
        menuOpenId: '',

        photoDropDownList:{
            inUteroBtn: [],
            HomoMechanicus: [],
            ArticulatedAnatomy: [],
            trauma: [],
            IsetanDenimProject: [],
            Fetus: []
        }
    }
    componentDidMount() {
        // this.default();
      }
      

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {

        const menuSize = {height: isMobile ? '3vh':'6vh'}
        return (
            <>
            <div style={{position:'relative', width:'10vw', top: isMobile ? '15vh':'10vh'}}>
                <ImgBtn
                    src={inUteroBtn}
                    alt='inUteroBtn'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
                <ImgBtn
                    src={HomoMechanicus}
                    alt='HomoMechanicus'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
                <ImgBtn
                    src={ArticulatedAnatomy}
                    alt='ArticulatedAnatomy'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
                <ImgBtn
                    src={trauma}
                    alt='trauma'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
                <ImgBtn
                    src={IsetanDenimProject}
                    alt='IsetanDenimProject'
                    onClick={()=>{

                    }}
                    style={menuSize}
                >
                </ImgBtn>
                <ImgBtn
                    src={Fetus}
                    alt='Fetus'
                    onClick={()=>{
                        this.setState({
                            menuOpenId: 'Fetus'
                        })
                        
                    }}
                    style={menuSize}
                >
                </ImgBtn>
            </div>

            <div style={{position:'relative', 'overflow-x': 'scroll', width:'10vw'}}>
                <img src={Fetus}
                    alt='Fetus'>
                </img>
                <img src={Fetus}
                    alt='Fetus'>
                </img>
            </div>
            </>
        )
    }
}
