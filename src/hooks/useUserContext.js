import { useContext } from "react"
import UserContext from "../context/UserContextProvider";

const UseUserContext =()=>{
    return useContext(UserContext);
}
export default UseUserContext;
