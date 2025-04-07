import useFormContext from "./useFormContext";
import "./form.css";

const UpdateAndFeedback = ({register}) => {
    // const { register} = useFormContext()

    const content = (
        <>
       

            {/* <div className="split-container"> */}
                {/* <div className="flex-col">
                    <label htmlFor="instructor">Instructor Name</label>
                    <input
                            {...register("instructor",
                            {
                              required: "Instructor name is required",
                            }
                          )}
                        type="text"
                        id="instructor"
                        name="instructor"
                        placeholder="Seid Ahmed"

                    />
                </div> */}
                <div className="flex-col">
                    <label htmlFor="rating">Level</label>
                    <input
                                    {...register("rating",
                                
                                  )}
                        type="text"
                        id="rating"
                        name="rating"
                        placeholder="5"
                    />
                </div>
            {/* </div> */}

            {/* <label htmlFor="lastUpdated">Today's date</label>
            <input
                                        {...register("lastUpdated",
                                        {
                                          required: "Creation date name is required",
                                        }
                                      )}
                type="date"
                id="lastUpdated"
                name="lastUpdated"
            /> */}

            <label htmlFor="language">Language</label>
            <input
                        {...register("language",
                        {
                          required: "Language is required",
                        }
                      )}
                type="text"
                id="language"
                name="language"
                placeholder="English"

            />

           
        </>
    )

    return content
}
export default UpdateAndFeedback