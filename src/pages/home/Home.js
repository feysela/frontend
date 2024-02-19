import { Carousel } from "../../components/carousel/Carousel";
//import {slides} from "../../components/carousel/carouselData";
import Footer from "../../components/footer/Footer";
import "./home.css"

import { useEffect } from "react";
import { useState } from "react";
import { getRequestServer } from "../../serverRequest";
import CardList from "./CardList";
export default function Home() {
  const [courseList, SetCourseList] = useState([]);

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
    ]

  useEffect(() => {
    getRequestServer("/public/getAllCourses")
      .then(data => { SetCourseList(data.content) });
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
