import React, { Component} from 'react';
import '../../../../App.css';
import { isMobile } from 'react-device-detect';
import { PBtn } from '../REDCommon/CommonStyle';
import {Link} from 'react-router-dom';


export default class Works extends Component {

    state = {
        menuOpenId: '',

        photoSrc:[
            { key : 'inUtero' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/in+utero.png', display:'in utero'},
            // { key : 'homoMechanicus' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/homo+mechanicus.png'},
            { key : 'articulatedAnatomy' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/Articulated+Anatomy.png', display:'Articulated Anatomy'},
            { key : 'trauma' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/trauma.png', display:'trauma'},
            { key : 'isetanDenimProject' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/isetan+Denim+project.png', display:'Isetan Denim project'},
            { key : 'fetus' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/fetus.png', display:'Fetus'},
            { key : 'fetusDetails' ,value: 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/works/fetusDetails.png', display:'Fetus Details'}
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

        const menulength = photoSrc.length

        return (
            <div className='logoImage' style={{height: isMobile ? (menulength*5 + 'vh') : (menulength*7 + 'vh'), width: isMobile ? '90%':'50%', textAlign: 'center'}}>
           {photoSrc.map((e) => {
                return (
                        <Link to={`./Gallery/?type=${e.key}`}>
                        <PBtn
                            labelText={e.display}
                            alt={e.display}
                            onClick={()=>{
                                this.setState({
                                    menuOpenId: e.key
                                })
                            }}
                        >
                        </PBtn>
                        </Link>
                )
            })}
            </div>
        )
    }
}
