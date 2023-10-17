import { useEffect, useState } from 'react';
import { paymentDetails } from '../../Apis/connections/user';
import Loading from '../Loading/loading';
import { cancelBooking } from '../../Apis/connections/user';
import toast from 'react-hot-toast';
import {  Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import{setBookingList,preBooking,ongoing,cancel,complete} from '../../Redux/storeSlices/bookingSlice'
import { useNavigate } from 'react-router-dom';
function MyRide() {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState([]);
  const [dates,setDates] = useState();
  const [refresh,setRefresh] = useState(true)
  const [single,setSingle] = useState({image:""})
  const [open, setOpen] = useState(false);
   const dispatch = useDispatch()
const navigate =useNavigate()

  useEffect(() => {
    setLoading(true);
    paymentDetails()
      .then((res) => {
        if (res.data.success === true) {
          const data = res.data.data;
          setBooking(data);
          setLoading(false);
          setDates(Date.now())
          dispatch(setBookingList(data))
       
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred during the request.');
      });
  }, [refresh]);
     
 const bookingDatas = useSelector((value)=>{
  return value.booking
 })

 
  const HandleOrder = (value)=>{
    dispatch(setBookingList(booking))
   if(value == "perOrder"){
       dispatch(preBooking())
   }else if(value == "cancel"){
       dispatch(cancel())
   }else if(value == "complete"){
    dispatch(complete())
   }else{
    dispatch(ongoing())
   }
  }
const handleCancel =(id)=>{
  toast.error(`${id}`)
  cancelBooking(id)
  .then(()=>{
    toast.success("booking is canceled successfully")
    if(refresh==true){
      setRefresh(false)
    }else{
      setRefresh(true)
    }
  })
  .catch((error)=>{
    toast.error(`${error.message}`)
  })
}



const singleDetails = (id)=>{
  toast.success(`${id}`)
  const value = bookingDatas.find((val)=> {return val._id == id})
  setSingle(value)
  setOpen(true)
  console.log(single,'----d-d-d-d-d-d-d-d-d-d-');
}
const onClose = () => {
  setOpen(false);
};


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-[700px] flex justify-center pt-10 overflow-y-auto mb-11">
              
   
          <div className="w-2/3 h-full flex flex-col">
            <div className="w-full h-26 flex flex-col justify-center items-center font-mono font-bold text-2xl pb-10">
              <h1>Bookings</h1>
              <div className='w-full flex justify-around font-light  text-sm pt-3 '><div className='bg-orange-200 rounded shadow animate-pulse animate-infinite' onClick={()=>{HandleOrder("perOrder")}}>PreOrders</div><div className='bg-green-200 rounded shadow animate-pulse animate-infinite' onClick={()=>{HandleOrder("ongoing")}}>Ongoing Order</div><div className='bg-red-300 rounded shadow animate-pulse animate-infinite' onClick={()=>{HandleOrder("cancel")}}>cancel orders</div><div className='bg-green-800 rounded shadow animate-pulse animate-infinite text-white' onClick={()=>{HandleOrder("complete")}}>complete orders</div> <span className='font-mono font-bold'>Total orders:{booking.length}</span></div>
            </div>
            {bookingDatas.length > 0 ? (
              bookingDatas.map((data, index) => (
                data.bikeStatus == "canceled" ? (
                  <div
                  key={index}
                  className="w-full h-[150px] bg-red-50 flex justify-between font-mono font-bold mt-4 mb-4"
                  style={{
                    boxShadow:
                      "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="h-full w-14 flex justify-center items-center">
                    <h1>{index + 1}</h1>
                  </div>
                  <div className="w-[300px] h-full flex flex-col ">
                    <div className="h-[80%] w-full pt-5 ">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            `url(${data.image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                        }}
                      ></div>
                    </div>
                    <div className="h-[20%] w-full flex justify-center items-center ">
                      {data.bikeName}
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Pick up date</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center pb-12">
                    {new Date(data.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Deposit</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center  pb-12">
                      <span><i className="icon  rupee sign "></i>{data.deposit}</span>
                    </div>
                  </div>
                  <div className="w-[250px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Subscription expiry</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center  pb-12">
                      <span>{new Date(data.dates.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="w-[250px] h-[100%] flex flex-col py-12">
                    <div className="h-[50%] w-full flex justify-center items-center pt-10 ">
                      <button onClick={()=>{singleDetails(data._id)}} className="w-32 h-9 bg-yellow-300 rounded shadow transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100">
                        Details
                      </button>
                     {
                      single.dates ? 
                      <Drawer
                        title="Purchase Details"
                        placement="right"
                        onClose={onClose}
                        open={open}
                        width={500}
                       
                      >                       
                      <p className='w-full h-[300px] bg-slate-400 p-6' style={{backgroundImage:`url(${single.image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>.</p>
                      <p className='w-full h-9 flex justify-around items-center my-2 '>Bike name :<span className='font-mono font-bold'>{single.bikeName}</span></p>
                      <p className='w-full h-9 flex justify-around items-center my-2 '>booking status :<span className='font-mono font-bold'>{single.bikeStatus}</span></p>
                     
                      <div className='w-full h-16 flex justify-around font-mono font-bold'>
                  
                         <div>
                            <h1>{new Date(single.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</h1>
                             <span>{single.dates.startTime}</span>
                         </div>
                         <div>
                               <div><h1>To</h1></div>
                         </div>
                         <div>
                            <h1>{new Date(single.dates.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</h1>
                            <h1>{single.dates.endTime}</h1>
                         </div>
                       
                      </div>
                      <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Purchase Date</h1>
                            <h1 className='font-bold font-mono'>{new Date(single.purchaseDate).toLocaleDateString()}</h1>
                         </div>
                         <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Deposit Amount</h1>
                            <h1 className='font-bold font-mono'>{single.deposit}</h1>
                         </div>
                         <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Total Amount</h1>
                            <h1 className='font-bold font-mono'>{single.totalAmount}</h1>
                         </div>
                      <div className='w-full h-12  flex justify-center'>

                        {single.bikeStatus =="booked" ? <div className='w-2/3 h-full bg-orange-300 font-bold font-mono  flex justify-center items-center'>On going booing</div>: null} 
                        {single.bikeStatus =="pending" ? <div className='w-2/3 h-full bg-orange-300 font-bold font-mono  flex justify-center items-center'>On going booing</div>: null} 
                        {single.bikeStatus =="canceled" ? <div className='w-2/3 h-full bg-red-300 font-bold font-mono  flex justify-center items-center'>cancel booking</div> : null} 
                        {single.bikeStatus =="complete" ? <div className='w-2/3 h-full bg-green-300 font-bold font-mono  flex justify-center items-center'>Complete booking</div> : null} 
                       
                     </div>
     
                    </Drawer>: null
                     }
                     
                 
                    </div>
                    <div className="h-[50%] pt-5 w-full flex justify-center items-center ">
                      {data.couponAdd ?    <h1 className="w-20 text-center text-xs font-thin text-green-500">
                        Coupon added
                      </h1>: null}
                   
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1 className="border w-20 text-center rounded shadow bg-red-300">
                        Canceled
                      </h1>
                    </div>
                    <div className="h-[10%] w-full flex justify-center items-center   pt-3">
                      <span><i className="icon  rupee sign "></i>{data.totalAmount}</span>
                    </div>
                
                  </div>
              
                </div>
                ):(
                <div
                  key={index}
                  className="w-full h-[150px] flex justify-between font-mono font-bold mt-4 mb-4"
                  style={{
                    boxShadow:
                      "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="h-full w-14 flex justify-center items-center">
                    <h1>{index + 1}</h1>
                  </div>
                  <div className="w-[300px] h-full flex flex-col ">
                    <div className="h-[80%] w-full pt-5 ">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            `url(${data.image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                        }}
                      ></div>
                    </div>
                    <div className="h-[20%] w-full flex justify-center items-center ">
                      {data.bikeName}
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Pick up date</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center pb-12">
                    {new Date(data.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Deposit</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center  pb-12">
                      <span><i className="icon  rupee sign "></i>{data.deposit}</span>
                    </div>
                  </div>
                  <div className="w-[250px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1>Subscription expiry</h1>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center  pb-12">
                      <span>{new Date(data.dates.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="w-[250px] h-[100%] flex flex-col py-12">
                    <div className="h-[50%] w-full flex justify-center items-center pt-10 ">
                      <button onClick={()=>{singleDetails(data._id)}}  className="w-32 h-9 bg-yellow-300 rounded shadow transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100">
                        Details
                      </button>
                      {
                      single.dates &&  single.bikeStatus != "canceled"  ? 
                      <Drawer
                        title="Purchase Details"
                        placement="right"
                        onClose={onClose}
                        open={open}
                        width={500}
                        
                      >                       
                      <p className='w-full h-[300px] bg-slate-400 p-6' style={{backgroundImage:`url(${single.image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>.</p>
                      <p className='w-full h-9 flex justify-around items-center my-2 '>name:<span className='font-mono font-bold'>{single.bikeName}</span></p>
                      <p className='w-full h-9 flex justify-around items-center my-2 '>Booking :<span className='font-mono font-bold'>{single.bikeStatus}</span></p>
                     
                      <div className='w-full h-16 flex justify-around font-mono font-bold'>
                  
                         <div>
                            <h1>{new Date(single.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</h1>
                             <span>{single.dates.startTime}</span>
                         </div>
                         <div>
                               <div><h1>To</h1></div>
                         </div>
                         <div>
                            <h1>{new Date(single.dates.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</h1>
                            <h1>{single.dates.endTime}</h1>
                         </div>
                       
                      </div>
                      <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Purchase Date</h1>
                            <h1 className='font-bold font-mono'>{new Date(single.purchaseDate).toLocaleDateString()}</h1>
                         </div>
                         <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Deposit Amount</h1>
                            <h1 className='font-bold font-mono'>{single.deposit}</h1>
                         </div>
                         <div className='w-full h-9 flex justify-around items-center my-2 '>
                            <h1>Total Amount</h1>
                            <h1 className='font-bold font-mono'>{single.totalAmount}</h1>
                         </div>
                         <div className='w-full h-12  flex justify-center'>

                        {single.bikeStatus =="booked" ? <div className='w-2/3 h-full bg-orange-300 font-bold font-mono  flex justify-center items-center'>On going booing</div>: null} 
                        {single.bikeStatus =="pending" ? <div className='w-2/3 h-full bg-orange-300 font-bold font-mono  flex justify-center items-center'>On going booing</div>: null} 
                        {single.bikeStatus =="canceled" ? <div className='w-2/3 h-full bg-red-300 font-bold font-mono  flex justify-center items-center'>cancel booking</div> : null} 
                        {single.bikeStatus =="complete" ? <div className='w-2/3 h-full bg-green-300 font-bold font-mono  flex justify-center items-center'>Complete booking</div> : null} 

                        </div>
                   
                    </Drawer>: null
                     }
                    </div>
                    <div className="h-[50%] pt-5 w-full flex justify-center items-center ">
                      {data.couponAdd ?    <h1 className="w-20 text-center text-xs font-thin text-green-500">
                        Coupon added
                      </h1>: null}
                   
                    </div>
                  </div>
                  <div className="w-[200px] h-full flex flex-col ">
                    <div className="h-[50%] w-full flex justify-center items-center pt-12">
                      <h1 className="border w-20 text-center rounded shadow bg-green-300">
                        Paid
                      </h1>
                    </div>
                    <div className="h-[10%] w-full flex justify-center items-center   pt-3">
                      <span><i className="icon  rupee sign "></i>{data.totalAmount}</span>
                    </div>
                    
                    { new Date(dates).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })   < new Date(data.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }) ?  <div className="h-[40%] w-full flex justify-center items-center  pb-6">
                      <button className="h-[30px] w-20 text-center rounded shadow-lg bg-red-500 transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100" onClick={()=>{handleCancel(data._id)}}>
                        Cancel
                      </button>
                    </div> :null }
                  </div>
                  {data.bikeStatus == "booked" ?
                    <div onClick={()=>{ navigate("/chat", { state: { data:data.partner } })}} className='animate-bounce animate-infinite w-14 h-9 pl-1 bg-green-400 rounded shadow-2xl flex items-center justify-center'>
                    <i className="fa-brands fa-whatsapp w-1/2 h-1/2"></i>
                  </div>
                   :null} 
                
                  
                </div>
               
                      )
              ))
            ) : (
             
              <div className="w-full h-full flex justify-center">
                <div className='w-1/2 h-2/3 bg-slate-400' style={{backgroundImage:"url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)"}}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyRide;

