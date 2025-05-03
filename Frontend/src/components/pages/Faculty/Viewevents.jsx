import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeparateNavbar from './SeparateNavbar';
import AxiosApi from '../../../AxiosApi';
import {url} from '../../../AxiosApi';
import { toast } from 'react-toastify';


const Viewevents = () => {
  const faculty = JSON.parse(localStorage.getItem('faculty'))
  const [events , setevents] = useState();
  
  const allevents = async() =>{
    try{
    const response=  await AxiosApi.get(`/faculty/upcome/${faculty._id}`);
      console.log(response.data.events, "events");
      setevents(response.data.events)

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    allevents()
  },[])
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' ensures day-month-year order
  };

  const deleteevent =async(id) =>{
    try{
       await AxiosApi.delete(`/faculty/event/${faculty._id}/${id}`);
       toast.success('Deleted Sucessfully')

    }catch(error){
      console.log(error);
      toast.error('Try After SomeTime')
    }
  }





  return (
    <div>
        <SeparateNavbar/>
        <div className=" bg-blue-950 min-h-screen  w-screen flex  justify-center">
      <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
      <section className="container mx-auto p-6 font-mono mt-8">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">EventName</th>
            <th className="px-4 py-3">From_date</th>
            <th className="px-4 py-3">To_date</th>
            <th className="px-4 py-3">Start_Time</th>
            <th className="px-4 py-3">End_Time</th>
            <th className="px-4 py-3">Strength </th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">participation</th>
            <th className="px-4 py-3">Poster</th>
            <th className=' px-4 py-3' >Action</th>

          </tr>
        </thead>
        <tbody className="bg-white">
          {events && events.map((item)=>(

          <tr className="text-gray-700" key={item._id}>
            <td className="px-4 py-3 text-ms font-semibold border">{item.eventname}</td>
            <td className="px-4 py-3 text-sm border">{formatDate(item.from_date)}</td>
            <td className="px-4 py-3 text-sm border">{item.to_date}</td>
            <td className="px-4 py-3 text-sm border">{item.start_time}</td>
            <td className="px-4 py-3 text-sm border">{item.end_time}</td>
            <td className="px-4 py-3 text-sm border">{item.strength}</td>
            <td className="px-4 py-3 text-sm border">{item.department}</td>
            <td className="px-4 py-3 text-sm border">{item.participation}</td>
            <td className="px-4 py-3 text-sm border">
                <img src={`${url}/events/${item.poster}`} alt="" />
            </td>

            <td className=" flex space-x-3 p-4 border"> <Link to={`/update/${item._id}`}  >Edit</Link></td>
            <td className=" flex space-x-3 p-4 border"> <button type='submit' onClick={()=>{deleteevent(item._id)}}   >Delete</button></td>
            <td className=" flex space-x-3 p-4 border"> <Link to={`/registerdstudent/${item._id}`} >Regisered</Link></td>
                
           
          </tr>
          ))}
         
          
          
        </tbody>
      </table>
    </div>
  </div>
</section>
      </div>
    </div>
  )
}

export default Viewevents