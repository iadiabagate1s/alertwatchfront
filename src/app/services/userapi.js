import axios from 'axios';
import {BASE_URL} from '../util/index.js'

class UserApi {
    getAll() {
    return axios.get(`${BASE_URL}/user`)
  }
    get(usernmae) {
 return axios.get(`${BASE_URL}/user/${usernmae}`)
  }
    create(data) {
 return axios.post(`${BASE_URL}/user`, data)
  }
    updatePassword(data) {
 return axios.patch(`${BASE_URL}/user/password`, data)
  }
  update(data) {
    return axios.put(`${BASE_URL}/user`, data)
    }
    delete(id) {
 return axios.delete(`${BASE_URL}/user/${id}`)
  }

}
export default new UserApi()