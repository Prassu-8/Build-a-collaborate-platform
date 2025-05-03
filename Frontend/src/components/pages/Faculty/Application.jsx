import React from 'react';
import SeparateNavbar from "./SeparateNavbar";
import { Link } from "react-router-dom";

const Application = () => {
  return (
    <div>
      <SeparateNavbar />
      <div className=" bg-blue-950 h-screen w-screen flex  justify-center">
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
          <tr className="text-gray-700">
            <td className="px-4 py-3 border">
              <div className="flex items-center text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                  <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p className="font-semibold text-black">vinay</p>
                  <p className="text-xs text-gray-600">Leo</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">vinay@gamil.com</td>
            <td className="px-4 py-3 text-sm border">cse</td>
            <td className="px-4 py-3 text-sm border">2nd</td>
            <td className="px-4 py-3 text-sm border">B</td>
            <td className="px-4 py-3 text-sm border">20F65A0321</td>
                <td className=" space-x-3 p-4 border">
                <Link  >Edit</Link>
                <button>Delete</button>  
                </td>
                
           
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 border">
              <div className="flex items-center text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                  <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p className="font-semibold text-black">vinay</p>
                  <p className="text-xs text-gray-600">Leo</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">vinay@gamil.com</td>
            <td className="px-4 py-3 text-sm border">cse</td>
            <td className="px-4 py-3 text-sm border">2nd</td>
            <td className="px-4 py-3 text-sm border">B</td>
            <td className="px-4 py-3 text-sm border">20F65A0321</td>
            <td className="px-4 py-3 text-sm border">Accept</td>
            <td className="px-4 py-3 text-sm border">Reject</td>
                
           
          </tr>
          <tr className="text-gray-700">
            <td className="px-4 py-3 border">
              <div className="flex items-center text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                  <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p className="font-semibold text-black">vinay</p>
                  <p className="text-xs text-gray-600">Leo</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">vinay@gamil.com</td>
            <td className="px-4 py-3 text-sm border">cse</td>
            <td className="px-4 py-3 text-sm border">2nd</td>
            <td className="px-4 py-3 text-sm border">B</td>
            <td className="px-4 py-3 text-sm border">20F65A0321</td>
                <td className=" space-x-3 p-4 border">
                <Link  >Edit</Link>
                <button>Delete</button>  
                </td>
                
           
          </tr>
          
          
        </tbody>
      </table>
    </div>
  </div>
</section>
      </div>
    </div>
  )
}

export default Application