import { createContext, useState } from "react";
import "./form.css";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {

    const title = {
        0: 'Course Information',
        1: 'Course Details',
        2: 'Update and Feedback',
        4: 'Preview'
    }

    const [page, setPage] = useState(0);

    const [data, setData] = useState({
        courseName: "",
        courseDescription: "",
        imageUrl: "",
        duration: 0.0,
        numberOfChapter: 0,
        numberOfLectures: 0,
        // mainTopics: "",
        price: 0.0,
        instructor: "",
        rating: "",
        lastUpdated: "",
        language: ""
    })



    const handleChange = e => {
        const type = e.target.type

        const name = e.target.name

        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
        console.log("h1");
    }

    const {
       rating,
        ...requiredInputs } = data

    const canPreview = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 2
    const canSubmit= [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('bill') && key !== 'billAddress2')
        .map(key => data[key])
        .every(Boolean)

    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
        .map(key => data[key])
        .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = ((page === Object.keys(title).length - 2)||(page === Object.keys(title).length - 1)) && "remove-button"

    const previewHide = page !== Object.keys(title).length - 2 && "remove-button"
    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, canPreview, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, previewHide, submitHide}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext 