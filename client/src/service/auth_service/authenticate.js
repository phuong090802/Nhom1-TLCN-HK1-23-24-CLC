import { authHeader, commonHeader } from '../../constance/requestHeader'
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

const getUser = () => { return API.get('/auth/me', { headers: authHeader(getCookieByName('accessToken')) }) }

export {
    regsiter,
    login,
    logout,
    getUser,
    refreshToken,
    requestResetPassword,
    resetPassword,
    updateUserInfor
}
