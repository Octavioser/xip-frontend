import {useEffect} from 'react';
import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import {Link} from 'react-router-dom';


const Feb29 = ({newTypeMusic}) => {


    const centerWidth = '50%'
    const doubleImageWidth = '35%'

    useEffect(()=>{
        newTypeMusic.pause();
    },[])

    const defaultImg = (key) =>{
        return `https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/image/defaultImg/${key}.webp`
    }

    const setimg = (key) => {
        return (
            <div style={{width:'100%', textAlign: 'center'}}>
                <img
                    src={defaultImg(key)}
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
                    src={defaultImg(key)}
                    alt={key}
                    style={{width:doubleImageWidth, marginRight:5, marginBottom:5}}
                />
                <img
                    src={defaultImg(key2)}
                    alt={key2}
                    style={{width:doubleImageWidth, marginBottom:5}}
                />
            </div>
        )
    }

    const setRun = () => {
        let list = [];

        for(let i=1; i<146; i++) {
            list.push({width:50/(146)*i + '%', key:i})
        }
        console.log(list);
        return (
            list.map(e => 
                <div style={{width:'100%', textAlign: 'center'}}>
                    <img
                        src={`https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/image/runImg/${e.key}.webp`}
                        alt={'run' + e.key}
                        style={{width:e.width}}
                    />
                </div>
            )
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
            {setimg('start1')}
            {setimg('start2')}
            {setimg('start3')}
            {setimg('start4')}
            <br/><br/><br/><br/>
            <div>
                <audio src="https://xip-bucket.s3.ap-northeast-2.amazonaws.com/xItem/i/newtype/video/music/12.+Feb.+29+MASTER.mp3" controls loop={false}></audio>
            </div>
            <br/><br/><br/><br/>
            {setText('[Lyrics]', 'left')}
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            {setimg(1)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setText('For the love I gave to you', 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(2)}
            {setimg(3)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setText("I don't want it back, non-refundable", 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(4)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setText('Treat it for my soul', 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setimg(5)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setText('My heart still beats next to you', 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(6)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            {setText("I won't forget it,", 'left')}
            {setText("Though we've come too far", 'left')}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(7)}
            <br/>
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            <br/>
            {setimg(8)}
            {setimg(9)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(10)}
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'ceter'}}>
                <div style={{width:centerWidth}}>
                    <p style={{fontSize:'4rem', textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>“</p>
                    <i style={{fontSize:'1.2rem', textAlign: 'center', margin:1, padding:1}}>Things are turning around on Feburary 29th.</i>
                    <br/><br/><br/>
                    <p style={{fontSize:'4rem',textAlign: 'center', margin:1, padding:1, fontFamily: 'default'}}>”</p>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setimg(11)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(12)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(13)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(14)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(15)}
            <br/><br/><br/><br/>
            {setText("Remember when we first met, we stared", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(16)}
            <br/><br/><br/><br/>
            {setText("At each other so long, we felt the same", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(17)}
            <br/><br/><br/><br/>
            {setText("I can't get you off my mind,", 'left')}
            {setText("You got me starry-eyed", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(18)}
            <br/>
            {setText("You're the one that no one can ever replace", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(19)}
            <br/><br/><br/><br/>
            {setText("Look up to the skies and say,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(20)}
            <br/><br/><br/><br/>
            {setText("Especially love the color of sunset", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(21)}
            <br/><br/><br/><br/>
            {setText("When you talk about it for a while,", 'left')}
            {setText("So sunny that I can't be blind", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(22)}
            <br/><br/><br/><br/>
            {setText("Notice that we're soulmates like it's planned", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(23)}
            <br/><br/><br/><br/><br/>
            {setText("Make it right before nothing's left,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(24,25)}
            <br/><br/><br/><br/><br/>
            {setDoubleImg(26,27)}
            <br/><br/><br/><br/><br/>
            {setText("Let’s build a sandcastle before the wave", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(28)}
            <br/><br/><br/><br/><br/>
            {setText("In other words, in rainy weather,", 'left')}
            {setText("Snowy weather,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setText("No matter, I will stay here", 'left')}
            <br/><br/>
            {setDoubleImg(29,30)}
            {setimg(31)}
            <br/><br/><br/>
            {setText("Saying goodbye always makes us sad,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(32)}
            <br/><br/><br/><br/><br/>
            {setText("Especially at the time when you look back", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(33)}
            <br/><br/><br/>
            {setText("In another world, storm whatever,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(34)}
            <br/><br/><br/>
            {setText("'Cause I’ll always be there for", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(35,36)}
            <br/><br/><br/><br/><br/>
            {setText("Whenever you need me", 'left')}
            <br/><br/><br/>
            {setimg(37)}
            <br/><br/><br/>
            {setText("I can’t let you go", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(38)}
            <br/><br/><br/>
            {setText("I won't forget it", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(39)}
            <br/><br/><br/>
            {setText("Though we've come too far", 'left')}
            <br/><br/><br/><br/><br/>
            {setimg(40)}
            <br/><br/><br/>
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(41,42)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(43)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setText("She's been waiting all day alone in front of the incubator", 'left')}
            <br/><br/><br/>
            {setimg(44)}
            {setDoubleImg(45,46)}
            <br/><br/><br/><br/><br/>
            {setText("If I'm gonna be away as much as I can, it doesn't matter", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(47)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(48)}
            <br/><br/><br/><br/><br/>
            {setText("She doesn’t care about rainy weather,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(49,50)}
            {setimg(51)}
            <br/><br/><br/>
            {setText("Though snowy weather,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/>
            {setimg(52)}
            <br/><br/><br/>
            {setText("Or storm whatever, you'll always be there for", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(53,54)}
            <br/><br/><br/>
            {setText("She doesn’t care about rainy weather", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(55)}
            <br/><br/><br/>
            {setText("Though snowy weather,", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(56)}
            <br/><br/><br/>
            {setText("Or storm whatever, you'll always be there for", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setRun()}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(57)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(58)}
            <br/><br/><br/>
            {setDoubleImg(59,60)}
            <br/><br/><br/><br/><br/>
            {setimg(61)}
            {setimg(62)}
            {setimg(63)}
            <br/><br/><br/><br/><br/><br/>
            {setDoubleImg(64,65)}
            <br/><br/><br/><br/><br/>
            {setDoubleImg(66,67)}
            <br/><br/><br/><br/><br/>
            {setText("Make it right before nothing's left,", 'left')}
            {setText("Let’s build a sandcastle before the wave", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(68,69)}
            {setDoubleImg(70,71)}
            {setDoubleImg(72,73)}
            {setimg(74)}
            <br/><br/><br/>
            {setText("In other words, in rainy weather,", 'left')}
            {setText("Snowy weather,", 'left')}
            {setText("No matter, I will stay here", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(75)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(68,69)}
            {setDoubleImg(70,71)}
            {setDoubleImg(72,73)}
            {setimg(74)}
            <br/>
            {setText("For the love I gave to you,", 'left')}
            {setText("I don't want it back, non-refundable", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setimg(77)}
            <br/><br/><br/>
            {setText("Treat it for my soul, my heart still beats next to you", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setDoubleImg(78,79)}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {setText("I won't forget it,", 'left')}
            {setText("Though we've come too far", 'left')}
            {setText("I won't give in,", 'left')}
            {setText("Gotta right my wrongs", 'left')}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/>
            {setimg(80)}
            <br/><br/><br/><br/><br/><br/><br/>
            {setText("Things are turning around,", 'left')}
            {setText("On February 29th", 'left')}


            <br/><br/><br/><br/> 
        </div>
    )
}
export default Feb29;
