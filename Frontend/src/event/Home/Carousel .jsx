import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  // Array of online image URLs
  const images = [
    'vinay.png',
    'vinay3.png',
    'vinay4.png',
    'vinay5.png',
    'vinay6.png',
    '132.jpg',
    'vinay8.png',
    'vinay9.png'

  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    
   <div className="">
    <div className=" mt-0 h-16 w-screen bg-red-300 ">
    <marquee className=' align-middle text-3xl text-gray-950 mt-2'>Aditya Engineering College was established in the academic year 2001-02 under the aegis of Aditya Academy, Kakinada with the approval of AICTE and Affiliated to JNTU with an intake of 180 in three UG Courses in Engineering & Technology.</marquee>

    </div>

    <div className=" mt-0 flex " style={{position:'relative',left:'0%'}}>
      <button onClick={handlePrev}><i className="fa-solid fa-angle-left text-white text-2xl " style={{position:"relative",left:"40px"}} ></i></button>
      <Link to='/galery'>
      <img 
  src={images[currentImageIndex]} 
  alt={`Image ${currentImageIndex + 1}`}  
  className='p-1 shine-image' 
  style={{width:'1500px', height:'500px', objectFit:'contain'}}
/>
      </Link>



      <button onClick={handleNext}><i className="fa-solid fa-chevron-right text-white text-2xl" style={{position:"relative",right:"40px"}}></i></button>
    </div>
   </div>
    

  );
};

export default Carousel;
