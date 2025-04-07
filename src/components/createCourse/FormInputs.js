import useFormContext from "./useFormContext";
import { useState } from "react";
import BasicCourseInformation from "./BasicCourseInformation";
import CourseDetails from "./CourseDetails";
import UpdateAndFeedback from "./UpdateAndFeedback";
import Preview from "./Preview";
import "./form.css";

const FormInputs = ({register, fields, append, remove, page }) => {

    const display = {
        0: <BasicCourseInformation register={register} fields={fields} append={append} remove={remove}/>,
        1: <CourseDetails register={register} />,
        2: <UpdateAndFeedback register={register}/>,
        3: <Preview/>
        // 3:<><BasicCourseInformation register={register} fields={fields} append={append} remove={remove}/>
        // <CourseDetails register={register} /><UpdateAndFeedback register={register}/></>
    }
    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )

    return content
}
export default FormInputs