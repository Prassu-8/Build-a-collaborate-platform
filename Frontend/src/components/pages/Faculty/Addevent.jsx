import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeparateNavbar from './SeparateNavbar';
import Footer from '../../Footer';
import AxiosApi from '../../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';



const Addevent = () => {
  const faculty = JSON.parse(localStorage.getItem('faculty'))

const {handleSubmit , register} = useForm();
const NavigateTo = useNavigate();
const[image,setimage]= useState();
const handleimage = (e) => setimage(e.target.files[0]);

const event = async(data) =>{
  const mydata = new FormData();
  for (let [key, value] of Object.entries(data)) { // Fix typo in Object.entries
    mydata.append(key, value);
  }
  mydata.append('poster', image);
  try{
    await AxiosApi.post(`/faculty/event/${faculty._id}`,mydata).then((response)=>{
      console.log(response,'event');
      toast.success('Event Added successful');
      NavigateTo('/navbar')

    })

  }catch(error){
    console.log(error,'ad student');
    error.response.data.errors.map((item)=>toast.error(item.msg))
   
  }


}


  return (
    <div>
        <SeparateNavbar/>
        <div className="bg-blue-950 h-full w-screen flex items-center justify-center">
        <Link to="/navbar" className="absolute top-10 left-10 text-slate-50 font-bold">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        <div className="flex flex-col items-center mt-20 mb-6">
          <form action="" className='rounded-lg border border-white p-6 w-80' onSubmit={handleSubmit(event)}>
            <p className='text-white text-2xl underline mb-4 text-center'>Add Event</p>
            <div className="mb-4 ml-6">
              <label htmlFor="name" className='text-white text-lg'>EventName:</label><br/>
              <input type='text' id="name" placeholder='Name' className='rounded-lg ml-2 h-8'{
                ...register("eventname")
              } />
            </div>
            <div className="mb-4 ml-6">
          <label htmlFor="date" className='text-white text-lg'>Form_date:</label><br/>
          <input type='date' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('from_date')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="date" className='text-white text-lg'>To_date:</label><br/>
          <input type='date' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('to_date')
          } />
        </div>
            <div className="mb-4 ml-6">
              <label htmlFor="text" className='text-white text-lg '>Strength:</label><br/>
              <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
                ...register('strength')
              }/>
            </div>
            <div className="mb-4 ml-6">
          <label htmlFor="time" className='text-white text-lg'>Start_time:</label><br/>
          <input type='time' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('start_time')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="time" className='text-white text-lg'>End_Time:</label><br/>
          <input type='time' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('end_time')
          }/>
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>participation:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('participation')
          } />
          
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>department:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('department')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>organized:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8' {
            ...register('organized')
          } />
        </div>
        <div className="mb-6 ml-8">
          <label htmlFor="avatar" className='text-white text-lg'>Poste:</label><br/>
          <input type='file' id="avatar" className='mt-2' onChange={handleimage} />
        </div>
            <button type='submit' className='text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-36 mt-4 ml-8'>
              Add Event
            </button>
          </form>
        </div>
      
      </div>
      <Footer/>
    </div>
  )
}

export default Addevent