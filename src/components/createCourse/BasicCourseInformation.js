import useFormContext from "./useFormContext"
import "./form.css";
const BasicCourseInformation = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div className="flex-col">
          
                <div className="flex-col">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        placeholder="Hadith"
                        value={data.courseName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="courseDescription">Course Description</label>
                    <input
                        type="text"
                        id="courseDescription"
                        name="courseDescription"
                        placeholder="This course teaches about...."
                        value={data.courseDescription}
                        onChange={handleChange}
                    />
                </div>
    

            <label htmlFor="imageUrl">Preview Url</label>
            <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={data.imageUrl}
                onChange={handleChange}
            />

            <label htmlFor="duration">Duration</label>
            <input
                type="text"
                id="duration"
                name="duration"
                placeholder="Apt. 2"
              
                value={data.duration}
                onChange={handleChange}
            />
        </div>
    )

    return content
}
export default BasicCourseInformation