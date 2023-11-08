import { Outlet } from "react-router-dom"

export default function Courses() {
  return (
    <div className="careers-layout">
      <h2>Courses</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit?</p>
      
      <Outlet />
    </div>
  )
}
//loader function
const coursesLoader =async () =>{

}
