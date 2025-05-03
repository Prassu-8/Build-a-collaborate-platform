import React, { useEffect, useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import Footer from '../../Footer';
import AxiosApi,{url} from '../../../AxiosApi'; // Import url from AxiosApi

const Galerys = () => {
    const [events, setEvents] = useState([]); // Initialize events as an empty array
    const student = JSON.parse(localStorage.getItem('faculty'));

    const fetchPics = async () => {
        try {
            const response = await AxiosApi.get(`/faculty/pics/${student._id}`);
            console.log(response,'respon');
            const images = response.data.gallery;
            console.log(images,'image')
            
        
            setEvents(images);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPics();
    }, [student._id]);

    return (
        <div>
            <SeparateNavbar />
            <div className=' min-h-screen'>
                <div className="grid grid-cols-3 gap-5 rounded-lg space-y-4">
                    {events&&events.map((item, index) => (
                        <div className="border-slate-800" key={index} >
                            <img src={`${url}/galery/${item.image[0]}`} alt="" className="rounded-lg w-full h-full" />
                           {/* {item.image.map((image, index)=> <img src={`${url}/galery/${image}`} alt="" className="rounded-lg w-full h-full" />)} */}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Galerys;
