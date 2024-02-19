
import { Player } from "../../components/playlist/Player";
import { useLocation } from "react-router-dom";
export default  function CoursePlayer(){
  const actualCourseLocation =useLocation();
  const playList =actualCourseLocation.state;
    return (<>
    <Player videoList={playList}/>
    </>)
}