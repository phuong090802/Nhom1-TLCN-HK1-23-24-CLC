import { authHeader, commonHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getQuestionList = (params) => {
    return API.get('/questions', {
        headers: commonHeader,
        params: params
    })
}

const getQuestionDeatailById = (id) => {
    return API.get(`/questions/${id}`, {
        headers: commonHeader
    })
}

export {
    getQuestionList,
    getQuestionDeatailById
}