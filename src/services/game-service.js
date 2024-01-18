import { myAxios, privateAxios } from "./helper"

///add game(/category/{categoryId})
export const doAddGame = (gameData) => {

    const modifiedGameData = {...gameData};
    delete modifiedGameData.imageName;

    // delete gameData.imageName;
    return privateAxios.post(`/games/category/${modifiedGameData.categoryId}`, modifiedGameData).then((response) => response.data);
}


///upload image (/image/upload/{gameId})
export const doUploadGameImage = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Get all games
export const getAllGames = (pageNumber, pageSize) => {
    
    return myAxios.get(`games/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data);
}

///Get game by ID
export const getSingleGame = (gameId) => {

    return myAxios.get(`games/${gameId}`).then(response => response.data);
}