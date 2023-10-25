import { Fragment} from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import ChatPartnerPage from '../../Component/Partner/ChatPartner'

function BookingPage() {
  const targetUserId = '123';
  return (
    <Fragment>
          <Navbar />
           <ChatPartnerPage targetUserId={targetUserId} />
          <Footer />
    </Fragment>
  )
}

export default BookingPage