import {Link} from 'react-router-dom';
import { ImgBtn } from '../REDCommon/CommonStyle';
import { isMobile } from 'react-device-detect';

// 맨처음 시작하면
const StartPage = (props) => {
    
    const startBtn = 'https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/startBtn.png'
    return(
        <div className='beforeStart'>
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center', top: '50vh', minHeight: '100%'}}>
                    <Link to='./home'>
                        <ImgBtn 
                            className='imgBtnNoRed'
                            style={{width: isMobile ?'80vw':'50vw', height: 'auto'}}
                            src= {startBtn} 
                            alt='startBtn' 
                            onClick={()=>{
                                props.music.play();
                            }}
                            >
                        </ImgBtn>
                    </Link>
            </div>
        </div>
    )
}
export default StartPage