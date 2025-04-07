import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { requestServer } from '../../serverRequest';
import { Container } from '@mui/material';
import TopicModal from "./TopicModal";
import { useEffect } from 'react';
import { getRequestServer } from '../../serverRequest';

import Topic from './Topic';

const Chapter = (
    { chapter, chapterIndex, expanded, handleChange,
        deleteChapter,
        setSelectedIndex, selectedIndex }
) => {

    const [openTopicModal, setTopicOpenModal] = useState(false);
    const [topics, setTopics] = useState([]);


    useEffect(() => {

        getRequestServer(`/private/getChapter/${chapter.publicId}`)
            .then(data => { setTopics(data.topics) });
    }, []);

    const addTopic = (index, topic) => {
        const response = requestServer("POST", "/private/createTopic", topic).then(response => {
            setTopics([...topics, response]);

            const updatedChapter = requestServer("POST", `/private/addTopic/${chapter.publicId}`, response).then(
                course => {
                    console.log("course")
                    console.log(updatedChapter);
                }
            )
        });


    }
    const deleteTopic = (chapterIndex, topicName) => {

        const updatedTopics = topics.filter(function (topic) {
            return topic.name !== topicName;

        });
        setTopics(updatedTopics);

    }

    return (
        <Container>
            <TopicModal setTopicOpenModal={setTopicOpenModal} openTopicModal={openTopicModal} addTopic={addTopic} index={selectedIndex} />
            <Accordion expanded={expanded === chapterIndex} onChange={(event, isExpanded) => handleChange(isExpanded, chapterIndex)}>
                <AccordionSummary >
                    <p>{chapter?.name} <Button onClick={() => { deleteChapter(chapter) }} color="error">Delete</Button></p>
                </AccordionSummary>
                <AccordionDetails >

                    <Typography>Topics:</Typography>
                    {topics.map((topic, topicIndex) => {
                        return (
                            <Topic key={topic.id} index={selectedIndex} deleteTopic={deleteTopic} topic={topic} />
                        )
                    })
                    }
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained"
                        onClick={() => {
                            setTopicOpenModal(true);
                            setSelectedIndex(chapterIndex);
                        }} disableRipple disableElevation>Add Topic</Button>
                </AccordionActions>
            </Accordion>
        </Container>


    )
}

export default Chapter;
