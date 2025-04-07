import { useLocation } from "react-router-dom";
import "./coursePreview.css";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import { requestServer, getRequestServer } from "../../serverRequest";
import UserContext from "../../context/UserContextProvider";
import { useContext } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MobileFriendlyOutlinedIcon from '@mui/icons-material/MobileFriendlyOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PersonalVideoOutlinedIcon from '@mui/icons-material/PersonalVideoOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
//import { makeStyles } from '@mui/styles';
import Rating from '@mui/material/Rating';
import { useState } from "react";
import { useEffect } from "react";
import { getUserId } from "../../serverRequest";
import Footer from "../footer/Footer";

export default function CoursePreview() {
    const { userData } = useContext(UserContext);
    const coursePreviewLocation = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [expanded, setExpanded] = useState(-1);
    const { courseId } = useParams();
    const objectives = course?.whatStudentsLearn?.split("|");
    const [rating, setRating] = useState(3);
    const lastUpdated = new Date(course?.lastUpdated);
    const userId = getUserId();
    const [subscription, setSubscription] = useState(false);


    useEffect(() => {
            const _course=getRequestServer(`/public/getCourse/${courseId}`)
                .then(data => { setCourse(data) });
           let subscriptionFromServer =requestServer("GET", `/private/getSubscription/${userId}?courseId=${courseId}`, "");
           setSubscription(subscriptionFromServer);

        const _response = requestServer("GET", `/private/doesSubscriptionExist/${userId}?courseId=${courseId}`).then(response => {
            // console.log("userId");
            // console.log(userId);
            // console.log("courseId");
            // console.log(courseId);
            setSubscription(response);
            //  console.log(subscription);

        }).catch((error) => {
            console.log(error);
            console.log(error);
        });

    }, [userId]);

    console.log("userId");
    console.log(userId);
    console.log("courseId");
    console.log(courseId);
    console.log("Subscription");
    console.log(subscription);
  

    const subscribe = (userId, courseId) => {
        requestServer(`POST', '/private/createSubscription/${userData.pid}`)
            .then(response => {
                console.log(response);
            }).catch(
                (error) => {
                }
            );
    }

    const handleChange = (isExpanded, index) => {
        setExpanded(isExpanded ? index : -1);
    }

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} md={9} >
                    <Stack spacing={1}>
                        <Paper variant="outlined">
                        <Typography variant="h5" align="center">User is{userData.current?.firstName}</Typography>
                            <Typography variant="h5" align="center">{course?.courseName}</Typography>
                            <Typography variant="body1">{course?.courseDescription}</Typography>
                            <Rating name="simple-controlled" value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                            <Typography variant="body1">Last updated: {lastUpdated?.toLocaleDateString()}</Typography>
                            <Typography variant="body1">Created by:  {course?.instructor}</Typography>
                            <Typography variant="body1">Language: {course?.language}</Typography>
                        </Paper>

                        <Paper variant="outlined" md={6}>
                            <Typography variant="h5" align="center">What you will learn</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", p: 1, m: 1, mx: 2 }}>
                                {
                                    objectives?.map((objective, index) => {
                                        return (
                                            (objective !== "") &&
                                            <Box sx={{ width: "50%", display: 'flex' }} key={index}>
                                                <CheckIcon style={{ position: 'relative', top: '0px' }} /><Typography variant="body2" key={index}  >{objective}</Typography>
                                            </Box>

                                        )
                                    })
                                }
                            </Box>
                        </Paper>

                        <Paper variant="outlined">
                            <Typography variant="h6" align="center">This course includes:</Typography>
                            <Typography variant="body1">{course?.courseDescription}</Typography>
                            <Typography variant="body1" ><OndemandVideoIcon style={{ position: 'relative', top: '8px', inline: "true" }} /> {course?.duration}hr on-demand video</Typography>
                            <Typography variant="body1"><HelpOutlineOutlinedIcon style={{ position: 'relative', top: '8px', inline: "true" }} /> Assignments</Typography>
                            <Typography variant="body1"><StickyNote2OutlinedIcon style={{ position: 'relative', top: '8px' }} />  {course?.numberOfChapter} Chapters</Typography>
                            <Typography variant="body1"> <PersonalVideoOutlinedIcon style={{ position: 'relative', top: '8px' }} /> {course?.numberOfLectures} Lecture videos</Typography>
                            <Typography variant="body1"><SchoolOutlinedIcon style={{ position: 'relative', top: '8px' }} /> Certificate of completion</Typography>
                            <Typography variant="body1"> <MobileFriendlyOutlinedIcon /> Access on mobile and desktop</Typography>
                        </Paper>
                        <Paper variant="outlined">
                            <Typography variant="h5">Course content</Typography>
                            {course?.chapters?.map((chapter, index) => {
                                return (
                                    <Accordion key={index}
                                        open={selectedIndex === index}
                                        expanded={expanded === index}
                                        onChange={(event, isExpanded) => handleChange(isExpanded, index)}>

                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Box key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="h6">{chapter.name}</Typography>
                                                <Typography variant="h6">{chapter.duration}</Typography>
                                            </Box>
                                        </AccordionSummary>

                                        <AccordionDetails >
                                            {chapter.topics?.map((topic, _topicIndex) => {
                                                return (<Box key={_topicIndex} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography variant="body1">{topic.name}</Typography>
                                                    <Typography variant="body1">{topic.duration}</Typography>
                                                </Box>

                                                )
                                            })
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </Paper>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper variant="outlined" >
                        <Box sx={{ padding: 1 }} align="center">

                            <ReactPlayer width="100%" height="50%" url={`https://www.youtube.com/watch?v=JIbIYCM48to`} />
                            <Typography variant="h6" ></Typography>
                            <Typography>${course?.price}</Typography>
                            {(!(userId == null) ? (subscription === true ?
                                <Button
                                    variant="contained"
                                    sx={{ marginBottom: 1 }}
                                    color="secondary"
                                    onClick={() => {
                                        navigate(`/coursePlayer/${courseId}`);
                                    }}
                                >Go to course</Button> : <Button variant="contained" disableRipple disableElevation={true}>Subscribe</Button>
                            ) : <h2> Log in to to take the course</h2>)}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </Container>)

}