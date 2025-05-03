import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import {url} from '../../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SeparateNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEventdropdown, setiseventdropdown] = useState(false)
  
    const toggleSidebar = () => {
      setIsSidebarOpen(prevState => !prevState);
      
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(prevState => !prevState);
      setiseventdropdown(false)
    };
    const tooggleeventDropdown = () => {
      setiseventdropdown(prevState => !prevState)
      setIsDropdownOpen(false)
    }
    const faculty = JSON.parse(localStorage.getItem('faculty'));
    const [profile, setProfile] = useState(null);
  
    const getProfile = async () => {
      try {
        const response = await AxiosApi.get(`/faculty/profile/${faculty._id}`);
        console.log(response.data.faculty,'tyu56u85u');
        setProfile(response.data.faculty);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);

    const NavigateTo = useNavigate()

  const logout = async () =>{
    try{
      const response = await AxiosApi.delete(`/faculty/logout/${faculty._id}`);
      console.log(response);
      toast.success(response.data.message);
      NavigateTo('/')
      
    }catch(error){
      console.log(error)
    }
  }






  return (
    <div style={{position:'sticky',top:'0',zIndex:'99'}}>
        <div className="bg-sky-950 w-screen h-20 flex justify-between" style={{position:'sticky',top:'0',zIndex:'99'}}>
        <div className="items-center flex ml-8 space-x-3">
          <i className="fa-solid fa-bars text-white" onClick={toggleSidebar}></i>
          <img src="/aditya.png" alt="" className="m-6 p-1 rounded-t-3xl w-24 h-20" />
          <Link to='/navbar' className="font-bold text-2xl text-slate-200 items-center">Envision Event</Link>
        </div>
        <div className="items-center flex mr-4 space-x-1">
          <input type='search' className="bg-white text-black rounded-lg px-4 py-2" placeholder="Search..." />
          <button>
            <i className="fa-solid fa-search text-slate-950 w-12 h-10 text-center rounded-md p-3 bg-white"></i>
          </button>
        </div>
        <div className="flex items-center mr-8 text-white">
          <h4 className=' text-2xl font-serif font-semibold'>Aditya Engineering Colleage</h4>
        </div>
      </div>

    {/* sidebar */}
    <div className={`fixed top-20 left-0 h-screen bg-sky-950 border-spacing-2 border-slate-50 w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out`}>

        <div>
          <p className='text-center text-3xl text-white underline font-serif'>Faculty</p>
        </div>
        <div className="mt-5 space-y-8">
          <div className=" flex" onMouseOver={toggleDropdown} onMouseOut={toggleDropdown}>
            <i className="fa-solid fa-users-gear text-2xl text-white ml-4 mt-1"></i>
            <Link className='text-justify text-xl text-white p-2 font-sans'>Manage Student</Link>
            {isDropdownOpen && (
              <div className="absolute bg-white w-48 mt-8 p-2 rounded-md shadow-lg">
                <Link to="/addstudent" className="block text-black hover:text-blue-500">Add Student</Link>
                <Link to="/view-records" className="block text-black hover:text-blue-500">View Students</Link>
              </div>
            )}
          </div>
          <div className=" flex" onMouseOver={tooggleeventDropdown} onMouseOut={tooggleeventDropdown}>
            <i className="fa-solid fa-icons text-2xl text-white ml-4 mt-1"></i>
            <Link className='text-justify text-xl text-white p-2 font-sans'>Manage Events</Link>
            {isEventdropdown && (
              <div className="absolute bg-white w-48 mt-8 p-2 rounded-md shadow-lg">
                <Link to="/addevent" className="block text-black hover:text-blue-500">Add events</Link>
                <Link to="/view-records" className="block text-black hover:text-blue-500">View upcome events</Link>
              </div>
            )}
          </div>
          <div className=" flex">
          <i className="fa-solid fa-clock-rotate-left text-2xl text-white ml-4 mt-1"></i>
            <Link className='text-justify text-xl text-white p-2 font-sans'>History</Link>
          </div>
          <div className=" flex">
          <i className="fa-solid fa-user-tie text-2xl text-white ml-4 mt-1"></i>
            <Link to='/facultyregistation' className='text-justify text-xl text-white p-2 font-sans'>Add Faculty</Link>
          </div>
        </div>

        <div className=" flex mt-8">
        <i class="fa-solid fa-arrow-right-from-bracket text-white ml-4 mt-1 text-3xl"></i>
            <button onClick={logout} className='text-justify text-xl text-white p-2 font-sans'>Logout</button>
          </div>

        { profile &&(

        <div className=" ml-28 mt-7 space-y-3" key={profile._id}>
        
          <img src={`${url}/faculty/${profile.Avathar}`} alt=""  className=' rounded-full w-24 h-24'/>
          <Link className=' w-20 h-12 rounded-lg  text-slate-950 bg-slate-300 '> View Profile</Link>
        </div>
        )

        }
      </div>


    </div>
  )
}

export default SeparateNavbar