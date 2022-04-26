import axios, { AxiosError } from 'axios';
import Auth from './Auth';

/*

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/"
});*/

const axiosInstance = axios.create({
    baseURL: `${window.location.origin}/api/`
});

axiosInstance.interceptors.request.use((config) => {
    if(Auth.isAuth()){
        const token = Auth.getToken();
        config.headers = {...config.headers, Authorization: token}
        return config;
    } else {
        return config;
    }
});


axiosInstance.interceptors.response.use((config) => {
    return config
}, (error: AxiosError) => {
    const json : any = error.toJSON();
    if((json.status as number) === 401){
        Auth.logout();
        window.location.href = window.location.origin + "/login";
    };

});

export default axiosInstance;