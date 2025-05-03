import React from 'react';
import { Link } from 'react-router-dom';
import Login from './student/Login';

const Registration = () => {
    return (
        <div className=' bg-blue-950 w-screen h-screen flex justify-center items-center'>
            <div className="login items-center">
                <Link to='/slogin'>
                    <i className="fa-solid fa-angle-left back text-slate-50 font-bold size-9" />
                </Link>
                <div className=" justify-center items-center gap-10 space-y-5">
                    <Link to='/login' className="w-48 h-36 rounded-lg flex flex-col items-center justify-center bg-white">
                        <img src="/march3.png" alt="Student" className='w-36 h-36' />
                        
                    </Link>
                    <Link  to='/rsslogin' className="w-48 h-36 rounded-lg flex flex-col items-center justify-center bg-white">
                        <img src="/march4.png" alt="student" className=' w-36 h-36' />
                        
                    </Link>
                    <Link  to='/nsslogin' className="w-48 h-36 rounded-lg flex flex-col items-center justify-center bg-white">
                        <img src="/march5.png" alt="student" className='w-36 h-36' />
                        
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Registration;
