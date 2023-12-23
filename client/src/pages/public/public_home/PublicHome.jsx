import { useEffect } from "react"
import HomeBanner from "../../../components/home_banner"
import HomeContent from "../../../features/home_content/HomeContent"
import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading } from "../../../redux/slices/commonSlice"
import { deleteUser, setUser } from "../../../redux/slices/authSlice"
import { getUser } from "../../../service/auth_service/authenticate"
import { deleteAllCookies } from "../../../utils/cookie"
import { isAuthenticatedSelector } from "../../../redux/selectors/authSelector"

const PublicHome = () => {


    const isAuthen = useSelector(isAuthenticatedSelector)
    const dispatch = useDispatch()

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
            }
        } catch (error) {
            await deleteAllCookies()
            dispatch(deleteUser())
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return <>
        <HomeBanner isAuthen={isAuthen}></HomeBanner>
        <HomeContent></HomeContent>
    </>
}

export default PublicHome