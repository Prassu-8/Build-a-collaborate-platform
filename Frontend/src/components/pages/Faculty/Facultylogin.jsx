import React from "react";
import { Link } from "react-router-dom";
import AxiosApi from "../../../AxiosApi";
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";


const Facultylogin = () => {
  const {handleSubmit :handleSubmit2  , register : register2 } = useForm()
  const navigateTo = useNavigate();

  const facultylogin = async(data) =>{
    try{
      await AxiosApi.post("/faculty/login",data).then((responce)=>{
        console.log(responce);
        const faculty = JSON.stringify(responce.data.faculty);
        console.log(faculty)
        localStorage.setItem('faculty', faculty)
        toast('successfull login');
        navigateTo('/navbar')
      })


    }catch(error){
      console.log(error,'login error');
      const message = error.response.data.message;
      toast.error(message)
    
    }
  }
  return (
    <div className="bg-blue-950 min-h-screen w-screen flex items-center justify-center fixed top-0">
      <Link
        to="/slogin"
        className="absolute top-10 left-10 text-slate-50 font-bold"
      >
        <i className="fas fa-angle-left text-2xl mr-2"></i>
        Back
      </Link>
      <div className="flex flex-col items-center">
        <form action="" className="rounded-lg border border-white p-8" onSubmit={handleSubmit2(facultylogin)}>
          <p className="text-white text-3xl underline mb-6">Faculty Login</p>
          <div className="mb-6">
            <label htmlFor="email" className="text-white text-lg block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white" {
                ...register2('email')
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-white text-lg block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white" {
                ...register2('password')
              }
            />
          </div>
          <button
            type="submit"
            className="text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-32"
          >
            Login
          </button><br/>
         
        </form>
      </div>
    </div>
  );
};

export default Facultylogin;
