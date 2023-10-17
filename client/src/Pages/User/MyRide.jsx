import  { Fragment, useEffect } from 'react'
import Header from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer'
import MyOrders from '../../Component/User/myRide'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


function MyRide({authorized}) {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!authorized){
            console.log("no user");
          navigate('/')
        }
      },[])
  return (
   <Fragment>
      <Header/>
      <MyOrders/>
      <Footer/>
   </Fragment>
  )
}

export default MyRide
MyRide.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };