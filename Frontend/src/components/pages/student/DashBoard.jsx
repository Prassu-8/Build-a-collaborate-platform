import React, {useState,useEffect} from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import Footer from '../../Footer';
import Carousel from '../../../event/Home/Carousel ';
import AxiosApi,{url} from '../../../AxiosApi';
import { toast } from 'react-toastify';



import Studentgird from './Studentgird';

const DashBoard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    
  };
  const student = JSON.parse(localStorage.getItem('student'))
  const [data,setdata] = useState();

  const profile = async() =>{
      try{
          await AxiosApi.get(`/student/profile/${student._id}`).then((response)=>{
              console.log(response);
              setdata(response.data.student)
          })

      }catch(error){
          console.log(error)
      }
  }
  useEffect(()=>{
    profile()
  },[student._id]);

  const [search, setSearch] = useState('');
    const Navigate = useNavigate(); // Initialize useHistory

    const handleSearch = async () => {
        try {
            const response = await AxiosApi.get(`/student/serachevent/${student._id}`, {
                params: { name: search }
            });
            console.log(response.data.events, "search");
            const data = response.data.events
            Navigate('/search', { state: data });
        } catch (error) {
            console.log(error);
        }
    };


    const logout = async () =>{
      try{
        const response = await AxiosApi.delete(`/student/logout/${student._id}`);
        console.log(response);
        toast.success(response.data.message);
        Navigate('/')
        
      }catch(error){
        console.log(error)
      }
    }


  return (
    <div>
      
      <div className="bg-sky-950 w-screen h-20 flex justify-between" style={{position:'sticky',top:'0',zIndex:'99'}}>
        <div className="items-center flex ml-8 space-x-3">
          <i className="fa-solid fa-bars text-white" onClick={toggleSidebar}></i>
          <img src="/aditya.png" alt="" className="m-6 p-1 rounded-t-3xl w-24 h-20" />
          <Link to='/dashboard' className="font-bold text-2xl text-slate-200 items-center">Envision Event</Link>
        </div>
        <div className="items-center flex mr-4 space-x-1">
                <input
                    type="search"
                    className="bg-white text-black rounded-lg px-4 py-2"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <i className="fa-solid fa-search text-slate-950 w-12 h-10 text-center rounded-md p-3 bg-white"></i>
                </button>
            </div>
        <div className="flex items-center mr-8 text-white">
          <h4 className=' text-2xl font-serif font-semibold'>Aditya Engineering College</h4>
        </div>
      </div>

      <Carousel />

      <div className="m-12">

        <Studentgird/>
      </div>

     

      {/* Sidebar */}
      <div className={`fixed top-20 left-0 h-screen bg-sky-950 border-spacing-2 border-slate-50 w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out`}>

        <div>
          <p className='text-center text-3xl text-white underline font-serif mt-3'>Student</p>
        </div>
        <div className="mt-5 space-y-8">
          <div className=" flex" >
            <i className="fa-solid fa-icons text-2xl text-white ml-4 mt-1"></i>
            <Link to='/upcomeevents' className='text-justify text-xl text-white p-2 font-sans'> Upcome Events</Link>
            
          </div>
          <div className=" flex" >
            <i className="fa-solid fa-clock-rotate-left text-2xl text-white ml-4 mt-1"></i>
            <Link to='/studenthistory' className='text-justify text-xl text-white p-2 font-sans'>History</Link>
            
          </div>
        </div>
        <div className=" flex mt-8">
        <i class="fa-solid fa-arrow-right-from-bracket text-white ml-4 mt-1 text-3xl"></i>
            <button onClick={logout} className='text-justify text-xl text-white p-2 font-sans'>Logout</button>
          </div>
        { data && (

        <div className=" ml-28 mt-7 space-y-3">
          <img src={`${url}/student/${data.Avathar}`} alt=""  className=' rounded-full w-24 h-24'/>
          <Link to='/studentprofile' className=' w-20 h-12 rounded-lg  text-slate-950 bg-slate-300 '> View Profile</Link>
        </div>
        )

        }
      </div>

      <Footer />
    </div>
  )
}

export default DashBoard