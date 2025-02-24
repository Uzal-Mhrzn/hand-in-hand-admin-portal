import Axios from "./admin-axios-interceptor";
import { apiConstants } from "./ApiConstant";

//login
export async function loginUser(params: any) {
    return await Axios.post(apiConstants.LOGIN, params);
}