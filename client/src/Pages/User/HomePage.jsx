import { Fragment } from 'react';

import Home from '../../Component/User/Home';
import Navbar from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer';
import Slider from '../../Component/User/banner'
import Table from '../../Component/User/dateTable'
function HomePage() {
      
      
  return (
   <Fragment>
       <Navbar />
       <div className='flex  '>
          <Table/>
          <Slider />
       </div>
      
        <Home/>
        <Footer/>
   </Fragment>
  )
}

export default HomePage
