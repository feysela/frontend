import { Outlet } from "react-router-dom"
import Modal from "../../components/modalComponent/Modal";
import { useNavigate } from "react-router-dom";
import { getRequestServer } from "../../serverRequest";
import CourseList from "../../components/courseList/CourseList";
import { useState, useContext, useRef } from "react";
import { useEffect } from "react";
// import Pagination from "../../components/Paginaton";
import { requestServer } from "../../serverRequest";
import Footer from "../../components/footer/Footer";
import './dashboard.css';
import  UserContext  from "../../context/UserContextProvider";
import { getUserId} from "../../serverRequest";
import { getInstructor,setInstructor } from "../../serverRequest";
import { Paper } from '@mui/material';
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function InstuctorDashBoard() {
  const {  userData } = useContext(UserContext);

  const [courseList, SetCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [focusedCourseId, setFocusedCourseId] = useState(0);
  const navigate = useNavigate();
  const selectCourse = (id) => setFocusedCourseId(id);
  const persistRef =useRef("dfdfdf");

 
  useEffect(() => {
    setLoading(true);
    getRequestServer(`/private/getCoursesByInstructor/${getInstructor()}`)
      .then(data => { 
        console.log(data);
        SetCourseList(data) });
    setLoading(false);
    console.log(`user data: ${userData?.firstName}`)
    persistRef.current=userData?.firstName;
   
  }, []);

const loginInfo=getUserId();
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courseList?.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const editCourseById = (id, newCourseName, newDescription, newImageUrl) => {
    const updatedCourses = currentCourses.map((course) => {
      if (course.id === id) {
        return { ...course, courseName: newCourseName, courseDescription: newDescription, imageUrl: newImageUrl };
      }
      return course;
    });
    SetCourseList(updatedCourses);
    console.log("Course updated inst dashboard");
  };

  const deleteCourseById = () => {
    requestServer("DELETE", `/private/deleteCourseByCourseId/${focusedCourseId}`, {}).then(response => {
      console.log("What is received");
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    SetCourseList(courseList.filter((course) => course.courseId !==focusedCourseId ));
  };
  const modalHeader = "Confirm Deletion";
  const modalText = "Are you sure you want to delete this course?";
  
 
console.log("Saved Information");
console.log(loginInfo);
  return (
    <div className="dashboard" >
      {openModal &&
        <Modal setOpenModal={setOpenModal}
          modalHeader={modalHeader}
          modalText={modalText}
          action={deleteCourseById}
        />}
      <Typography>Instructor Dashboard</Typography>
      <Typography>Courses by {getInstructor()}</Typography>
      <div className="new-course">
        <Button onClick={() => {
          navigate("/createCourse");
        }} type="outlined">+ Create a new course</Button>
      </div>

      <div className='list-container'>
        {loading ? <h2>Loading . . .</h2> : undefined}
        {courseList && <CourseList
          Courses={courseList}
          onEdit={editCourseById}
          onDelete={deleteCourseById}
          loading={loading}
          setOpenModal={setOpenModal}
          selectCourse={selectCourse} />}
        
      </div>
      {/* <Pagination
          className="pagination"
          coursesPerPage={coursesPerPage}
          totalCourses={courseList?.length}
          paginate={paginate}
          currentPage={currentPage}
        /> */}
        
        <Outlet />
      <Footer />
    </div>

  )
}

