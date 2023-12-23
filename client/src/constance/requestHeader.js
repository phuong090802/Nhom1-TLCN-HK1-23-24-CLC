import { getCookieByName } from "../utils/cookie"

const commonHeader = { 'Content-Type': 'application/json' }
const authHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
export {
    commonHeader,
    authHeader
}