import axios from "axios";
import ApiError from "./api-error";

// export default instance
let AdminAxiosInterceptor = axios.create({
    withCredentials: false,
})

AdminAxiosInterceptor.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ` + token : `Bearer `
        return config;
    }
)

AdminAxiosInterceptor.interceptors.response.use(
    response => {
        // TO STORE THE JWT TOKEN FROM RESPONSE
        return response
    },
    error => {
        console.error(error)
        return ApiError.errorHandler(error)

    }
)

export default AdminAxiosInterceptor


