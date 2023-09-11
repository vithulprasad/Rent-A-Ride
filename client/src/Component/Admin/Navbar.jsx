import { useDispatch } from "react-redux";
import {adminLogOut} from '../../Redux/storeSlices/AdminAuth'
function Navbar() { 
  const dispatch =useDispatch()
const handleLogout =()=>{
    localStorage.removeItem('adminInformation')
   dispatch(adminLogOut())
}
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="https://i.pinimg.com/564x/bf/f1/9c/bff19c12821cb2f3bcb45512916e52c9.jpg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Rent-A-Bike
            </span>
          </a>
          <div className="flex items-center">
           
           <button onClick={()=>{handleLogout()}}  className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
              logout
           </button>
           
         
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

