

import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import "./Certificate.css";
//import certificateOfCompletion from './images/Certificate of Completion.png';
import certificateOfCompletion from './images/Brown Professional Certificate of Completion.png';
import { useLocation } from 'react-router-dom';

import { Button } from "@mui/material";

const Certificate = () => {
  const location = useLocation();
  const { studentName, courseName } = location.state || {};
  const ref = useRef(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'certificate.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  function formatDate(date) {
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const currentDate = new Date();

  return (
    <div className='cont'>

      <Button onClick={onButtonClick} className='download-btn' color="secondary" variant="contained" disableRipple >Download certificate</Button>
      <div className='cert' ref={ref}>
        <div className='certificate_border'>
          <img src={certificateOfCompletion} alt="bakcground"
          ></img>
          <div className='certificate_details'>
            <h1> {studentName}</h1>
            <p className='courseName'>{courseName}</p>
            <p className='date'>{formatDate(currentDate)}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Certificate;



