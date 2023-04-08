import axios from "axios";

const axiosCustom = axios.create({
    baseURL: 'https://food-blog-services.onrender.com/api/v1',
    // baseURL: 'http://localhost:8080/api/v1',

    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
});

export default axiosCustom
