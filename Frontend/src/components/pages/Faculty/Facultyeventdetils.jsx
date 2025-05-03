import React ,{useEffect,useState} from 'react';
import SeparateNavbar from './SeparateNavbar';
import { useParams } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import {url} from '../../../AxiosApi';
import Footer from '../../Footer';
import { Link } from 'react-router-dom';

const Facultyeventdetils = () => {
    const faculty = JSON.parse(localStorage.getItem('faculty'));
    const { id } = useParams();
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await AxiosApi.get(`/faculty/eventdetails/${faculty._id}/${id}`);
          setEvent(response.data.event);
        } catch (error) {
          console.log(error);
          // Handle error if needed
        }
      };
      fetchEvent();
    }, [faculty._id, id]);
  return (
    <div>
      <SeparateNavbar />
      <Link
        to="/navbar"
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
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Facultyeventdetils