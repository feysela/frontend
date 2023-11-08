import { useState } from 'react';
import CourseEdit from './CourseEdit';
import VideoPlayer from './VideoPlayer';
import { Navigate, useNavigate } from 'react-router-dom';

function CourseShow({ Course, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    onDelete(Course.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    console.log("Course Edited!")
    setShowEdit(false);
    onEdit(Course.id, Course.courseName, Course.courseDescription, Course.imageUrl);
  };

  let content = <div>

    <h3>{Course.courseDescription}</h3>
    <h3>{Course.courseName}</h3>
  </div>;

  if (showEdit) {
    content = <CourseEdit onEdit={onEdit} onSubmit={handleSubmit} Course={Course} showEdit={showEdit} setShowEdit={setShowEdit}/>;
  }

  return (
    <div className="Course-show">
      <VideoPlayer Course={Course} />
      {content}
      <div className="actions">
        <button onClick={handleEditClick}>Edit</button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseShow;
