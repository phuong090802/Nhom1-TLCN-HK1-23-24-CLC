import ModalLayout from "../../components/modal_layout"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorMessage, hideLoading, showLoading, successMessage } from '../../redux/slices/commonSlice'
import { admInteractingDepId } from "../../redux/selectors/adminSelector"
import { getDepById, updateDep } from "../../service/admin_service/adminDepService"

const AdminEditDepModal = ({ handleClose, dataOnchange }) => {

    const dispatch = useDispatch()

    const depId = useSelector(admInteractingDepId)

    const [initDepInfor, setInitDepInfor] = useState({})
    const [onInteract, setOnInteract] = useState(false)

    const [depInfor, setDepInfor] = useState({})

    const onInputChange = (e) => {
        setOnInteract(true)
        setDepInfor({
            ...depInfor,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getUserData()
    }, [depId])

    const getUserData = async () => {
        if (depId === '') return
        dispatch(showLoading())
        try {
            const response = await getDepById(depId)
            if (response.success) {
                setDepInfor({
                    name: response.data.name,
                    description: response.data.description
                })
                setInitDepInfor({
                    name: response.data.name,
                    description: response.data.description
                })
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }


    const handleEditDep = async () => {
        if (!onInteract) return

        dispatch(showLoading())
        try {
            const data = { id: depId, data: depInfor }
            const response = await updateDep(data)
            dispatch(successMessage(response?.message ? response.message : 'Chỉnh sửa khoa thành công'))
            dataOnchange()
            setOnInteract(false)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại AdminDepartment'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Cập nhật thông tin khoa'}>
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
                    <button className={`px-4 py-2 duration-500 ${onInteract ? 'bg-red-500 hover:bg-red-600 text-white rounded-md  focus:outline-none focus:ring focus:border-red-300' : 'hidden'} mx-3`}
                        onClick={() => {
                            setDepInfor(initDepInfor)
                            setOnInteract(!onInteract)
                        }}>Hủy</button>
                    <button className={`px-4 py-2 duration-500 ${onInteract ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-default'} text-white rounded-md  focus:outline-none focus:ring focus:border-yellow-300`}
                        onClick={() => handleEditDep()}>Chỉnh sửa</button>
                </div>
            </div>
        </ModalLayout>
    )
}
export default AdminEditDepModal