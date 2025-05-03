import React, { useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import { toast } from 'react-toastify';

const Images = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const faculty = JSON.parse(localStorage.getItem('faculty'));
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [about, setAbout] = useState('');

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('text', about);
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await AxiosApi.post(`/faculty/image/${faculty?._id}/${id}`, formData);
            console.log(response, 'image uploaded');
            const sucess = response.data.message;
            toast.success(sucess)
            // Redirect or perform any action after successful upload
            //navigate('/history');
        } catch (error) {
            console.error('Error uploading images:', error);
            const failure = error.response.data.message;
            toast.error(failure)
        }
    };

    return (
        <div>
            <SeparateNavbar />
            <div className="bg-blue-950 min-h-screen w-screen flex justify-center">
                <Link to="/history" className="absolute top-25 left-10 text-slate-50 font-bold flex items-center">
                    <i className="fas fa-angle-left text-2xl mr-2"></i>
                    Back
                </Link>
                <div className="flex flex-col items-center justify-center mt-20">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label>About</label><br />
                            <input type="text" className="min-h-7 border-gray-950 rounded-md" onChange={(e) => setAbout(e.target.value)} />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Images;
