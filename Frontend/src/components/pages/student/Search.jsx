import React from 'react';
import { Link } from 'react-router-dom';
import Studentsidebar from './Studentsidebar';
import Footer from '../../Footer';
import { url } from '../../../AxiosApi'; // Import the url variable if needed
import PropTypes from 'prop-types'; 
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const event = location.state;
    console.log(event)

    return (
        <div >
            <Studentsidebar />
            
            <div className="space-y-1 min-h-screen">
                <div className="grid grid-cols-3 gap-5 rounded-lg space-y-4">
                    {event && event.map((item) => (
                        <div className="border-slate-800" key={item._id}>
                            <Link to={`/eventdetils/${item._id}`}>
                                <img src={`${url}/events/${item.poster}`} alt="" className="rounded-lg w-full h-full" />
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
                <Footer />
        </div>
    );
};
Search.propTypes = {
    data: PropTypes.array.isRequired // Define data prop as an array and required
};
export default Search;
