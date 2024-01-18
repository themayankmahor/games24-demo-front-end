import { myAxios, privateAxios } from "./helper"

///Get all clients
export const getAllClients = () => {

    return myAxios.get(`client/`).then(response => response.data);
}

///Create Multiple clients
export const doCreateClients = (clients) => {
    
    return privateAxios.post(`client/create-clients`, clients).then((response) => response.data);
}