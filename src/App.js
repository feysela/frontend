// "@emotion/styled": "^11.11.0",
import {

  Route, Routes, Outlet, useLocation, Navigate
} from 'react-router-dom';

import * as React from 'react';
import Home from './pages/home/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import NotFound from './pages/NotFound';
import Login from './pages/Login'

import CourseEdit from './components/CourseEdit';
import RootLayout from './layouts/rootlayout/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import Register from './pages/Register';
import MyClasses from './components/MyClasses'
import Unauthorized from './pages/Unauthorized';
import UserDashBoard from './pages/userDashboard/UserDashBoard';
import InstuctorDashBoard from './pages/instuctorDashboard/InstructorDashBoard';
import Certificate from './pages/courseTake/Certificate';

import CourseStart from "./components/CourseStart";
import CoursePreview from './components/coursePreview/CoursePreview';
import CourseCreateForm from './components/createCourse/CourseCreateForm';
import CourseEditForm from './components/createCourse/CourseEditForm';
import { FormProvider } from './components/createCourse/FormContext';
import { UserContextProvider } from "./context/UserContextProvider";

// import CoursePlayer from "./pages/courseTake/CoursePlayer";
import CoursePlayer from './pages/courseTake/CourePlayer';

import AddChapter from './components/createCourse/AddChapter';
import { createTheme, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import UseUserContext from './hooks/useUserContext';
import { getUserId, setUserId, getRoles } from './serverRequest';
import Preview from './components/createCourse/Preview';
import ChapterAddition from './components/createCourse/ChapterAdditon';
import TopicAddition from './components/createCourse/TopicAddtion';



const ProtectedRoute = ({ allowedRoles }) => {
  // const { userData } = UseUserContext();
  const userData = window.localStorage.getItem('quraan_app_user_data');
  const location = useLocation();
  console.log("userData from protected route");
  console.log(userData.current);
  const userId = getUserId();
  const roles = getRoles();

  return (
    JSON.parse(userData)?.roles?.map(role => role.name).find(roleName => allowedRoles?.includes(roleName))
      ? <Outlet />
      : userData.firstName
        // :userId!==null
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: green[300] },
      secondary: { main: "#c0ca33" }
    },
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: "14px",
            borderRadius: "0px"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <FormProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="coursePreview/:courseId" element={<CoursePreview />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route path="courseStart/:id" element={<CourseStart />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              <Route path='mycourses' element={<MyClasses />} />
              <Route path='help' element={<HelpLayout />}>
                <Route path="faq" element={<Faq />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                <Route path="userdashboard" element={<UserDashBoard />} />
                <Route path="Certificate" element={<Certificate />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["USER", "INSTRUCTOR"]} />}>
                <Route path="CoursePlayer/:courseId" element={<CoursePlayer />}>
              
                </Route>
              </Route>
             
              <Route element={<ProtectedRoute allowedRoles={["INSTRUCTOR"]} />}>
                <Route path="instructordashboard" element={<InstuctorDashBoard />} />
                <Route path="createCourse" element={<CourseCreateForm />} />
                <Route path="createdCoursePreview/:courseId" element={<Preview />} />
                <Route path="chapterAddtion/:courseId" element={<ChapterAddition />} />
                <Route path="topicAddtion/:chapterId" element={<TopicAddition />} />
                <Route path="CourseEdit/:courseId" element={<CourseEditForm />} />
                <Route path="ChapterCreate" element={<AddChapter />} />

                <Route path="editCourse" >
                  <Route path=":id" element={<CourseEdit />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </FormProvider>
      </UserContextProvider>
    </ThemeProvider>

  );
}
export default App;
