import CourseShow from '../courseShow/CourseShow';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./courseList.css"
function CourseList({ Courses, onDelete, onEdit,confirmDeletion,setOpenModal,selectCourse}) {
  
  const renderedCourses = Courses?.map((Course) => {
    return (
      <CourseShow  selectCourse={selectCourse} setOpenModal ={setOpenModal} confirmDeletion={confirmDeletion}  onEdit={onEdit} onDelete={onDelete} key={Course.id} Course={Course} className='list-group-item'/>
    );
  });

  return <div className='list-wrapper'>{renderedCourses}</div>;
}

export default CourseList;
