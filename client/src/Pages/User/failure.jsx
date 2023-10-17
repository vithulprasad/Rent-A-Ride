import  Header from "../../Component/User/Navbar";
import Footer from "../../Component/User/Footer";
import Failure from "../../Component/User/failure";
import { Fragment } from "react";





function failure() {
  return (
   <Fragment>
      <Header/>
      <Failure/>
      <Footer/>
   </Fragment>
  )
}

export default failure