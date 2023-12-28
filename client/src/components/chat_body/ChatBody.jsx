import ReactQuill from 'react-quill';
import blankAvt from '../../assets/image/blank_avt.png'
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { getAllMessage } from '../../service/user/uMessageService';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage, inforMessage } from '../../redux/slices/commonSlice';
import { Client } from '@stomp/stompjs'
import { userSelector } from '../../redux/selectors/authSelector';
import { getCookieByName } from '../../utils/cookie';


const ChatBody = ({ conversation }) => {

    const dispatch = useDispatch()

    const [messages, setMessage] = useState([])
    const user = useSelector(userSelector)
    // const [stompClient, setStompClient] = useState(null);
    const stompClient = useRef()
    const [sendMess, setSendMess] = useState('')
    const [params, setParams] = useState({ page: 0, size: 5 })
    const [totalPage, setTotalPage] = useState(0)
    const [isLoad, setIsLoad] = useState(false)

    const headers = {
        Authorization: `Bearer ${getCookieByName('accessToken')}`,
    };


    useEffect(() => {
        console.log(messages);
        if (conversation?.id) {
            fetchGetAllMessage()
        }
    }, [params])


    useEffect(() => {
        setMessage([])
        setParams({ size: 5, page: 0 })
        const client = new Client({
            brokerURL: 'ws://localhost:8080/messages',
            connectHeaders: headers,
        });

        client.onConnect = (frame) => {
            console.log(conversation.id);
            console.log('Connected: ' + frame);
            client.subscribe(`/chat/conversations/${conversation.id}`, (message) => {
                if (message.senderId !== user.id) {
                    console.log(JSON.parse(message.body));
                    addNewMessage(JSON.parse(message.body))
                }
            }, headers);

            client.subscribe(`/chat/conversations/${conversation.id}/error`, (message) => {
                console.log(JSON.parse(message.body));
            }, headers);
        };

        client.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['conversation']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.current = client;

        client.activate();

        return () => {
            console.log('Closing WebSocket connection');
            client.deactivate();
        };
    }, [conversation])

    const addNewMessage = (data) => {
        setMessage(prevData => [
            ...prevData,
            data
        ])
    }

    const fetchGetAllMessage = async () => {
        if (isLoad) return
        setIsLoad(true)
        try {
            const response = await getAllMessage({ id: conversation.id, params: params })
            setMessage(prev => [
                ...response.data.items,
                ...prev
            ])
            setTotalPage(response.data.pages)
        } catch (error) {
            dispatch(errorMessage(error?.message ? error.message : 'Lỗi lấy cuộc hội thoại'))
        } finally {
            setIsLoad(false)
        }
    }

    const sendMessage = () => {
        if (sendMess === '') return
        if (stompClient.current && !stompClient.current.connected) {
            stompClient.current.activate();
        }
        if (stompClient.current && stompClient.current.connected && conversation?.id) {
            // addNewMessage({ senderId: user.id, messageText: sendMess })
            stompClient.current.publish({
                destination: `/app/conservations/${conversation.id}`,
                headers,
                body: JSON.stringify({ messageText: sendMess })
            });
        }
        setSendMess('');
    };

    const handleLoadMore = () => {
        let pageNumber = Number(params.page) + 1
        if (pageNumber === totalPage) {
            dispatch(inforMessage('Đã hết tin nhắn'))
            return
        }
        console.log(pageNumber);
        setParams({
            ...params,
            page: pageNumber
        })
    }

    return (
        <div className="col-span-3 border bg-[#EFF3F7] flex flex-col h-[90vh] relative">
            {messages.length !== 0 &&
                <div className="flex items-center px-4 py-2 shadow-md relative">
                    <img src={blankAvt} alt="user avatar" className='w-12 h-12 rounded-full border-2 border-blue-300' />
                    <div className='ml-2'>
                        <p>{conversation.userName}</p>
                        <p className='text-xs'>{(user.role === 'ROLE_USER' ? 'Nhân viên hệ thống' : 'Người dùng')}</p>
                    </div>
                    {/* <div className='absolute text-gray-600 right-5 hover:bg-[#c8def3] p-2 rounded-full hover:text-white duration-300'>
                    <DeleteOutlineOutlinedIcon />
                </div> */}
                </div>}
            {
                messages.length !== 0 &&
                <div id='messageBox' className='py-3 px-6 flex flex-col text-gray-600 overflow-y-auto mb-[54px]'>
                    {
                        (isLoad) ?
                            <button
                                className='bg-gray-200 mx-[-24px] mt-[-11px] py-1 hover:bg-gray-300 duration-500'
                            >Đang tải ...</button>
                            :
                            <button
                                className='bg-gray-200 mx-[-24px] mt-[-11px] py-1 hover:bg-gray-300 duration-500'
                                onClick={handleLoadMore}
                            >Tải thêm ...</button>
                    }
                    {messages.map((mess, i) => {
                        return (mess.senderId === user.id) ?
                            <div key={i} className='bg-blue-300 w-fit p-3 max-w-[70%] rounded-b-lg rounded-l-lg relative my-2 self-end' >
                                <p dangerouslySetInnerHTML={{ __html: mess.messageText }}></p>
                                <span className='absolute top-0 right-[-8px] border-x-[8px] border-y-[8px] border-t-blue-300 border-l-blue-300 border-r-transparent border-b-transparent'></span>
                            </div>
                            :
                            <div key={i} className='bg-green-300 w-fit p-3 max-w-[70%] rounded-b-lg rounded-r-lg relative my-2'>
                                <p dangerouslySetInnerHTML={{ __html: mess.messageText }}></p>
                                <span className='absolute top-0 left-[-8px] border-x-[8px] border-y-[8px] border-t-green-300 border-r-green-300 border-l-transparent border-b-transparent'></span>
                            </div>
                    })}
                </div>
            }

            {(messages.length !== 0) &&
                <div className='bg-[#efefef] flex items-center justify-between border-t-gray-200 border-t absolute bottom-0 right-0 left-0'>
                    <div className='w-[95%] p-1'>
                        <ReactQuill
                            value={sendMess}
                            onChange={setSendMess}
                            className='bg-white min-h-11 overflow-y-auto max-h-48 rounded-lg shadow-md'
                            theme='snow'
                            placeholder='Nội dung...'
                            modules={{ toolbar: false }}
                        />
                    </div>
                    <div className='p-3 text-blue-400' onClick={e => sendMessage(e)}>
                        <SendIcon />
                    </div>
                </div>
            }
        </div >
    )
}

export default ChatBody