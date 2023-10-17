
import { useEffect, useState } from 'react';
import {listBike} from '../../Apis/connections/partner'
import toast from 'react-hot-toast';
function Tariff() {
    const [bike, setBike] = useState([]);
    useEffect(() => {
        const listedBike=async()=>{
    
       await listBike().then((res) => {
            if (res.data.success) {
              setBike(res.data.bikes);
        
            } else {
              toast.error("Something went wrong");
            }
          });
        }
        listedBike()
      }, []);
  return (
    <div className="w-full h-[650px] flex justify-center items-center ">
       <div className="w-2/3 h-full flex justify-around grid grid-cols-3 overflow-y-auto p-5">
        {bike.length > 0 ?
           bike.map((data,key)=>(
         <div key={key} className="w-[300px] h-[400px] mb-6 p-5 border bg-blue-100">
            <div className="w-full h-1/2 " style={{backgroundImage:`url(${data.image[0]})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
              
            </div>
            <div className="w-full h-1/2 border ">
               <div className='flex justify-around font-mono font-bold'><span>{data.name}</span><span>{data.BrandName}</span></div>
             
               <div>rent per Day:<span className='font-mono font-bold bg-yellow-300'><i className="icon  rupee sign "></i>{data.rentPerHour}</span></div>
               <div>Category:<span className='font-mono font-bold'>{data.NormalCategory}</span></div>
               <div>plateNumber:<span className='font-mono font-bold'>{data.PlateNumber}</span></div>
               <div>Date started:<span className='font-mono font-bold'>{data.date}</span></div>
               <div className='flex justify-around'>
                    <div>Available:<span className='font-mono font-bold bg-blue-400'>{data.available==true ?"yes":"no"}</span></div>
                    <div>booked :<span className='font-mono font-bold bg-green-400'>{data.isBooked == true ? "yes" : "no" }</span></div>
               </div>
               
               <div>Request Status:<span className='font-mono font-bold'>{data.requestStatus}</span></div>
             
               <div>district now:<span className='font-mono font-bold'>{data.district}</span></div>
            </div>
          </div>
           ))
          
        :null}
       </div>
    </div>
  )
}

export default Tariff
