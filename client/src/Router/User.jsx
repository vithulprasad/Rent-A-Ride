
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import {userDetails} from '../Redux/storeSlices/userAuth';
import Home from '../Pages/User/HomePage';
import RegisterPage from '../Pages/User/RegisterPage';
import LoginPage from '../Pages/User/login';
import OtpPage from '../Pages/User/OtpPage';
import Join from '../Pages/User/Join';
import { useEffect } from 'react';
import BikePage from '../Pages/User/bikePage';
import ProfilePage from '../Pages/User/ProfilePage';
import Order from '../Pages/User/OrderPage';
import Success from '../Pages/User/success';
import Failure from '../Pages/User/failure';
import MyRide from '../Pages/User/MyRide';
import Offer from '../Pages/User/OfferPage';
import Tariff from '../Pages/User/Tariff';
import ChatPage from '../Pages/User/ChatPage';
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
          console.log('No data found in localStorage for key "information for the admin"');
      }

  },[])
  const user = useSelector((state) => {
    return !!state?.userAuth.token;
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
            element={<RegisterPage authorized={user} />}
          />
          <Route
            path="/login"
            exact
            element={ <LoginPage authorized={user}  /> }
          />
          <Route
            path="/otp"
            exact
            element={ <OtpPage authorized={user}  />}
          />
          <Route
            path="/order"
            exact
            element={ <Order authorized={user}  />}
          />
          <Route
            path="/joinCompany"
            exact
            element={<Join />}
          />
            <Route
            path="/bikeCollection"
            exact
            element={<BikePage />}
          />
              <Route
            path="/profile"
            exact
            element={<ProfilePage authorized={user} />}
          />
             <Route
            path="/success"
            exact
            element={<Success />}
          />
             <Route
            path="/cancel"
            exact
            element={<Failure />}
          />
          <Route
            path="/myRide"
            exact
            element={<MyRide authorized={user} />}
          />
        <Route
            path="/offers"
            exact
            element={<Offer />}
          />
        <Route
            path="/tariff"
            exact
            element={<Tariff />}
          />
           <Route
            path="/chat"
            exact
            element={<ChatPage authorized={user} />}
          />
        </Routes>
       
      </ErrorBoundary>
    </div>
  );
}

export default User;
