
import { useForm } from 'react-hook-form';
import { requestServer } from '../serverRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getRequestServer } from '../serverRequest';
function CourseEdit() {

  const { id } = useParams();

  const navigate = useNavigate();


  const { register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({

    defaultValues: async () => {
      const response = await getRequestServer(`/private/getCourse/${id}`);
      return {
        courseName: response.courseName,
        description: response.courseDescription,
        imageUrl: response.imageUrl,
      }
    }

  });


  const onSubmit = async (data) => {
    if (isDirty === false) {
      return
    }
    const submission = {
      id: id,
      courseName: data.courseName,
      courseDescription: data.description,
      imageUrl: data.imageUrl
    }
    requestServer("POST", "/private/editCourse", submission).then(response => {
      console.log("What is sent");
      console.log(submission);
      console.log("What is received");
      console.log(response);

      navigate("/instructordashboard");
    }).catch((error) => {
      console.log(error);

    });
  }

  return (
    <div className="contact">

      <h3>Edit the course information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="default-form">
        <label>
          <span>Course Name</span>
          {errors.courseName && (<p className="text-red-500">{`${errors.courseName.message}`}</p>)}
          <input
            {...register("courseName",
              {
                required: {

                  message: "Course Name is requried"
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
          <input
            {...register("description",
              {
                required: {

                  message: "Description is requried"
                }
              }
            )}
            type="text"

            placeholder="Course description"
          ></input>
        </label>
        <label>
          <span>Course Url</span>
          {errors.imageUrl && (<p className="text-red-500">{`${errors.imageUrl.message}`}</p>)}
          <input
            {...register("imageUrl",
              {
                disabled: false,
                required: "Url is requried"
              }
            )}
            type="text"
            placeholder="url"
          ></input>
        </label>
        <button className="btn-login"
          disabled={isSubmitting} >Submit</button>
      </form>
    </div>
  );
}

export default CourseEdit;
