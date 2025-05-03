import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Forgotpassword = () => {
    const { handleSubmit:handleSubmitForgot, register:registerForgot } = useForm();
    const NavigateTo = useNavigate()

    const forgot = async (data) => {
        console.log('====================================')
        console.log(data)
        console.log('====================================')
        try {
            const response = await AxiosApi.put('/faculty/forgot', data);
            console.log(response);
            const message =  response.data.message;
            toast.success(message);
            NavigateTo('/facultylogin')
        } catch (error) {
            console.log(error,  "forgot error");
            const errormessage = error.response.data.message;
            toast.error(errormessage)
        }
    };

    return (
        <div className="bg-blue-950 min-h-screen w-screen flex items-center justify-center fixed top-0">
            <Link to="/facultylogin" className="absolute top-10 left-10 text-slate-50 font-bold">
                <i className="fas fa-angle-left text-2xl mr-2"></i>
                Back
            </Link>
            <div className="flex flex-col items-center">
                <form
                    className="rounded-lg border border-white p-8"
                    onSubmit={handleSubmitForgot(forgot)}
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
                            {...registerForgot('email')}
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
                            {...registerForgot('password')}
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
    );
};

export default Forgotpassword;
