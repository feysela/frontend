import useFormContext from "./useFormContext";
import "./form.css";


const CourseDetails = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <>
       

            {/* <div className="split-container"> */}
                <div className="flex-col">
                    <label htmlFor="numberOfChapter">Number of Chapters</label>
                    <input
                        type="text"
                        id="numberOfChapter"
                        name="numberOfChapter"
                        placeholder="Jane"
                        value={data.numberOfChapter}
                        onChange={handleChange}
                        // disabled={data.sameAsBilling}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="numberOfLectures">Number of Videos</label>
                    <input
                        type="text"
                        id="numberOfLectures"
                        name="numberOfLectures"
                        placeholder="Doe"
                        value={data.numberOfLectures}
                        onChange={handleChange}
                        // disabled={data.sameAsBilling}
                    />
                </div>
            {/* </div> */}

            {/* <label htmlFor="mainTopics">Main Topics</label>
            <input
                type="text"
                id="mainTopics"
                name="mainTopics"
                value={data.mainTopics}
                onChange={handleChange}
                // disabled={data.sameAsBilling}
            /> */}

            <label htmlFor="price">Price</label>
            <input
                type="text"
                id="price"
                name="price"
                placeholder="0"
                value={data.price}
                onChange={handleChange}
                // disabled={data.sameAsBilling}
            />

           
        </>
    )

    return content
}
export default CourseDetails