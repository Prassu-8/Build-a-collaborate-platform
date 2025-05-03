import Home from './components/Home'
import StudentRegister from './components/StudentRegister';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registation from './components/pages/Registation';
import Login from './components/pages/student/Login';
import Facultylogin from './components/pages/Faculty/Facultylogin';
import Facultyregistatuon from './components/pages/Faculty/Facultyregistatuon';
import Slogin from './components/Slogin';
import Navbar from './event/Home/Navbar';
import Addstudent from './components/pages/Faculty/Addstudent';
import Viewstudent from './components/pages/Faculty/Viewstudent';
import Addevent from './components/pages/Faculty/Addevent';
import Viewevents from './components/pages/Faculty/Viewevents';
import Viewhistory from './components/pages/Faculty/Viewhistory';
import Viewfeedbacks from './components/pages/Faculty/Viewfeedbacks';
import Certificate from './components/pages/Faculty/Certificate';
import Eventdetails from './components/pages/student/Eventdetails';
import Moreevents from './components/pages/student/Moreevents';
import DashBoard from './components/pages/student/DashBoard';
import Studenthistory from './components/pages/student/Studenthistory';
import Upcomeevents from './components/pages/student/Upcomeevents';
import Feedbackform from './components/pages/student/Feedbackform';
import Profile from './components/pages/Faculty/Profile';
import Editstudent from './components/pages/Faculty/Editstudent';
import Grid from './event/Home/Grid';
import Updateevent from './components/pages/Faculty/Updateevent';
import Nsslogin from './components/pages/student/Nsslogin';
import Rsslogin from './components/pages/student/Rsslogin';
import Viewregisterdstudents from './components/pages/Faculty/Viewregisterdstudents';
import Facultyeventdetils from './components/pages/Faculty/Facultyeventdetils';
import Studentprofile from './components/pages/student/Studentprofile';
import Facultymoreevnts from './components/pages/Faculty/Facultymoreevnts';
import Updateprofile from './components/pages/Faculty/Updateprofile';
import Forgotpassword from './components/pages/Faculty/Forgotpassword';
import Forgotleo from './components/pages/student/Forgotleo';
import Forgotnss from './components/pages/student/Forgotnss';
import Forgotrss from './components/pages/student/Forgotrss';
import Search from './components/pages/student/Search';
import Images from './components/pages/Faculty/Images';
import Galery from './components/pages/student/Galery';
import Galerys from './components/pages/Faculty/Galerys';
import Searchevents from './components/pages/Faculty/Searchevents';


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Registation' element={<Registation/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/facultylogin' element={<Facultylogin/>} />
        <Route path='/facultyregistation' element={<Facultyregistatuon/>} />
        <Route path='/slogin' element={<Slogin/>} />


        {/* homepage */}
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/StudentRegister' element={<StudentRegister/>} />


        {/* faculty access */}
        <Route path='/addstudent' element={<Addstudent/>} />
        <Route path='/viewstudent' element={<Viewstudent/>} />
        <Route path='/addevent' element={<Addevent/>} />
        <Route path='/viewevent' element={<Viewevents/>} />
        <Route path='/history' element={<Viewhistory/>} />
        <Route path='/feedbacks/:id' element={<Viewfeedbacks/>} />
        <Route path='/certificate/:id' element={<Certificate/>} />
        <Route path='/eventdetils/:id' element={<Eventdetails/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/updatestudent/:id' element={<Editstudent/>} />
        <Route path='/gird' element={<Grid/>} />
        <Route path='/update/:id' element={<Updateevent/>} />
        <Route path='/registerdstudent/:id' element={<Viewregisterdstudents/>} />
        <Route path='/facultyeventdetils/:id' element={<Facultyeventdetils/>} />
        <Route path='/morevent' element={<Facultymoreevnts/>} />
        <Route path='/profileupdate/:id' element={<Updateprofile/>} />
        <Route path='/forgot' element={<Forgotpassword/>} />
        <Route path='/images/:id' element={<Images/>} />
        <Route path='/galery' element={<Galery/>} />
        <Route path='/galerys' element={<Galerys/>} />
        <Route path='/searchevent' element={<Searchevents/>} />
        



        {/* STUDENT ACCESS */}
        <Route path='/nsslogin' element={<Nsslogin/>} />
        <Route path='/rsslogin' element={<Rsslogin/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path='/nextpage' element={<Moreevents/>} />
        <Route path='/studenthistory' element={<Studenthistory/>} />
        <Route path='/upcomeevents' element={<Upcomeevents/>} />
        <Route path='/givefeedback/:id' element={<Feedbackform/>} />
        <Route path='/studentprofile' element={<Studentprofile/>} />
        <Route path='/forgotleo/:id' element={<Forgotleo/>} />
        <Route path='/forgotnss' element={<Forgotnss/>} />
        <Route path='/forgotrss' element={<Forgotrss/>} />
        <Route path='/search' element={<Search/>} />


      </Routes>
    </Router>
     <ToastContainer/>
      
    </>
  )
}

export default App
