import { createContext, useState } from "react";
import "./form.css";
import {useForm} from 'react-hook-form';
import { useFieldArray } from "react-hook-form";
const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    
    // const title = {
    //     0: 'Course Information',
    //     1: 'Course Details',
    //     2: 'Update and Feedback',
    //     3: 'Preview'
    // }

    // const [page, setPage] = useState(0);
    // const [data, setData] = useState({
    //     courseName: "xyz",
    //     courseDescription: "",
    //     imageUrl: "",
    //     duration: 0.0,
    //     numberOfChapter: 0,
    //     numberOfLectures: 0,
    //     topics: " ",
    //     price: 0.0,
    //     instructor: "",
    //     rating: "",
    //     lastUpdated: "",
    //     language: "",
    //     whatStudentsLearn:[],
    //     chapters:[]
    // });
    // const {register, control, handleSubmit} = useForm({
    //     defaultValues:{
    //         whatStudentsLearn:data.whatStudentsLearn,
    //         chapters:data.chapters,
    //         courseName: data.courseName,
    //         courseDescription: data.courseDescription,
    //         imageUrl: data.imageUrl,
    //         duration: data.duration,
    //         numberOfChapter: data.numberOfChapter,
    //         numberOfLectures: data.numberOfLectures,
    //         price: data.price,
    //         instructor: data.instructor,
    //         rating: data.rating,
    //         lastUpdated: data.lastUpdated,
    //         language: data.language
    //     }}
    // );
    // const { fields, append, remove } = useFieldArray({ control, name: 'whatStudentsLearn' });

    const handleChange = e => {
        const type = e.target.type
        const name = e.target.name

        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value

        // setData(prevData => ({
        //     ...prevData,
        //     [name]: value
        // }))
    }

    // const {
    //    rating,
    //     ...requiredInputs } = data

    // const canPreview = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 2
    // const canPreview =true;
    // // const canSubmit= [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1
    // const canSubmit =true;
    // const disablePrev = page === 0

    // const disableNext =
    //     (page === Object.keys(title).length - 1)

    // const prevHide = page === 0 && "remove-button"

    // const nextHide = ((page === Object.keys(title).length - 2)||(page === Object.keys(title).length - 1)) && "remove-button"

    // const previewHide = page !== Object.keys(title).length - 2 && "remove-button";
    // const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

    return (
        <FormContext.Provider value={{ 
            // title, page, setPage,
        //  data, register, control, handleSubmit, fields, append, remove, setData, 
        //  canPreview, canSubmit, 
         handleChange, 
        //  disablePrev, disableNext, prevHide, nextHide, previewHide, submitHide
         }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext 