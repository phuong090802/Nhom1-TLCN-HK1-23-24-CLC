import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isAuthenticatedSelector, userSelector } from "../redux/selectors/authSelector"
import { Navigate, Outlet } from "react-router"
import { getForwardLink } from "../utils/route"
import { showLoading, errorMessage, hideLoading } from "../redux/slices/commonSlice"
import { getUser } from "../service/auth_service/authenticate"
import { deleteAllCookies } from "../utils/cookie"
import { deleteUser, setUser } from "../redux/slices/authSlice"

const SupervisorRoute = () => {

    const dispatch = useDispatch()

    const [firstRender, setFirstRender] = useState(true)

    const isAuthen = useSelector(isAuthenticatedSelector)

    const user = useSelector(userSelector)


    const getUserData = async () => {
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
                dispatch(errorMessage('Không đủ quyền truy cập. Vui lòng đăng nhập'))
            }
        } catch (error) {
            await deleteAllCookies()
            dispatch(deleteUser())
            dispatch(errorMessage('Không đủ quyền truy cập. Vui lòng đăng nhập'))
        } finally {
            dispatch(hideLoading())
            setFirstRender(false)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {
                isAuthen ?
                    (user.role === 'ROLE_SUPERVISOR') ?
                        <Outlet></Outlet>
                        :
                        <Navigate to={getForwardLink(user.role)}></Navigate>
                    :
                    (firstRender) ?
                        <div className="h-[515px] flex justify-center items-center"></div>
                        :
                        <Navigate to={getForwardLink('/home')}></Navigate>
            }
        </>
    )
}

export default SupervisorRoute