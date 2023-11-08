
import CourseCreate from "../components/CourseCreate";
import { Outlet } from "react-router-dom";
export default function CourseCreator() {  
    return (
        <div className="contact">
        <CourseCreate/>   
        <Outlet /> 
        </div>
    )
}