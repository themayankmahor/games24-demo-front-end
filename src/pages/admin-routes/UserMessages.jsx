import { useEffect, useState } from "react";
import Base from "../../components/Base";
import UserMessage from "../../components/user-message-page/UserMessage";
import { doDeleteUserMessage, doGetAllUserMessages } from "../../services/user-message-service";
import { toast } from "react-toastify";

const UserMessages = () => {

    const [allMessages, setAllMessages] = useState([]);

    ///handle delete user messages
    const deleteUserMessage = (userMessage) => {

        //delete user message
        doDeleteUserMessage(userMessage.userMessageId).then((data) => {

            toast.success("Message Deleted !!!");

            let newUserMessages = allMessages.filter(m => m.userMessageId != userMessage.userMessageId)
            setAllMessages([...newUserMessages]);

        }).catch((error) => {

            console.log(error);
        })
    }

    //get all user messages
    useEffect(() => {

        ///get all messages
        doGetAllUserMessages().then((data) => {

            ///set messages
            setAllMessages(data);
            console.log(data)

        }).catch((error) => {

            console.log(error);
            toast.error("Error in loading messages");
        })

    }, [])

    return(
        <Base>

        <div className="m-5">
            <h1>All Messages ({allMessages.length})</h1>

            {
                allMessages && allMessages.map((message) => (

                    <UserMessage message={message} key={message.userMessageId} deleteMessage={deleteUserMessage}/>
                ))
            }

            
        </div>

        </Base>
    )
}

export default UserMessages;