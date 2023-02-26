import React, { Component} from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';

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
        this.props = props
    }

    render() {

        const menuSize = {height: isMobile ? '3vh':'6vh'}

        const menulength = 6

        return (
            <div className='logoImage' style={{height: isMobile ? (menulength*3 + 'vh') : (menulength*6 + 'vh')}}>
            {/* <div style={{marginLeft:'0.5vw', marginTop:'0.5vh', position:'fixed', top: isMobile ? '16vh':'11vh'}}> */}
                 <div style={{textAlign: 'center'}}>
                    <ImgBtn
                        src={inUteroBtn}
                        alt='inUteroBtn'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </div>
                <div style={{textAlign: 'center'}}>
                    <ImgBtn
                        src={HomoMechanicus}
                        alt='HomoMechanicus'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </div>
                <div style={{textAlign: 'center'}}>
                    <ImgBtn
                        src={ArticulatedAnatomy}
                        alt='ArticulatedAnatomy'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </div>
                <div style={{textAlign: 'center'}}>
                    <ImgBtn
                        src={trauma}
                        alt='trauma'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </div>
                <div style={{textAlign: 'center'}}>
                    <ImgBtn
                        src={IsetanDenimProject}
                        alt='IsetanDenimProject'
                        onClick={()=>{

                        }}
                        style={menuSize}
                    >
                    </ImgBtn>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Link to='./ImageSlide'>
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
                    </Link>
                {/* </div> */}
            </div>

            {/* <div style={{position:'relative', 'overflow-x': 'scroll', width:'10vw'}}> */}
                {/* <img src={Fetus}
                    alt='Fetus'>
                </img>
                <img src={Fetus}
                    alt='Fetus'>
                </img> */}
            {/* </div> */}
            </div>
        )
    }
}
