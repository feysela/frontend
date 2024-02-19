
import coverPicture from '../../images/quraan-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Card ({content, detailsPageLink}){
    const navigate = useNavigate();
    return(
        <div className="card" onClick={()=>{navigate(detailsPageLink, {state:content})}}>   
            <img alt="contentImage" 
                 src={coverPicture} 
                 className='card-image'></img>
            <h2 className='card-title'>{content.courseName}</h2>
            {/* <p className='card-text'>{content.courseDescription}</p> */}
               
        </div>
    )
}
export default Card;
