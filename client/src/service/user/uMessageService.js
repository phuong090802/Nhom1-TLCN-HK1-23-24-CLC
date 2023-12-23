import { authHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getMessageList = (params) => {
    return API.get('/conversations', {
        headers: authHeader(getCookieByName('accessToken')),
        params :params
    })
}

const getAllMessage = id => {
    return API.get(`/conversations/${id}`, {
        headers:authHeader(getCookieByName("accessToken"))
    })
}

export {
    getMessageList,
    getAllMessage
}