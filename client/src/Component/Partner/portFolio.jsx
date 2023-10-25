import {partnerBookings} from '../../Apis/connections/partner'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function PortFolio() {
   const [protfolio,setPortfolio] = useState({
    completedCount:0,
    cancelCount:0,
    helmetCount:0,
    currentProfit:0,
    runningProfit:0,
    helmetProfit:0,
    total:0
   })

  useEffect(()=>{
  
   partnerBookings()
   .then((res)=>{
    if(res.data.success===true){
        toast.success("data was fetched successfully")
        console.log(res.data.data,'this is the order data');
        const data = res.data.data
         
        console.log(data);
        const completeCount = data.filter((value)=>{ return value.bikeStatus =="complete"})
        const running = data.filter((value)=>{ return value.bikeStatus=="booked"})
        const cancelOrder = data.filter((value)=>{ return value.bikeStatus == "canceled"})
        const helmetCount = completeCount.reduce((total, curr) => total + curr.helmet, 0);
        const currentProfit = completeCount.reduce((total,curr) => total + curr.totalAmount, 0) ?? 0
        const runningProfit = running.reduce((total,curr) => {total + curr.totalAmount},0) ?? 0
        const helmetProfit = completeCount.reduce((total,curr) => total + curr.helmet,0) ?? 0
        const total = currentProfit+helmetProfit*50+runningProfit ?? 0
        const advance1 = completeCount.reduce((total, curr) => total + curr.deposit, 0);
        const advance2 = running.reduce((total, curr) => total + curr.deposit, 0);
        const advance = advance1+advance2
        console.log(completeCount.length,'-----',running.length,'-----',cancelOrder.length,'-----',helmetCount,'-----',currentProfit,'-----',runningProfit,'-----',helmetProfit*50,'-----',total);
        setPortfolio({
          completedCount: completeCount.length,
          cancelCount:cancelOrder.length,
          helmetCount:helmetCount,
          currentProfit: currentProfit,
          runningProfit: runningProfit,
          helmetProfit:helmetCount*50,
          total: total,
          totalAdvance:advance
        })

        
    }else{
        toast.error("something went wrong")

    }
   })
},[])
  return (
    <div className="w-full h-[650px] ">
      <div className="w-full h-full flex flex-col items-center font-mono font-bold">
        <div className="w-full h-20 my-10 flex justify-around">
           <div className="w-[150px] h-full bg-blue-300 p-2 shadow rounded">
              <div>completed bookings</div>
              <div>:{protfolio.completedCount}</div>
           </div>
           <div className="w-[150px] h-full bg-blue-300 p-2 shadow rounded">
           <div>canceled bookings</div>
              <div>:{protfolio.cancelCount}</div>
           </div>
           <div className="w-[150px] h-full bg-blue-300 p-2 shadow rounded">
           <div>total helmet count</div>
              <div>:{protfolio.helmetCount}</div>
           </div>
           <div className="w-[150px] h-full bg-blue-300 p-2 shadow rounded">
           <div>total advace count</div>
              <div>:{protfolio.totalAdvance}</div>
           </div>
        </div>
        <div className="w-1/2  h-1/2  shadow p-4 border">
            <div className="w-full h-14 font-bold font-mono text-3xl flex justify-center items-center"><h1>Fund And Bookings</h1></div>
            <div className="flex w-full h-14 justify-around items-center">
            <div className="w-1/2 h-full flex justify-center items-center">          <h1>Current Profit:</h1></div>
            <div className="w-1/2 h-full flex justify-center items-center"><span><i className="icon  rupee sign "></i>{protfolio.currentProfit}</span></div>
     
               
            </div>
            <div className="flex w-full h-14 justify-around items-center">
            <div className="w-1/2 h-full flex justify-center items-center"><h1>current Running Profit</h1></div>
            <div className="w-1/2 h-full flex justify-center items-center"><span><i className="icon  rupee sign "></i>{protfolio.runningProfit}</span></div>
               
               
            </div>
            <div className="flex w-full h-14 justify-around items-center">
            <div className="w-1/2 h-full flex justify-center items-center">    <h1>Current helmet Ernings:</h1> </div>
            <div className="w-1/2 h-full flex justify-center items-center"><span><i className="icon  rupee sign "></i>{protfolio.helmetProfit}</span></div>
      
          
              
            </div>
            <div className="flex w-full h-14 justify-around items-center text-2xl" >
              <div className="w-1/2 h-full flex justify-center items-center"><h1>Total calculated Amount</h1></div> 
              <div className="w-1/2 h-full flex justify-center items-center "><span><i className="icon  rupee sign "></i>{protfolio.total }-{protfolio.totalAdvance}</span></div>
          
          </div>
          <div className="w-full h-12 flex justify-center items-center">    <button className="w-2/3 h-2/3 shadow rounded bg-green-400">Withdraw</button></div>
        </div>
      </div>
    </div>
  )
}

export default PortFolio
