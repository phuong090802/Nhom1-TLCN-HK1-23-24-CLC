import { useState } from 'react'
import ModalLayout from '../../components/modal_layout'
import { useDispatch } from 'react-redux'
import { errorMessage, hideLoading, showLoading, successMessage } from '../../redux/slices/commonSlice'
import { createDep } from '../../service/admin_service/adminDepService'

const AdminCreateDepModal = ({ handleClose, dataOnchange }) => {
    const dispatch = useDispatch()

    const initDepInfor = {
        name: '', description: ''
    }

    const [depInfor, setDepInfor] = useState(initDepInfor)

    const onInputChange = (e) => {
        setDepInfor({
            ...depInfor,
            [e.target.name]: e.target.value
        })
    }


    const handleCreateDep = async () => {

        if (depInfor.name === '' || depInfor.description === '') {
            dispatch(errorMessage('Tên và miêu tả khoa không được để trống'))
            return
        }

        dispatch(showLoading())
        try {
            const response = await createDep(depInfor)
            dispatch(successMessage(response?.message || 'Thêm khoa thành công'))
            setDepInfor(initDepInfor)
            dataOnchange()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <>
            <ModalLayout handleClose={handleClose} title={'Thêm khoa'}>
                <div>
                    <div className="mb-4 font-roboto">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 font-roboto">Tên khoa</label>
                        <input
                            type="text"
                            id='name'
                            name="name"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={depInfor.name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Mô tả</label>
                        <input
                            type="text"
                            id='description'
                            name="description"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={depInfor.description}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button className="px-4 py-2 duration-500 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                            onClick={() => handleCreateDep()}>Thêm</button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}
export default AdminCreateDepModal