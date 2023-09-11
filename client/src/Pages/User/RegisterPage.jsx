import{Fragment, useEffect} from 'react'
import Register from '../../Component/User/Register'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'


RegisterPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
};


function RegisterPage({authorized}) {
  const navigate=useNavigate()
  useEffect(()=>{
    if(authorized){
      navigate('/')
    }
  },[])

  return (
    <Fragment>
        <Register />
    </Fragment>
  )
}

export default RegisterPage
