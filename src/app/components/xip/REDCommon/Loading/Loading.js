import React from 'react';
import { isMobile } from 'react-device-detect';
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext'

const Loading = () => {
    const { loading} = useAppContext();
    return (
        <>
        {loading &&
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 999,
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh'
            }}>
                <img 
                    style={{height: isMobile ? '25vh' : '50vh'}}
                    src={'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/main/loadingLogo.gif'} 
                    alt="Loading"
                />
            </div>
        }
        </>
    )
};
export default Loading




