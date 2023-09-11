import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminDetails } from '../Redux/storeSlices/AdminAuth';
import Home from '../Pages/Admin/HomePage';
import Login from '../Pages/Admin/LoginPage';

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.AdminAuth.adminToken);

  useEffect(() => {
    const storedInformation = localStorage.getItem('adminInformation');
    if (storedInformation) {
      try {
        const information = JSON.parse(storedInformation);
        if (information.roll === 'admin') {
          dispatch(adminDetails(information));
        }
      } catch (error) {
        console.error('Error parsing adminInformation from localStorage:', error);
      }
    } else {
      console.log('No data found in localStorage for key "adminInformation"');
    }
  }, [dispatch]);


  // no changes happened when the app is running 
  
  useEffect(() => {
    navigate(admin ? '/admin' : '/admin/login');
  }, [admin, navigate]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={admin ? <Home /> : <Login />}
        />
        <Route
          path="/login"
          element={admin ? <Home /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default Admin;
