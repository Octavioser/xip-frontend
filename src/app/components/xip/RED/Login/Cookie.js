import { Cookies } from "react-cookie"

export const useCookie = () => {
	const cookies = new Cookies();
	const setCookie = (name, value, option) => {
		return cookies.set(name, value, { ...option })
	}
	
	const getCookie = (name) => {
		return cookies.get(name)
	}

	const removeCookie = (name) => {
		console.log(name)
		return cookies.remove(name, { path: '/'})
	}
	return {setCookie, getCookie, removeCookie}
}



