
import { createContext, useRef, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
     const [userData, setUserData] = useState({});
    // const userData = useRef();
    const updateUser =(userData)=>{
        setUserData(userData);
    }
    return (<UserContext.Provider value={{ userData, updateUser}}>
        {children}
    </UserContext.Provider>
    )
}
export default UserContext;
