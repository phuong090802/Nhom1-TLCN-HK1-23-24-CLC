import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StaffModuleHeader from "../../../components/staff_module_header"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchBar from "../../../components/search_bar/SearchBar";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice";
import { getUserList, updateUserStattus } from "../../../service/admin_service/adminUserService";
import { setUserList } from "../../../redux/slices/admin/adminUserSlice";
import { admUserList, admUserListPages } from "../../../redux/selectors/adminSelector";
import Table from '../../../components/table';
import Pagination from '../../../components/pagination';
import StaffButton from '../../../components/staff_button';
import AdminAddStaffModal from '../../../features/adm_add_staff_modal';
import AdminCoordinateStaffModal from '../../../features/adm_coordinate_staff_modal/AdminCoordinateStaffModal';
import Filter from '../../../components/filter';
import { collumns, initParams, roleFilterOptions, statusFilterOptions } from './const'

const AdminUser = () => {
    const dispatch = useDispatch()

    const [showAddStaff, setShowAddStaff] = useState(false)
    const [showCoordinateStaff, setShowCoordinateStaff] = useState(false)
    const [params, setParams] = useState(initParams)

    const userList = useSelector(admUserList)
    const totalPage = useSelector(admUserListPages)

    useEffect(() => {
        getUserListData()
    }, [params])

    const getUserListData = async () => {
        dispatch(showLoading())
        try {
            const response = await getUserList(params)
            if (response.success) {
                dispatch(setUserList(response.data))
            }
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }

    const handleUpdateUserStatus = async (userId) => {
        if (!confirm('Bạn muốn đổi trạng thái của người dùng ? ')) return

        dispatch(showLoading())
        try {
            const response = await updateUserStattus(userId)
            dispatch(successMessage(response?.message ? response.message : 'Cập nhật trạng thái người dùng thành công'))
            getUserListData()
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra'))
        } finally {
            dispatch(hideLoading())
        }
    }





    return (
        <>
            {showAddStaff &&
                <AdminAddStaffModal
                    handleClose={() => setShowAddStaff(false)}
                    onDataChange={getUserListData} />
            }
            {showCoordinateStaff &&
                <AdminCoordinateStaffModal
                    handleClose={() => setShowCoordinateStaff(false)}
                    onDataChange={getUserListData} />
            }

            <StaffModuleHeader role={'admin'} moduleTitle={'Quản lý người dùng'}>

                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => { setShowAddStaff(true) }}>
                            <AddCircleOutlineOutlinedIcon className='mb-1 mr-1' />Thêm nhân sự
                        </StaffButton>
                        <StaffButton oC={() => setShowCoordinateStaff(true)}>
                            <AddHomeOutlinedIcon className='mb-1 mr-1' />Phân phối nhân sự
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter name={'role'} params={params} setParams={setParams} data={roleFilterOptions} />
                        <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                    </div>
                </div >

                <Table
                    data={userList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    statusUpdate={handleUpdateUserStatus} />
                <Pagination totalPage={totalPage} params={params} setParams={setParams} />
            </StaffModuleHeader>
        </>
    )
}

export default AdminUser