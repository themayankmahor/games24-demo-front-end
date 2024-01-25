import { myAxios, privateAxios } from "./helper"

///add game(/category/{categoryId})
export const doAddGame = (gameData) => {

    const modifiedGameData = {...gameData};
    delete modifiedGameData.bannerImage;
    delete modifiedGameData.squareImage;
    delete modifiedGameData.screenShot1;
    delete modifiedGameData.screenShot2;
    delete modifiedGameData.screenShot3;
    delete modifiedGameData.screenShot4;

    // delete gameData.imageName;
    return privateAxios.post(`/games/category/${modifiedGameData.categoryId}/tag/${modifiedGameData.tagId}`, modifiedGameData).then((response) => response.data);
}


///upload Banner image (image/upload-banner-image/{gameId})
export const doUploadGameBannerImage = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-banner-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Upload Square Image (/image/upload-square-image/{gameId})
export const doUploadGameSquareImage = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-square-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Upload screen shot1 Image (/image/upload-ss1-image/{gameId})
export const doUploadGameScreenShot1Image = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-ss1-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Upload screen shot2 Image (/image/upload-ss2-image/{gameId})
export const doUploadGameScreenShot2Image = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-ss2-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Upload screen shot3 Image (/image/upload-ss3-image/{gameId})
export const doUploadGameScreenShot3Image = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-ss3-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Upload screen shot4 Image (/image/upload-ss4-image/{gameId})
export const doUploadGameScreenShot4Image = (image, gameId) => {
    console.log(image);
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`games/image/upload-ss4-image/${gameId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response => response.data);
}

///Get all games
export const getAllGames = (pageNumber, pageSize) => {
    
    return myAxios.get(`games/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data);
}

///Get game by category ID
export const doGetGamesByCategoryId = (categoryId) => {
    
    return myAxios.get(`games/category/${categoryId}`).then(response => response.data);
}

///get every games
export const doGetEveryGames = () => {

    return myAxios.get(`games/get-all-games/`).then((response) => response.data);
}

///Get game by ID
export const getSingleGame = (gameId) => {

    return myAxios.get(`games/${gameId}`).then(response => response.data);
}

///Delete Game
export const doDeleteGame = (gameId) => {

    return privateAxios.delete(`games/${gameId}`).then((response) => response.data);
}