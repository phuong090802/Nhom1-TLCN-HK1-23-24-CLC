import { authHeader, commonHeader } from '../../constance/requestHeader'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const getUserList = (params) => {
    return API.get('/admin/users', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const updateUserStattus = (id) => {
    return API.patch(`/admin/users/${id}`, {}, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const createStaff = (data) => {
    return API.post('/admin/users', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const getDepList = () => {
    return API.get('/departments/all')
}

const getNewCounsellor = (params) => {
    return API.get('/admin/users/department-is-null', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const coordinateUser = (ids) => {
    return API.patch(`/admin/users/${ids.userId}/departments/${ids.depId}`, {}, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}


export {
    getUserList,
    updateUserStattus,
    createStaff,
    getDepList,
    getNewCounsellor,
    coordinateUser
}