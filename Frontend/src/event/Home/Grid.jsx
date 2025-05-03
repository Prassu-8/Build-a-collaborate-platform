import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosApi from '../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {url} from '../../AxiosApi';
import Paginatin from './Paginatin';

const Grid = () => {
    const faculty = JSON.parse(localStorage.getItem('faculty'));
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async () => {
        try {
            const response = await AxiosApi.get(`/faculty/allevents/${faculty._id}`);
            console.log(response);
            setEvents(response.data.events); // Assuming 'events' is the array of events returned
            setTotalPages(response.data.totalPages); 
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
        <div>
            <div className="grid grid-cols-3 gap-5 rounded-lg space-y-4">
                {events.map((item) => (
                    <div key={item._id} className="border-slate-800">
                        <Link to={`/facultyeventdetils/${item._id}`}>
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
                            <Link to={'/morevent'}
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

export default Grid;
