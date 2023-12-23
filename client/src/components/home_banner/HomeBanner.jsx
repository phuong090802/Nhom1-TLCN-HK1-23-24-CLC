import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector, userSelector } from '../../redux/selectors/authSelector';
import { useLocation, useNavigate } from 'react-router';
import { getRole } from '../../utils/route';
import { inforMessage } from '../../redux/slices/commonSlice';

const HomeBanner = ({ isAuthen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const locale = useLocation()

    const user = useSelector(userSelector)
    const buttonOnClick = () => {
        if (!isAuthen) {
            dispatch(inforMessage('Vui lòng đăng nhập để đặt câu hỏi'))
            navigate('/login')
        }
        else if (user.role !== getRole('user')) {
            dispatch(inforMessage('Bạn là nhân viên hệ thống. Không thể đặt câu hỏi'))
        }
        else {
            navigate('/user/question/create')
        }
    }

    return <>
        <div className="bg-[#1F2937] h-[200px] grid md:grid-cols-2 grid-cols-1">
            <div className="flex flex-col justify-center p-5">
                <h1 className="text-white text-3xl font-bold">Bạn cần ban tư vấn hỗ trợ</h1>
                <h1 className="text-white text-xl">Hãy đặt câu hỏi ngay nhé</h1>
            </div>
            <div className="flex flex-col md:justify-center p-5 md:items-end items-start justify-start">
                {
                    (locale.pathname !== '/')
                        ?
                        <button className="bg-my_red w-fit text-white px-4 py-2 focus:ring focus:ring-my_red/50 rounded-md border border-gray-500 hover:bg-red-500 duration-500 flex justify-center"
                            onClick={() => navigate('/')}>
                            <HomeOutlinedIcon className='mr-3' />
                            Về trang chủ
                        </button>
                        :
                        <button className="bg-my_red w-fit text-white px-4 py-2 focus:ring focus:ring-my_red/50 rounded-md border border-gray-500 hover:bg-red-500 duration-500 flex justify-center"
                            onClick={buttonOnClick}>
                            <HelpOutlineIcon className='mr-3' />
                            Đặt câu hỏi
                        </button>
                }

            </div>
        </div>
    </>
}

export default HomeBanner