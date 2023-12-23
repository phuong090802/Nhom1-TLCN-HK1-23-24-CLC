import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getForwardLink, getRole } from '../../utils/route';
import { useNavigate } from 'react-router';


const StaffModuleHeader = ({ role, moduleTitle, children }) => {
    const navigate = useNavigate()
    return (
        <div className='container w-[95%] my-5 mx-auto'>
            <div className="">
                <button onClick={() => {
                    navigate(getForwardLink(getRole(role)))
                }} className='inline-block'><ArrowBackIcon className='mb-2 mr-3'></ArrowBackIcon></button>
                <h1 className='font-roboto text-2xl font-bold text-primary inline-block'>{moduleTitle}</h1>
            </div>
            {children}
        </div>
    )
}

export default StaffModuleHeader