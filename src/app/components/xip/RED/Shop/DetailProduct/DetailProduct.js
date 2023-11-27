import ProductSlider from "./ProductSlider";
import ProductDescription from "./ProductDescription";

const DetailProduct = () => {
    return (
        <div style={{
                display:'flex',  
                overflow: 'hidden', 
                backgroundColor: 'white', 
                width: '100vw', 
                height: '100vh', 
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{backgroundColor: 'blue',justifyContent: 'center',  alignItems: 'center'}}>
                <ProductSlider/>
            </div>
            <div style={{backgroundColor: 'yellow', width:'50vw', height:'40vw'}}>
                <ProductDescription/>
            </div>
        </div>
    )
}
export default DetailProduct;