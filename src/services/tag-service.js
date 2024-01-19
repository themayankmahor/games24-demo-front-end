import { myAxios, privateAxios } from "./helper"

///Do create Tags
export const doCreateTag = (tag) => {

    return privateAxios.post(`tags/`, tag).then((response) => response.data);
}

///Get All tags
export const doGetAllTags = () => {
    
    return myAxios.get(`tags/`).then(response => response.data);
}

///delete Tag
export const doDeleteTag = (tagId) => {
    
    return privateAxios.delete(`tags/${tagId}`).then(response => response.data);
}