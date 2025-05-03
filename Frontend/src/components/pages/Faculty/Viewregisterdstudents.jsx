import React, { useEffect, useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import AxiosApi from '../../../AxiosApi';
import { url } from '../../../AxiosApi';

const Viewregisterdstudents = () => {
    const faculty = JSON.parse(localStorage.getItem('faculty'))
    const { id } = useParams()
    const [data, setData] = useState([]);

    const fetchRegisteredStudents = async () => {
        try {
            const response = await AxiosApi.get(`/faculty/application/${faculty._id}/${id}`);
            console.log(response);
            setData(response.data.registeredStudents);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRegisteredStudents();
    }, [faculty._id, id]);

    const handleAction = async (id, status) => {
        try {
            const response = await AxiosApi.put(`/faculty/application/${id}`, { status });
            console.log(response);
            // Refresh data after action
            fetchRegisteredStudents();
        } catch (error) {
            console.log(error);
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
                                        <th className="px-4 py-3">Year</th>
                                        <th className="px-4 py-3">Section</th>
                                        <th className="px-4 py-3">Roll Number</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data.map((item) => (
                                        <tr className="text-gray-700" key={item._id}>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">                                                   
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
                                                <button type='button' onClick={() => handleAction(item._id, 'accept')}>Accept</button>
                                                <button type="button" onClick={() => handleAction(item._id, 'reject')}>Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Viewregisterdstudents;
