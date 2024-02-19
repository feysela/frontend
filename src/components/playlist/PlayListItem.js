
import "./playListItem.css";
// import {play} from "../../images/play.svg";
// import {pause} from "../../images/pause.svg";

export default function PlayListItem({ videoItem, i, isActive, onClick, index }) {
   

    // var playIcon = <img src={play} alt=""></img>
    // var pauseIcon = <img src={pause} alt=""></img>

    return (
    <div 
 
    className={isActive?"playListItem-active":"playListItem"}
    onClick={() => { onClick();}}>
        {/* {isActive ? pauseIcon : playIcon} */}
        <p>{index + 1 > 9 ? i : '0' + (index+1)} </p>
        <h3>{videoItem.videoTitle}</h3>
        <h3>{videoItem.duration}</h3>
    </div>
    );
}
