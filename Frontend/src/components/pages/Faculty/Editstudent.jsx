import React, { useState } from "react";
import SeparateNavbar from "./SeparateNavbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import AxiosApi from "../../../AxiosApi";

const Editstudent = () => {
    const faculty = JSON.parse(localStorage.getItem('faculty'))
  const { handleSubmit, register } = useForm();
  const [image, setimage] = useState();
  const { id } = useParams();
  const navigateTo = useNavigate();
  const handleimage = (e) => setimage(e.target.files[0]);
  const updatestudent = async (data) => {
    const mydata = new FormData();
    for (let [key, value] of Object.entries(data)) {
      mydata.append(key, value);
    }
    mydata.append("Avathar", image);
    try {
      await AxiosApi.put(`/faculty/student/${faculty._id}/${id}`, mydata).then((response) => {
        console.log(response);
        toast("update sucess");
        navigateTo('/viewstudent')
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <SeparateNavbar />
      <div className="bg-blue-950 h-full w-screen flex items-center justify-center">
        <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        <div className="flex flex-col items-center mt-20 mb-6">
          <form action="" className='rounded-lg border border-white p-6 w-80' onSubmit={handleSubmit(updatestudent)}>
            <p className='text-white text-2xl underline mb-4 text-center'>Add Students</p>
            <div className="mb-4 ml-6">
              <label htmlFor="name" className='text-white text-lg'>Name:</label><br/>
              <input type='text' id="name" placeholder='Name' className='rounded-lg ml-2 h-8' {
                ...register('name')
              } />
            </div>
            <div className="mb-4 ml-6">
          <label htmlFor="email" className='text-white text-lg'>Email:</label><br/>
          <input type='email' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('email')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="email" className='text-white text-lg'>Paasword:</label><br/>
          <input type='password' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('password')
          } />
        </div>
            <div className="mb-4 ml-6">
              <label htmlFor="type" className='text-white text-lg '>Type:</label><br/>
              <select id="type" className='rounded-lg ml-2 h-8 bg-white text-black' style={{width:'180px'}} {
                ...register('Type')
              }>
                <option value="leo">Leo</option>
                <option value="nss">NSS</option>
                <option value="rss">RSS</option>
              </select>
            </div>
            <div className="mb-4 ml-6">
          <label htmlFor="type" className='text-white text-lg'>Department:</label><br/>
          <select id="type" className='rounded-lg ml-2 h-8 bg-white text-black' style={{width:'180px'}} {
            ...register('department')
          }>
                <option value="MECH">MECH</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="CSIT">CSIT</option>
              </select>
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="type" className='text-white text-lg'>Year:</label><br/>
          <select id="type" className='rounded-lg ml-2 h-8 bg-white text-black' style={{width:'180px'}} {
            ...register('year')
          }>
                <option value="1ST">1ST </option>
                <option value="2ND">2ND</option>
                <option value="3RD">3RD</option>
                <option value="4TH">4TH</option>
              </select>
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="type" className='text-white text-lg'>Section:</label><br/>
          <select id="type" className='rounded-lg ml-2 h-8 bg-white text-black' style={{width:'180px'}} {
            ...register('section')
          }>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>Roll Number:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('rollnumber')
          } />
        </div>
        <div className="mb-6 ml-8">
          <label htmlFor="avatar" className='text-white text-lg'>Profile:</label><br/>
          <input type='file' id="avatar" className='mt-2' onChange={handleimage} />
        </div>
            <button type='submit' className='text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-36 mt-4 ml-8'>
              Update 
            </button>
          </form>
        </div>
      
      </div>
      <Footer/>
    </div>
  );
};

export default Editstudent;
