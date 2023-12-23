import { authHeader } from "../../constance/requestHeader"
import { getCookieByName } from "../../utils/cookie"
import { API } from "../tvsvInstance"

const getDepList = () => {
    return API.get('/departments/all')
}
const getFieldList = (id) => {
    return API.get(`/fields/departments/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}
const createQuestion = (data) => {
    return API.post('/users/questions', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

export {
    createQuestion,
    getDepList,
    getFieldList,
}