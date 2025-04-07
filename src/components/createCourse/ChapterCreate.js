// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import ChapterCreateModal from "./ChapterCreateModal";
// import { useEffect } from "react";
// import { getRequestServer, requestServer } from "../../serverRequest";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Chapter from "./Chapter";


// const ChapterCreate = () => {
//     const chpaterCreateLocation = useLocation();
//     const course = chpaterCreateLocation.state;
//     const [openChapterModal, setChapterOpenModal] = useState(false);

//     const [chapters, setChapters] = useState([]);
//     const[selectedIndex, setSelectedIndex]=useState(0);

//     const [expanded,setExpanded]=useState(-1);

//     useEffect(() => {

//         getRequestServer(`/private/getCourse/${course.courseId}`)
//             .then(data => { setChapters(data.chapters) });
//     }, []);

//     const addChapter = (chapter) => {

//         console.log(`Created Chapter `);
//         const response = requestServer("POST", "/private/createChapter", chapter).then(response => {
//             setChapters([...chapters, response]);
//             console.log(response);
//             const courseUpdated = requestServer("POST", `/private/addChapter/${course.courseId}`, response).then(
//                 course => {
//                     console.log("course")
//                     console.log(courseUpdated);
//                 }
//             )
//         });
//     }

//     const deleteChapter = (chapterTobeDeleted) => {

//         const response = requestServer("DELETE", `/private/deleteChapter/${chapterTobeDeleted.publicId}`).then(response => {
//             const updatedChapters = chapters.filter(function (chapter) {
//                 return chapter.id !== chapterTobeDeleted.id;
//             });
//             setChapters(updatedChapters);
    
//         });
      

//     }

//     return (<div className="chapterCreate">
//         <Container>
//             {
             
//             <Typography variant="h5">
//                 {course?.courseName}
//             </Typography>
// }

// {
//             <Typography variant="body1">
//                 {course?.courseDescription}<br></br>
//                 {course?.courseId}
//             </Typography>
// }


//             <Button variant="contained" onClick={() => { setChapterOpenModal(true) }} sx={{ marginY: 2 }} disableRipple >Add Chapter</Button>
//             <ChapterCreateModal addChapter={addChapter} setChapterOpenModal={setChapterOpenModal} openChapterModal={openChapterModal} courseId={course.courseId} />
           
           
//             {chapters?.map((chapter, chapterIndex) => 
//             (<div>
//                 <Chapter 
//                 key={chapterIndex} chapterIndex={chapterIndex} expanded={expanded} 
//                chapter={chapter} deleteChapter={deleteChapter} 
//                 setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex}
//                 />
//             </div>
//             ))}
       
//         </Container>

//     </div>);
// }
// export default ChapterCreate;
