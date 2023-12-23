import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const MultiFields = () => {
    return (
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
    )
}

export default MultiFields