import logo from "../../assets/image/logo.png"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="flex items-center my-5">
                <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <p className="font-roboto font-bold mb-2">GVHD: Nguyễn Hữu Trung</p>
                    <p className="font-roboto ">Nhóm 1:</p>
                    <p className="font-roboto ml-3">Trần Nhật Hào - 20110471</p>
                    <p className="font-roboto ml-3">Trần Thanh Phương - 20110547</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer