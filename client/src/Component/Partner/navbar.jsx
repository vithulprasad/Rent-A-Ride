
import { useNavigate } from "react-router-dom";
import App from "./ANT/popup";
import toast from "react-hot-toast";




function Navbar() {
  
   const navigate = useNavigate()



const home = () =>{
  navigate('/partner')
}
  
const bikeHandler=()=>{
  try {
    toast.success("entering to the bike page");
    navigate('/partner/bikeManage')
  } catch (error) {
    toast.error('something went wrong')
  }
}
const productHandler=()=>{
  try {
    toast.success("entering to the product page");
  } catch (error) {
    toast.error('something went wrong')
  }
}
const bookingHandler = ()=>{
  try {
    toast.success("entering to the booking page");
  } catch (error) {
    toast.error('something went wrong')
    
  }
}
const offersHandler=()=>{
  try {
    toast.success("entering to the offers page");
    
  } catch (error) {
    toast.error('something went wrong')
    
  }
}
const tariffHandler = ()=>{
  try {
    toast.success("entering to the tariff page");
    
  } catch (error) {
    toast.error('something went wrong')
    
  }
}
  // ############################################################### function end #############################################################
  return (
    <div className='h-20  w-full bg-cyan-500' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
    <div className='flex justify-between'>
        <div className='w-16 h-16 ml-10 mt-2 rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage:'url("https://i.pinimg.com/564x/07/a9/9e/07a99eab4d4f41204937a4692b89bd10.jpg")',backgroundPosition: 'center', backgroundSize: '150px',boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
      
        </div>
        <div className='p-3.5 flex justify-between'>
        <button onClick={home} className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">Home</button> 
        <button onClick={()=>bikeHandler()} className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50" >bikes</button> 
        <button onClick={()=>{bookingHandler()}} className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">bookings</button> 
        <button onClick={()=>{productHandler()}} className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">Product</button> 
        <button onClick={()=>{offersHandler()}} className="p-1 w-20 ml-2 border border-transparent rounded hover:bg-gray-50">Offers</button> 
        <button onClick={()=>{tariffHandler()}} className="p-1 w-20 border border-transparent rounded hover:bg-gray-50">tariff</button> 
          <App />
        </div>
    </div>
  </div>
  )
}

export default Navbar
