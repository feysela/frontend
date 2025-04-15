import { Carousel } from "../../components/carousel/Carousel";
//import {slides} from "../../components/carousel/carouselData";
import Footer from "../../components/footer/Footer";
import "./home.css"

import { useEffect } from "react";
import { useState } from "react";
import { getRequestServer } from "../../serverRequest";
import CardList from "./CardList";
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../../config/firestore";
import { doc, addDoc, deleteDoc } from "firebase/firestore"; 

export default function Home() {
  const [courseList, SetCourseList] = useState([]);
  const message ={message:"message1"};

  const slides=
  [
      {
        "src": "https://picsum.photos/seed/img1/1510/300",
        "alt": "Image 1 for carousel"
      },
      {
        "src": "https://picsum.photos/seed/img2/1510/300",
        "alt": "Image 2 for carousel"
      },
      {
        "src": "https://picsum.photos/seed/img3/1510/300",
        "alt": "Image 3 for carousel"
      }
    ];
    const getCourses =async ()=>{
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = querySnapshot.docs.map(doc =>({id:doc.id, ...doc.data()}));
      console.log(JSON.stringify(courses));
    }
    const addCourse=async(course)=>{
      try {
        const docRef = await addDoc(collection(db, "courses"), course);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    const handleDelete=(id)=>{
          deleteDoc(doc(db, "courses", "Tfx9loDYCEwlpqtOeml4"));
    }

  useEffect(() => {
    getRequestServer("/public/getAllCourses")
      .then(data => { SetCourseList(data?.content) });
     //addDoc(ref,message);
    //  handleDelete();
     getCourses();
     const newCourse={
      courseName:"Physics",
      courseDescription:"Physics is interesting to me.",
      url:"http://x"
     }
     //  addCourse(newCourse);
  }, []);

  // const renderedCourses = courseList?.map((course) => {
  //   return (
  //     <Card  id={course.id} title={course.courseName} description={course.courseDescription} imageUrl={course.imageUrl}/>
  //   );
  // });
  
  return (
    <div className="home-container">
      <Carousel data={slides} className="carousel" />
      <h2>All the skills you need in one place</h2>

      <div className="course-list">
      <CardList contents={courseList} detailsPageLink={"/coursePreview"}/>
      <Footer />
      </div>

    </div>

  )
}
