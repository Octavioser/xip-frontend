import CryptoJS from "crypto-js"; 
import { useAppContext } from 'app/components/xip/REDCommon/CommonContext';
import { useCookie } from 'app/components/xip/RED/Login/Cookie';
import { useNavigate } from 'react-router-dom';

export const useCommon = () => {
  	const { setLoading, openConfirm, region} = useAppContext();

	const {getCookie} = useCookie();

	const navigate = useNavigate(); // 페이지 이동

	const commonRegion = () => {
		return region;
	}
	/**
     * 컨펌창
     * @param msg       텍스트
     * @param func    확인 눌렀을시 실행할 함수 
     * ex) openConfirm("정말 삭제하시겠습니까?", () => {console.log("삭제 로직 수행");}))
     */
	const commonConfirm = async(msg, func) => {  // 컨펌창
		openConfirm(msg, func);
	}

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

	const commonGetS3Img = async(type, code) => {
		try{
			let result = [];
			await fetch('https://xf0vgf3mof.execute-api.ap-northeast-2.amazonaws.com/prod/geturl', 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({"type": type,"code": code})
			}).then(response => 
				response.json()
			).then(json  => {
				result = json
			});
			return result;
		}
		catch (error) {
			console.log(error)
			return -1;
		}
		
	}
	return { commonShowLoading, commonHideLoading, commonApi, commonEncode, navigate, commonConfirm, commonRegion, commonGetS3Img};
}