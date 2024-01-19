import { myAxios, privateAxios } from "./helper"

///Create category
export const doCreateCategory = (category) => {

    return privateAxios.post(`categories/`, category).then((response) => response.data);
}

///Get all category
export const getAllCategory = () => {

    return myAxios.get(`categories/`).then((response) => response.data);
}

///get games by category
export const getGamesByCategory = (categoryId) => {
    
    return myAxios.get(`games/category/${categoryId}`).then((response) => response.data);
}

///delete category
export const doDeleteCategory = (categoryId) => {

    return privateAxios.delete(`categories/delete/${categoryId}`).then((response) => response.data);
}