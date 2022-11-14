import axios from 'axios'
import {BASE_URL} from '../util/index.js'

class AuthApi {
    login(data) {
        console.log('data in api', data)
        let res =  axios.post(`${BASE_URL}/auth/login`,
        {
            username: data.username,
            password: data.password
        }
        
        )
        console.log('res in api', res)
        return res
    }
    forgotPassword(data) {
        let res =  axios.post(`${BASE_URL}/auth/forgotpassword`,
        {
            email: data.username,
        }
        
        )
        return res
    }
}
    export default new AuthApi()