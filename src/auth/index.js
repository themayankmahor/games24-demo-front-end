///ADMIN is logged in or not
export const isLoggedIn = () =>{

    let data = localStorage.getItem("data");

    //authenticate
    if (data != null)
    {
        return true;
    }
    else{
        return false;
    }
}

///do Login => data => local storage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
}

///do logout
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

///Get current user
export const getCurrentUserDetail = () => {
    
    //if user is logged in
    if (isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else{
        return undefined;
    }
}

///get JWT token
export const getToken = () => {
    
    //if user is logged in
    if (isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data")).token;    
    }
    else{
        return null;
    }
    
}