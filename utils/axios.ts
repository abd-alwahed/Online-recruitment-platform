import base from "axios"
import { toast } from "react-toastify";
import { BASE_SERVER_URL, BEARER } from "./constants"
import { responseParser } from "./responseParse";

export const axios = base.create({
    baseURL: BASE_SERVER_URL + '/api',
    withCredentials: true,

});

const errorHandler = (e) => {
    toast.error(e?.response?.data?.error?.message || 'Something went wrong');
    document.body.classList.remove('loading-indicator');
    return Promise.reject({ ...e });
}
axios.interceptors.request.use(function (config) {
    console.log(config.method)

    document.body.classList.add('loading-indicator');

    const token = window.localStorage.token;
    if (token) {
        config.headers.Authorization = `${BEARER} ${token}`
    }
    return config
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(

    (rs) => {
        console.log(rs)
        document.body.classList.remove('loading-indicator');
        rs.data = responseParser(rs.data);
        return rs;
    },
    e => errorHandler(e)
);
