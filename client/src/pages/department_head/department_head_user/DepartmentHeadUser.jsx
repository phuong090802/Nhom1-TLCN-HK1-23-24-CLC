import { useEffect, useState } from "react";
import StaffButton from "../../../components/staff_button/StaffButton"
import StaffModuleHeader from "../../../components/staff_module_header/StaffModuleHeader"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchBar from "../../../components/search_bar/SearchBar";
import Filter from "../../../components/filter";
import Pagination from "../../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../../redux/slices/commonSlice";
import { createCounsellor, getCounsellorList, updateCounsellorStatus } from "../../../service/dephead_service/depCounsellorService";
import { setInteractingUserId, setTotalPage, setUserList } from "../../../redux/slices/department_head/depHeadUserSlice";
import { depHUserList, depHUserListPages } from "../../../redux/selectors/depHeadSelector";
import Table from "../../../components/table";
import DepHeadCreateCounsellor from "../../../features/dep_create_counsellor_modal/DepHeadCreateCounsellor";
import DepHeadDetailCounModal from "../../../features/dep_detail_counsellor_modal/DepHeadDetailCounModal";
import { initParams, collumns, statusFilterOptions } from './const'


const DepartmentHeadUser = () => {
    const dispatch = useDispatch()



    const counsellerList = useSelector(depHUserList)
    const totalPage = useSelector(depHUserListPages)

    const [params, setParams] = useState(initParams)
    const [showCreateCounsellor, setShowCreateCounsellor] = useState(false)
    const [showDetailCounsellor, setShowDetailCounsellor] = useState(false)

    useEffect(() => {
        getCounListData()
    }, [params])

    const getCounListData = async () => {
        try {
            const response = await getCounsellorList(params)
            dispatch(setUserList(response.data.items))
            dispatch(setTotalPage(response.data.pages))
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại DepHeadUser'))
        }
    }

    const updateCounStatus = async (id) => {
        if (!confirm('Đổi trạng thái nhân viên')) return

        try {
            const response = await updateCounsellorStatus(id)
            const message = response.data ? 'Đã mở khóa tư vấn viên' : 'Đã khóa tư vấn viên'
            dispatch(successMessage(message))
            getCounListData()
        } catch (error) {
            console.log(error);
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại DepUser'))
        } 
    }

    const CounsellorOnDetail = (id) => {
        dispatch(setInteractingUserId(id))
        setShowDetailCounsellor(true)
    }


    return (
        <>
            {showCreateCounsellor &&
                <DepHeadCreateCounsellor
                    handleClose={() => setShowCreateCounsellor(false)}
                    onDataChange={getCounListData} />}
            {showDetailCounsellor &&
                <DepHeadDetailCounModal
                    handleClose={() => setShowDetailCounsellor(false)} />}
            <StaffModuleHeader role={'departmentHead'} moduleTitle={'Quản lý nhân sự'} >
                <div className="grid grid-cols-1 lg:grid-cols-2 my-4">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                        <StaffButton oC={() => { setShowCreateCounsellor(true) }}>
                            <AddCircleOutlineIcon className="mb-1 mr-1" />Thêm tư vấn viên
                        </StaffButton>
                    </div>
                    <div className="flex justify-start lg:justify-end space-x-4">
                        <SearchBar params={params} setParams={setParams} />
                        <Filter name={'status'} params={params} setParams={setParams} data={statusFilterOptions} />
                    </div>
                </div>

                <Table
                    data={counsellerList}
                    collumns={collumns}
                    page={params.page}
                    size={params.size}
                    action={true}
                    onDetail={CounsellorOnDetail}
                    statusUpdate={updateCounStatus}
                />
                <Pagination totalPage={totalPage} params={params} setParams={setParams} />
            </StaffModuleHeader>
        </>
    )
}

export default DepartmentHeadUser