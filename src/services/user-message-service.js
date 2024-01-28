import { myAxios, privateAxios } from "./helper"

///Create user message
export const doCreateUserMessage = (userMessage) => {
    
    return myAxios.post(`user-message/create-user-message`, userMessage).then((response) => response.data);
}

///Get all messages
export const doGetAllUserMessages = () => {

    return privateAxios.get(`user-message/`).then((response) => response.data);
}

///delete user message
export const doDeleteUserMessage = (userMessageId) => {

    return privateAxios.delete(`user-message/delete/${userMessageId}`).then((response) => response.data);
}