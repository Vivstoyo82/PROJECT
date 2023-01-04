import React from "react";

const AuthContext = React.createContext({
    isLoggedIn : false
}); // we can string or anything but often though it will be an object

export default AuthContext;