import { Fragment } from "react"
import Home from '../../Component/Partner/Home'
import Navbar from "../../Component/Partner/navbar"
import Footer from '../../Component/Partner/footer'
function HomePage() {
  return (
  <Fragment>
    <Navbar/>
    <Home/>
    <Footer/>
  </Fragment>
  )
}

export default HomePage
