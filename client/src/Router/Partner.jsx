import { useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import{partnerDetails} from '../Redux/storeSlices/PartnerAuth'
import Home from '../Pages/PartnerPage/HomePage'
import Login from '../Pages/PartnerPage/LoginPage'
import BikePage from '../Pages/PartnerPage/BikePage';
function Partner() {
  const storedInformation = localStorage.getItem('partnerInformation');
  const dispatch = useDispatch()


    useEffect(()=>{
      if (storedInformation) {
        const information = JSON.parse(storedInformation);
            if(information.roll==="partner"){
              dispatch(partnerDetails(information))
            }
        } else {
            console.log('No data found in localStorage for key "information"');
        }
  
    },[])
    
    const partner = useSelector((state) => {
      return state.partnerAuth.PartnerToken
    });
  
  return (
    <div>
         <div>
        <Routes>
                 <Route path='/' element={partner ? <Home/> : <Login/>}/>
                 <Route path='/login' element={partner ?<Home/> : <Login/>}/>
                 <Route path='/bikeManage' element={partner ? <BikePage/> : <Login/>}/>
       </Routes>
    </div>
    </div>
  )
}

export default Partner
