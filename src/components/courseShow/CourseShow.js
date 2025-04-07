
import "./courseShow.css";
import courseImage from "../../images/Image3.jpg"
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function CourseShow({ Course, setOpenModal, selectCourse }) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    selectCourse(Course.courseId);
    setOpenModal(true);


  };

  const handleEditClick = () => {
    // navigate(`/CourseEdit`);
    navigate(`/CourseEdit/${Course.courseId}`);

  };

  // let content = <div className='course-info'>
  //   <Typography variant="h6" className='card-title'>{Course.courseName}</Typography>
  //   <Typography variant="subtitle1" className='card-description'>{Course.courseDescription}</Typography>
  // </div>;

  return (
    // <div className="card">
    //   <div className='card-body'>
    <Paper style={{ width: 480, height: "auto" }}>
      <img className="card-image" src={courseImage} alt="course"></img>
      <Typography variant="h6" className='card-title'>{Course.courseName}</Typography>
      <Typography variant="subtitle1" className='card-description'>{Course.courseDescription}</Typography>
      <div className="actions">
        <Button variant="outlined"  size="medium" className='btn-view' onClick={() => { navigate(`/coursePreview/${Course?.courseId}`) }}>View Course</Button>
        <Button  variant="outlined"  size="medium" className="btn-edit" onClick={handleEditClick}>Edit</Button>
        <Button variant="outlined"  size="medium" className="btn-delete" onClick={handleDeleteClick}>Delete</Button>
      </div>

    </Paper>


  );
}

export default CourseShow;


