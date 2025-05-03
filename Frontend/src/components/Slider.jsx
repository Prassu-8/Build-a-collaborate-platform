import React, { useState } from 'react';

const Slider = () => {
  // Array of online image URLs
  const images = [
    'boss.png',
    'hackthon.png',
    'boss.png',
    'hackthon.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    

    
    <div className=" mt-1 p-1 flex w-screen h-screen " >
      <button onClick={handlePrev}><i className="fa-solid fa-angle-left text-black text-2xl " style={{position:"relative",left:"40px"}} ></i></button>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`}  className='  w-screen h-screen' />
      <button onClick={handleNext}><i className="fa-solid fa-chevron-right text-black text-2xl" style={{position:"relative",right:"40px"}}></i></button>
    </div>

  );
};

export default Slider;
