   import { Fragment, useEffect } from 'react'
   import PropTypes from 'prop-types';
   import LoginPage from '../../Component/User/Login' 
import { useNavigate } from 'react-router-dom'
    
    function Login({authorized}) {
      const navigate= useNavigate()
      useEffect(()=>{
        if(authorized){
          navigate('/')
        }
      },[])
   
      return (
       <Fragment>
           <LoginPage/>
       </Fragment>
      )
    }
    Login.propTypes = {
      authorized: PropTypes.bool.isRequired,
    };
    
    export default Login
    