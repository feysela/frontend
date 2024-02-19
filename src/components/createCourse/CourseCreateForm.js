import FormInputs from './FormInputs'
import useFormContext from "./useFormContext"
import "./form.css";
import { requestServer } from '../../serverRequest';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate =useNavigate();

    const {
        page,
        setPage,
        data,
        setData,
        title,
        canPreview,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        previewHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)
    const handlePreview =()=>{
        setPage(prev => prev + 1)
    }

    const handleSubmit = e => {
        e.preventDefault()
       // console.log(JSON.stringify(data));
        requestServer("POST", "/private/createCourse", data).then(response => {
            console.log("What is sent");
            console.log(data);
            console.log("What is received");
            console.log(response);
            setData({
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
            });
            navigate("/instructordashboard");
          }).catch((error) => {
            console.log(error);
           // navigate("/createCourse");
          });

    }

    const content = (
        <form className="form flex-col" onSubmit={handleSubmit}>

            <header className="form-header">
                <h2>{title[page]}</h2>

                <div className="button-container">

                    <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>

                    <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>

                    <button type="button" className={`button ${previewHide}`} disabled={!canPreview} onClick={handlePreview}>Preview</button>
                    <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit} >Submit</button>
                </div>
            </header>

            <FormInputs />

        </form>
    )

    return content
}
export default Form