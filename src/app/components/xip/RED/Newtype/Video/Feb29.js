import {useState, useRef} from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {Link} from 'react-router-dom';


const Feb29 = () => {


    const centerWidth = '50%'
    const doubleImageWidth = '35%'

    const setimg = (key) => {
        return (
            <div style={{width:'100%', textAlign: 'center'}}>
                <img
                    src='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/1.jpg'
                    alt={key}
                    style={{width:centerWidth}}
                />
            </div>
        )
    }

    const setText = (text, textAlign) => {
        return(
            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'ceter'}}>
                <div style={{width:centerWidth}}>
                    <p style={{textAlign: textAlign, margin:1, padding:1}}>{text}</p>
                </div>
            </div>
        )
    }

    const setDoubleImg = (key, key2) => {
        return (
            <div style={{display:'flex',width:'100%', justifyContent:'center'}}>
                <img
                    src='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/1.jpg'
                    alt={key}
                    style={{width:doubleImageWidth, marginRight:5, marginBottom:5}}
                />
                <img
                    src='https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/1.jpg'
                    alt={key2}
                    style={{width:doubleImageWidth, marginBottom:5}}
                />
            </div>
        )
    }

    return(
        <div 
            style={{
                position:'fixed', 
                width:'100%', 
                height:'100%',
                backgroundColor:'white',
                color:'#A8A29D',
                textAlign: 'center',
                overflowY:'scroll'
            }}>
            <br/><br/><br/><br/>
            <div>
                <audio src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/m/netypeMusic.wav" controls loop={false}></audio>
            </div>
            <br/><br/><br/><br/>
            {setimg(1)}
            {setimg(2)}
            {setimg(3)}
            {setimg(4)}
            <br/><br/><br/><br/>
            <br/><br/><br/>
            {setText('[Lyrics]', 'left')}
            <br/><br/><br/><br/><br/>
            {setimg(5)}
            <br/><br/><br/><br/><br/><br/>
            {setText('For the love I gave to you', 'left')}
            {setText("I don't want it back, non-refundable", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(6)}
            <br/><br/><br/><br/><br/>
            {setText('Treat it for my soul, my heart still beats next to you', 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(7)}
            <br/><br/><br/><br/>
            {setText("I won't forget it,", 'left')}
            {setText("Though we've come too far", 'left')}
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(8)}
            <br/><br/>
            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'ceter'}}>
                <div style={{width:centerWidth}}>
                    <p style={{fontSize:'4rem', textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>“</p>
                    <i style={{fontSize:'1.2rem', textAlign: 'center', margin:1, padding:1}}>Things are turning around on Feburary 29th.</i>
                    <br/><br/><br/>
                    <p style={{fontSize:'4rem',textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>”</p>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/>
            {setimg(9)}
            <br/><br/><br/><br/><br/><br/>
            {setimg(10)}
            <br/><br/><br/><br/>
            {setimg(11)}
            <br/><br/><br/><br/>
            {setimg(12)}
            <br/><br/><br/><br/>
            {setimg(13)}
            <br/><br/><br/>
            {setText("Remember when we first met, we stared", 'left')}
            {setText("At each other so long, we felt the same", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(14)}
            <br/><br/><br/>
            {setText("I can't get you off my mind,", 'left')}
            {setText("You got me starry-eyed", 'left')}
            {setText("You're the one that no one can ever replace", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(15)}
            <br/><br/><br/>
            {setText("Look up to the skies and say,", 'left')}
            {setText("Especially love the color of sunset", 'left')}
            <br/><br/><br/><br/><br/><br/>
            {setimg(16)}
            <br/><br/><br/>
            {setText("When you talk about it for a while,", 'left')}
            {setText("So sunny that I can't be blind", 'left')}
            {setText("Notice that we're soulmates like it's planned", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(17)}
            <br/><br/><br/><br/><br/><br/>
            {setText("Make it right before nothing's left,", 'left')}
            {setText("Let’s build a sandcastle before the wave", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(17)}
            <br/><br/><br/><br/><br/><br/><br/>
            {setText("In other words, in rainy weather,", 'left')}
            {setText("Snowy weather,", 'left')}
            {setText("No matter, I will stay here", 'left')}
            <br/><br/><br/><br/><br/>
            {setDoubleImg(18,19)}
            {setimg(20)}
            <br/><br/><br/>
            {setText("Saying goodbye always makes us sad,", 'left')}
            {setText("Especially at the time when you look back", 'left')}
            <br/><br/><br/><br/><br/>
            {setimg(21)}
            <br/><br/><br/>
            {setDoubleImg(22,23)}
            <br/><br/><br/><br/><br/>
            {setText("In another world, storm whatever,", 'left')}
            {setText("'Cause I’ll always be there for", 'left')}
            {setText("Whenever you need me", 'left')}
            <br/><br/><br/><br/>
            {setimg(24)}
            <br/><br/><br/>
            {setText("I can’t let you go", 'left')}
            {setText("I won't forget it", 'left')}
            {setText("Though we've come too far", 'left')}
            <br/><br/><br/><br/><br/>
            {setimg(25)}
            <br/>
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(26)}
            <br/>
            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'ceter'}}>
                <div style={{width:centerWidth}}>
                    <p style={{fontSize:'4rem', textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>“</p>
                    <i style={{fontSize:'1.1rem', textAlign: 'center', margin:1, padding:1}}>
                        In rainy weather, though snowy weather,
                    </i>
                    <br/>
                    <i style={{fontSize:'1.1rem', textAlign: 'center', margin:1, padding:1}}>
                        Or storm whatever, you'll always be there for
                    </i>
                    <br/><br/><br/>
                    <p style={{fontSize:'4rem',textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>”</p>
                </div>
            </div>
            <br/><br/><br/>
            {setimg(27)}
            <br/><br/><br/>
            {setimg(28)}
            <br/><br/><br/>
            {setText("She's been waiting all day alone in front of the incubator", 'left')}
            <br/><br/><br/>
            {setimg(29)}
            <br/><br/><br/>
            {setText("If I'm gonna be away as much as I can, it doesn't matter", 'left')}
            <br/><br/><br/>
            {setDoubleImg(30,31)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(32)}
            <br/>
            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'ceter'}}>
                <div style={{width:centerWidth}}>
                    <p style={{fontSize:'4rem', textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>“</p>
                    <i style={{fontSize:'1.1rem', textAlign: 'center', margin:1, padding:1}}>
                        Make it right before nothing's left
                    </i>
                    <br/>
                    <i style={{fontSize:'1.1rem', textAlign: 'center', margin:1, padding:1}}>
                        In this universe, there's no other substance
                    </i>
                    <br/><br/><br/>
                    <p style={{fontSize:'4rem',textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>”</p>
                </div>
            </div>
            <br/><br/><br/><br/>
            {setimg(33)} 
            <br/><br/>
            {setText("She doesn’t care about rainy weather, though snowy weather,", 'left')}
            {setText("Or storm whatever, you'll always be there for", 'left')}
            <br/><br/>
            {setimg(34)}
            {setimg(35)}
            {setimg(36)}
            {setDoubleImg(37,38)}
            {setimg(37)}
            {setimg(38)}
            <br/><br/><br/>
            {setText("Make it right before nothing's left,", 'left')}
            {setText("Let’s build a sandcastle before the wave", 'left')}
            {setText("In other words, in rainy weather,", 'left')}
            {setText("Snowy weather,", 'left')}
            {setText("No matter, I will stay here", 'left')}
            <br/>
            {setimg(39)}
            <br/>
            {setText("For the love I gave to you,", 'left')}
            {setText("I don't want it back, non-refundable", 'left')}
            {setText("Treat it for my soul, my heart still beats next to you", 'left')}
            <br/><br/>
            {setimg(41)}
            <br/>
            {setText("I won't forget it,", 'left')}
            {setText("Though we've come too far", 'left')}
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            {setText("Things are turning around,", 'left')}
            {setText("On February 29th", 'left')}
            <br/><br/>
            {setDoubleImg(42,43)}
            <br/><br/><br/><br/> 
        </div>
    )
}
export default Feb29;
