import axios from 'axios'
// axios.defaults.baseURL = 'http://47.98.105.205:8087/findMoney/';

// 用户信息
axios.defaults.headers = {
  "c": "string",
  "ch": "string",
  "deviceIp": "string",
  "format": "string",
  "imei": "string",
  "imsi": "string",
  "lat": "string",
  "lng": "string",
  "osv": "string",
  "pf": "string",
  "pi": "string",
  "pm": "string",
  "sign": "string",
  "t": "string",
  "ui": "string",
  "v": "string",
  // "CINF": "string",
}
export default {
    //ajax请求
    async httpRequest(option = {}) {
        if (option.methods == 'GET' || option.methods == 'get') {
          return await axios.get(
            option.url, {
              params: option.data
            }, option.headers
          )
        } else if (option.methods == 'POST' || option.methods == 'post') {
          return await axios.post(
            option.url, option.data, option.headers
          )
        } else {
          console.log('method not allow!')
        }
    }
}
