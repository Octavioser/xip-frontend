import React, { Component} from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { ImgBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


export default class Works extends Component {

    state = {
        menuOpenId: '',

        photoSrc:[
            { key : 'inUteroBtn' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/in+utero.png'},
            { key : 'homoMechanicus' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/homo+mechanicus.png'},
            { key : 'articulatedAnatomy' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/Articulated+Anatomy.png'},
            { key : 'trauma' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/trauma.png'},
            { key : 'isetanDenimProject' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/isetan+Denim+project.png'},
            { key : 'fetus' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/fetus.png'},
            { key : 'fetusDetail' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/fetusDetails.png'}
        ]
    }
    componentDidMount() {
        // this.default();
    }

    code = {
        setWorksBtn: () => {
            
            
        }
    }
      

    constructor(props) {
        super(props);
        this.props = props
    }

    render() {
        const {photoSrc} = this.state
        const menuSize = {height: isMobile ? '3vh':'6vh'}

        const menulength = 6

        return (
            <div className='logoImage' style={{height: isMobile ? (menulength*3 + 'vh') : (menulength*6 + 'vh')}}>
           {photoSrc.map((e) => {
                return (
                    <div key={e.key} style={{textAlign: 'center'}}>
                        <Link to={`./Gallery/?type=${e.key}`}>
                        <ImgBtn
                            src={e.value}
                            alt= {e.key}
                            onClick={()=>{
                                this.setState({
                                    menuOpenId: e.key
                                })
                            }}
                            style={menuSize}
                        >
                        </ImgBtn>
                        </Link>
                    </div>
                )
            })}
            </div>
        )
    }
}
