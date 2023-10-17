import { useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import{partnerDetails} from '../Redux/storeSlices/PartnerAuth'
import Home from '../Pages/PartnerPage/HomePage'
import Login from '../Pages/PartnerPage/LoginPage'
import BikePage from '../Pages/PartnerPage/BikePage';
import ProfilePage from '../Pages/PartnerPage/ProfilePage'
import BookingPage from '../Pages/PartnerPage/BookingPage';
import PortFolio from '../Pages/PartnerPage/PortFolioPage';
import TariffPage from '../Pages/PartnerPage/TariffPage';
import ChatPartnerPage from '../Pages/PartnerPage/ChatPartnerPage'
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
                 <Route path='/profile' element={partner ? <ProfilePage/> : <Login/>}/>
                 <Route path='/booking' element={partner ? <BookingPage /> : <Login/>}/>
                 <Route path='/portfolio' element={partner ? <PortFolio /> : <Login/>}/>
                 <Route path='/tariff' element={partner ? <TariffPage /> : <Login/>}/>
                 <Route path='/chat' element={partner ? <ChatPartnerPage /> : <Login/>}/>
       </Routes>
    </div>
    </div>
  )
}

export default Partner
