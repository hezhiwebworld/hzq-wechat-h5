
import httpService from '../httpService'
import wxService from '../wxService'
import axios from 'axios'
// 全局配置
axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// import { mapState } from 'vuex'


function register(params) {
    httpService({
        methods: 'post',
        url: params.url,
        data: params.data
    }).then((response)=>{
        return response.data
    }).catch((response)=>{
        return response // TODO
    })
}


function login(params) {
    httpService({
        methods: 'post',
        url: params.url,
        data: params.data
    }).then((response)=>{
        return response.data
    }).catch((response)=>{
        return response // TODO
    })
}

export  {
    login,register
}