import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import { isAuthenticatedSelector } from "../redux/selectors/authSelector"

const ProtectedRoute = () => {

    const isAuthenticate = useSelector(isAuthenticatedSelector)

    return isAuthenticate ? <Outlet /> : <Navigate to={'/'}/>
}

export default ProtectedRoute