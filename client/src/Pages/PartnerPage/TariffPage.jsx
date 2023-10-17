
import { Fragment, useEffect, useState } from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import Tariff  from "../../Component/Partner/Tariff";
function TarifPage() {
  return (
    <Fragment>
    <Navbar/>
    <Tariff/>
    <Footer/>
    </Fragment>
  )
}

export default TarifPage
