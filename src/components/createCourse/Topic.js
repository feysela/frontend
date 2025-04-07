
import { MdOutlineMenuBook } from "react-icons/md";
import Button from "@mui/material/Button";
const Topic = ({topic, deleteTopic}) => {


    return(
        <div key={topic.id}>     
        <p key={topic.name}><MdOutlineMenuBook /> {topic?.name} <Button onClick={() => {deleteTopic(topic?.name);}}>Delete</Button ></p>
    </div>
    )

}
export default Topic;
