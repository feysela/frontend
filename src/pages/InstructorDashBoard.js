import { Outlet } from "react-router-dom"
import { setAuthHeader} from "../serverRequest";
import { AuthData } from "../App";

import { useNavigate } from "react-router-dom";
import { getAuthToken, getRequestServer } from "../serverRequest";
import CourseList from "../components/CourseList";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/Paginaton";
import { requestServer } from "../serverRequest";
export default function InstuctorDashBoard() {
  const {  updateUser } = AuthData();
  //List of all courses in the database
  const [courseList, SetCourseList]=useState([]);
  //const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(2);

  const navigate =useNavigate();

  let headers = {'Content-Type': 'application/json'};
        if (getAuthToken() !== null && getAuthToken() !== "null") {
            headers.Authorization = `Bearer ${getAuthToken()}`;
        }

useEffect(()=>{
  setLoading(true);
  getRequestServer("/private/getAllCourses")
  .then(data=>{SetCourseList(data.content)});
  setLoading(false);
},[]);

//Get current courses
const indexOfLastCourse = currentPage * coursesPerPage;
const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//Courses selected by pagination

const currentCourses = courseList.slice(indexOfFirstCourse, indexOfLastCourse);

const paginate =pageNumber => setCurrentPage(pageNumber);
//Method to edit a course
const editCourseById = (id, newCourseName, newDescription,newImageUrl) => {
  const updatedCourses = currentCourses.map((course) => {
    if (course.id === id) {
      return { ...course, courseName: newCourseName, courseDescription:newDescription, imageUrl:newImageUrl};
    }
    return course;
  });
  SetCourseList(updatedCourses);
  console.log("Course updated inst dashboard");
};

//Method to delete a course
const deleteCourseById = (id) => {
  requestServer("DELETE", `/private/deleteCourse/${id}`, {}).then(response=>{
    console.log("What is received");
    console.log(response);
    navigate("/instructordashboard");
}).catch((error)=>{
console.log(error);

//navigate("/instructordashboard");
});
  const updatedCourses = courseList.filter((course) => {
    return course.id !== id;
  });
  SetCourseList(updatedCourses);
};

  return (
    <div className="careers-layout" >
      <button onClick={()=>{setAuthHeader(null);
                           updateUser({name:"", isAuthenticated: false});
                           }}>Logout</button>     
      <h2>Instructor Dashboard</h2>
      <p>Courses available in the database</p>
    <div>
    <button onClick={()=>{navigate("/createCourse"); 
    }}>Create a new course</button>
    </div>
    <div className='container mt-5'>
       {/* <VideoPlayer/> */}
      {loading?<h2>Loading . . .</h2>:undefined}
      {courseList && <CourseList Courses={currentCourses} onEdit={editCourseById} onDelete={deleteCourseById} loading={loading}/>}
      <Pagination
        coursesPerPage={coursesPerPage}
        totalCourses={courseList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      </div>
      <Outlet />
    </div>

  )
}

