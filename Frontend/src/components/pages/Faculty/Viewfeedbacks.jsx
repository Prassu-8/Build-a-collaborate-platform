import React, { useEffect, useState } from 'react';
import SeparateNavbar from './SeparateNavbar';
import { Link } from 'react-router-dom';
import AxiosApi from '../../../AxiosApi';
import { useParams } from 'react-router-dom';


const Viewfeedbacks = () => {
  // Dummy data for demonstration

const [data,setdata] = useState();
const [student,setstudent] = useState()
const {id} = useParams()
const feedbacks = async() =>{
  try{
    await AxiosApi.get(`/faculty/feedbacks/${id}`).then((response)=>{
      console.log(response);
      setdata(response.data.feedbacks);
    })

  }catch(error){
    console.log(error)
  }
}
useEffect(()=>{
  feedbacks();

},[id])
  return (
    <div>
      <SeparateNavbar />
      <div className=" bg-sky-950 mt-1 h-screen min-h-screen">


      <div className="p-3 back-color text-white margin-top items-center">
        <div className=" ml-2">

        <Link to="/history" className="absolute top-10 left-10 text-slate-50 font-bold p-2">
          <i className="fas fa-angle-left text-2xl mr-2 mt-10"></i>
          Back
        </Link>
        </div>
        <h4 className=' mt-8'> Feedbacks</h4>
        <hr />

        <div className="card">
          {/* <h5 className="p-3">
            Inbox <small className="badge bg-success">{queries.length}</small>
          </h5> */}
          <div className="card-body  bg-white rounded-md mt-5" >
            <ul className="list-unstyled">
              { data && data.map((item)=>(

                <li className="p-3" key={item._id}>
                  <span className="rounded-circle bg-secondary">
                    <i className="fa-regular fa-user text-black"></i>
                  </span>
                  <p style={{ display: "inline" }} className="p-3 fs-5 text-black">
                    {item.student.name}
                  </p>
                  <p className=' text-black'>{item.feedback.feedbacks}</p>
                </li>
              ))
                
              }
              
            </ul>
          </div>
        </div>
      </div>
      </div>
      <style jsx="true">{`
        .rounded-circle {
          width: 40px;
          height: 40px;
          display: inline-block;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default Viewfeedbacks;
