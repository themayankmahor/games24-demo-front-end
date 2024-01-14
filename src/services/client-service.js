import { myAxios } from "./helper"

export const getAllClients = () => {

    return myAxios.get(`client/`).then(response => response.data);
}