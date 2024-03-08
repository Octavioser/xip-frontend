import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {useCommon} from 'app/components/xip/REDCommon/Common'

const Success = () => {
    const [searchParams] = useSearchParams();

    const { commonShowLoading, commonHideLoading, commonApi, navigate, commonRegion} = useCommon();

    useEffect(() => {
        // TODO: 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        const confirm = async() => {
            console.log(requestData)
            // try{
            //     await commonShowLoading();
            //     let resultData = await commonApi('/shop/confirm', JSON.stringify(requestData));
            //     console.log(resultData)
            //     if (!resultData.ok) {
            //         // TODO: 결제 실패 비즈니스 로직을 구현하세요.
            //         console.log(resultData);
            //         navigate(`/fail?message=${resultData.message}&code=${resultData.code}`);
            //         return;
            //     }
            // } catch (error) {
            //     console.log(error);
            // } finally {
            //     commonHideLoading();
            // }
        }
        confirm();
        /* eslint-disable */
    }, []);

    return (
        <div className="result wrapper">
            <div className="box_section">
                <h2 style={{ padding: "20px 0px 10px 0px" }}>
                <img
                    width="35px"
                    src="https://static.toss.im/3d-emojis/u1F389_apng.png"
                />
                    결제 성공
                </h2>
                <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
                <p>{`결제 금액: ${Number(
                searchParams.get("amount")
                ).toLocaleString()}원`}</p>
                <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
            </div>
        </div>
    );
}
export default Success