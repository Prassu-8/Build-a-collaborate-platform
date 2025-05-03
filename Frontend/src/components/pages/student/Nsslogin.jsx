import React from 'react';
import { Link } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Nsslogin = () => {
    const { handleSubmit, register } = useForm();
    const NavigateTo = useNavigate();

    const login = async (data) => {
        try {
            const response = await AxiosApi.post('/student/loginnss', data);
            console.log(response);
            const student = response.data.student;
      const students = JSON.stringify(student)
      localStorage.setItem('student',students)
      toast.success('sucessfull Login');
      NavigateTo('/dashboard')
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || 'An error occurred';
            toast.error(message);
        }
    };

    return (
        <div className="bg-blue-950 min-h-screen w-screen flex items-center justify-center fixed top-0">
            <Link to="/Registation" className="absolute top-10 left-10 text-slate-50 font-bold">
                <i className="fas fa-angle-left text-2xl mr-2"></i>
                Back
            </Link>
            <div className="flex flex-col items-center">
                <form className="rounded-lg border border-white p-8" onSubmit={handleSubmit(login)}>
                    <p className="text-white text-3xl underline mb-6">Student Login</p>
                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg block">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="rounded-lg w-full h-12 px-4 bg-blue-900 text-white"
                            {...register('email')}
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
                            {...register('password')}
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

export default Nsslogin;
