import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeparateNavbar from './SeparateNavbar';
import AxiosApi from '../../../AxiosApi';
import {url} from '../../../AxiosApi';


const Viewhistory = () => {
  const [data,setdata] = useState();
  const faculty = JSON.parse(localStorage.getItem('faculty'))
  const history = async()=>{
    try{
      await AxiosApi.get(`/faculty/history/${faculty._id}`).then((responce)=>{
        console.log(responce)
        setdata(responce.data.events)
      })

    }catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
  history()
},[faculty.id])

  return (
    <div>
        <div>
        <SeparateNavbar/>
        <div className=" bg-blue-950 min-h-screen w-screen flex  justify-center">
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
            <th className=' px-4 py-3' >ACTION</th>


          </tr>
        </thead>
        <tbody className="bg-white">
          { data && data.map((item)=>(

          <tr className="text-gray-700" key={item._id}>
            <td className="px-4 py-3 text-ms font-semibold border">{item.eventname}</td>
            <td className="px-4 py-3 text-sm border">{item.from_date}</td>
            <td className="px-4 py-3 text-sm border">{item.to_date}</td>
            <td className="px-4 py-3 text-sm border">{item.start_time}</td>
            <td className="px-4 py-3 text-sm border">{item.end_time}</td>
            <td className="px-4 py-3 text-sm border">{item.strength}</td>

            <td className="px-4 py-3 text-sm border">{item.department}</td>
            <td className="px-4 py-3 text-sm border">{item.participation}</td>
            <td className="px-4 py-3 text-sm border">
                <img src={`${url}/events/${item.poster}`} alt="" />
            </td>
            <td className=" flex space-x-3 p-4 border"> <Link to={`/feedbacks/${item._id}`}  >Feedbacks</Link></td>
            <td className=" flex space-x-3 p-4 border"> <Link to={`/certificate/${item._id}`} >Certificate</Link></td>
            <td className=" flex space-x-3 p-4 border"> <Link to={`/images/${item._id}`} >Post Pics</Link></td>
           
          </tr>
          ))
          }
          
        </tbody>
      </table>
    </div>
  </div>
</section>
      </div>
    </div>
    </div>
  )
}

export default Viewhistory