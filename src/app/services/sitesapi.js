import axios from 'axios';
import { BASE_URL } from '../util/index.js';

class SiteApi {
getAllSites() {
    return axios.get(`${BASE_URL}/usersites/sites`)
}
createSite(data) {
    return axios.post(`${BASE_URL}/clientsite/`, data)

}
updateSite (data) {
    return axios.patch(`${BASE_URL}/clientsite/display_name`, data)

}
deleteSite (sitename) {
    return axios.delete(`${BASE_URL}/clientsite/${sitename}`)

}



}
export default new SiteApi()