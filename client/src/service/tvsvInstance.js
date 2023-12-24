import axios from "axios";
import { addCookie, deleteAllCookies, deleteCookieByName, getCookieByName } from "../utils/cookie";
import { refreshToken } from "./auth_service/authenticate";
import store from '../redux/store'
import { deleteUser } from "../redux/slices/authSlice";
import { successMessage } from "../redux/slices/commonSlice";

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    // timeout: 15000
})

API.interceptors.response.use(

    (response) => {
            return response.data;
        
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await refreshToken();
                deleteCookieByName('accessToken')
                addCookie('accessToken', response.data.token)
                originalRequest.headers.Authorization = `Bearer ${getCookieByName('accessToken')}`;
                return API(originalRequest);
            } catch (refreshError) {
                deleteAllCookies()
                store.dispatch(deleteUser())
                return Promise.reject(refreshError.response.data);
            }
        }
        return Promise.reject(error.response.data);
    }
);

export { API }


//backup
// async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             const response = await refreshToken();
//             deleteCookieByName('accessToken')
//             addCookie('accessToken', response.data.token)
//             originalRequest.headers.Authorization = `Bearer ${getCookieByName('accessToken')}`;
//             return API(originalRequest);
//         } catch (refreshError) {
//             deleteAllCookies()
//             store.dispatch(deleteUser())
//             return Promise.reject(refreshError.response.data);
//         }
//     }
//     return Promise.reject(error.response.data);
// }