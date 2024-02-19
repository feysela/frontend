
import "./courseShow.css";
import courseImage from "../../images/Image3.jpg"
import { useNavigate } from 'react-router-dom';
function CourseShow({ Course,setOpenModal, selectCourse}) {
  const navigate =useNavigate();
  const handleDeleteClick = () => {
    selectCourse(Course.id);
    setOpenModal(true);
  
  };

  const handleEditClick = () => {
    navigate(`/editCourse/${Course.id}`);

  };

  let content = <div className='course-info'>
    <h2 className='card-title'>{Course.courseName}</h2>
    <p className='card-description'>{Course.courseDescription}</p>
  </div>;

  return (
    <div className="card">
      <div className='card-body'>
        <img className="card-image" src={courseImage} alt="course"></img>
        {content}
      </div>
      <div className='btns'>
        <button className='btn-view'>View Course</button>
        <button className="btn-edit" onClick={handleEditClick}>Edit</button>
        <button className="btn-delete" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default CourseShow;


