import { Outlet, useNavigate } from "react-router"
import Header from "../../components/header"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { logout } from "../../service/auth_service/authenticate"
import { deleteAllCookies } from "../../utils/cookie"
import { deleteUser } from "../../redux/slices/authSlice"
import Footer from "../../components/footer"


const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        dispatch(showLoading())
        try {
            const res = await logout()
            dispatch(deleteUser())
        } catch (error) {
            dispatch(deleteUser())
        } finally {
            deleteAllCookies()
            dispatch(hideLoading())
            dispatch(successMessage('Đăng xuất thành công'))
            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }

    return (
        <>
            <Header handleLogout={handleLogout}></Header>
            <div className="min-h-[550px]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Layout