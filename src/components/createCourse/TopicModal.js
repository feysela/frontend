
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, IconButton } from "@mui/material";

const TopicModal = ({ addTopic,setTopicOpenModal , openTopicModal, index}) => {
    const { register,
        handleSubmit
    } = useForm();
    const onSubmit = (data) => {
        addTopic(index,data);
        setTopicOpenModal(false);
    }

    return (<div >

        <Dialog open={openTopicModal} sx={{ width: 1200 }}>
            <DialogTitle>Add a new Topic <IconButton></IconButton></DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)} >
                    <Stack spacing={2} width={500}>
                        <TextField variant="outlined" label="Topic Name"  {...register("name",
                            { required: "Topic name is required" }
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
                <Button color="error" onClick={() => { setTopicOpenModal(false) }}>Close</Button>
            </DialogActions>

        </Dialog>
    </div>
    )
}
export default TopicModal;