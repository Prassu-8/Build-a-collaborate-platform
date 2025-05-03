import Footer from "./Footer";
import { Link } from 'react-router-dom';
import Slider from "./Slider";
import React from 'react';
import StudentRegister from '../components/StudentRegister';
// import StudentRegister from './components/StudentRegister';
// import Carousel from '../event/Home/Carousel '


const Home = () => {
    return (
        <div>
            {/* navbar */}
            <div className=" bg-sky-950 w-screen h-20 flex justify-between">
                <div className="items-center flex ml-8">
                    <img src="/aditya.png" alt="" className="bg-inherit m-6 p-1 rounded-t-3xl w-24 h-20" />
                    <Link to='/' className="font-bold text-2xl text-slate-200 items-center">Envision Event</Link>
                </div>
                <div className="items-center flex mr-4">
                    <Link to='/' className="rounded-md p-3 text-2xl font-bold text-slate-300 hover:bg-slate-200 hover:text-slate-950">Home</Link>
                    <Link to='/StudentRegister' className="rounded-md p-3 text-2xl font-bold text-slate-300 hover:bg-slate-200 hover:text-slate-950">Sign Up</Link>
                    <Link to='/slogin' className="rounded-md p-3 text-2xl font-bold text-slate-300 hover:bg-slate-200 hover:text-slate-950">Sign In</Link>
                   
                </div>
            </div>
            {/* slider */} 
            <div className=" mt-0">
                <Slider/>
                {/* <StudentRegister/> */}
            </div> 
           
           
            <Footer />
        </div>
    )
}

export default Home;
