import CryptoJS from "crypto-js"; 
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';
import { useCookie } from 'app/components/xip/RED/Login/Cookie';
import { useNavigate } from 'react-router-dom';

export const useCommon = () => {
  	const { setLoading } = useAppContext();

	const {getCookie} = useCookie();

	const navigate = useNavigate(); // 페이지 이동

	const commonShowLoading = async() => { // 로딩화면 보이기
		setLoading(true); 
	};

	const commonHideLoading = () => { // 로딩화면 풀기
		setTimeout(() => {
			setLoading(false);
		}, 700);
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
					'Authorization': `Bearer ${getCookie('xipToken')}`
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
	return { commonShowLoading, commonHideLoading, commonApi, commonEncode, navigate};
}