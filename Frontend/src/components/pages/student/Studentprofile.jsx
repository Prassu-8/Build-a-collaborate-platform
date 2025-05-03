import React,{useState,useEffect} from 'react';
import Footer from '../../Footer';
import Studentsidebar from './Studentsidebar';
import { Link } from 'react-router-dom';
import AxiosApi,{url} from '../../../AxiosApi';


const Studentprofile = () => {
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
    },[student._id])
  return (
    <div>
  <Studentsidebar />
  <div className="flex flex-col items-center justify-center  bg-slate-700 h-screen M-1">
    <Link to="/dashboard" className="absolute top-10 left-10 text-slate-50 font-bold">
      <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
      Back
    </Link>
  { data && (

    <div className="bg-white p-8 rounded-lg shadow-lg mt-8 w-96" key={data._id}>
     
      <img src={`${url}/student/${data.Avathar}`} alt="Profile Avatar" className="rounded-full w-56 h-56 mx-auto mb-4" />
      <p className="text-center text-lg font-semibold">{data.name}</p>
      <p className="text-center text-gray-600 text-xl mb-4">{data.department}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Year</label>
          <p className="text-gray-800">{data.year}</p>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
          <p className="text-gray-800">{data.email}</p>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Roll Number</label>
          <p className="text-gray-800">{data.rollnumber}</p>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Section</label>
          <p className="text-gray-800">{data.section}</p>
        </div>
      </div>
      <Link to={`/forgotleo/${data._id}`} className=" text-black underline text-xl  border-gray-800 p-3"> password chanage</Link>
    </div>
  )

  }
  </div>
  <Footer />
</div>

  )
}

export default Studentprofile
