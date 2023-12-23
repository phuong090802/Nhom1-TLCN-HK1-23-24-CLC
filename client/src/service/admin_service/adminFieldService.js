import { authHeader, commonHeader } from '../../constance/requestHeader'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const getFields = (params) => {
    return API.get('/fields', {
        headers: commonHeader,
        params: params
    })
}

const createField = (data) => {
    return API.post('/admin/fields', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const updateFieldStatus = (id) => {
    return API.patch(`/admin/fields/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

export {
    getFields,
    createField,
    updateFieldStatus
}