import { authHeader, commonHeader } from '../../constance/requestHeader'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const getCounsellorList = (params) => {
    return API.get('department-head/users', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const updateCounsellorStatus = (id) => {
    return API.patch(`/department-head/users/${id}`, {}, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const createCounsellor = (data) => {
    return API.post('/department-head/users', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getCounsellorById = (id) => {
    return API.get(`/department-head/users/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getFieldCounsellorNotHave = (id) => {
    return API.get(`/department-head/fields/users/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const addFieldsToCounsellor = (data) => {
    console.log(data);
    return API.post(`/department-head/fields/users/${data.id}`, data.fieldIds, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

export {
    getCounsellorList,
    updateCounsellorStatus,
    createCounsellor,
    getCounsellorById,
    getFieldCounsellorNotHave,
    addFieldsToCounsellor
}