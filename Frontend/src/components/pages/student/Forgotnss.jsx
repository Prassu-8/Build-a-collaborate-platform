import React from 'react'
import { useForm } from 'react-hook-form'
import AxiosApi from '../../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Forgotnss = () => {
    const {handleSubmit:handleSubmit7 , register:register7} = useForm();
    const NavigateTo =  useNavigate()


    const forgotnss =async(data)=>{
        try{
            const response = await AxiosApi.put('/student/forgotnss',data);
            console.log(response);
            const successmessage= response.data.message;
            toast.success(successmessage);
            NavigateTo('/nsslogin')

        }catch(error){
            console.log(error);
            const errormessage = error.response.data.message;
            toast.error(errormessage)
        }
    }
  return (
    <div>
      <div className="bg-blue-950 min-h-screen w-screen flex items-center justify-center fixed top-0">
            <Link to="/nsslogin" className="absolute top-10 left-10 text-slate-50 font-bold">
                <i className="fas fa-angle-left text-2xl mr-2"></i>
                Back
            </Link>
            <div className="flex flex-col items-center">
                <form
                    className="rounded-lg border border-white p-8"
                    onSubmit={handleSubmit7(forgotnss)}
                >
                    <p className="text-white text-3xl underline mb-6">Forgot Password</p>
                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg block">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"
                            {...register7('email')}
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
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"
                            {...register7('password')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-32"
                    >
                        Forgot
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Forgotnss
