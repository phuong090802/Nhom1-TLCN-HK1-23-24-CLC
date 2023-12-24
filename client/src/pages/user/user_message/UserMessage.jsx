import { useEffect, useState } from "react"
import ChatBody from "../../../components/chat_body"
import ChatSidebar from "../../../components/chat_sidebar"

const UserMessage = () => {

    const [conversation, setConversation] = useState({})

    return (
        <div className="bg-white w-[80%] mx-auto grid grid-cols-4 shadow-lg rounded-md my-2 overflow-hidden">
            <ChatSidebar conversation={{ get: conversation, set: setConversation }} />
            <ChatBody conversation={conversation} />
        </div>
    )
}

export default UserMessage