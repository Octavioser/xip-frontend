import React, { Component} from 'react';

const videoBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/coming+soon.png'
export default class NotFound extends Component {

    render() {
        return(
            <img
                className='logoImage' 
                src={videoBtn} 
                alt='commingSoon'
                style={{width: '20%', height:'20%'}}>
            </img>
        )
    }
}