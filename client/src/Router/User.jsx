
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import {userDetails} from '../Redux/storeSlices/userAuth';
import Home from '../Pages/User/HomePage';
import Register from '../Component/User/Register';
import Login from '../Component/User/Login';
import OtpPage from '../Pages/User/OtpPage';
import Join from '../Pages/User/Join';
import { useEffect } from 'react';


// --------------------------------error boundery set up --------------------------------//
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className='flex justify-center mt-10'>
    <div style={{width:"700px",height:"500px",boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}} className='pt-36 font-sans bg-slate-400 '>
      <h2 className='text-center text-red-700 font-mono'>Something went wrong:</h2>
      <p className='text-center font-mono text-sky-800'>Error is :{error.message}</p>
      <div className='flex justify-center'>
      <button className="bg-blue-500 font-mono  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={resetErrorBoundary}>Try again..</button>
      </div>
   </div>
    </div>
  );
}

// Add prop validation for ErrorFallback component
ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
// -------------------------------- main function  --------------------------------//
function User() { 
const storedInformation = localStorage.getItem('information');
const dispatch = useDispatch()


  useEffect(()=>{
    if (storedInformation) {
      const information = JSON.parse(storedInformation);
          if(information.roll==="client"){
            dispatch(userDetails(information))
          }
      } else {
          console.log('No data found in localStorage for key "information"');
      }

  },[])
  const user = useSelector((state) => {
    return state?.userAuth.token
  });
 //###################################################### function end ####################################################################

  return (
  
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home />}
          />
          <Route
            path="/register"
            exact
            element={ !user ? <Register /> : <Home />}
          />
          <Route
            path="/login"
            exact
            element={!user ? <Login /> : <Home />}
          />
          <Route
            path="/otp"
            exact
            element={!user ?  <OtpPage /> : <Home />}
          />
          <Route
            path="/joinCompany"
            exact
            element={<Join />}
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default User;
