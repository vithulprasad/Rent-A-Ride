import { Fragment} from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import ChatPartnerPage from '../../Component/Partner/ChatPartner'

function BookingPage() {
  return (
    <Fragment>
          <Navbar />
           <ChatPartnerPage/>
          <Footer />
    </Fragment>
  )
}

export default BookingPage