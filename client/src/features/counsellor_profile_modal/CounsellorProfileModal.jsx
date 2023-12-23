import CounsellorProfile from "../../components/counseller_profile"
import ModalLayout from "../../components/modal_layout"

const CounsellorProfileModal = ({ handleClose, counsellorProfile, toggle }) => {
    return (
        <ModalLayout handleClose={handleClose} title={'Thông tin nhân viên'}>
            <CounsellorProfile counsellor={counsellorProfile} />
            <div className="flex items-center justify-end mt-3">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => toggle()}
                >Thêm lĩnh vực</button>
            </div>
        </ModalLayout>
    )
}

export default CounsellorProfileModal