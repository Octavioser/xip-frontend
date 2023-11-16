import CryptoJS from "crypto-js"; 
import { useLoading } from 'app/components/xip/REDCommon/Loading/LoadingContext';
import { getCookie } from 'app/components/xip/RED/Login/Cookie';

export const useCommon = () => {
  	const { setLoading } = useLoading();

	const commonShowLoading = async() => { // 로딩화면 보이기
		setLoading(true); 
	};

	const commonHideLoading = () => { // 로딩화면 풀기
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const commonEncode = async(str) => { // 암호화
			try{
				const secretKey = process.env.REACT_APP_SECRET_LOGIN_KEY
				const encrypted = CryptoJS.HmacMD5(JSON.stringify(str), secretKey).toString();
				return encrypted;
			} catch (error) {
				console.log(error)
				return -1;
			};
	}

  	const commonApi = async(url, param) => {
		try{
			let apiurl = process.env.REACT_APP_API_URL + url
			let result = [];
			await fetch(apiurl, 
			{
				method: "POST",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${getCookie('token')}`
				},
				body: JSON.stringify(param)
			}).then(response => 
				response.json()
			).then(json  => {
				result = json
			});
			return result
		} catch (error) {
			console.log(error)
			return -1;
		}
  	};
	return { commonShowLoading, commonHideLoading, commonApi, commonEncode };
}