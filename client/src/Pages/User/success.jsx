import  Header from "../../Component/User/Navbar";
import Footer from "../../Component/User/Footer";
import Success from "../../Component/User/success";
import { Fragment } from "react";





function success() {
  return (
   <Fragment>
      <Header/>
      <Success/>
      <Footer/>
   </Fragment>
  )
}

export default success
