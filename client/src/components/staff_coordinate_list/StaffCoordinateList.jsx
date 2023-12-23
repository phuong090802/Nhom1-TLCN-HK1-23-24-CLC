import React, { useEffect } from 'react';
import AddHomeIcon from '@mui/icons-material/AddHome';
import blankAvt from '../../assets/image/blank_avt.png'


const StaffCoordinateList = ({ staffList, handleButtonClick }) => {


    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Danh sách nhân viên</h2>
            {(staffList.length !== 0) ?
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        staffList.map((staff, i) => {
                            return (
                                <li className="bg-white p-4 rounded-md shadow-md border">
                                    <div className="flex items-center mb-4 w-full">
                                        <img src={blankAvt} alt={staff?.name ? staff.name : ''} className="w-12 h-12 rounded-md mr-4" />
                                        <div className='flex justify-between w-full'>
                                            <div>
                                                <h3 className="text-md font-semibold">{staff?.name ? staff.name : 'Chưa có trưởng khoa'}</h3>
                                                <p className="text-gray-500 text-sm">{staff?.email ? staff.email : ''}</p>
                                            </div>
                                            {<button
                                                className="w-14 h-14 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                                onClick={() => handleButtonClick(staff.id)}>
                                                <AddHomeIcon ></AddHomeIcon>
                                            </button>}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                :
                <div className='w-full flex justify-center border py-5 shadow-md'>
                    <h1 className='text-lg text-gray-500'>Chưa có nhân viên</h1>
                </div>}
        </div>
    );
};

export default StaffCoordinateList;
