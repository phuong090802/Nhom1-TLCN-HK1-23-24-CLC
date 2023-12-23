import { authHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getFeedBackList = (params) => {
    return API.get('/feedbacks', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}
const deleteFeedback = (id) => {
    return API.delete(`/feedbacks/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const deleteAllFeedbacks = () => {
    return API.delete('/feedbacks', {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

export {
    getFeedBackList,
    deleteFeedback,
    deleteAllFeedbacks
}