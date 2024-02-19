
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequestServer } from '../serverRequest';
import "./videoPlayer.css";
import { Player } from './playlist/Player';


export default function CourseStart() {
    const {id}=useParams();
    const [course, SetCourse] =useState({});
    const [playList,setPlayList]=useState();

    useEffect(()=>{
         getRequestServer(`/public/getCourse/${id}`)
        .then(data=>
          {SetCourse(data);
          setPlayList(data.videos) 
          })
     
      },[]);
      
    const videoList =course.videos;
   console.log(videoList);
    return (    
      <Player videoList={videoList}/>
  
      
   
   );

}
