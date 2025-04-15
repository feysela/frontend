
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { getRequestServer, getUserId, requestServerWithHeader, requestServerWithHeaderWithData, getQuraan_app_user_data } from "../../serverRequest";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import Footer from "../../components/footer/Footer";
import ReactPlayer from "react-player";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useReducer } from "react";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const MyAccordion = styled(AccordionDetails)({
  color: 'darkslategray',
  backgroundColor: 'white',
});
const MyTopic = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  cursor: "pointer",
  border: 'solid 1px black',
  paddingLeft: 2,
  '&:hover': { backgroundColor: "grey" }
}));
const MyBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  cursor: "pointer",
  paddingLeft: 2,
  '&:hover': { backgroundColor: "lightgray" }
}));

export default function CoursePlayer() {
    const { courseId } = useParams();
    const [expanded, setExpanded] = useState(-1);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [progress, setProgress] = useState({});
    const userId =getUserId();
    const navigate = useNavigate();
    
    const studentName = 
    getQuraan_app_user_data('quraan_app_user_data')?.firstName + " "+getQuraan_app_user_data('quraan_app_user_data')?.lastName;

    useEffect(() => {
        getRequestServer(`/public/getCourse/${courseId}`)
          .then(data => {
            // console.log(data);
            dispatch({type:"SET_COURSE", payLoad:data});
            dispatch({type:"SET_TOPIC", payLoad: data?.chapters[0]?.topics[0]}); 
            dispatch({type:"TOGGLE"});

            // console.log("Active Topic");     
            //  console.log(JSON.stringify(state.activeTopic));
          });


  
const fetchProgress = async () => {

try{
  const response = await getProgress();
  if(response.status === 404) {
const postResponse = await updateProgress(0,0);
console.log("postResponse");
console.log(postResponse.data);

  if(postResponse.status ===200){
    dispatch({type:"SET_PROGRESS", payLoad:postResponse.data});
    console.error('Progress sucessfully retrieved');
    console.log(state.progress);
  }
  else {
    console.error('POST request failed');
  }

}
else if(response.status ===200){
   const data =response.data;
  dispatch({type:"SET_PROGRESS", payLoad:data});
  // console.log(JSON.stringify(state.progress));
  console.log("else if executed");

}
else{
  console.log("else executed")
  console.error('Request failed');
}
} catch(error){
console.log(error);
}
};

fetchProgress();

      }, []);
      const [state, dispatch] = useReducer((state, action) => {
        switch ((action.type)) {
          case "SET_TOPIC": 
              return {...state, activeTopic: action.payLoad, playMainVideo:true}
  
          case "SET_CHAPTER_INDEX":
            return { ...state, activeChapterIndex: action.chapterIndex };
  
          case "SET_TOPIC_INDEX":
              return { ...state, activeTopicIndex: action.topicIndex };
          case "UPDATE_INDICES":
            return{
  
            };
            case "SET_INDICES":
              return {...state, 
                  activeChapterIndex: action.chapterIndex, 
                  activeTopicIndex: action.topicIndex,
                  activeTopic:state.course?.chapters[action.chapterIndex]?.topics[action.topicIndex],
                  playMainVideo:true
              }
    
          case "TOGGLE":
            return {...state, 
              playMainVideo:!state.playMainVideo
            }
          case "SET_COURSE":
            return{
                ...state, course:action.payLoad
            }
            case "SET_PROGRESS":
              return{
                  ...state, progress:action.payLoad
              }
          default: return state;
        }
      },
        {
          activeTopic: {},
          activeChapterIndex: 0,
          activeTopicIndex: 0,
          playMainVideo:false,
          course:{},
          progress:{}
        }
      )
      const courseName = state.course.courseName;

    
      async function updateProgress(chapterIndex, topicIndex) {
        const response = await requestServerWithHeaderWithData("POST",
          `/private/saveProgress/${getUserId()}`,
          { "courseId": courseId },
          state.course.chapters[chapterIndex].topics[topicIndex]);
          dispatch({type:"SET_PROGRESS", payLoad:response.data});
          return response;
      }

      async function getProgress() {
        const response = await requestServerWithHeader("GET", `/private/getProgress/${courseId}`, {"userId": userId});
        if(response.status === 200){
          dispatch({type:"SET_PROGRESS", payLoad:response.data});
        }
   
        return response;

      }

     function updateIndices () {
      if (state.course?.chapters[state.activeChapterIndex]?.topics?.length - 2 >= state.activeTopicIndex) {
        dispatch({type:"SET_INDICES", chapterIndex:state.activeChapterIndex, topicIndex:state.activeTopicIndex+1});               
      }
      else {
        if (state.course?.chapters?.length - 2 >= state.activeChapterIndex) {
        dispatch({type:"SET_INDICES", chapterIndex:state.activeChapterIndex+1, topicIndex:0});
        }
      }
    }

    
    const handleChange = (isExpanded, index) => {
      setExpanded(isExpanded ? index : -1);
    }

    const getTotalNumberOfTopics= ()=>{
      var numberOfTopics=0;
      state.course?.chapters?.forEach(chapter => {
        numberOfTopics+=chapter?.topics?.length;
      });
      return numberOfTopics;

    }
    console.log("My progress")
    console.log(state.progress);
    console.log("Active Topic")
    console.log(state.activeTopic);
    console.log("Number of topics in the progress")
    console.log(state?.progress?.topics?.length);
    console.log("total number of topics in the course")
    console.log(getTotalNumberOfTopics());
    return (
      <Container>
        
        {/* <CircularProgress color="primary" variant="determinate" value={75}/> */}
        <Box 
          borderColor="seondary" 
          border={0.5} 
          padding={4}
          marginTop={4}
          marginBottom={4}
          borderRadius={1}>
          <Typography>Course Title: {state.course.courseName}</Typography>
          <Typography>Instructor: {state.course.instructor}</Typography>
          <Box sx={{display:"flex", alignItems:"center"}}>
                <Typography sx={{position:"relative", top:"5", marginRight:"9"}}>Progress</Typography>
                <CircularProgressWithLabel value={(state?.progress?.topics?.length/getTotalNumberOfTopics())*100}/>
          </Box>
         </Box>
         <Box 
          borderColor="primary" 
          border={0.5} 
          padding={4}
          marginBottom={4}
          borderRadius={1}
        > 
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} md={10} lg={8} padding={0}>
            <Typography variant="h5">{state.course?.name}</Typography>
            <ReactPlayer
              loop={false}
              playing={state.playMainVideo}
              url={state.activeTopic?.url}
              onEnded={()=>{
                     updateProgress(state.activeChapterIndex, state.activeTopicIndex);     
                     updateIndices();

              }
              }
              controls={true}
              width='100%'         
            />
            <p>{state.activeTopic?.name}</p>
            <Button onClick={(e) => {
              updateIndices();
           
            }}>Complete and Go next</Button>
          </Grid>
          <Grid item xs={12} md={2} lg={4}>
            {
              state.course?.chapters?.map(
                (chapter, chapterIndex) => {
                  return (
                    <div key={chapterIndex}>
                      <Accordion square={true} sx={{ borderBottom: 1, borderRadius: 0 }} key={chapterIndex} open={chapterIndex === selectedIndex} expanded={expanded === chapterIndex} onChange={(event, isExpanded) => handleChange(isExpanded, chapterIndex)}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon />
                          }>
                          <Typography>{chapter?.name?.slice(0, 40)}{"..."}</Typography>
                        </AccordionSummary>
                        <MyAccordion>
                          {chapter?.topics?.map((topic, _topicIndex) => {
                            return (
                              <MyBox onClick={(e) => {
                                if(state.activeTopicIndex===_topicIndex && state.activeChapterIndex===chapterIndex){
                                    dispatch({type:"TOGGLE"});
                                }  
                                else{
                                    var activeTopic ={       
                                        name:state.course?.chapters[chapterIndex]?.topics[_topicIndex]?.name,
                                        url: state.course?.chapters[chapterIndex]?.topics[_topicIndex]?.url
                                    }
                                         dispatch({type:"SET_INDICES", chapterIndex:chapterIndex, topicIndex:_topicIndex});
                                         dispatch({type:"SET_TOPIC", payLoad:activeTopic });
                                }      
                              }}
                                sx={{ alignItems: "left", justifyContent: "left" }} key={_topicIndex}>
                                <Box sx={{ display: "flex", justifyContent: "left" }}><Typography key={topic.name}>{_topicIndex + 1}{". "}{topic?.name?.slice(0, 30)}{"..."}</Typography></Box>
                                <Box sx={{ display: "flex", justifyContent: "left" }}><OndemandVideoIcon /><Typography >{topic?.duration}{"min"}</Typography> </Box>
                              </MyBox>
                            )
                          })
                          }
                        </MyAccordion>
                        <AccordionActions>
                        </AccordionActions>
                      </Accordion>
                    </div>  
                  );
                }
              )
            }
          </Grid>
        </Grid>
        </Box>

      <Button onClick={()=>navigate('/Certificate',{ state: { studentName, courseName} } )}>Claim Your Certificate</Button>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20, height:"400"}}></Box>
        <Footer />
      </Container>)
  }
  
 

  // requestServerWithHeader("GET", `/private/getProgress/${courseId}`, { "userId": userId})
  // .then(
  //   response => {
  //     if(response.ok){
  //       setProgress(response);
  //       console.log("Response found");
  //       console.log(response);
  //     }
  //     else {
  //       requestServerWithHeaderWithData("POST", `/private/saveProgress/${getUserId()}`, { "courseId": courseId}, state.activeTopic).then( response=>
  //        { 
  //         setProgress(response);
  //         console.log(response);
  //       }
  //       )
  //     }     
  //   }
  // ).catch(error => console.error('Request failed:', error));