import { Fragment } from 'react';

import Home from '../../Component/User/Home';
import Navbar from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer';

function HomePage() {
      
      
  return (
   <Fragment>
       <Navbar />
        <Home/>
        <Footer/>
   </Fragment>
  )
}

export default HomePage
