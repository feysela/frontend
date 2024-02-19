import { useLocation } from "react-router-dom";
import "./coursePreview.css";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import PlayListItem from "../playlist/PlayListItem";
export default function CoursePreview() {
    const coursePreviewLocation = useLocation();
    const navigate =useNavigate();
    const course = coursePreviewLocation.state;
    console.log(course);
    const cars = ['Ford', 'BMW', 'Audi'];

    const contents =course.videos.map((video,i)=>{
          return( <h2>{video.videoTitle}</h2>);
    })
    return (
        <div className="course-preview">
          

                <div className="course-preview-header">
                    <h3>{course.courseName}</h3>
                    <p>{course.courseDescription}</p>
                    
                </div>

                <div className="outline">
                    <h3>What you will learn</h3>
                    <ol className="list">
                        <li className="list-item"><p>Main topic 1 placeholder</p></li>
                        <li className="list-item"><p>Main topic 2 placeholder</p></li>
                        <li className="list-item"><p>Main topic 3 placeholder</p></li>
                        <li className="list-item"><p>Main topic 4 placeholder</p></li>
                        <li className="list-item"><p>Main topic 1 placeholder</p></li>
                        <li className="list-item"><p>Main topic 2 placeholder</p></li>
                     
                    </ol>
                </div>

                <div className="course-info">
                    <h3>This course includes:</h3>
                    <p>{course.duration}hr on-demand video</p>
                    <p>Assignments</p>
                    <p>{course.numberOfChapter} Chapters</p>
                    <p>{course.numberOfLectures} Lecture videos</p>
                    <p>Certificate of completion</p>
                    <p>Access on mobile and desktop</p>
                </div>

                <div className="content">
                    <h3>content</h3>
                    {contents}
                </div>

            <div className="preview">
                <h3>Preview</h3>
                <button onClick={()=>{
                    navigate("/playList", {state:course.videos});
                }}>Go to course</button>
                <ReactPlayer url={course.imageUrl} width="100%"  height="25%" className="preview-video"  />
            </div>

        </div>);

}