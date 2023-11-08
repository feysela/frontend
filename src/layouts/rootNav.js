import MyClasses from "../components/MyClasses";
import About from "../pages/About";
import Home from "../pages/Home";
import InstuctorDashBoard from "../pages/InstructorDashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashBoard from "../pages/UserDashBoard";
import Courses from "../pages/courses/Courses";
import HelpLayout from "./HelpLayout";


export const rootNav =[
    {path: "/", name:"home", element:<Home/>, isMenu:true, isPrivate:false},
    {path: "login", name:"login", element:<Login/>, isMenu:true, isPrivate:false},
    {path: "help", name:"help", element:<HelpLayout />, isMenu:true,  isPrivate:false},
    {path: "courses", name:"courses", element:<Courses/>, isMenu:true,  isPrivate:false},
    {path: "userdashboard", name:"userdashboard", element:<UserDashBoard/>, isMenu:false,  isPrivate:true},
    {path: "instructordashboard", name:"instructordashboard", element:<InstuctorDashBoard/>, isMenu:false,  isPrivate:true},
    {path: "register", name:"register", element:<Register/>, isMenu:true, isPrivate:false}
]