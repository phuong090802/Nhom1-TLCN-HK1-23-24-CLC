import { FadeLoader } from "react-spinners"

const Loading = ({ py }) => {
    return (
        <div className={`w-full flex justify-center items-center ${py ? `py-${py}` : 'py-24'} text-gray-600`}>
            <FadeLoader color="#64B5F6" />
        </div>
    )
}

export default Loading