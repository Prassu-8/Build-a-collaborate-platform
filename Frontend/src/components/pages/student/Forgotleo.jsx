import React from 'react'
import { useForm } from 'react-hook-form'
import AxiosApi from '../../../AxiosApi';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Forgotleo = () => {
    const {handleSubmit:handleSubmit6 , register:register6} = useForm();
    const {id} = useParams()
    const NavigateTo = useNavigate()

    const forgotpassword =async(data) =>{
        try{
            const response = await AxiosApi.put(`/student/changepassword/${id}`,data)
            console.log(response);
            const successmessage = response.data.message
           toast.success(successmessage);
           NavigateTo('/studentprofile')
            

        }catch(error){
            console.log(error);
            const errormessage =  error.response.data.message
            toast.error(errormessage)
        }
    }
  return (
    <div>
        <div className="bg-blue-950 min-h-screen w-screen flex items-center justify-center fixed top-0">
            <Link to="/studentprofile" className="absolute top-10 left-10 text-slate-50 font-bold">
                <i className="fas fa-angle-left text-2xl mr-2"></i>
                Back
            </Link>
            <div className="flex flex-col items-center">
                <form
                    className="rounded-lg border border-white p-8" onSubmit={handleSubmit6(forgotpassword)}
                >
                    <p className="text-white text-3xl underline mb-6">Change Password</p>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-white text-lg block">
                            Old Password:
                        </label>
                        <input
                            type="password"
                            id="email"
                            placeholder="old password"
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"{
                                ...register6('oldpassword')
                            }
                           
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-white text-lg block">
                           New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"{
                                ...register6('newpassword')
                            }
                      
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-white text-lg block">
                        confirm Password :
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"{
                                ...register6('confirmpassword')
                            }
                      
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-center text-2xl border border-white bg-orange-300 text-blue-950 rounded-lg w-48"
                    >
                        change password
                    </button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Forgotleo
