import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosApi from '../../../AxiosApi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeparateNavbar from './SeparateNavbar';
import Footer from '../../Footer';


const Facultyregistatuon = () => {
  const {handleSubmit , register } = useForm();
  // const {erros} = formstate();
  const [image , setimage] = useState()
  const handleimage = (e) => setimage(e.target.files[0])
  const navigateTo = useNavigate();

  const registerfaculty = async(data) =>{
    
    const mydata=new FormData();
    for(let [key, value] of Object.entries(data)){
      mydata.append(key, value);
    }
    mydata.append("Avathar", image);
    try{
       await AxiosApi.post('/faculty/register',mydata).then((response)=>{
        console.log(response, " facs respo");
       toast("Registration Successful ...!")
       navigateTo(`/navbar`)
      })

    }catch(error){
      console.log(error, "errors");
    error.response.data.errors.map((item)=>toast.error(item.msg))
    }
  }

  return (
    <div className="">
      <SeparateNavbar/>

    <div className='bg-blue-950 h-screen w-screen flex items-center justify-center'>
    <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold" >
      <i className="fas fa-angle-left text-2xl mr-2 mt-20"></i>
      Back
    </Link>
    <div className="flex flex-col items-center">
      <form action=""  className='rounded-lg border border-white p-6' onSubmit={handleSubmit(registerfaculty)} encType='multipart/file'>
        <p className='text-white text-2xl underline mb-4 text-center' > Add Faculty </p>
        <div className="mb-4 ml-6">
          <label htmlFor="name" className='text-white text-lg '>Name:</label><br/>
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
          <label htmlFor="password" className='text-white text-lg'>Password:</label><br/>
          <input type='password' id="password" placeholder='Password' className='rounded-lg ml-2 h-8'{
            ...register('password')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="department" className='text-white text-lg'>Department:</label><br/>
          <input type='text' id="department" placeholder='Department' className='rounded-lg ml-2 h-8' {
            ...register('department')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="mobile" className='text-white text-lg'>Mobile Number:</label><br/>
          <input type='text' id="mobile" placeholder='Mobile Number' className='rounded-lg ml-2 h-8' {
            ...register('mobilenumber')
          } />
        </div>
        <div className="mb-6 ml-8">
          <label htmlFor="avatar" className='text-white text-lg'>Avatar:</label><br/>
          <input type='file' id="avatar" className='mt-2' onChange={handleimage} />
        </div>
        <button type='submit' className='text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-36 ml-10'>
          Add Faculty
        </button>
      </form>
    </div>
  </div>
  <Footer/>
    </div>
  )
}

export default Facultyregistatuon