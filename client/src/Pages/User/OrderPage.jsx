import  { Fragment, useEffect } from 'react'
import Header from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer'
import Order from '../../Component/User/order'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
function OrderPage({authorized}) {
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
      <Order/>
      <Footer/>
   </Fragment>
  )
}

export default OrderPage
OrderPage.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };