import React from 'react';

const comingSoon = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/coming+soon.png'

const NotFound = () => {

    return(
        <img
            className='logoImage' 
            src={comingSoon} 
            alt='commingSoon'
            style={{width: '50vw', height:'auto'}}>
        </img>
    )
};
export default NotFound