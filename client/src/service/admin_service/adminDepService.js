import { authHeader, commonHeader } from '../../constance/requestHeader'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const getDepList = (params) => {
    return API.get('/departments', {
        headers: commonHeader,
        params: params
    })
}

const updateDepStatus = (id) => {
    return API.patch(`/admin/departments/${id}`, {}, {
        headers: authHeader(getCookieByName('accessToken')),
    })
}

const createDep = (data) => {
    return API.post('/admin/departments', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const updateDep = (data) => {
    return API.put(`/admin/departments/${data.id}`, data.data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getDepById = (id) => {
    return API.get(`/departments/${id}`, {
    })
}

const getDepStaffById = (data) => {
    return API.get(`admin/users/departments/${data.depId}`, {
        headers: authHeader(getCookieByName('accessToken')),
        params: data.params
    })
}



const setDepHead = (ids) => {
    return API.patch(`/admin/department-head/users/${ids.userId}/departments/${ids.depId}`, {}, {
        headers: authHeader(getCookieByName('accessToken')),
    })
}
export {
    getDepList,
    updateDepStatus,
    createDep,
    updateDep,
    getDepById,
    getDepStaffById,
    setDepHead
}