import { useEffect, useState } from 'react'
import blankAvt from '../../assets/image/blank_avt.png'
import { getMessageList } from '../../service/user/uMessageService'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const ChatSidebar = ({ conversation }) => {

    const [params, setParams] = useState({ name: 'all' })
    const [itemList, setItemList] = useState([])
    const [name, setName] = useState('')


    useEffect(() => {
        fetchChatList()
    }, [params])

    const fetchChatList = async () => {
        try {
            const response = await getMessageList(params)
            console.log(response);
            if (response.success) {
                setItemList(response.data)
            }
        } catch (error) {

        }
    }

    const handleItemClick = (item) => {
        conversation.set({
            avatar: item?.avatar ? item.avatar : blankAvt,
            userName: item.name,
            id: item.id
        })
    }

    const handleSearch = () => {
        setParams({
            ...params,
            name
        })
    }

    return (
        <div className="border-r border-[#3e3c6f] bg-[#3A3F4B] text-white h-[90vh] flex flex-col">
            <div className="flex items-center px-4 py-3 border-b">
                <input
                    type="text"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    className="w-full rounded-md py-1 px-2 outline-none bg-[#5C6269]"
                    placeholder="Tìm kiếm ..." />
                <button onClick={ handleSearch } className='ml-2 hover:bg-white p-1 rounded-lg hover:text-gray-600'>
                    <SearchOutlinedIcon />
                </button>
            </div>
            <div className="overflow-y-auto">
                {
                    itemList.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className='flex border-y border-gray-500 p-2 cursor-pointer hover:bg-blue-300 hover:text-gray-600 duration-300'
                                onClick={() => handleItemClick(item)}>
                                < img src={item?.avatar ? item.avatar : blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                                <div className='ml-2'>
                                    <p>{item.name}</p>
                                    <p className='text-xs font-light' dangerouslySetInnerHTML={{ __html: item.latestMsg.messageText.slice(0, 25) }}></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatSidebar