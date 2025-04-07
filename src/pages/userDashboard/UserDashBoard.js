import { Outlet } from "react-router-dom"
import { useState, useContext, useRef, useEffect } from "react";
import { getRequestServer,  getQuraan_app_user_data} from "../../serverRequest";
import  UserContext  from "../../context/UserContextProvider";
import CardList from "../home/CardList";

export default function UserDashBoard() {
  const [courseList, SetCourseList] = useState([]);
  const {  userData } = useContext(UserContext);
  var userId =getQuraan_app_user_data('quraan_app_user_data')?.pid;

  console.log("Userdata");
  console.log(userData);
  useEffect(() => {

    getRequestServer(`/private/getAllSubscribedCourses/${userId}`)
      .then(data => { 
        console.log(data);
        SetCourseList(data) });
    console.log(`user data: ${userData?.firstName}`);

   
  }, []);
  return (
    <div className="careers-layout">
      <h2>Welcome {getQuraan_app_user_data('quraan_app_user_data')?.firstName} to your Dashboard!</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit?</p>
      <CardList contents={courseList} detailsPageLink={"/coursePreview"}/>
      <Outlet />
    </div>
  )
}

