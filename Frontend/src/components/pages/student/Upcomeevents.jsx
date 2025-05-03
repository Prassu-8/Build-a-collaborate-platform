import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Studentsidebar from "./Studentsidebar";
import AxiosApi from "../../../AxiosApi";
import {url} from "../../../AxiosApi";

const Upcomeevents = () => {
  const student = JSON.parse(localStorage.getItem('student'));

  const [data , setdata] = useState();


  const regisredevents = async() =>{
    try{
     await AxiosApi.get(`/student/upcome/${student._id}`).then((response)=>{
      console.log(response);
      setdata(response.data.applied)
     })

    }catch(error){
      console.log(error);

    }
  }

  useEffect(()=>{
    regisredevents()
  },[student._id])



  return (
    <div>
      <div>
        <Studentsidebar />
        <div className=" bg-blue-950 min-h-screen w-screen flex  justify-center">
          <Link
            to="/dashboard"
            className="absolute top-10 left-10 text-slate-50 font-bold"
          >
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
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    { data && data.map((item)=>(

                    <tr className="text-gray-700" key={item._id}>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.eventname}
                      </td>
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
  );
};

export default Upcomeevents;
