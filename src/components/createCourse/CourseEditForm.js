import FormInputs from './FormInputs'
import "./form.css";
import { requestServer } from '../../serverRequest';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getRequestServer } from '../../serverRequest';
import { useParams } from "react-router-dom";
import { useFieldArray } from "react-hook-form";
const CourseEditForm = () => {
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [page, setPage] = useState(0);
    const [mainPoints, setMainPoints] =useState([]);
    const [courseObjective,setCourseObjective] =useState("");
    const title = {
        0: 'Course Information',
        1: 'Course Details',
        2: 'Update and Feedback',
        3: 'Preview'
    }
    
    const { register, control, handleSubmit } = useForm({
        defaultValues: async () => {
            const response = await getRequestServer(`/public/getCourse/${courseId}`);
            console.log("What students learn")
            console.log(response.whatStudentsLearn);
            setCourse(response);
            setCourseObjective(response?.whatStudentsLearn);
            const objectiveList=response?.whatStudentsLearn?.split("|").filter(i=>i);
            setMainPoints(objectiveList);
            console.log("mainPoints");
            console.log(mainPoints);
            console.log("objectiveList");
            console.log(objectiveList);
            console.log("courseObjective");
            console.log(courseObjective);

            objectiveList?.map((item, index) => {
                console.log("item");
                console.log(item);
                append({ mainPoint: item });
             }
            )

            return {
                courseName: response.courseName,
                description: response.courseDescription,
                imageUrl: response.imageUrl,
                //whatStudentsLearn: objectiveList,
                chapters: response.chapters,
                courseDescription: response.courseDescription,
                duration: response.duration,
                numberOfChapter: response.numberOfChapter,
                numberOfLectures: response.numberOfLectures,
                price: response.price,
                instructor: response.instructor,
                rating: response.rating,
                lastUpdated: response.lastUpdated,
                language: response.language
            }
        }
    }
    );
    const { fields, append, remove } = useFieldArray({ control, name: 'whatStudentsLearn' }); 
    const handlePrev = () => setPage(prev => prev - 1)
    const handleNext = () => setPage(prev => prev + 1)

    console.log("course");
    console.log(course);
    const onSubmit = (data) => {
        console.log("data");
        console.log(data);
        let objectives = "";
        data.whatStudentsLearn?.forEach((obj, index)=>{
            objectives += obj.mainPoint+"|";
        })

        console.log("objectives")
        console.log(objectives);
        const submission = {
            courseId:courseId,
            courseName: data.courseName,
            courseDescription: data.courseDescription,
            whatStudentsLearn:  objectives,
            imageUrl: data.imageUrl,
            duration: data.duration,
            numberOfChapter: data.numberOfChapter,
            numberOfLectures: data.numberOfLectures,
            price: data.price,
            instructor: data.instructor,
            rating: data.rating,
            lastUpdated: data.lastUpdated,
            language: data.language,
            chapters: data.chapters
        }

        requestServer("POST", `/private/editCourse/${courseId}`, submission).then(response => {
            console.log("What is sent");
            console.log(submission);
            console.log("What is received");
            console.log(response);
            navigate("/instructordashboard");
        }).catch((error) => {
            console.log(error);
        });
    }
    const canPreview =true;
    const canSubmit =true;
    const disablePrev = page === 0
    const disableNext = (page === Object.keys(title).length - 1)
    const prevHide = page === 0 && "remove-button"
    const nextHide = ((page === Object.keys(title).length - 2)||(page === Object.keys(title).length - 1)) && "remove-button"
    const previewHide = page !== Object.keys(title).length - 2 && "remove-button";
    const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

    return (
        <form className="form flex-col" onSubmit={handleSubmit(onSubmit)}>

            <header className="form-header">
                <h2>{title[page]}</h2>

                <div className="button-container">
                    <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>
                    <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>
                    <button type="button" className={`button ${previewHide}`} disabled={!canPreview} onClick={handleNext}>Preview</button>
                    <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit} >Submit</button>
                </div>
            </header>
            <FormInputs register={register} control={control}  fields={fields} append={append} remove={remove} page={page}/>
        </form>
    )
}
export default CourseEditForm
