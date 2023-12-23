import { useDispatch, useSelector } from "react-redux"
import { isAuthenticatedSelector } from "../../redux/selectors/authSelector"
import { errorMessage, hideLoading, showLoading } from "../../redux/slices/commonSlice"
import { getUser } from "../../service/auth_service/authenticate"
import { deleteUser, setUser } from "../../redux/slices/authSlice"
import { deleteAllCookies } from "../../utils/cookie"
import { useEffect } from "react"

const GetUserData = () => {

    const isAuthen = useSelector(isAuthenticatedSelector)
    const dispatch = useDispatch()

    const getUser = async () => {
        if (isAuthen) {
            return
        }
        dispatch(showLoading())
        try {
            const res = await getUser()
            if (res.success) {
                dispatch(setUser(res.data))
            } else {
                await deleteAllCookies()
                dispatch(deleteUser())
            }
        } catch (error) {
            await deleteAllCookies()
            dispatch(deleteUser())
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <></>
    )
}

export default GetUserData