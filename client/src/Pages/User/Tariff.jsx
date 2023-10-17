import  Header from "../../Component/User/Navbar";
import Footer from "../../Component/User/Footer";
import TariffComponent from "../../Component/User/Tarif";
import { Fragment } from "react";

function Tariff() {
  return (
    <Fragment>
      <Header/>
      <TariffComponent/>
      <Footer/>
   </Fragment>
  )
}

export default Tariff
