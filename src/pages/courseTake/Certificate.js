

import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import "./Certificate.css";
import certificateTemplate from './images/background.png';
//import certificateOfCompletion from './images/Certificate of Completion.png';
import certificateOfCompletion from './images/Brown Professional Certificate of Completion.png';
import { useLocation } from 'react-router-dom';

import { Stack, TextField, Button } from "@mui/material";

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



// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import { PDFDownloadLink } from '@react-pdf/renderer';

// // Define styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#E4E4E4',
//     padding: 30,
//     position: 'relative',
//   },
//   header: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   content: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   footer: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 30,
//   },
//   logo: {
//     width: 100,
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   background: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     zIndex: -1,
//   },
// });




// export default function Certificate ({ studentName, courseName }) {
//   return (
//     <div>
//     <Document>
//     <Page size="A4" style={styles.page}>
//       <Image src="./images/background.png" style={styles.background} />
//       <Image src="./images/logo.png" style={styles.logo} />
//       <Text style={styles.header}>Certificate of Completion</Text>
//       <Text style={styles.content}>This is to certify that</Text>
//       <Text style={styles.content}>Feysel Suleman</Text>
//       <Text style={styles.content}>has successfully completed the course</Text>
//       <Text style={styles.content}>Coding Bootcamp</Text>
//       <Text style={styles.footer}>
//         Date: {new Date().toLocaleDateString()}
//       </Text>
//       <Text style={styles.footer}>Instructor: John Doe</Text>
//     </Page>
//   </Document>
//           <div style={{ marginTop: '20px' }}>
//         {/* <PDFDownloadLink
//           document={<Certificate studentName="{studentName}" courseName="{courseName}" />}
//           fileName="certificate.pdf"
//         >
//           {({ loading }) => (loading ? 'Generating PDF...' : 'Download Certificate')}
//         </PDFDownloadLink> */}
//       </div>
//     </div>
//   )
// }

