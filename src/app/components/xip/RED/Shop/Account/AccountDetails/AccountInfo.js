import { PBtn } from 'app/components/xip/REDCommon/CommonStyle'

const AccountInfo = () => {

    return (
        <>
            <p style={{fontSize:'1.3rem', textAlign: 'left'}}>ACCOUNT INFORMATION</p>
            <div style={{display:'flex', flexWrap: 'wrap',  justifyContent: 'space-between', marginLeft: '30%'}}>
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>First Name</p>
                </div>
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>EMAIL</p>
                </div>
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>Last name</p>
                </div>
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>EMAIL</p>
                </div>   
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>Email address</p>
                </div>   
                <div style={{ width: '48%' }}>
                    <p style={{textAlign: 'left'}}>EMAIL</p>
                </div>   
            </div>
            <div style={{ textAlign: 'center'}}> {/* 버튼을 감싸는 div를 가운데 정렬 */}
                <PBtn
                    className= 'pBtnNoRed'
                    style={{ 
                        textAlign: 'center', 
                        width:'4vw', 
                        height:'2vw',
                        border: '2px solid white',  
                        fontSize: '1.3rem',  
                        margin: 'auto',
                    }}
                    labelText= 'EDIT'
                >
                </PBtn>
            </div>
        </>
    )
}
export default AccountInfo;