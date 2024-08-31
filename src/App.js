import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


import './style.scss'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Home'
import Heading from './components/Heading'


// Admin Imports 
import Register from './components/Register'
import Adminlogin from './page/admins/Adminlogin'
import AdminDash from './page/admins/AdminDash'
//Admin Forgot password
import ForgotPassword from './page/admins/forgotpassword/ForgotPassword';
import VerifyOtp from './page/admins/forgotpassword/VerifyOtp';
import NewPasswoed from './page/admins/forgotpassword/NewPasswoed';

import AdminAddStudent from './page/admins/AdminAddStudent';
import AdminAddTeacher from './page/admins/AdminAddTeacher';
import AdminAddCourse from './page/admins/AdminAddCourse';
import AdminAnnouncement from './page/admins/AdminAnnouncement';
import AdminShowContect from './page/admins/AdminShowContect';
import AdminProfile from './page/admins/AdminProfile';

// Students Imports
import StudentLogin from './page/student/StudentLogin'
import StudentDash from './page/student/StudentDash';
import StdForgotPwd from './page/student/forgotPwd/StdForgotPwd'
import StdVerifyOtp from './page/student/forgotPwd/StdVerifyOtp'
import StdNewPwd from './page/student/forgotPwd/StdNewPwd'
import StudentProfile from './page/student/StudentProfile';
import StudentSubject from './page/student/StudentSubject';
import StudentAttendance from './page/student/StudentAttendance';
import StudentComplain from './page/student/StudentComplain';
import StudentResult from './page/student/StudentResult';
import StudentResetPwd from './page/student/StudentResetPwd';



// Teacher Imports
import TeacherLogin from './page/teacher/TeacherLogin'
import TeacherDash from './page/teacher/TeacherDash'
import TeacherForgotPwd from './page/teacher/forgotpwd/TeacherForgotPwd';
import TeacherVerifyOtp from './page/teacher/forgotpwd/TeacherVerifyOtp';
import TeacherNewPwd from './page/teacher/forgotpwd/TeacherNewPwd';


import TeacherStudent from './page/teacher/TeacherStudent'
import TeacherClass from './page/teacher/TeacherClass'
import TeacherComplain from './page/teacher/TeacherComplain'
import TeacherProfile from './page/teacher/TeacherProfile'
import ChangePassword from './page/admins/ChangePassword';
import TeacherResetPwd from './page/teacher/TeacherResetPwd';



const Layout = () => {
  return (
    <>
     <Heading/>
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
    ]
  },

  // For Admins 
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/api/admin/login",
    element: <Adminlogin/>
  },
  {
    path: "/api/admin/dash/:id",
    element: <AdminDash/>
  },
  {
    path: "/api/admin/addstudent",
    element: <AdminAddStudent/>
  },
  {
    path: "/api/admin/addteacher",
    element: <AdminAddTeacher/>
  },
  {
    path: "/api/admin/addcourse",
    element: <AdminAddCourse/>
  },
  {
    path: "/api/admin/addAnnouncement",
    element: <AdminAnnouncement/>
  },
  {
    path: "/api/admin/showcontact",
    element: <AdminShowContect/>
  },
  {
    path: "/api/admin/profile",
    element: <AdminProfile/>
  },

  // Forgot pwd for Admin 
  {
    path: "/api/admin/forgotpwd",
    element: <ForgotPassword/>
  },
  {
    path: "/api/admin/verifyOtp",
    element: <VerifyOtp/>
  },
  {
    path: "/api/admin/newpassword",
    element: <NewPasswoed/>
  },
  {
    path: "/api/admin/changepassword",
    element: <ChangePassword/>
  },
 
  //For Student
  {
    path: "/api/student/login",
    element: <StudentLogin/>
  },
  {
    path: "/api/student/dash/:id",
    element: <StudentDash/>
  },
  {
    path: "/api/student/profile",
    element: <StudentProfile/>
  },
  {
    path: "/api/student/subject",
    element: <StudentSubject/>
  },
  {
    path: "/api/student/attendance",
    element: <StudentAttendance/>
  },
  {
    path: "/api/student/complain",
    element: <StudentComplain/>
  },
  {
    path: "/api/student/result",
    element: <StudentResult/>
  },
  {
    path: "/api/student/resetpassword",
    element: <StudentResetPwd/>
  },
  // Forgot pwd for student 
  {
    path: "/api/student/forgotpwd",
    element: <StdForgotPwd/>
  },
  {
    path: "/api/student/verifyOtp",
    element: <StdVerifyOtp/>
  },
  {
    path: "/api/student/newpassword",
    element: <StdNewPwd/>
  },

  // For Teacher
  {
    path: "/api/teacher/login",
    element: <TeacherLogin/>
  },
  {
    path: "/api/teacher/dash/:id",
    element: <TeacherDash/>
  },
  {
    path: "/api/teacher/student",
    element: <TeacherStudent/>
  },
  {
    path: "/api/teacher/class",
    element: <TeacherClass/>
  },
  {
    path: "/api/teacher/complain",
    element: <TeacherComplain/>
  },
  {
    path: "/api/teacher/profile",
    element: <TeacherProfile/>
  },
  {
    path: "/api/teacher/resetpassword",
    element: <TeacherResetPwd/>
  },
  {
    path: "/api/teacher/profile",
    element: <TeacherProfile/>
  },
  

// Forgot pwd for Admin 
{
  path: "/api/teacher/forgotpwd",
  element: <TeacherForgotPwd/>
},
{
  path: "/api/teacher/verifyOtp",
  element: <TeacherVerifyOtp/>
},
{
  path: "/api/teacher/newpassword",
  element: <TeacherNewPwd/>
},
 
 
 

 
])


const App = () => {
  return (
    <div className='app'>
      <div className='main'>
        <RouterProvider router={router} />
      </div>
    </div>

  )
}


export default App