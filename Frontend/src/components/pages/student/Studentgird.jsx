import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import { url } from '../../../AxiosApi';
import { useNavigate } from 'react-router-dom';

const Studentgrid = () => {
    const student = JSON.parse(localStorage.getItem('student'));
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);
    const NavigateTo = useNavigate()

    const fetchEvents = async (page) => {
        try {
            const response = await AxiosApi.get(`/student/events/${student._id}?page=${page}`);
            console.log(response);
            setEvents(response.data.events); // Assuming 'events' is the array of events returned
            setTotalPages(response.data.totalPages); // Set total pages from backend
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage); // Fetch events for the current page on component mount
    }, [currentPage]); // Fetch events whenever currentPage changes

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1); // Update current page
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1); // Update current page
    };

    return (
        <div className=' min-h-screen'>
            <div className="grid grid-cols-3 gap-5 rounded-lg space-y-4">
                {events.map((item) => (
                    <div className="border-slate-800" key={item._id}>
                        <Link to={`/eventdetils/${item._id}`}>
                            <img src={`${url}/events/${item.poster}`} alt="" className="rounded-lg w-full h-full" />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-evenly mt-4">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap mt-3 mb-4">
                        <li>
                            <Link
                                className="font-semibold px-4 py-2 mr-1 mb-1 border rounded bg-white text-blue-500 hover:bg-blue-100"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1} // Disable previous button on first page
                            >
                                Previous
                            </Link>
                        </li>
                        <li>
                            <Link to={'/nextpage'}
                                className="font-semibold px-4 py-2 mr-1 mb-1 border rounded bg-white text-blue-500 hover:bg-blue-100 mt-5"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}  // Disable next button on last page
                            >
                                Next
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Studentgrid;
