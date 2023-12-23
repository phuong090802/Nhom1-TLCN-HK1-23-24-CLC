import { useEffect } from 'react'
import blankAvt from '../../assets/image/blank_avt.png'

const CounsellorProfile = ({ counsellor }) => {

    useEffect(() => {
    }, [])
    return (
        counsellor &&
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-full">
            <div className="mb-4 w-full flex justify-center">
                <img
                    src={counsellor?.avatar || blankAvt}
                    alt="Avatar"
                    className="h-32 object-cover rounded-md"
                />
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold font-roboto">{counsellor.name}</h2>
                <p className="text-gray-600 font-roboto">Email: {counsellor.email}</p>
                <p className="text-gray-600 font-roboto">Phone: {counsellor.phone}</p>
            </div>
            <p className='text-gray-600 font-roboto'>Lĩnh vực:</p>
            {(counsellor?.fields?.length ? (counsellor.fields.length > 0) : false) ?
                <div className='bg-white text-sm font-roboto p-2 rounded-md text-center text-gray-500 h-36 overflow-y-auto'>
                    <ul className="list-disc list-inside text-left">
                        {counsellor.fields.map((field, index) => (
                            <li key={index} className="text-gray-600 py-1">{field.name}</li>
                        ))}
                    </ul>
                </div>
                :
                <div className='bg-white text-sm font-roboto p-2 rounded-md text-center text-gray-500'>
                    <h1>Tư vấn viên chưa đảm nhận lĩnh vực nào</h1>
                </div>
            }
        </div>
    )
}

export default CounsellorProfile