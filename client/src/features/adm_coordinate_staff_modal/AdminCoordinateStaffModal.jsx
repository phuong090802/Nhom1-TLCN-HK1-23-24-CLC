import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { errorMessage, hideLoading, showLoading, successMessage } from '../../redux/slices/commonSlice';
import { coordinateUser, getDepList, getNewCounsellor } from '../../service/admin_service/adminUserService';
import SearchBar from '../../components/search_bar/SearchBar';
import StaffCoordinateList from '../../components/staff_coordinate_list/StaffCoordinateList';
import Pagination from '../../components/pagination';
import { removeAccents } from '../../utils/string';
import ModalLayout from '../../components/modal_layout/ModalLayout';

const AdminCoordinateStaffModal = ({ handleClose, onDataChange }) => {

    const dispatch = useDispatch()

    const initUpdateInfor = {
        userId: '',
        depId: '',
        depName: 'Chọn khoa'
    }
    const initParams = {
        page: 0,
        size: 6
    }
    const [searchKey, setSearchKey] = useState('')
    const [totalPage, setTotalPage] = useState(0)

    const [showDropdown, setShowDropDown] = useState(false)
    const [updateInfor, setUpdateInfor] = useState(initUpdateInfor)
    const [depList, setDepList] = useState([])
    const [userList, setUserList] = useState([])
    const [params, setParams] = useState(initParams)


    useEffect(() => {
        getDepData()
    }, [params])

    const getDepData = async () => {
        dispatch(showLoading())
        try {
            const responseDep = await getDepList()
            const responseUser = await getNewCounsellor(params)

            if (responseDep.success) setDepList(responseDep.data)
            else dispatch(errorMessage(errorMessage.responseDep?.message || 'Lỗi lấy dữ liệu'))

            if (responseUser.success) {
                setUserList(responseUser.data.items)
                setTotalPage(responseUser.data.pages)
            }
            else dispatch(errorMessage(errorMessage.responseUser?.message || 'Lỗi lấy dữ liệu'))

        } catch (error) {
            dispatch(errorMessage(errorMessage.response?.message || 'Lỗi lấy dữ liệu'))
        } finally {
            dispatch(hideLoading())
        }
    }


    const handleSelectBoxChange = e => {
        setShowDropDown(false)
        setUpdateInfor({
            ...updateInfor,
            depId: e.target.value,
            depName: depList.find((dep) => dep.id === e.target.value).name
        })
    }
    const handlePage = (page) => {
        setParams({
            ...params,
            page: page
        })
    }

    const handleSearch = (value) => {
        if (!params.value && value === '') return
        else if (params.value && value === '') {
            setParams(Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== 'value')))
        } else {
            setParams({
                ...params,
                value: removeAccents(value),
                page: 0
            })
        }
    }

    const handleCoordinateUser = async (staffId) => {
        if (updateInfor.depId === '') {
            dispatch(errorMessage('Chưa chọn khoa'))
            return
        }

        if (!confirm('Chuyển người dùng vào khoa ?')) return

        dispatch(showLoading())

        try {
            const data = {
                depId: updateInfor.depId,
                userId: staffId
            }
            const res = await coordinateUser(data)
            dispatch(successMessage(res.message || 'Thêm người dùng vào khoa thành công'))
            getDepData()
        } catch (error) {
            console.log('catch');
            dispatch(errorMessage(error?.message ? error.message : 'Có lỗi xảy ra tại CoordinateModal'))
        } finally {
            dispatch(hideLoading())
        }
    }





    return (
        <ModalLayout handleClose={handleClose} title={'Phân phối nhân sự'}>
            <div>
                <div className="mb-4 font-roboto">
                    <label htmlFor="name" className="block text-xl font-bold mb-4 font-roboto">Chọn khoa</label>
                    <div className='relative'>
                        <input
                            type="text"
                            name="name"
                            value={updateInfor.depName}
                            className="mt-1 p-2 border rounded-md block w-full cursor-pointer" readOnly
                            onClick={() => setShowDropDown(!showDropdown)} />
                        {showDropdown && <select
                            className="mt-1 p-2 border rounded-md absolute w-full z-10"
                            size={10}
                            onChange={(e) => handleSelectBoxChange(e)}
                            onBlur={() => setShowDropDown(false)}>
                            {depList && depList.map((dep) => {
                                return (<option key={dep.id} value={dep.id} name={dep.name} className='hover:bg-gray-200'>{dep.name}</option>)
                            })}
                        </select>}
                    </div>
                </div>

                <SearchBar params={params} setParams={setParams} />

                <div className="mb-4">
                    <StaffCoordinateList staffList={userList} handleButtonClick={handleCoordinateUser} />
                </div>

                <Pagination
                    params={params}
                    setParams={setParams}
                    totalPage={totalPage}
                />
            </div>
        </ModalLayout>
    )
}

export default AdminCoordinateStaffModal