import { useDispatch } from "react-redux"
import ModalLayout from "../../components/modal_layout"
import { useState } from "react"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { createField } from "../../service/admin_service/adminFieldService"

const AdminCreateFieldModal = ({ handleClose, dataOnchange }) => {


    const dispatch = useDispatch()

    const initFieldInfo = { name: '' }

    const [fieldInfo, setFieldInfo] = useState(initFieldInfo)

    const handleInputOnchange = async (e) => {
        setFieldInfo({ name: e.target.value })
    }


    const handleCreateField = async () => {
        if (fieldInfo.name === '') {
            dispatch(errorMessage('Tên lĩnh vực không được để trống'))
            return
        }
        dispatch(showLoading())
        try {
            const response = await createField(fieldInfo)
            dispatch(successMessage(response?.message ? response.message : 'Thêm lĩnh vực thành công'))
            dataOnchange()
            setFieldInfo({ name: '' })
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminField'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Thêm lĩnh vực'}>
            <div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên lĩnh vực</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={fieldInfo.name}
                        onChange={e => handleInputOnchange(e)}
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button className={`px-4 py-2  text-white rounded-md duration-500 ${fieldInfo.name === '' ? 'bg-gray-300 cursor-default' : 'bg-green-600 hover:bg-green-500 focus:outline-none focus:ring focus:border-green-300 cursor-pointer'}`}
                        onClick={() => handleCreateField()}>Thêm</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default AdminCreateFieldModal