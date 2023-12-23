import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = () => {
    return <div className="fixed top-0 right-0 z-[99]">
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className={'absolute'}
        />
    </div>
}

export default ToastMessage