import useFormContext from "./useFormContext"
import BasicCourseInformation from "./BasicCourseInformation";
import CourseDetails from "./CourseDetails";
import UpdateAndFeedback from "./UpdateAndFeedback";
import "./form.css";

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <BasicCourseInformation/>,
        1: <CourseDetails />,
        2: <UpdateAndFeedback />,
        3:<><BasicCourseInformation/><CourseDetails /><UpdateAndFeedback /></>
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs