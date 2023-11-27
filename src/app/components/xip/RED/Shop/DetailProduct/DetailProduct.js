import ProductSlider from "./ProductSlider";
import ProductDescription from "./ProductDescription";
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


const DetailProduct = () => {

    const { detailProduct } = useParams();

    const parentDivStyle = () => {

        let item = 
        isMobile ?
                {
                    overflow: 'hidden', 
                    backgroundColor: 'white', 
                    width: '100vw', 
                    height: '100vh', 
                    color: 'black',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
                :
                {
                    display:'flex',  
                    overflow: 'hidden', 
                    backgroundColor: 'white', 
                    width: '100vw', 
                    height: '100vh', 
                    color: 'black',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }   
        return(item)
    }



    return (
        <div style={parentDivStyle()}
        >
            <div style={{justifyContent: 'center',  alignItems: 'center'}}>
                <ProductSlider/>
            </div>
            <div style={{width:'50vw', height:'40vw'}}>
                <ProductDescription/>
            </div>
        </div>
    )
}
export default DetailProduct;