
import { useForm } from "react-hook-form";
import { Stack, TextField, Button, text } from "@mui/material";
import { useEffect, useState } from "react";
import { requestServer, getRequestServer } from "../../serverRequest";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { imageDb } from "../../config/firestore";
import { ImageConfig } from '../../config/ImageConfig';
import LinearProgress from '@mui/material/LinearProgress';
import {
    ref,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";

import "./chapterAndTopicAddition.css";
export default function TopicAddition() {
    const [chapter, setChapter] = useState({});
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const topicLocation = useLocation();
    const courseId = topicLocation.state;
    const [file, setFile] = useState(null);
    const [videoUrl,setVideoUrl] = useState(null);
    const [per, setPerc] = useState(null);
    const { register,
        handleSubmit
    } = useForm();
    useEffect(() => {
        // const chapter = getRequestServer(`/public/getChapter/${chapterId}`)
        //     .then(data => { setChapter(data) });
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
      
            console.log(name);
            const storageRef = ref(imageDb, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
      
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setPerc(progress);
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                    break;
                }
              },
              (error) => {
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setVideoUrl(downloadURL);
                });
              }
            );
          };
          file && uploadFile();
         console.log("UseEffect is run");
    }, [file]);
    const fileRemove = (file) => {
        setFile(null);
    }

    const addTopic = (topic) => {
        const _response = requestServer("POST", "/private/createTopic", topic).then(response => {
            console.log(response);
            const chapterUpdated = requestServer("POST", `/private/addTopic/${chapterId}`, response).then(
                course => {
                    console.log("course");
                    console.log(chapterUpdated);
                    navigate(`/createdCoursePreview/${courseId}`, { state: chapterUpdated?.course });
                }
            )
        });
    }
    const onSubmit = (data) => {
        const submission={
            ...data, videoUrl:videoUrl
        }
        addTopic(submission);
        console.log(JSON.stringify(submission));
    }

    return (<div key={chapterId} className="container">
        <Paper sx={{ marginTop: 12 }} className="form">
            <Typography sx={{ textAlign: "center" }}>Create a Topic</Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)} >
                <Stack spacing={2} sx={{ width: { xs: "75", md: "500", lg: "500" } }}>
                    <TextField variant="outlined" label="Topic Name"  {...register("name",
                        { required: "Topic name is required" }
                    )}></TextField>
                    <TextField variant="outlined" label="Topic Description"  {...register("topicDescription",
                        { required: "Topic description is required" }
                    )}
                        multiline
                        rows={5}
                        maxRows={5}
                    ></TextField>

                    <TextField
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {(file !== null) && <div className="drop-file-preview__item">
                        <img src={ImageConfig[file?.type.split('/')[1]] || ImageConfig['default']} alt="" />
                        <div className="drop-file-preview__item__info">
                            <p>{file?.name}</p>
                            <p>{Math.trunc((file?.size/1000000))}MB</p>
                            <LinearProgress variant="determinate" value={per} />
                        </div>
                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(file)}>x</span>
                    </div>}
                    <Typography align="center">OR</Typography>
                    <TextField variant="outlined" label="Video URL"  {...register("url")}
                    value={videoUrl} 
                    ></TextField>

                    <Button color="primary" variant="contained" disableRipple type="submit">Submit</Button>
                </Stack>
            </form>
        </Paper>

    </div>
    )
}
// export default TopicAddition;