import { Fragment, useEffect, useState } from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import Booking from '../../Component/Partner/booking'

function BookingPage() {
  return (
    <Fragment>
          <Navbar />
           <Booking/>
          <Footer />
    </Fragment>
  )
}

export default BookingPage
