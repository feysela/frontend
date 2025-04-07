
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, IconButton } from "@mui/material";

const ChapterCreateModal = ({ openChapterModal, setChapterOpenModal, addChapter, courseId}) => {
    const { register,
        handleSubmit
    } = useForm();
    const onSubmit = (data) => {
        addChapter(data);
        setChapterOpenModal(false);
    
    }

    return (<div key={courseId}>

        <Dialog open={openChapterModal} sx={{ width: 1200 }}>
            <DialogTitle>Add a new chapter <IconButton></IconButton></DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)} >
                    <Stack spacing={2} width={500}>
                        <TextField variant="outlined" label="Chapter Name"  {...register("name",
                            { required: "Chapter name is required" }
                        )}></TextField>
                        <TextField variant="outlined" label="Duration"  {...register("duration",
                            {
                                required: "Duration is required"
                            }
                        )}></TextField>

                        <Button color="primary" variant="contained" disableRipple type="submit">Submit</Button>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={()=>{setChapterOpenModal(false)}}>Close</Button>
            </DialogActions>

        </Dialog>
    </div>
    )
}
export default ChapterCreateModal;