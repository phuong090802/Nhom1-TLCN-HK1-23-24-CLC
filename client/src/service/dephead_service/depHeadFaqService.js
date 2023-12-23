import { authHeader } from "../../constance/requestHeader"
import { API } from "../tvsvInstance"
import { getCookieByName } from "../../utils/cookie"

const getFaqList = (params) => {
    return API.get('/department-head/faqs', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const deleteFaq = (id) => {
    return API.delete(`/department-head/faqs/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const createFaq = data => {
    return API.post('/department-head/faqs', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const updateFaq = data => {
    return API.put(`/department-head/faqs/${data.id}`, data.data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}
export {
    getFaqList,
    deleteFaq,
    createFaq,
    updateFaq
}