import React, { useEffect, useState } from "react";
import SeparateNavbar from "./SeparateNavbar";
import { Link } from "react-router-dom";

import AxiosApi, { url } from "../../../AxiosApi"; // Importing url from AxiosApi
import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// You need to import url from the same file where it is exported.

const ViewEventFaculty = () => {
  const faculty = JSON.parse(localStorage.getItem("faculty"));
  const [student, setStudent] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await AxiosApi.get(`/faculty/student/${faculty._id}`);
      console.log(response.data.students, "student");
      setStudent(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  
 const deletestudent = async(id) =>{
  try{
    await AxiosApi.delete(`/faculty/student/${faculty._id}/${id}`);
    toast('Student deleted successfully');


  }catch(error){
    console.log(error);
    toast.error('Try After Some time')

  }
 }




  return (
    <div>
      <SeparateNavbar />
      <div className="bg-blue-950 min-h-screen w-screen flex justify-center">
        <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        <section className="container mx-auto p-6 font-mono mt-4">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">year</th>
                    <th className="px-4 py-3">section</th>
                    <th className="px-4 py-3">Roll Number</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {student.map((item) => (
                    <tr className="text-gray-700" key={item._id}>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={`${url}/student/${item.Avathar}`}
                              alt=""
                              loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.Type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">{item.email}</td>
                      <td className="px-4 py-3 text-sm border">{item.department}</td>
                      <td className="px-4 py-3 text-sm border">{item.year}</td>
                      <td className="px-4 py-3 text-sm border">{item.section}</td>
                      <td className="px-4 py-3 text-sm border">{item.rollnumber}</td>
                      <td className="space-x-3 p-4 border">
                        <Link to={`/updatestudent/${item._id}`}>Edit</Link>
                        <button type="submit" onClick={() => deletestudent(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewEventFaculty;
