
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loading from "../Loading/loading"
import {tariffPage} from '../../Apis/connections/user'


function Tarif() {
  const [bikeArray, setBikeArray] = useState([]);
 const [loading,setLoading]  =useState(false)
 const [details,setDetails] = useState(false)
 const [ detailsData,setDetailsData] = useState({})
  useEffect(() => {
    setLoading(true)
    tariffPage().then((res) => {
         
      if (res.data.success === true) {
        const bikes = res.data.bikes;
        setBikeArray(bikes);
        setLoading(false)
      } else {
        toast.error("Something went wrong!");
        setLoading(false)
      }
    });
  }, []);

 
 const detailsOne = (data)=>{
  setDetailsData(data)
  console.log(data);
    setDetails(true)
 }
const back = () =>{
  setDetails(false)
}
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-16 w-full flex items-center justify-center ">
        <h1 className="text-2xl font-bold  ">Tariff Page</h1>
      </div>
      {details == false ?   <>
      {loading ? (<Loading/>):(
      <div className="flex justify-center w-full overflow-y-auto p-10 mb-4">
        <div className="grid grid-cols-3 gap-8 ">
          {bikeArray.length > 0 ? (
            bikeArray.map((data, index) => (
              <div className="w-[300px] h-[300px] mb-3 p-3 bg-blue-50" key={index}style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                <div className="w-full  h-[70%] flex justify-center">
                <div className="w-[93%] h-full " style={{backgroundImage:`url(${data.image[0]})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
                </div>
             
                <div className="w-full h-[30%]  font-mono">
                  <div className="w-full h-[30px] flex">
                    <div className="w-[50%] h-full flex justify-center">
                      <h1>Name:</h1>
                    </div>
                    <div className="w-[50%] h-full flex justify-center font-bold">
                      <span>{data.name}</span> {/* Display bike name */}
                    </div>
                  </div>
                  <div className="w-full h-[30px] flex ">
                    <div className="w-[50%] h-full flex justify-center">
                      Rent Per Day
                    </div>
                    <div className="w-[50%] h-full flex justify-center font-bold">
                    <i className="icon  rupee sign "></i> {data.rentPerHour} {/* Display rent per day */}
                    </div>
                  </div>
                  <div className="w-full h-[30px] flex justify-center">
                    <div className="h-full w-full flex justify-center ">
                      <button onClick={()=>{detailsOne(data)}} className="w-2/3 h-full animate-pulse animate-infinite bg-yellow-400 shadow-lg rounded animate-rotate-y animate-once">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) :  
            <div className="w-full h-full flex justify-center">
              <div className='w-1/2 h-2/3 bg-slate-400 ' style={{backgroundImage:"url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)"}}></div>
             </div>}
        </div>
      </div>
)}</>: <One message = {back}  data = {detailsData}/>}
    
    </div>
  );
}

export default Tarif;

  



const One = ({message,data}) =>{

  console.log(data,'dfsdfsdf-----sdfsdf');
  const back = ()=>{
    message()
  }
    return(
      <div className="w-full h-[650px] p-20">
        <div className="w-full h-full flex">

         <div className="w-1/2 h-full overflow-y-scroll border">
          {data.image.map((value,key)=>(
           <div key={key}  className="w-full h-[400px] bg-slate-400" style={{backgroundImage:`url(${value})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}></div>
          ))}
         </div>

         <div className="w-1/2 h-full p-10 border border-blue-500">
            <div className="w-full h-16 flex justify-center items-center font-mono font-bold text-2xl">
              <h1>Bike Details</h1>
            </div>
            <div className="w-full h-10 font-mono  flex justify-around items-center border my-1">
              <h1>Bike name:</h1>
              <h1 className="font-bold ">{data.name}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>Brand Name:</h1>
              <h1 className="font-bold ">{data.BrandName}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>Rent per Day</h1>
              <h1 className="font-bold ">{data.rentPerHour}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>cc of the bike</h1>
              <h1 className="font-bold ">{data.cc}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center  flex justify-around border my-1">
              <h1>Plate number</h1>
              <h1 className="font-bold ">{data.PlateNumber}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>bike added</h1>
              <h1 className="font-bold">{new Date(data.date).toLocaleDateString()}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>Company Name</h1>
              <h1 className="font-bold ">{data.companyName}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>Partner name</h1>
              <h1 className="font-bold "> {data.partnerId.name}</h1>
            </div>
            <div className="w-full h-10 font-mono items-center flex justify-around border my-1">
              <h1>district available</h1>
              <h1 className="font-bold ">{data.district}</h1>
            </div>
         </div>

         
       
       
        </div>
        <div className="w-full h-10 flex justify-end">
          <button className="w-[150px] h-10 border bg-blue-300 rounded shadow" onClick={back}>Back to Tariff</button>
        </div>
      </div>
    )
}