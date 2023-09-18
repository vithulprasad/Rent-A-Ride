import {useSelector} from "react-redux";
import {useEffect,useState}  from "react"
import { useNavigate } from "react-router-dom";
import App from "./ANT/popup";
import axios from "axios";
import { userApi } from "../../Apis/api";
// import toast from "react-hot-toast";


function Navbar() {
   const [user,setUser] = useState({name:"",find:false})
   const [data,setData] = useState(false)
   const navigate = useNavigate()
   const users = useSelector((state) => {
    return state?.userAuth
  });
 const name = users.user
  useEffect(()=>{
    if(users.roll==="client"){
      setUser({name:users.user,find:true})
    }
    axios.get(`${userApi}navDetails?data=${encodeURIComponent(users.token)}`).then((res)=>{
      if(res.data.success===true){
        if(res.data.userData===true){
          setData(true)
        }else{
          setData(false)
        }
        console.log(data);
      }else{
        setData(false)
      }
    })
  },[name,data])
console.log(data,'this is the user details');
  const home = () =>{
    navigate('/')
  }
  const joinUs = ()=>{
    console.log("data----");
    navigate('/joinCompany')
  }
   
  // ############################################################### function end #############################################################
  return (
    <div className='h-20  w-full bg-white border border-black' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
    <div className='flex justify-between'>
        <div className='w-16 h-16 ml-10 mt-2 rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage:'url("https://i.pinimg.com/564x/07/a9/9e/07a99eab4d4f41204937a4692b89bd10.jpg")',backgroundPosition: 'center', backgroundSize: '150px',boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
      
        </div>
        <div className='p-3.5 flex justify-between'>
        <button className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50"onClick={home}>Home</button> 
        <button className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50"onClick={()=>{navigate('/bikeCollection')}}>bikes</button> 
        {data ?<></>:
        <button onClick={joinUs} className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">join Us</button> 

        }
        <button className="p-1 w-20 ml-2 border border-transparent rounded hover:bg-gray-50">Offers</button> 
        <button className="p-1 w-20 border border-transparent rounded hover:bg-gray-50">tariff</button> 
        
       
          <App data={user} />
        </div>
    </div>
  </div>
  )
}

export default Navbar
