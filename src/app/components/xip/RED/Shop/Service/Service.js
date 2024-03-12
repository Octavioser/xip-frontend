import { isMobile } from 'react-device-detect';
import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'
import { useCommon }  from 'app/components/xip/REDCommon/Common';

const Service = () => {

    const { navigate } = useCommon();

    return (
        <>
            <div style={{display:'flex', alignItems:'center', justifyContent: 'center', width:'100%', height:'100vh'}}>
                <div style={{width:isMobile? '100%' : '50%', height: isMobile?'20%':'30%', textAlign:'center'}}> 
                    <PBtn // 샵
                        className='pBtnNoRed'
                        id='TermsOfUse'
                        labelText='Terms Of Use'
                        alt='TermsOfUse'
                        onClick={() => {
                            navigate('/shop/termsofuse');
                        }}
                    >
                    </PBtn>
                    <PBtn // 샵
                        className='pBtnNoRed'
                        id='Privacy'
                        labelText='Privacy'
                        alt='Privacy'
                        onClick={() => {
                            navigate('/shop/privacy');
                        }}
                    >
                    </PBtn>
                    <PBtn // 샵
                        className='pBtnNoRed'
                        id='Shipping & Return policy'
                        labelText='Shipping & Return policy'
                        alt='Shipping & Return policy'
                        onClick={() => {
                            navigate('/shop/shipReturn');
                        }}
                    >
                    </PBtn>
                </div>
            </div>
        </>
        
    )
}
export default Service;