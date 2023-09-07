import {Routes,Route} from 'react-router-dom';
import Home from '../Pages/Admin/HomePage'
import Login from '../Pages/Admin/LoginPage';

function Admin() {
  return (
    <div>
        <Routes>
                 <Route path='/' element={<Home/>}/>
                 <Route path='/login' element={<Login/>}/>
                 
       </Routes>
    </div>
  )
}

export default Admin
