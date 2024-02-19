

import PlayListItem from "./PlayListItem";
import ReactPlayer from "react-player";
import "./playList.css";
import { useState,useEffect } from "react";

export   function Player ({videoList}) {

  const [mainVideoUrl, setMainVideoUrl] = useState("");
  const [index, setIndex] = useState(0);
  
  const [mainVideoPlaying, setMainVideoPlaying] = useState(false);
  const [titleOfMainVideo, setTitleOfMainVideo] =useState("");
  const [videos,setVideos]=useState([]);
  console.log(titleOfMainVideo);
  
  useEffect(()=>{
    setVideos(videoList);
     if(videoList!==undefined)
    setMainVideoUrl(videoList[0]?.url);
   
  },[videoList]);


  const renderedVideos = videoList?.map(function (videoItem, i) {

    return (
      <div className='playlist' key={i} >
        <PlayListItem

          className='playlist-item'
          videoItem={videoItem}
          index={i}
          isActive={index === i}
          url={`${videoList[0]?.url}`}
          onClick={() => {
            if(i===index){
              setMainVideoPlaying(true);
              return 0;
            }
            setIndex(i);
            setMainVideoUrl(videoItem.url);
            setTitleOfMainVideo(videoItem?.videoTitle);
            setMainVideoPlaying(true);             
          }
          }

          mainVideoPlaying={mainVideoPlaying}
        />
      </div>
    );
  })
  return (
    <div className='container'>

      <div>
        <ReactPlayer 
          url={`${mainVideoUrl}`}
          playing={mainVideoPlaying}
          onEnded={() => { setIndex(index + 1) }}
          controls={true}
 
        />
        <h3>{titleOfMainVideo}</h3>
      </div>

      <div className='playlist'>
        {renderedVideos}
      </div>
    </div>);
}







  