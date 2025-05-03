import React from 'react'
import { Link } from 'react-router-dom'

const Slogin = () => {
  return (
    <div>
    <div className='bg-blue-950 w-screen h-screen flex justify-center items-center'>
        <div className="login items-center">
            <Link to='/'>
                <i className="fa-solid fa-angle-left back text-slate-50 font-bold size-9" />
            </Link>
            <div className="flex justify-center items-center gap-10 space-y-3">
                <Link to='/Registation' className="w-48 h-36 rounded-lg flex flex-col items-center justify-center bg-white">
                    <img src="/student.png" alt="Student" className='w-24 h-24' />
                    <p className='text-center font-semibold text-black'>Student Login</p>
                </Link>
                <Link to='/facultylogin' className="w-48 h-36 rounded-lg flex flex-col items-center justify-center bg-white">
                    <img src="/teach.png" alt="Faculty" className='w-24 h-24' />
                    <p className='text-center font-semibold text-black'>Faculty Login</p>
                </Link>
            </div>
        </div>
    </div>
</div>

  )
}

export default Slogin