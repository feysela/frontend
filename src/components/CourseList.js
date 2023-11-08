import CourseShow from './CourseShow';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function CourseList({ Courses, onDelete, onEdit }) {
  
  const renderedCourses = Courses?.map((Course) => {
    return (
      <CourseShow onEdit={onEdit} onDelete={onDelete} key={Course.id} Course={Course} className='list-group-item'/>
    );
  });

  return <div className="Course-list">{renderedCourses}</div>;
}

export default CourseList;
