import { useEffect, useState } from "react"
import StaffButton from "../../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../../components/search_bar/SearchBar";
import Filter from "../../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { admDepList, admDepListPages } from "../../../redux/selectors/adminSelector";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice";
import { getDepList, updateDepStatus } from "../../../service/admin_service/adminDepService";
import { setDep, setInteractingDepId } from "../../../redux/slices/admin/adminDepSlice";
import Table from "../../../components/table";
import AdminCreateDepModal from "../../../features/adm_create_dep_modal/AdminCreateDepModal";
import AdminEditDepModal from "../../../features/adm_edit_dep_modal/AdminEditDepModal";
import AdminDepDetailModal from "../../../features/adm_dep_detail_modal/AdminDepDetailModal";
import { collumns, statusFilterOptions } from './const'
import Pagination from "../../../components/pagination";



export const AdminDepartment = () => {
    const dispatch = useDispatch()

    const totalPage = useSelector(admDepListPages)
    const depList = useSelector(admDepList)

    const [showAddDepModal, setAddDepModal] = useState(false)
    const [showEditDepModal, setShowEditDepModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [params, setParams] = useState({ page: 0, size: 5 })

    useEffect(() => {
        getDepData()
    }, [params])

    const getDepData = async () => {
        dispatch(showLoading())

        try {
            const response = await getDepList(params)
            if (response.success) {
                dispatch(setDep(response.data))
                console.log(response.data);
            } else {
                dispatch(errorMessage('Có lỗi xảy ra'))
            }
        } catch (error) {
            dispatch(errorMessage('Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleDepStatusUpdate = async (id) => {
        if (!confirm('Bạn muốn thay đổi trạng thái khoa ?')) return

        dispatch(showLoading())

        try {
            const response = await updateDepStatus(id)
            dispatch(successMessage(response.message || 'Cập nhật trạng thái khoa thành công'))
            getDepData()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading)
        }
    }

    const buttonEditClick = (id) => {
        dispatch(setInteractingDepId(id))
        setShowEditDepModal(true)
    }

    const buttonDetailClick = (id) => {
        dispatch(setInteractingDepId(id))
        setShowDetailModal(true)
    }


    return (
        <>
            {showAddDepModal &&
                <AdminCreateDepModal
                    handleClose={() => setAddDepModal(false)}
                    dataOnchange={getDepData} />}
            {showEditDepModal &&
                <AdminEditDepModal
                    handleClose={() => setShowEditDepModal(false)}
                    dataOnchange={getDepData} />}
            {showDetailModal &&
                <AdminDepDetailModal
                    handleClose={() => setShowDetailModal(false)} />
            }
                <StaffModuleHeader role={'admin'} moduleTitle={'Quản lý khoa'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => setAddDepModal(true)}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm khoa
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                    </div>
                </div>
                <Table
                    data={depList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    statusUpdate={handleDepStatusUpdate}
                    action={true}
                    onUpdate={buttonEditClick}
                    onDetail={buttonDetailClick}
                />

                <Pagination totalPage={totalPage} params={params} setParams={setParams} />
            </StaffModuleHeader>
        </>
    )
}

export default AdminDepartment