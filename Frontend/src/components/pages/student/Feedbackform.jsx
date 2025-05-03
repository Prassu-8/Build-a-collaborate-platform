import React from 'react';
import Studentsidebar from './Studentsidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AxiosApifrom, { AxiosApi } from'../../../AxiosApi';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'; 


const Feedbackform = () => {
  const student = JSON.parse(localStorage.getItem('student'))
  const {handleSubmit ,register} = useForm();
  const {id} = useParams()
  const NavigateTo = useNavigate()

  const feedback =async(data)=>{
    try{
      await AxiosApi.post(`/student/feedback/${student._id}/${id}`,data).then((response)=>{
        console.log(response);
        toast.success('Feedback sucessfully sent')
        NavigateTo('/studenthistory')
      })

    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-blue-950 h-screen flex flex-col">
      <Studentsidebar />
      <div className="flex-grow flex items-center justify-center">
        <div className="back-color bg-blue-950 flex flex-col items-center">
          <Link to="/dashboard" className="absolute top-10 left-10 text-slate-50 font-bold">
            <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
            Back
          </Link>
          <div className="bg-white w-72 h-48 rounded-lg flex flex-col justify-center items-center p-6">
            <h4 className="text-lg font-semibold mb-4">Give Feedback</h4>
            <form className="w-full" onSubmit={handleSubmit(feedback)}>
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
                <input
                  id="feedback"
                  name="feedback"
                  type="text"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-12"
                  placeholder="Enter your feedback..."{
                    ...register('feedback')
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbackform;
