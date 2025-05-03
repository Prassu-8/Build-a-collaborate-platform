import React from 'react';
import SeparateNavbar from './SeparateNavbar';
import Footer from '../../Footer';
import Grid from '../../../event/Home/Grid'
 
const Facultymoreevnts = () => {
  return (
    <div>
        <SeparateNavbar/>
        <div className="space-y-1">
        <Grid/>
        </div>
      <Footer/>
    </div>
  )
}

export default Facultymoreevnts
