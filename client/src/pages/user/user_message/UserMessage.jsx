import { useEffect, useState } from "react"
import ChatBody from "../../../components/chat_body"
import ChatSidebar from "../../../components/chat_sidebar"

const UserMessage = () => {

    const [message, setMessage] = useState({})

    useEffect(() => {
        console.log(message);
    }, [message])


    return (
        <div className="bg-white w-[80%] mx-auto grid grid-cols-4 shadow-lg rounded-md my-2 overflow-hidden">
            <ChatSidebar message={{ get: message, set: setMessage }} />
            <ChatBody message={message} />
        </div>
    )
}

export default UserMessage