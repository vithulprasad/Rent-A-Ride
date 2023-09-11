import { useNavigate } from "react-router-dom"
import Otp from "../../Component/User/Otp"
import { Fragment } from "react"
import PropTypes from 'prop-types';


const OtpPage = ({authorized}) => {
  const navigate=useNavigate()
  if(authorized){
    navigate('/')

  }
  return (
   <Fragment>
       <Otp/>
   </Fragment>
  )
}
OtpPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
};
export default OtpPage


