import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestServer } from '../serverRequest';
import {  useNavigate } from 'react-router-dom';
function CourseEdit({ Course, setShowEdit, onEdit }) {
  //const [title, setTitle] = useState(Course.title);
  const navigate= useNavigate();
  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues:{
      courseName:Course.courseName,
      courseDescription:Course.courseDescription,
      imageUrl:Course.imageUrl  
    }
});
const onSubmit = async (data) => {
  const submission = {
    id: Course.id,
    courseName: data.courseName,
    courseDescription: data.courseDescription,
    imageUrl: data.imageUrl
  }


requestServer("POST", "/private/editCourse", submission).then(response=>{
        console.log("What is sent");
        console.log(submission);
        console.log("What is received");
        console.log(response);
        onEdit(Course.id,data.courseName,data.courseDescription,  data.imageUrl);
        navigate("/instructordashboard");
        setShowEdit(false);
}).catch((error)=>{
console.log(error);

//navigate("/instructordashboard");
});
}

  return (
    <div className="contact">

    <h3>Edit the course information</h3>
    <form  onSubmit={handleSubmit(onSubmit)} className="default-form">
      <label>
        <span>Course Name</span>
        {errors.courseName && (<p className="text-red-500">{`${errors.courseName.message}`}</p>)}
        <input
          {...register("courseName",
            { required: "Course name is required" }
          )}
     
          type="text"
          placeholder="Course Name"
        />
      </label>
      <label>
        <span>Description</span>
        {errors.courseDescription && (<p className="text-red-500">{`${errors.courseDescription.message}`}</p>)}
        <input
          {...register("courseDescription",
            {
              required: "Course description is required",
              minLength: {
                value: 10,
                message: "Course description at least 10 characters"
              }
            }
          )}
          type="text"
          value={Course.courseDescription}
          placeholder="Course description"
        ></input>
      </label>
      <label>
        <span>Course Url</span>
        {errors.imageUrl && (<p className="text-red-500">{`${errors.imageUrl.message}`}</p>)}
        <input
          {...register("imageUrl",
            {
              required: "Url is required",
            }
          )}
          type="text"
          placeholder="url"
          value={Course.imageUrl}
        ></input>
      </label>
      <button className="btn-login"
        disabled={isSubmitting} >Submit</button>
    </form>
  </div>
  );
}

export default CourseEdit;
