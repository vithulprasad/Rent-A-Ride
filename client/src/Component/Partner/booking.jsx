import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {partnerBookings,completeBooking} from '../../Apis/connections/partner'
import{setBookingList,preBooking,ongoing,cancel,complete} from '../../Redux/storeSlices/partnerBooking'
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from 'antd';
import Loading from '../Loading/loading'

function Booking() {
    const [loading,setLoading] = useState(false)
    const [activeButton, setActiveButton] = useState('running');
    const [booking,setBooking] = useState([])
    const [modal2Open, setModal2Open] = useState(false);
    const [license1,setLicense1] = useState("")
    const [license2,setLicense2] = useState("")
    const [identity1,setIdentity1] = useState("")
    const [identity2,setIdentity2] = useState("")
    const [refresh,setRefresh] = useState(true)

   const dispatch = useDispatch()
    useEffect(()=>{
        setLoading(true)
       partnerBookings()
       .then((res)=>{
        if(res.data.success===true){
       
            console.log(res.data.data,'this is the order data');
            dispatch(setBookingList(res.data.data))
            dispatch(ongoing())
            const data = res.data.data
            setBooking(data)
            setLoading(false)
        }else{
            toast.error("something went wrong")
            setLoading(false)
        }
       })
    },[refresh])

    const bookingDetails = useSelector((value)=>{return value.partnerBooking})
    console.log(bookingDetails,'use selsectier');
    const handleColors = (value)=>{
        dispatch(setBookingList(booking))
        setActiveButton(value)
        if(value =="running"){
            dispatch(ongoing())
        }else if(value =="pre"){
                dispatch(preBooking()) 
        }else if(value == "complete"){
            dispatch(complete())
        }else{
                dispatch(cancel())
        }
   
    }
    const handleDetailsOfPersonalInfo =(id)=>{
       
        const deteils1 = bookingDetails.find((value)=>{ return value._id==id})
    
        setLicense1(deteils1.userId.license.front)
        setLicense2(deteils1.userId.license.back)
        setIdentity1(deteils1.userId.userInfo.front)
        setIdentity2(deteils1.userId.userInfo.back)
        setModal2Open(true)
    }
 
    const handleComplete =(id)=>{
      toast.success(`${id}`)
      completeBooking(id).then((res)=>{
        if(res.data.success == true){
          
            if(refresh==true){
              setRefresh(false);
            }else{
              setRefresh(true)
            }
        }else{
          toast.error('something went wrong in completing')
        }
      })
    }
  return (
    <div className="w-full h-[700px] p-5">
        <div className="w-full h-full flex">
            <div className="w-[30%] h-full p-10">
                <div className="w-full h-full ">
                    <div className="w-full h-1/2 flex flex-col px-10" >
                        <div className="w-full h-20 flex justify-center items-center font-mono font-bold text-2xl"><h1>Order The Orders</h1></div>
                             <div className={activeButton === "running" ? "w-full h-16  flex justify-center items-center font-mono font-bold border bg-purple-700  shadow-lg text-white" : "w-full h-16  flex justify-center items-center font-mono font-bold border hover:bg-purple-700  hover:shadow-lg hover:text-white"}>
                                <button className="w-full h-full" onClick={() => { handleColors("running") }}>Running Orders</button>
                            </div>
                            <div className={activeButton === "pre" ? "w-full h-16  flex justify-center items-center font-mono font-bold  border bg-sky-500  shadow-lg text-white" : "w-full h-16  flex justify-center items-center font-mono font-bold  border hover:bg-sky-500  hover:shadow-lg hover:text-white"}>
                                <button className="w-full h-full" onClick={() => { handleColors("pre") }}>Pre Orders</button>
                            </div>
                            <div className={activeButton === "complete" ? "w-full h-16  flex justify-center items-center font-mono font-bold border bg-green-700  shadow-lg text-white" : "w-full h-16  flex justify-center items-center font-mono font-bold border hover:bg-green-700  hover:shadow-lg hover:text-white "}>
                                <button className="w-full h-full" onClick={() => { handleColors("complete") }}>Complete Orders</button>
                            </div>
                            <div className={activeButton === "cancel" ? "w-full h-16  flex justify-center items-center font-mono font-bold border bg-red-700  shadow-lg text-white  " : "w-full h-16  flex justify-center items-center font-mono font-bold border hover:bg-red-700  hover:shadow-lg hover:text-white  "}>
                                <button className="w-full h-full" onClick={() => { handleColors("cancel") }}>Canceled Orders</button>
                            </div>
                    </div>
                </div>
            </div>
            {loading==true ?<Loading/> :
            <div className="w-full h-[650px] p-5 overflow-y-auto pb-10">
      {bookingDetails.length > 0 ? (
        bookingDetails.map((data, index) => (
          <div key={index} className="w-full h-[310px] flex border border-black mb-4">
            <div className="w-[20%] h-full ">
              <div className="w-full h-1/2 " style={{backgroundImage:`url(${data.bike.image[0]})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
              <h1 className="font-mono font-bold text-center">profile</h1>
              <div className="w-full h-1/2  flex justify-center"><div className="w-[130px] h-[130px] "style={{backgroundImage:`url(${data.userId.Profile})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}} ></div></div>
            </div>
            <div className="w-[40%] h-full px-3 border border-r-black">
              <div className="w-full h-12 flex justify-center items-center font-mono font-bold text-2xl">
                <div className="w-[50%] h-full"><h1>Bike details</h1></div>
                <div className="w-[50%] h-full  font-bold text-sm">day remaining  : 
                {data.bikeStatus=="canceled" ? null :   <span>
                            {Math.ceil(
                            (new Date(data.dates.endDate)-new Date(Date.now())) /
                                (1000 * 60 * 60 * 24)
                            )}
                        </span>}
                     
                </div>
                
              </div>
              <div className="w-full h-8 font-mono font-bold flex items-center">{data.bike.name}</div>
              <div className="w-full h-8 font-mono font-bold flex items-center">{data.bike.BrandName}</div>
              <div className="w-full h-8 font-mono flex items-center">
                Plate number: <span className="font-bold">{data.bike.PlateNumber}</span>
              </div>
              <div className="w-full h-16 flex px-6 font-mono font-bold">
                <div className="w-[30%] h-full flex justify-center items-center border flex-col">
                  <h1>{new Date(data.dates.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
</h1>
                  <span>{data.dates.startTime}</span>
                </div>
                <div className="h-full w-[30%] flex justify-center items-center">to</div>
                <div className="h-full w-[30%] flex justify-center items-center border flex-col">
                  {new Date(data.dates.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })} <span>{data.dates.endTime}</span>
                </div>
              </div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Location: {data.location}</div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Current status: Bike {data.bikeStatus}</div>
              <div className="w-full h-8 font-mono font-bold flex">
                <div className="pr-3 h-full">
                  Advance: <span className="border bg-green-200">{data.deposit}</span>
                </div>
                <div className="pr-3 h-full">
                  Total: <span className="border bg-green-200">{data.totalAmount}</span>
                </div>
                <div className="h-full">
                  Payment: <span className="border bg-green-200">completed</span>
                </div>
              </div>
              {data.bikeStatus=="complete" ? <div className="w-full h-10 flex justify-center"> <div className="w-[100px] h-full bg-red-200" style={{backgroundImage:"url(https://i.pinimg.com/564x/63/8e/54/638e54a2e5ceb6b189e8380184e6ed65.jpg", backgroundSize:"contain"}}>
                  
              </div> </div>:
              <div className="w-full h-8 flex justify-around">
              {data.bikeStatus=="canceled" ?   <button disabled className=" w-2/3 rounded bg-red-500">Booking Canceled</button> :   <button className=" w-2/3 rounded bg-green-500" onClick={()=>{handleComplete(data._id)}}>click to Complete</button>}
              
                
              </div>
               }
            </div>
            
            <div className="w-[40%] h-full px-3">
              <div className="w-full h-12 flex justify-center items-center font-mono font-bold text-2xl">
                <h1>User Details</h1>
              </div>
              <div className="w-full h-8 font-mono font-bold flex items-center">{data.userId.firstName} {data.userId.lastName}</div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Address: {data.userId.address.district},{data.userId.address.state},{data.userId.address.localArea},{data.userId.address.post},{data.userId.address.pin}</div>
              <div className="w-full h-8 font-mono font-bold flex items-center">{data.userId.phone}</div>
              <div className="w-full flex h-28">
                <div className="w-2/3 h-full ml-3 border pl-3">
                  <div className="w-full h-8 font-mono font-bold flex items-center">
                    Profile: <span className="bg-green-300 rounded">added</span>
                  </div>
                  <div className="w-full h-8 font-mono font-bold flex items-center">
                    Licence front/back: <span className="bg-green-300 rounded">added</span>
                  </div>
                  <div className="w-full h-8 font-mono font-bold flex items-center">
                    Identity front/back: <span className="bg-green-300 rounded">added</span>
                  </div>
                </div>
                <div className="w-1/2 h-full flex justify-center items-center">
                  <div className="w-full h-8 font-mono font-bold flex items-center justify-center">

                    <Button  className="w-2/3 h-12 bg-blue-500 rounded shadow" type="primary" onClick={() => handleDetailsOfPersonalInfo(data._id)  }>
                       Details
                    </Button>
                    <Modal
                        title="Vertically centered modal dialog"
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                    >
                        <div className="w-full">
                            <h1 className="font-mono font-bold">Licence details</h1>
                            <div className="flex">
                                <div className="w-[200px] h-[200px]" style={{backgroundImage:`url(${license1})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
                                <div className="w-[200px] h-[200px]" style={{backgroundImage:`url(${license2})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
                            </div>
                            <h1 className="font-mono font-bold">person identity</h1>
                            <div className="flex ">
                                <div className="w-[200px] h-[200px]" style={{backgroundImage:`url(${identity1})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
                                <div className="w-[200px] h-[200px]" style={{backgroundImage:`url(${identity2})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></div>
                            </div>

                        </div>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Order type: <span>stripe</span></div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Helmet: <span>{data.helmet}</span></div>
              <div className="w-full h-8 font-mono font-bold flex items-center">Coupon: <span className="bg-green-300">{data.couponAdd==false ? "no coupon added": "coupon added"}</span></div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center">
          <div className="w-1/2 h-2/3 bg-slate-400" style={{ backgroundImage: "url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)" }}></div>
        </div>
      )}
    </div>
    }
       
        </div>
    </div>
  )
}

export default Booking
