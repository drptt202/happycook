import axios from "axios";

const axiosCustom1 = axios.create({
    //baseURL: 'https://food-blog-services.onrender.com/api/v1',
    baseURL: 'http://localhost:8080/api/v1',

    headers: {
        "Content-Type": `multipart/form-data: boundary=add-random-characters`,
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
});

export default axiosCustom1
