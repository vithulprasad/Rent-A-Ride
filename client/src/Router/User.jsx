
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types'; // Import PropTypes

import Home from '../Pages/User/HomePage';
import Register from '../Component/User/Register';
import Login from '../Component/User/Login';
import OtpPage from '../Pages/User/OtpPage';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Add prop validation for ErrorFallback component
ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

function User() {
 // Initialize the navigate function

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/otp"
            element={<OtpPage />}
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default User;
