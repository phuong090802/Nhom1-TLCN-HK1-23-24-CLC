import { useEffect, useState } from "react"
import ModalLayout from "../../components/modal_layout"
import SearchBar from "../../components/search_bar/SearchBar"
import StaffCoordinateList from "../../components/staff_coordinate_list/StaffCoordinateList"
import Pagination from "../../components/pagination"
import { useDispatch, useSelector } from "react-redux"
import { admInteractingDepId } from "../../redux/selectors/adminSelector"
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice"
import { getDepStaffById, setDepHead } from "../../service/admin_service/adminDepService"
import blankAvt from '../../assets/image/blank_avt.png'
import AddHomeIcon from '@mui/icons-material/AddHome';


const AdminDepDetailModal = ({ handleClose, handleSetDep }) => {
    const dispatch = useDispatch()

    const depId = useSelector(admInteractingDepId)

    const initParams = { page: 0, size: 6 }

    const [params, setParams] = useState(initParams)

    const [totalPage, setTotalPage] = useState(0)

    const [userList, setUserList] = useState([])

    const [depH, setDepH] = useState({})

    useEffect(() => {
        getDepData()
    }, [params])

    const getDepData = async () => {
        dispatch(showLoading())
        try {
            const response = await getDepStaffById({ depId: depId, params: params })
            if (response.success) {
                setUserList(response.data.counsellor.items)
                setTotalPage(response.data.counsellor.pages)
                setDepH(response.data.departmentHead)
            }

        } catch (error) {
            dispatch(errorMessage(error?.response?.message || 'Có lỗi xảy ra AdminDepDetailModal'))
        } finally {
            dispatch(hideLoading())
        }
    }

    // const handleButtonClick = async (userId) => {
    //     await handleSetDep({ depId: depId, userId: userId })
    //     getDepData()
    // }


    const handleSetDepHead = async (userId) => {
        if (!confirm('Bạn muốn thay đổi trưởng khoa?')) return
        dispatch(showLoading())
        try {
            const data = { depId: depId, userId: userId }
            const response = await setDepHead(data)
            dispatch(successMessage(response?.message ? response.message : 'Thêm trưởng khoa thành công'))
            getDepData()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    return (
        <ModalLayout handleClose={handleClose} title={'Thông tin khoa'}>
            <div className="flex items-center mb-4 w-full">
                <img src={depH?.avatar ? depH.avatar : blankAvt} alt={'depHead'} className="w-12 h-12 rounded-md mr-4" />
                <div className='flex justify-between w-full'>
                    <div>
                        <h3 className="text-md font-semibold">{depH?.name ? depH.name : 'Chưa có trưởng khoa'}</h3>
                        <p className="text-gray-500 text-sm">{depH?.email ? depH.email : ''}</p>
                    </div>
                </div>
            </div>
            <SearchBar params={params} setParams={setParams} />

            <div className="mb-4">
                < StaffCoordinateList staffList={userList} handleButtonClick={handleSetDepHead} />
            </div>

            <Pagination
                params={params}
                setParams={setParams}
                totalPage={totalPage}
            />
        </ModalLayout>
    )
}

export default AdminDepDetailModal