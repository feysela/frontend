
import {

  Route, Routes, Outlet
} from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import NotFound from './pages/NotFound';
import Careers, { careersLoader } from './pages/careers/Courses';
import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails'
import CareersError from './pages/careers/CareersError'
import Login from './pages/Login'
import CourseCreator from './pages/CourseCreator';
import CourseEdit from './components/CourseEdit';
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import CareersLayout from './layouts/CareersLayout'
import Register, { } from './pages/Register';
import MyClasses from './components/MyClasses'

import { Navigate } from "react-router-dom";
import Courses from './pages/courses/Courses';
import UserDashBoard from './pages/UserDashBoard';
import InstuctorDashBoard from './pages/InstructorDashBoard';
import {  createContext, useContext } from "react"
import { getAuthToken } from './serverRequest';

const AuthContext = createContext();
export const AuthData = () =>{ return useContext(AuthContext);}

const ProtectedRoute = ({
  children,
  user
}) => {
  
  if (getAuthToken() !== null && getAuthToken() !== "null"){
    return children ? children : <Outlet />;
  }
    return <Navigate to="/" replace />;  
};
function App() {
  const [ user, setUser ] = useState({name: "", isAuthenticated: false});
  const updateUser=(user)=>{
    setUser(user);
  }
  
  return (
    <AuthContext.Provider value={{user, setUser, updateUser}}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>} />
          <Route path="about" element={<About/>} />
          <Route path='help' element={<HelpLayout />}>
            <Route path="faq" element={<Faq/>} />
          </Route>
          <Route path="courses" element={<Courses />} />
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="userdashboard" element={<UserDashBoard />} />
            <Route path="instructordashboard" element={<InstuctorDashBoard />} />
            <Route path="createCourse" element={<CourseCreator/>} />
            <Route path="editCourse" element={<CourseEdit/>} />
                  
          </Route>
          <Route path='careers' element={
            <CareersLayout />
          } errorElement=
            {<CareersError />}>
            <Route index element={<Careers />}
              loader={careersLoader} />
            <Route path=":id"
              element={<CareerDetails />}
              loader={careerDetailsLoader}
            />
          </Route>
          <Route path='mycourses' element={<MyClasses />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
     </AuthContext.Provider>
  );
}
export default App
