import React, { useEffect, useState } from "react";
import Studentsidebar from './Studentsidebar';
import Footer from "../../Footer";
import { useParams } from "react-router-dom";
import AxiosApi from "../../../AxiosApi";
import {url} from "../../../AxiosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Eventdetails = () => {
  const student = JSON.parse(localStorage.getItem('student'));
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await AxiosApi.get(`/student/eventdetails/${student._id}/${id}`);
        setEvent(response.data.event);
      } catch (error) {
        console.log(error);
        // Handle error if needed
      }
    };
    fetchEvent();
  }, [student._id, id]);

const NavigateTo = useNavigate()
  const register = async(eventid) =>{
    try{
      await AxiosApi.post(`/student/event/${student._id}/${eventid}`).then((response)=>{
        console.log(response);
        toast.success('Registerd successfully');
        NavigateTo('/nextpage')
      })

    }catch(error){
      console.log(error);
     const message = error.response.data.message;
     toast.error(message);
     NavigateTo('/nextpage')
     
    }
  }

  return (
    <div>
      <Studentsidebar />
      <Link
        to="/nextpage"
        className="fixed top-25 left-10 text-black font-bold"
      >
        <i className="fas fa-angle-left text-2xl mr-2"></i>
        Back
      </Link>
      {event && (
        <div className="mt-4">
          <div className="">
            <img
              src={`${url}/events/${event.poster}`}
              alt=""
              className=""
              style={{ position: "relative", left: "25%", width: "700px" }}
            />
          </div>

          <div className="max-w-2xl mx-auto mt-3">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Event Name
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.eventname}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          From Date
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.from_date}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          To Date
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.to_date}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Start Time
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.start_time}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          End Time
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.end_time}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Organized
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.organized}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Event Strength
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.strength}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Department
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {event.department}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="text-center text-2xl text-white bg-indigo-700 w-72 h-20 rounded-lg p-2 mb-3" style={{position: 'relative', left: '38%'}} onClick={()=> register(event._id)}>Register</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Eventdetails;
