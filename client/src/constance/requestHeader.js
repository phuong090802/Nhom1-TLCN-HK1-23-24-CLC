const commonHeader = { 'Content-Type': 'application/json' }
const authHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
const multipartHeader = (token) => {
    return {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }
}
export {
    commonHeader,
    authHeader,
    multipartHeader
}