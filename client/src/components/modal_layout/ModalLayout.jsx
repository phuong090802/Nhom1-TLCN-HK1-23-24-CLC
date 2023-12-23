import CloseIcon from '@mui/icons-material/Close';

const ModalLayout = ({ children, handleClose, title }) => {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center content-center bg-gray-400/50 z-50">
            <div className="bg-white p-8 rounded shadow-md relative min-w-[400px]">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => handleClose()}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className="text-2xl font-semibold mb-6">{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default ModalLayout