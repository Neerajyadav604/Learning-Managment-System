import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import OpenRoute from "./Components/OpenRoute";
import VerifyEmail from "./Pages/VerifyEmail";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import PrivateRoute from "./Components/PrivateRoutes";
import Error from "./Pages/Error";
import Settings from "./Components/core/Dashboard/settings";
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./Components/core/Dashboard/AddCourses";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import Catalog from "./Pages/Catalog";
import Admindashboard from "./Pages/Admin/AdminDashboard";
import ViewCourse from "./Pages/ViewCourse";
import { useDispatch, useSelector } from "react-redux";
import CourseDetails from "./Pages/courseDetails"
import VideoDetails from "./Components/core/Viewcourse/VideoDetails";
import Editcourse from "./Components/core/Dashboard/EditCourse"
import ExploreCourses from './Pages/ExploreCourses';


function App() {
   const { user } = useSelector((state) => state.profile)
  return (
    
    <div className="App">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<OpenRoute><Login /></OpenRoute>} />
        <Route path='/signup' element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path='/verify-email' element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path='/aboutus' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/error' element={<Error/>}/>
        <Route path='*' element={<Error />} />

        {/* Dashboard Routes */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
         <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      </Route>
        <Route path='/dashboard/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path='/dashboard/enrolled-courses' element={<PrivateRoute><EnrolledCourses /></PrivateRoute>} />
        <Route path='/dashboard/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/dashboard/add-course' element={<PrivateRoute><AddCourse /></PrivateRoute>} />
        <Route path='/dashboard/my-courses' element={<PrivateRoute><MyCourses /></PrivateRoute>} />
        <Route path='/dashboard/admin' element={<PrivateRoute><Admindashboard /></PrivateRoute>} />

        {/* Catalog */}
        <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails/>} />

        {/* Conditional student-only video route */}
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
  <Route
    path="view-course/:courseId"
    element={<PrivateRoute><ViewCourse /></PrivateRoute>}
  >
    {/* nested inside ViewCourse */}
    <Route 
      path="section/:sectionId/sub-section/:subSectionId"
      element={<VideoDetails />}
    />
  </Route>
)}

        <Route path="*" element={<Error />} />
         <Route path="/dashboard/edit-course/:courseId" element={<Editcourse/>}/>   
          {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
         
          </>
        )
      }  
      <Route path="/explore-courses" element={<ExploreCourses/>}/>
      </Routes>
     
    </div>
  );
}

export default App;