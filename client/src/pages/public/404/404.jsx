import { useNavigate } from 'react-router-dom'
import Image404 from '../../../assets/image/404.png'
import StaffButton from '../../../components/staff_button/StaffButton'


const Page404 = () => {
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate('/')

    }

    return (
        <>
            <div className='flex justify-center items-center flex-col p-28'>
                <img src={Image404} alt="error 404" className='max-h-[200px]' />
                <div className='mt-5'>
                    <StaffButton oC={handleBackHome}>
                        Quay về trang chủ
                    </StaffButton>
                </div>
            </div>
        </>
    )
}

export default Page404