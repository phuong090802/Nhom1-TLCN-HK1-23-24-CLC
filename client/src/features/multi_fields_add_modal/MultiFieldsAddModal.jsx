import { useState } from "react";
import ModalLayout from "../../components/modal_layout"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { depHAddFieldDep } from "../../service/dephead_service/depFieldService";
import { errorMessage, hideLoading, showLoading, successMessage } from "../../redux/slices/commonSlice";
import { useDispatch } from "react-redux";



const MultiFieldsAddModal = ({ handleClose, initFieldList, toggle }) => {

    const dispatch = useDispatch()
    const [remainField, setRemainField] = useState(initFieldList ? initFieldList : [])
    const [chooseField, setChooseField] = useState([]);

    const handleChoose = (fieldId) => {
        setRemainField(
            remainField.filter(field => field.id !== fieldId)
        )
        setChooseField([
            ...chooseField,
            remainField.find(field => field.id === fieldId)
        ])
    }

    const handleUnchoose = (fieldId) => {
        setRemainField([
            chooseField.find(field => field.id === fieldId),
            ...remainField,
        ])
        setChooseField(
            chooseField.filter(field => field.id !== fieldId)
        )
    }

    const handleAddField = async () => {
        if (chooseField.length === 0) return

        dispatch(showLoading())
        try {
            const data = chooseField.map(field => field.id);
            const response = await depHAddFieldDep({ ids: data })
            dispatch(successMessage(response?.message ? response.message : 'Thêm lĩnh vực thành công'))
            setChooseField([])
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi xảy ra (DepField)'))
        } finally {
            dispatch(hideLoading())
        }
    }


    return (
        <ModalLayout handleClose={handleClose} title={'Thêm lĩnh vực'}>
            <div className='flex flex-row'>
                <div className='mr-3'>
                    <h1>Danh sách lĩnh vực:</h1>
                    <div className="p-4 h-[400px] w-[400px] border-2 overflow-y-scroll rounded-md">
                        <ul className="">
                            {remainField.map((field) => (
                                <button
                                    key={field.id}
                                    className="mb-2 text-sm text-left hover:bg-gray-300 w-full border-b py-1 flex justify-between items-center rounded-lg"
                                    onClick={() => handleChoose(field.id)}>
                                    <p className='font-roboto text-gray-500 ml-2'>{field.name}</p>
                                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h1>Đã chọn:</h1>
                    <div className="p-4 h-[400px] w-[400px] border-2 overflow-y-scroll rounded-md">
                        <ul className="">
                            {chooseField.length === 0 && <p className='text-sm font-roboto text-gray-500'>Chưa có lĩnh vực được chọn</p>}
                            {chooseField && chooseField.map((field) => (
                                <button
                                    key={field.id}
                                    className="mb-2 text-sm text-left hover:bg-gray-300 w-full border-b py-1 flex justify-between items-center rounded-lg"
                                    onClick={() => handleUnchoose(field.id)}>
                                    <p className='font-roboto text-gray-500 ml-2'>{field.name}</p>
                                    <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end mt-3">
                {toggle && <button
                    className="mr-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                    onClick={() => toggle()}
                >Hủy</button>}
                <button
                    className={`px-4 py-2  text-white rounded-md focus:outline-none ${(chooseField.length === 0) ? 'bg-gray-400 cursor-default' : 'bg-green-500 focus:ring hover:bg-green-600 focus:border-green-300'} duration-500`}
                    onClick={handleAddField}
                >Thêm</button>
            </div>
        </ModalLayout>
    )
}

export default MultiFieldsAddModal