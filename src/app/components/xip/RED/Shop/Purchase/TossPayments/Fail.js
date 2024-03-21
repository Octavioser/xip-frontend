import { useEffect } from "react";
import {useCommon} from 'app/components/xip/REDCommon/Common'
import { useParams } from 'react-router-dom';

const Fail = () => {
    const {orderMethod} = useParams();
    const {navigate} = useCommon();
    useEffect(() => {
        // if(orderMethod === 'cart') {
        //     navigate('/shop/cart')
        // }
        // else {
        //     navigate(`/shop/detailproduct/${orderMethod}`)
        // }
        
        /* eslint-disable */
    }, []);
}
export default Fail;