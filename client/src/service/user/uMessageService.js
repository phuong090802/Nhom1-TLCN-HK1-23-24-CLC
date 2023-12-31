import { authHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getMessageList = (params) => {
    return API.get('/conversations', {
        headers: authHeader(getCookieByName('accessToken')),
        params :params
    })
}

const getAllMessage = (data) => {
    return API.get(`/conversations/${data.id}`, {
        headers:authHeader(getCookieByName("accessToken")),
        params: data.params
    })
}

export {
    getMessageList,
    getAllMessage
}