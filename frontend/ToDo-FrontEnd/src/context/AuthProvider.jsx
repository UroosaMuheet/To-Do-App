import {useState} from "react";
import api from "../api/api";
import AuthContext from "./AuthContext";

//The auth provider is a collection of all User-related activities
//Register, Login & Logout
//Exporting it makes it available for use in other modules or files
 const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);

    //Register user
    const register = async(username, email, password)=>{
        api.post("/User/register", {username, email, password});
    }
    //Login user
    const login = async (username, password)=>{
        const res = await api.post("/User/login",{username, password});
        //login returns an AuthResponse which contains the JWT token
        //this token must be utilised the Auth header for authorized endpoints
        console.log(res.status);
        localStorage.setItem("token", res.data.token);
        console.log(`Token : ${res.data.token}`);
        console.log(`Login response : ${JSON.stringify(res.data.user)}`);
        setUser(res.data.user)
        return res;
    };

    //Logout user = UNDO login
    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
    };
    return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
