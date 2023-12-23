import { authHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getWaitingAnswer = (params) => {
    return API.get('/department-head/answers', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const getWaitingAnswerById = (id) => {
    return API.get(`/department-head/answers/questions/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const acceptAnswer = (id) => {
    return API.patch(`/department-head/answers/${id}`, {}, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const refuseAnswer = (data) => {
    return API.delete(`/department-head/answers/${data.id}`, {
        headers: authHeader(getCookieByName('accessToken')),
        data: data.data
    })
}

export {
    getWaitingAnswer,
    getWaitingAnswerById,
    acceptAnswer,
    refuseAnswer
}