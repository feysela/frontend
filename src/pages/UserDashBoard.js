import { Outlet } from "react-router-dom"

export default function UserDashBoard() {
  return (
    <div className="careers-layout">
      <h2>User Dashboard</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit?</p>
      
      <Outlet />
    </div>
  )
}

