// src/components/StudentRegister.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const StudentRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/student/register', data, {
        withCredentials: true
      });
      alert(response.data.message);
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum length is 6 characters' }
            })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
