import { Outlet } from "react-router-dom"
import { AuthData } from "../App";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requestServer,getAuthToken, getRequestServer } from "../serverRequest";

import CourseList from "../components/CourseList";
import { useState } from "react";
import { useEffect } from "react";
function CourseCreate({ onCreate }) {
  const [title, setTitle] = useState('');
  const navigate=useNavigate();
  const { user,setUser, updateUser } = AuthData();
  const [courseList, SetCourseList]=useState([]);

  const { register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
   
  const onSubmit = async (data) => {
    const submission = {
      courseName:  data.courseName,
      description: data.description,
      imageUrl:    data.imageUrl,
    }
 
  //debugger 
  requestServer("POST", "/private/createCourse", submission).then(response=>{
          console.log("What is sent");
          console.log(submission);
          console.log("What is received");
          console.log(response);
          navigate("/instructordashboard");
          //alert("Course saved");
 }).catch((error)=>{
  console.log(error);
  navigate("/createCourse");
 });
  }

  return (
    
<div className="contact">
        <h1>Add or edit course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Course Name</span>
          {errors.courseName && (<p className="text-red-500">{`${errors.courseName.message}`}</p>)}
          <input
            {...register("courseName",
              {
                required: "Course name is required",
                minLength: {
                  value: 2,
                  message: "Course Name must be at least 2 characters"
                }
              }
            )}
            type="text"
            placeholder="Course Name"
          />
        </label>
        <label>
          <span>Description</span>
          {errors.description && (<p className="text-red-500">{`${errors.description.message}`}</p>)}
          <textarea
            {...register("description",
              {
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Last Name must be at least 2 characters"
                }
                //
              }
            )}
            type="text"
            placeholder="Course Description"
          />
        </label>
        <label>
          <span>Course imageUrl</span>
          {errors.imageUrl && (<p className="text-red-500">{`${errors.imageUrl.message}`}</p>)}
          <input
            {...register("imageUrl",
              {
                required: "imageUrl is required",
                minLength: {
                  value: 2,
                  message: "imageUrl must be at least 2 characters"
                }
              }
            )}
            type="text"
            placeholder="imageUrl"
          />
        </label>
        <button disabled={isSubmitting}>Submit</button>
      </form>
      <Outlet/>
    </div>

      
  );
}

export default CourseCreate;
