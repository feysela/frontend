import { useForm } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { requestServer, getRequestServer } from "../../serverRequest";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Typography} from "@mui/material";
import { Paper } from "@mui/material";
export default function ChapterAddition() {
    const [course, setCourse] = useState({});
    const { courseId } = useParams();

    const navigate = useNavigate();
    const { register,
        handleSubmit
    } = useForm();
    useEffect(() => {
        const _course = getRequestServer(`/public/getCourse/${courseId}`)
            .then(data => { setCourse(data) });
    }, []);

    const addChapter = (chapter) => {
        const _response = requestServer("POST", "/private/createChapter", chapter).then(response => {
            console.log(response);
            return response;
        }).then (data=>{
            const courseUpdated = requestServer("POST", `/private/addChapter/${course.courseId}`, data).then(chapter=>{
                console.log("chapter");
                console.log(chapter);
                navigate(`/createdCoursePreview/${courseId}`,{state:courseUpdated});
            })         
        });
    }
    const onSubmit = (data) => {
        addChapter(data)
        console.log(course);    
    }

    useEffect(() => {
        getRequestServer(`/private/getCourse/${courseId}`)
            .then(data => { setCourse(data) });
    }, []);

    return (<div key={courseId} className="container">
        <Paper sx={{ marginTop: 12 }} className="form">
        <form noValidate onSubmit={handleSubmit(onSubmit)} >
        <Typography sx={{textAlign:"center"}}>Create a Chapter</Typography>
        <Stack spacing={2} sx={{width:{xs:"75", md:"500", lg:"500"}}}>
                <TextField variant="outlined" label="Chapter Name"  {...register("name",
                    { required: "Chapter name is required" }
                )}></TextField>
                <TextField variant="outlined" label="Description"  {...register("description",
                    {
                        required: " Description is required."
                    }
                )}
                multiline
                rows={5}
                maxRows={5}
                ></TextField>

                <Button color="primary" variant="contained" disableRipple type="submit">Submit</Button>
            </Stack>
        </form>
        </Paper>
    </div>
    )
}
