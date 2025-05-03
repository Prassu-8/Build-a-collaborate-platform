import React, { useState } from 'react'
import SeparateNavbar from './SeparateNavbar';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosApi from '../../../AxiosApi';
import { toast } from 'react-toastify';


const Updateevent = () => {
    const {handleSubmit, register} = useForm();
    const [image,setimage] = useState();
    const imagehandle = (e) => setimage(e.target.files[0])
    const faculty = JSON.parse(localStorage.getItem('faculty'))
    const {id} = useParams();
    const NavigateTo = useNavigate()


    const updateform =async(data) =>{
        const mydata = new FormData();
        for (let [key, value] of Object.entries(data)) {
          mydata.append(key, value);
        }
        mydata.append("poster", image);
        try{
            await AxiosApi.put(`/faculty/event/${faculty._id}/${id}`,mydata).then((response)=>{
                console.log(response);
                toast.success('update sucessfully');
                NavigateTo('/viewevent')
                
            })


        }catch(error){
            console.log(error)
           const erde = error.response.data.message
           toast.error(erde)
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
          <form action="" className='rounded-lg border border-white p-6 w-80'onSubmit={handleSubmit(updateform)} >
            <p className='text-white text-2xl underline mb-4 text-center'>Update Event</p>
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
          }  />
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
              } />
            </div>
            <div className="mb-4 ml-6">
          <label htmlFor="time" className='text-white text-lg'>Start_time:</label><br/>
          <input type='time' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('start_time')
          }  />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="time" className='text-white text-lg'>End_Time:</label><br/>
          <input type='time' id="email" placeholder='Email' className='rounded-lg ml-2 h-8 w-44' {
            ...register('end_time')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>participation:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8'  {
            ...register('participation')
          } />
          
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>department:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8'{
            ...register('department')
          } />
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="text" className='text-white text-lg'>organized:</label><br/>
          <input type='text' id="email" placeholder='Email' className='rounded-lg ml-2 h-8'{
            ...register('organized')
          }  />
        </div>
        <div className="mb-6 ml-8">
          <label htmlFor="avatar" className='text-white text-lg'>Poster:</label><br/>
          <input type='file' id="avatar" className='mt-2'onChange={imagehandle}  />
        </div>
            <button type='submit' className='text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-48 mt-4 ml-8'>
              Upadte Event
            </button>
          </form>
        </div>
      
      </div>
      <Footer/>
    </div>
  )
}

export default Updateevent
