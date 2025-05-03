import React, { useEffect, useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosApi from '../../../AxiosApi';
import {url} from '../../../AxiosApi';

const Profile = () => {
  const faculty = JSON.parse(localStorage.getItem('faculty'));
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await AxiosApi.get(`/faculty/profile/${faculty._id}`);
      console.log(response.data.faculty);
      setProfile(response.data.faculty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <SeparateNavbar />
      <div className="flex flex-col items-center justify-center  bg-slate-700 h-screen M-1">
        <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        {profile && (
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
            {/* Displaying image */}
            <img src={`${url}/faculty/${profile.Avathar}`} alt="Profile Avatar" className="rounded-full w-56 h-56 mx-auto mb-4" />
            <p className="text-center text-lg font-semibold">{profile.name}</p>
            <p className="text-center text-gray-600 text-xl mb-4">{profile.department}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">Name</label>
                <p className="text-gray-800">{profile.name}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
                <p className="text-gray-800">{profile.email}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">Mobile Number</label>
                <p className="text-gray-800">{profile.mobilenumber}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">Department</label>
                <p className="text-gray-800">{profile.department}</p>
              </div>
              <div className=" mt-6 text-center">
                <Link to={`/profileupdate/${profile._id}`} className=' rounded-lg h-40 w-40 text-white bg-black text-center items-center font-semibold '>UPDATE</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
