import useFormContext from "./useFormContext"
import "./form.css";


const BasicCourseInformation = ({register,fields, remove, append}) => {

  // const { register, fields, append, remove } = useFormContext();



  const content = (
    <div className="flex-col">
      <div className="flex-col">
        <label htmlFor="courseName">Course Name</label>
        <input
          {...register("courseName",
            {
              required: "Course name is required",
            }
          )}
          type="text"
          id="courseName"
          name="courseName"
          placeholder="Hadith"
        />
      </div>
      <div className="flex-col">
        <label htmlFor="courseDescription">Course Description</label>
        <textarea
          {...register("courseDescription",
            {
              required: "Course description is required",
            }
          )}
          type="text"
          id="courseDescription"
          name="courseDescription"
          placeholder="This course teaches about...."
        />
      </div>

      <label htmlFor="imageUrl">Preview Url</label>
      <input
        {...register("imageUrl",
          {
            required: "Preview url is required",

          }
        )}
        type="text"
        id="imageUrl"
        name="imageUrl"
        placeholder="https://"

      />

      {/* <label htmlFor="duration">Duration</label>
      <input
        {...register("duration",
          {
            required: "Preview url is required",
          }
        )}
        type="text"
        id="duration"
        name="duration"
        placeholder=""
      /> */}
      <div>
        <label>What studnts learn</label>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <input
                className="chapter"
                type="text"
                placeholder="Enter an objective"
                {...register(`whatStudentsLearn.${index}.mainPoint`)} 
                defaultValue={field?.mainPoint}
                />
              {
               ( index > 0) && (<button className="chapter" type="button" onClick={() => { remove(index) }}>Remove</button>)
              }
            </div>
          )

        })}
        <button type="button" onClick={() => append({ mainPoint: "" })}>Add Objectives</button>
      </div>
    </div>
  )

  return content
}
export default BasicCourseInformation;