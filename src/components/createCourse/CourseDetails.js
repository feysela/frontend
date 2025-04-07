import useFormContext from "./useFormContext";
import "./form.css";


const CourseDetails = ({register}) => {

    const content = (
        <>
                {/* <div className="flex-col">
                    <label htmlFor="numberOfChapter">Number of Chapters</label>
                    <input
                            {...register("numberOfChapter",
                            {
                              required: "Number of chapters is required",
                            }
                          )}
                        type="text"
                        id="numberOfChapter"
                        name="numberOfChapter"
                        placeholder="1"
                     
                    />
                </div> */}
                {/* <div className="flex-col">
                    <label htmlFor="numberOfLectures">Number of Videos</label>
                    <input
                              {...register("numberOfLectures",
                              {
                                required: "Number of lectures is required",
                              }
                            )}
                        type="text"
                        id="numberOfLectures"
                        name="numberOfLectures"
                        placeholder="1"
                    />
                </div> */}

            <label htmlFor="price">Price</label>
            <input
            {...register("price",
            {
              required: "Price is required",
            }
          )}
                type="text"
                id="price"
                name="price"
                placeholder="0"
            />

           
        </>
    )

    return content
}
export default CourseDetails