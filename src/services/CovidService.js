import axios from "axios";

axios.interceptors.response.use((response) => {
    //parse response
    return response;
}, (error) => {
    return Promise.reject(error.message);
});

class CovidService {

    constructor() {
        this.service = axios.create({
            baseURL: 'https://api.covid19tracking.narrativa.com/api',
        });
    }

    fetchCases = (date, country) => {
        //return csv("https://cnecovid.isciii.es/covid19/#documentaci%C3%B3n-y-datos")
        return this.service.get(`/${date}/country/${country}`)

        //name.charAt(0).toUpperCase() + name.slice(1)

        //https://documenter.getpostman.com/view/10831675/SzYZ1eNY#1ee5d60b-0d80-4e3b-8f64-25040d38bb83
        //https://api.covid19tracking.narrativa.com/api/:date/country/:country
        //https://api.covid19tracking.narrativa.com/api/country/spain?date_from=2021-03-01&date_to=2021-03-06
    }

}

export default new CovidService();