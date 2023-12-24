import ModalLayout from "../../components/modal_layout/ModalLayout"
import Upload from "../../components/upload"

const UploadModal = ({ handleClose }) => {
    return (
        <ModalLayout handleClose={handleClose} title={'Cập nhật ảnh đại diện'} >
            <Upload handleClose ={handleClose}/>
        </ModalLayout>
    )
}
export default UploadModal