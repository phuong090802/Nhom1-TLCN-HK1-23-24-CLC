import { authHeader, commonHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const counsellorGetQuestionList = (params) => {
    return API.get('/staff/questions', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const depHGetQuestionList = (params) => {
    return API.get('/department-head/questions', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const counsellorOwnField = () => {
    return API.get('/staff/fields', {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getQuestionById = (id) => {
    return API.get(`/staff/questions/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const increaseView = (id) => {
    return API.patch(`/questions/${id}`, {}, {
        headers: commonHeader
    })
}

const responseQuestion = (data) => {
    return API.post('/staff/answers', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const privateResponse = (data) => {
    return API.post('/staff/messages', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const forwardQuestion = (data) => {
    return API.patch(`/staff/questions/${data.questionId}/departments/${data.departmentId}`, {}, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getFAQs = (params) => {
    return API.get('/faqs', {
        headers: commonHeader,
        params: params
    })
}

export {
    counsellorGetQuestionList,
    counsellorOwnField,
    getQuestionById,
    responseQuestion,
    forwardQuestion,
    depHGetQuestionList,
    increaseView,
    getFAQs,
    privateResponse
}