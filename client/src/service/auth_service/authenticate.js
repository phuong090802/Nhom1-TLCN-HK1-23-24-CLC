import { authHeader, commonHeader, multipartHeader } from '../../constance/requestHeader'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const refreshToken = () => {
    return API.post('/auth/refresh-token', {}, {
        headers: commonHeader,
        withCredentials: true
    })
}

const login = (data) => {
    return API.post('/auth/login', data, {
        headers: commonHeader,
        withCredentials: true
    })
}

const regsiter = (data) => {
    return API.post('/auth/register', data, {
        headers: commonHeader
    })
}

const logout = () => {
    return API.post('/auth/logout', {}, {
        headers: commonHeader,
        withCredentials: true
    })
}

const requestResetPassword = (data) => {
    return API.post('/password/forgot', data, {
        headers: commonHeader
    })
}

const resetPassword = (data) => {
    return API.post(`/password/reset/${data.id}`, data.data, {
        headers: commonHeader
    })
}

const updateUserInfor = (data) => {
    return API.put('/users', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const updateUserAvatar = (data) => {
    return API.patch('/users/avatar', data ,{
        headers: multipartHeader(getCookieByName('accessToken'))
    })
}

const getCounsellorList = (params) => {
    return API.get('/departments/staffs', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const getUser = () => { return API.get('/auth/me', { headers: authHeader(getCookieByName('accessToken')) }) }

export {
    regsiter,
    login,
    logout,
    getUser,
    refreshToken,
    requestResetPassword,
    resetPassword,
    updateUserInfor,
    updateUserAvatar,
    getCounsellorList
}
