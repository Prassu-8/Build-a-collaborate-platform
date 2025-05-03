import React, { useEffect, useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import { Link, useParams } from 'react-router-dom';
import AxiosApi, { url } from '../../../AxiosApi';

const Certificate = () => {
  const [students, setStudents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getStudent();
  }, [id]);

  const getStudent = async () => {
    try {
      const response = await AxiosApi.get(`/faculty/completedstudents/${id}`);
      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const sendCertificate = async () => {
    if (!selectedFile) {
      alert("Please choose a certificate file.");
      return;
    }

    const formData = new FormData();
    formData.append('certificate', selectedFile);

    try {
      await AxiosApi.post(`/faculty/completed/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Certificates sent successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to send certificates. Please try again later.");
    }
  };

  return (
    <div>
      <SeparateNavbar />
      <div className="bg-blue-950 h-screen w-screen flex justify-center">
        <Link to="/history" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        <section className="container mx-auto p-6 font-mono mt-8">
          <div className="">
            <input type="file" onChange={handleFileChange} />
            <button type='button' onClick={sendCertificate} className='text-white font-sans text-lg px-4 py-3 border-zinc-50 bg-teal-500 rounded-lg' style={{ position: 'relative', left: '55%' }}>Send certificate</button>
          </div>
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Section</th>
                    <th className="px-4 py-3">Roll Number</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {students.map((item) => (
                    <tr className="text-gray-700" key={item._id}>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src={`${url}/student/${item.Avathar}`} alt="" loading="lazy" />
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
}

export default Certificate;
