import { data } from 'autoprefixer'
import { authHeader, commonHeader } from '../../constance/requestHeader'
import auth from '../../pages/public/auth'
import { getCookieByName } from '../../utils/cookie'
import { API } from '../tvsvInstance'

const depHGetFieldListNoParmas = () => {
    return API.get('/department-head/fields', {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const depHGetFieldList = (params) => {
    return API.get('/departments/fields/my', {
        headers: authHeader(getCookieByName('accessToken')),
        params: params
    })
}

const depHGetFieldNotInDep = () => {
    return API.get('/department-head/departments/fields', {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const depHAddFieldDep = (data) => {
    return API.post('/department-head/fields', data, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

const depHDeleteFieldDep = (id)=>{
    return API.delete(`/department-head/fields/${id}`, {
        headers: authHeader(getCookieByName('accessToken'))
    })
}

export {
    depHGetFieldNotInDep,
    depHGetFieldList,
    depHGetFieldListNoParmas,
    depHAddFieldDep,
    depHDeleteFieldDep
}