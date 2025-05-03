import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='   bg-sky-950 w-screen h-20 flex justify-between items-center '>
            <div className=" ml-3">
                <p className=' text-left text-xl text-zinc-200 font-semibold'>@Event Organization</p>
            </div>
            <div className=" flex space-x-3 mr-3">
                <p className=' text-right text-xl text-zinc-200 font-semibold'>ⒸAditya Event Organization</p>
                <span>
                <img
                  src="https://i.imgur.com/TtB6MDc.png"
                  className="img-fluid "
                  width={25}
                />
              </span>{" "}
              <span>
                <img
                  src="https://i.imgur.com/N90KDYM.png"
                  className="img-fluid "
                  width={25}
                />
              </span>
            </div>
        </footer>
        
    </div>
  )
}

export default Footer
