import HttpService from './httpService'
import Login from '../model/Login';
const LoginService = {
    // 账号状态
    status: (username: string) => {
        return HttpService({
            url: '/login/status',
            method: 'GET',
            params: { username: username }
        }) 
    },

    // 登录接口
    login: (data: Login) => {
        return HttpService({
            url: '/login',
            method: 'POST',
            params: data
        })
    }
}

export default LoginService;