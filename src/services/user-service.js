import { myAxios } from "./helper"

export const doLoginUser = (loginDetail) => {
    return myAxios.post(`/auth/login`, loginDetail).then((response) => response.data);
}