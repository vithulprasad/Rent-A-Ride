import { Fragment,useEffect,useRef,useState } from "react"
import { Select,Button, Modal  } from 'antd';
import './ANT/ANT.css'
import {  useSelector } from "react-redux";
import {orderPageDetails} from '../../Apis/connections/user'
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import {checkout} from '../../Apis/connections/user'
import { useNavigate } from "react-router-dom";
import { applyCoupon } from "../../Apis/connections/user";
import {listCoupons} from '../../Apis/connections/user'

function Order() {
   const navigate = useNavigate()
    const [details,setDetails] = useState({})
    const [helmet,setHelmet] = useState(0)
    const [coupon,setCoupon] =useState(0)
    const [couponId,setCouponId] = useState(0)
   const [button,setButton] = useState(true)
   const [button1,setButton1] = useState(true)
   const [offers,setOffers] = useState([])
    const values = useSelector((state)=>{
        return state?.dateAndTime
    })
 
    useEffect(()=>{
      
        orderPageDetails(values.bike).then((res)=>{
            if(res.data.success===true){
                const data = res.data.data
                setDetails(data)
            }else{
                toast.error("something went wrong")
                navigate('/bikeCollection')
            }
        })
        listCoupons().then((res)=>{
            if(res.data.success === true){
              setOffers(res.data.offers)
            }else{
              toast.error('something went wrong')
            }
           })
           .catch((err)=>{
            toast.error(`${err.message}`)
           })
    },[])

 
    //-----------------------------------payment integration---------------------------------------------------//
    const payment = async () => {
        const stripe = await loadStripe('pk_test_51NvIjDSDGouAG7doarAb3dqKSeYWAeALZ6LtF4Ktc3xfpLQ9UKD4qaL8ha2vN6fMEzpH4BI37BXP5uuJyQVLOqSQ0049ZYWRqM');
        const body = {
            data: values,
            helmet:helmet,
            coupon:coupon,
            couponId:couponId
       
        };
        try {
            const session = await checkout(body);
            console.log(session);
            if(session.data.success===true && session.data.userDetails==="true"){
                setButton1(false)
                const result = await stripe.redirectToCheckout({
                    sessionId: session.data.id 
                });
                if (!result.error) {
                    toast.success("payment was successfully completed");
                }else{
                    toast.error(`${result.error.message}`);
                    setButton1(true)
                }
            }else if(session.data.userDetails==="no_profile"){
                toast.error("please complete profile verifications")
            }else if(session.data.userDetails==="no_address"){
                toast.error("please add address")
            }else if(session.data.userDetails==="no_license"){
                toast.error("please add license proof")
            }else if(session.data.userDetails==="no_personalInfo"){
                toast.error("please add personal proof")
            }else{
                toast.error('something went wrong in payment')
            }
         
        } catch (error) {
            console.error(error); // Handle any potential errors
            toast.error('An error occurred during payment.');
        }
    };
    const handleChange = (value) => {
        setHelmet(value)
      };
      const couponRef = useRef()
    const  handleSubmit = (e)=>{
        e.preventDefault()
        console.log(values);
                const data={
                    value:values,
                    code:couponRef.current.value
                }
        applyCoupon(data).then((res)=>{
            if(res.data.success===true){
                const values = res.data.data.value
                const coupon = res.data.data.couponId
                setCouponId(coupon)
                setCoupon(values)
               toast.success("coupon applyed successfully")
               setButton(false)
            }else{
                 if(res.data.message=="internal server error"){
                      toast.error("internal server error")

                 }else if(res.data.message=="invalid coupon code"){
                    toast.error("invalid coupon code")
                 }else if(res.data.message=="cannot apply coupon on this"){
                    toast.error("cannot apply coupon on this")
                 }else if(res.data.message=="coupon is already used by the user"){
                    toast.error("coupon is already used by the user")
                 }else{
                    toast.error("coupon as expired")
                 }

            }
        })
        .catch((err)=>{
            toast.error(`${err.message}`)
        })
    }
const cancelCoupon =()=>{
    setButton(true)
    setCouponId(0)
    setCoupon(0)
}
const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};



  return (
 <Fragment>
<div className="w-full h-16  text-center font-mono text-3xl flex items-center justify-center" >Booking the Bike</div>
     <div className="w-full h-[600px] flex">
         <div className="w-[70%] h-[75%] p-6 flex border">
        
             <div className="w-[100%] h-full flex  p-5 border border-blue-500 "style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                 
             <div className="w-[40%]">
                 <div className="w-[100%] h-[70%] flex justify-end items-center">
                   <div className="w-[100%] h-full " style={{backgroundImage:`url(${details.image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}></div>
                </div>
                <div className="w-[100%] h-[30%] flex justify-center items-center">
                  <h1 className="">sub images------------</h1>
                </div>
             </div>
                  <div className="w-[60%] h-full border border-black p-4">
                   
                     <div className="w-full h-6 flex ">
                         <div  className="font-mono  text-2xl text-center w-full"> <span>{details.name}</span></div>
                     </div>
                     <div className="w-full h-6 font-mono font-bold border-b">
                        <div>{details.companyName}</div>
                     </div>
                     <div className="w-full h-14 flex justify-around font-mono border-b">
                             <div>
                                <div><span className="font-bold">{values.startDate}</span></div>
                                <div><span className="font-bold">{values.startTime}</span></div>
                            </div>
                            <div className="h-full flex items-center">
                                <h1>TO</h1>
                            </div>
                            <div className="font-bold">
                                <div> <span>{values.endDate}</span></div>
                                <div><span>{values.endTime}</span></div>
                            </div>
                     </div>
                     <div className="w-full h-10 flex flex-col font-mono border-b">
                        <div className="h-4" ><h1>location:</h1></div>
                        <div className="h-4"><span className="font-bold">{values.location},{details ? details?.partnerId?.address[0]?.district : null}</span></div>
                     </div>    
                     <div className="w-full h-6 flex justify-between font-mono ">
                        <div><h1>bike cc </h1></div>
                        <div> <span className="font-bold">CC- {details.cc}</span></div>
                     </div>
                  
                     <div className="w-full h-6 flex justify-between font-mono border-b">
                        <div><h1>plate Number</h1></div>
                        <div><span className="font-bold">{details.PlateNumber}</span></div>
                     </div>
                     <div className="w-full h-6 flex justify-between font-mono">
                        <div><h1>Rent per Day:</h1></div>
                        <div><span className="font-bold"><i className="icon  rupee sign "></i>{values.rent}</span></div>
                     </div>
                     <div className="w-full h-6 flex justify-between font-mono ">
                        <div><h1>coupon Amount</h1></div>
                        <div><span className="font-bold"><i className="icon  rupee sign "></i>{coupon}</span></div>
                     </div>
                     <div className="w-full h-6 flex justify-between font-mono border-b ">
                        <div><h1>Total</h1></div>
                        <div><span className="font-bold"><i className="icon  rupee sign "></i>{values.total-coupon}</span></div>
                     </div>
                     
                     <div className="w-full h-6 flex justify-between font-mono pt-2">
                        <div><h1>select Number Of Helmet (?)</h1></div>
                        <div>  
                        <Select
                            defaultValue="0"
                            className="custom-select" // Add a custom class name here
                            style={{height:"30px"}}
                            dropdownStyle={{
                                height: '10', // Set the height of the dropdown menu to 'auto' to fit content
                            }}
                            size="small"
                            placement='topLeft'
                            onChange={handleChange}
                            options={[
                                {
                                    value: 0,
                                    label: '0',
                                },
                                {
                                    value: 1,
                                    label: '1',
                                },
                                {
                                    value: 2,
                                    label: '2',
                                }
                               
                            ]}
                        />
                    </div>
                     </div>
                     <div className="w-[70%] h-10 flex flex-col font-mono pt-6">
                        <form className="w-full flex" onSubmit={handleSubmit}>
                        <div className="w-[70%]"><input className="h-8 w-[100%] border border-black" type="text"placeholder="Apply Coupon" ref={couponRef} name="" id="" /></div>
                        {button ? <div className="w-[30%]"><button className=" font-mono  text-lg btn w-[100%] h-8 bg-slate-250 rounded bg-green-500" type="submit" >Apply</button></div> :
                         <div className="w-[30%]"><h1 className="w-[100%] h-8 bg-red-500 rounded font-mono text-center pt-1 font-bold shadow " onClick={()=>{cancelCoupon()}}>Cancel</h1></div> }
                       
                        </form>
                        <Button className="w-[80px] bg-gray-400 mt-2" type="primary" onClick={showModal}>
                            Coupons
                            </Button>
                            <Modal title="Available coupons" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            {offers.length > 0 ? (
                                offers.map((data, index) => (
                                <div key={index}>
                                    <p>available code: {data.code} , offer: {data.percentage} % off</p>
                                </div>
                                ))
                            ) : null}
                            </Modal>

                     </div>
                  </div>
             </div>
         </div>
         <div className="w-[30%] h-[90%]  p-6">
            <div className="w-full h-full p-6 border border-blue-500">
                <div className="w-full h-full  border p-4 border-black" style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                   <div className="w-full h-10 font-mono font-bold text-2xl flex justify-center items-center py-11 ">
                     <h1 className="border-b">Check out</h1>
                   </div>
                   <div className="w-full h-12 flex justify-around ">
                     <div className="w-[50%] flex justify-end"><h1 className="font-mono ">Bike Booking fee</h1></div>
                     <div className="font-mono font-bold flex justify-center w-[50%]"><i className="icon  rupee sign "></i>{values.total-coupon}</div>
                   </div>
                   <div className="w-full h-12 flex justify-around">
                     <div className="w-[50%] flex justify-end"><h1 className="font-mono ">CGST(14%)</h1></div>
                     <div className="font-mono font-bold flex justify-center w-[50%]"><i className="icon  rupee sign "></i>50</div>
                   </div>
                   <div className="w-full h-12 flex justify-around">
                     <div className="w-[50%] flex justify-end"><h1 className="font-mono ">Helmet Amount</h1></div>
                     <div className="font-mono font-bold flex justify-center w-[50%]"><i className="icon  rupee sign "></i>{helmet == 0 ? 0 : null}{helmet == 1 ? 50 : null}{helmet == 2 ? 100 : null}</div>
                   </div>
                   <div className="w-full h-12 flex justify-around">
                     <div className="w-[50%] flex justify-end"><h1 className="font-mono fd">Refundable deposit</h1></div>
                     <div className="font-mono font-bold flex justify-center w-[50%]"><i className="icon  rupee sign "></i>{values.total-50}</div>
                   </div>
                   <div className="w-full h-12 flex justify-around">
                     <div className="w-[50%] flex justify-end"><h1 className="font-mono ">Total Calculated</h1></div>
                     <div className="font-mono font-bold flex justify-center w-[50%]"><i className="icon  rupee sign "></i>{helmet== 0 ? values.total+values.total-coupon:null }{helmet== 1 ? values.total+values.total+50-coupon:null }{helmet== 2 ? values.total+values.total+100-coupon:null }</div>
                   </div>
                   <div className="px-9 h-12">
                    {button1 ?<button className=" font-mono  text-lg btn w-[100%] h-10 bg-slate-250 rounded bg-green-500" onClick={payment}>Make payment</button>:<button className=" font-mono  text-lg btn w-[100%] h-10 bg-slate-250 rounded bg-green-200" disabled>...Processing </button> }
                   </div>
                </div>
            </div>
         </div>
     </div>
 </Fragment>
  )
}

export default Order
