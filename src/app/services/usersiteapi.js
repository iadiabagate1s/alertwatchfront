import axios from 'axios';
import { BASE_URL } from '../util/index.js';

class UserSiteApi {
getAllSitesByUser(username) {
    console.log('url is ', `${BASE_URL}/usersites/${username}`)
return axios.get(`${BASE_URL}/usersites/${username}`)
}
getAllUsersAndSites() {
    return axios.get(`${BASE_URL}/usersites/user`)
}
linkUserSite(username, site) {
    return axios.post(`${BASE_URL}/usersites/link`, {username, site})
}
unlinkUserSite(username, site) {
    return axios.post(`${BASE_URL}/usersites/unlink`, {username, site})
}

}
export default new UserSiteApi()