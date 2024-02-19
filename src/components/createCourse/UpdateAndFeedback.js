import useFormContext from "./useFormContext";
import "./form.css";

const UpdateAndFeedback = () => {
    const { data, handleChange } = useFormContext()

    const content = (
        <>
       

            {/* <div className="split-container"> */}
                <div className="flex-col">
                    <label htmlFor="instructor">Instructor Name</label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        placeholder="Feysel"
                        value={data.instructor}
                        onChange={handleChange}
                        // disabled={data.sameAsBilling}
                    />
                </div>
                <div className="flex-col">
                    <label htmlFor="rating">Level</label>
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        placeholder="5"
                        value={data.rating}
                        onChange={handleChange}
                        // disabled={data.sameAsBilling}
                    />
                </div>
            {/* </div> */}

            <label htmlFor="lastUpdated">Today's date</label>
            <input
                type="date"
                id="lastUpdated"
                name="lastUpdated"
                value={data.lastUpdated}
                onChange={handleChange}
                // disabled={data.sameAsBilling}
            />

            <label htmlFor="language">Language</label>
            <input
                type="text"
                id="language"
                name="language"
                placeholder="0"
                value={data.language}
                onChange={handleChange}
                // disabled={data.sameAsBilling}
            />

           
        </>
    )

    return content
}
export default UpdateAndFeedback