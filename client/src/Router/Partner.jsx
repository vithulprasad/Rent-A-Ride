import {Routes,Route} from 'react-router-dom';
import Home from '../Pages/PartnerPage/HomePage'
import Login from '../Pages/PartnerPage/LoginPage'
function Partner() {
  return (
    <div>
         <div>
        <Routes>
                 <Route path='/' element={<Home/>}/>
                 <Route path='/login' element={<Login/>}/>
       </Routes>
    </div>
    </div>
  )
}

export default Partner
