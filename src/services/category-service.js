import { myAxios } from "./helper"

export const getAllCategory = () => {

    return myAxios.get(`categories/`).then((response) => response.data);
}

export const getGamesByCategory = (categoryId) => {
    
    return myAxios.get(`games/category/${categoryId}`).then((response) => response.data);
}