import ReactPlayer from "react-player";
function VideoPlayer({ Course, onDelete, onEdit }) {
  return (<ReactPlayer
  controls={true}
  url={Course.imageUrl}
  height={'400px'}
  width={'600px'}

  />)

 
  }
  
  export default VideoPlayer;