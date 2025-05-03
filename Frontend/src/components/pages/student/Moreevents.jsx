import React from 'react';
import Studentsidebar from './Studentsidebar';
import Studentgird from './Studentgird';
import Pagination from '../../../event/Home/Paginatin';
import Footer from '../../Footer';

const Moreevents = () => {
  return (
    <div>
        <Studentsidebar/>
        <div className="space-y-1">
            <Studentgird/>
            <Footer/>

            

        </div>

    </div>
  )
}

export default Moreevents