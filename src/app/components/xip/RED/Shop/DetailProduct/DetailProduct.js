import ProductSlider from "./ProductSlider";
import ProductDescription from "./ProductDescription";
import { isMobile } from 'react-device-detect';


const DetailProduct = () => {

    const parentDivStyle = () => {

        let item = 
            isMobile ?
                    {
                        width: '100vw', 
                        height: '100vh'
                    }
                    :
                    {
                        display:'flex',  
                        overflow: 'hidden', 
                        width: '100vw', 
                        height: '100vh', 
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }   
        return(item)
    }

    const productSliderStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  alignItems: 'center', position: 'relative', top:'10vh'}
                :
                {display:'flex', justifyContent: 'center',  alignItems: 'center'}
        return(item)
    }

    const productDescriptionStyle = () => {
        let item = 
            isMobile ? 
                {display:'flex', justifyContent: 'center',  alignItems: 'center', position: 'relative', top:'10vh'}
                :
                {display:'flex', justifyContent: 'center',  alignItems: 'center', width:'50vw', height:'40vw'}
        return(item)
    }



    return (
        <div style={parentDivStyle()}
        >
            <div style={productSliderStyle()}>
                <ProductSlider/>
            </div>
            <div style={productDescriptionStyle()}>
                <ProductDescription/>
            </div>
        </div>
    )
}
export default DetailProduct;