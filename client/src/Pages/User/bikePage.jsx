import { Fragment } from "react"
import Navbar from "../../Component/User/Navbar"
import Footer from "../../Component/User/Footer"
import BikeList from "../../Component/User/BikeList"


function bikePage() {
  return (
    <Fragment>
        <Navbar/>
         <BikeList/>
        <Footer/>
    </Fragment>
  )
}

export default bikePage
