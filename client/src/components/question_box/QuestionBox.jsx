import { useEffect } from 'react';
import bg from '../../assets/image/blank_avt.png'
import { dateFormat } from '../../utils/string';

const QuestionBox = ({ question, handleQuestionClick }) => {

    return (
        question && <div className='border-b-2 border-gray-200 p-3 flex px-4 text-gray-600'>
            <div className={`mr-3 flex flex-col justify-center items-center p-2 border ${(question.status === 2) ? 'border-green-500 ' : 'border-red-500 cursor-default'} hover:bg-gray-400 hover:text-white cursor-pointer hover:border-none rounded-lg text-[#848F95] font-semibold w-[70px] h-[80px] text-sm  duration-500`}
                onClick={() => {
                    handleQuestionClick(question.questionId)
                }}>
                <p>{question.status === 2 ? '1' : '0'}</p>
                <p>Trả lời</p>
            </div>
            <div className='cursor-default'>
                <h1 className='font-semibold text-md'>{question.title}</h1>
                <span className='text-xs items-center'>
                    <p className=' w-fit text-[white] px-1 border bg-gray-400 rounded-md text-xs my-1'>{question.departmentName}</p>
                </span>
                <span className='flex items-center text-xs'>
                    <img src={bg} alt="user avatar" className='w-6 inline-block rounded-full border border-[#2A2A2A] ' />
                    <p className='inline-block ml-1'><span className='text-blue-400'>{question.name}</span> đã hỏi vào <span className='text-blue-400'>{dateFormat(question.date)}</span></p>
                </span>
            </div>
        </div>
    )
}

export default QuestionBox