import HttpService from './httpService'
import Login from '../model/Login';
import Response from '../model/Response';

export default class LoginService  {
    // 账号状态
    static status(username: string): Promise<Response> {
        return HttpService({
            url: '/login/status',
            method: 'GET',
            params: { username: username }
        }).then((res) => {
            return res.data
        });
    }

    // 登录接口
    static login(data: Login): Promise<Response> {
        return HttpService({
            url: '/login',
            method: 'POST',
            params: data
        }).then((res)=>{
            return res.data
        })
    }
}