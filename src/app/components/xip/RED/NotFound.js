import React, { Component} from 'react';
import {ImgBtn} from '../REDCommon/CommonStyle';

const videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/commingSoon.png'
export default class NotFound extends Component {

    render() {
        return(
            <img
                className='logoImage' 
                src={videoBtn} 
                alt='commingSoon'
                style={{width: '50%', height:'50%'}}>
            </img>
        )
    }
}