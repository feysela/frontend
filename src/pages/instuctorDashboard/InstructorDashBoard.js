import { Outlet } from "react-router-dom"
import { setAuthHeader } from "../../serverRequest";
import Modal from "../../components/modalComponent/Modal";
import { useNavigate } from "react-router-dom";
import { getRequestServer } from "../../serverRequest";
import CourseList from "../../components/courseList/CourseList";
import { useState, useContext, useRef } from "react";
import { useEffect } from "react";
import Pagination from "../../components/Paginaton";
import { requestServer } from "../../serverRequest";
import Footer from "../../components/footer/Footer";
import './dashboard.css';
import { UserContext } from "../../context/UserContext"

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
    getRequestServer("/private/getAllCourses")
      .then(data => { SetCourseList(data.content) });
    setLoading(false);
    console.log(`user data: ${userData.firstName}`)
    persistRef.current=userData.firstName;
   
  }, []);


  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courseList.slice(indexOfFirstCourse, indexOfLastCourse);

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
    requestServer("DELETE", `/private/deleteCourse/${focusedCourseId}`, {}).then(response => {
      console.log("What is received");
      console.log(response);
      navigate("/instructordashboard");
    }).catch((error) => {
      console.log(error);
    });

    const updatedCourses = courseList.filter((course) => { return course.id !== focusedCourseId; });
    SetCourseList(updatedCourses);
  };
  const modalHeader = "Confirm Deletion";
  const modalText = "Are you sure you want to delete this course?";
  
 

  return (
    <div className="dashboard" >
      {openModal &&
        <Modal setOpenModal={setOpenModal}
          modalHeader={modalHeader}
          modalText={modalText}
          action={deleteCourseById}
        />}
     
      <>The ref {persistRef.current}</>
     
      <button onClick={() => {
        setAuthHeader(null);
        navigate("/");
      }}>Logout</button>

      <h2>Instructor Dashboard</h2>
      <p>Courses available in the database</p>
      <div>
        <button onClick={() => {
          navigate("/createCourse");
        }}>Create a new course</button>
      </div>
      <div className='container mt-5'>
        {loading ? <h2>Loading . . .</h2> : undefined}
        {courseList && <CourseList
          Courses={currentCourses}
          onEdit={editCourseById}
          onDelete={deleteCourseById}
          loading={loading}
          setOpenModal={setOpenModal}
          selectCourse={selectCourse} />}
        
      </div>
      <Pagination
          coursesPerPage={coursesPerPage}
          totalCourses={courseList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Outlet />
      <Footer />
    </div>

  )
}

