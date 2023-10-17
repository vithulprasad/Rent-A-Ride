
import { Fragment, useEffect, useState } from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import PortFolio1  from "../../Component/Partner/portFolio";
function PortFolioPage() {
  return (
    <Fragment>
      <Navbar/>
      <PortFolio1/>
      <Footer/>
    </Fragment>
  )
}

export default PortFolioPage
