import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name) => {
    console.log('getCookie')
  return cookies.get(name)
}