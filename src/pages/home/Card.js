
import coverPicture from '../../images/quraan-logo.png';
import courseImage from "../../images/Image3.jpg";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import "./Card.css";
import { ThemeContext } from '@emotion/react';

function Card({ content, detailsPageLink }) {
    const navigate = useNavigate();
    //     let courseTitleAndDescription= <section className='course-info'>
    //     <Typography variant="h6" className='card-title'>{content.courseName}</Typography>
    //     <Typography variant="subtitle1" className='card-description'>{content.courseDescription}</Typography>
    //   </section>;
    

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <Container>
            <Paper style={{ width: 480, height: "auto" }} onClick={() => {  navigate(`/coursePreview/${content?.courseId}`) }} className="paper">
                <img className="card-image" src={courseImage} alt="course"></img>
                <Typography variant="h6" className='card-title'>{content.courseName}</Typography>
                <Typography variant="subtitle1" className='card-description'>{isReadMore ? content.courseDescription?.slice(0, 100) : content.courseDescription}
                </Typography>
                <Typography onClick={(e)=>{e.stopPropagation(); toggleReadMore()}} style={{ color: "green", cursor: 'pointer'}} sx={{ fontStyle: 'italic' }}>
                    {isReadMore ? ((content?.courseDescription?.length<100)||(content?.courseDescription===null)?'': '...read more') : ' show less'}
                </Typography>

            </Paper>

        </Container>

    )
}
export default Card;
