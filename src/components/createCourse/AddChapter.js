
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRequestServer, requestServer } from '../../serverRequest';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ChapterCreateModal from './ChapterCreateModal';

import ChapterTemplate from './ChapterTemplate';

const AddChapter = () => {
    const chpaterCreateLocation = useLocation();
    const course = chpaterCreateLocation.state;
    const [openChapterModal, setChapterOpenModal] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [expanded, setExpanded] = useState(-1);

    useEffect(() => {

        getRequestServer(`/private/getCourse/${course.courseId}`)
            .then(data => { setChapters(data.chapters) });
    }, []);

    const addChapter = (chapter) => {
        const _response = requestServer("POST", "/private/createChapter", chapter).then(response => {
            setChapters([...chapters, response]);
            console.log(response);
            const courseUpdated = requestServer("POST", `/private/addChapter/${course.courseId}`, response).then(
                course => {
                    console.log("course")
                    console.log(courseUpdated);
                }
            )
        });
    }

    const deleteChapter = (chapterTobeDeleted) => {

        const _response = requestServer("DELETE", `/private/deleteChapter/${chapterTobeDeleted.publicId}`).then(response => {
            const updatedChapters = chapters.filter(function (chapter) {
                return chapter.id !== chapterTobeDeleted.id;
            });
            setChapters(updatedChapters);
        });
      

    }

    const handleChange=(isExpanded, index)=>{
        setExpanded(isExpanded? index:-1);
        }
    

    return (
        <div>
            <Container>
                <Typography variant="h5">
                    {course?.courseName}
                </Typography>

                <Typography variant="body1">
                    {course?.courseDescription}<br></br>
 
                </Typography>
                <Button variant="contained" onClick={() => { setChapterOpenModal(true) }} sx={{ marginY: 2 }} disableRipple >Add Chapter</Button>
                <ChapterCreateModal openChapterModal={openChapterModal} setChapterOpenModal={setChapterOpenModal} addChapter={addChapter} courseId={course.courseId} />
              
                {
                        chapters?.map((chapter, chapterIndex)=>{
                           return(
               
                            <ChapterTemplate chapter={chapter}
                            key={chapterIndex}
                            open={selectedIndex===chapterIndex}
                            expanded={expanded} 
                            handleChange={handleChange}
                            setSelectedIndex={setSelectedIndex}
                            selectedIndex={selectedIndex}
                            deleteChapter={deleteChapter}
                            chapterIndex={chapterIndex}/>
                          
                           ) 
                        }
                        )
                }
            </Container>
        </div>
    )
}

export default AddChapter;
