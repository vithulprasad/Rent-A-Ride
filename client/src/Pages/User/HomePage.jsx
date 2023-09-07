import { Fragment } from 'react';

import Home from '../../Component/User/Home';
import Navbar from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer';

function HomePage() {
  const storedData = localStorage.getItem('information');
  const retrievedObject = JSON.parse(storedData);
  console.log("data is in the pages-------------------------",retrievedObject);
  return (
   <Fragment>
       <Navbar/>
        <Home/>
        <Footer/>
   </Fragment>
  )
}

export default HomePage
