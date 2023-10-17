import { useEffect, useState } from 'react'
import {listCoupons} from '../../Apis/connections/user'
import toast from 'react-hot-toast'

function Offer() {
   const [offers,setOffers] = useState([])

   useEffect(()=>{
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
  return (
    <div className="w-full h-[600px] mb-10">
        <div className="w-full  flex justify-center items-center">
           <h1 className="font-mono font-bold text-2xl">Offers for u</h1>
        </div>
        <div className="w-full h-full grid grid-cols-3 px-28 overflow-y-scroll py-20 font-mono text-white">
  {offers.length > 0 ? (
    offers.map((data, index) => (
      <div
        key={index}
        className="w-[400px] h-[200px] bg-red-100 m-2 p-3"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          boxShadow:
            "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="w-full h-7 m-2 flex justify-center items-center font-mono font-bold text-2xl">
          <h1>{data.heading}</h1>
        </div>
        <div className="w-full h-7 m-2 flex justify-center items-center font-mono font-bold">
          <h1>{data.description}</h1>
        </div>
        <div className="w-full h-7 m-2 flex justify-center items-center font-mono font-bold">
          <h1>Your Code is </h1>
        </div>
        <div className="w-full h-7 m-2 flex justify-center items-center font-mono font-bold ">
          <div className='bg-white w-1/2 flex h-full p-1'>
          <span className="bg-black w-1/2 text-center ">{data.code}</span>
          <button
            onClick={() => {
         
              navigator.clipboard.writeText(data.code);
              toast.success("Coupon code copied to clipboard!");
            }}
            className="w-1/3  p ml-2 text-xs bg-gray-500 text-white rounded hover:bg-blue-600"
          >
            Copy
          </button>
          </div>
       
        </div>
        <div className="w-full h-7 m-2 flex justify-center items-center font-mono font-bold">
          <button className="w-2/3 h-full bg-sky-600 rounded shadow-lg">
            Try Now
          </button>
        </div>
      </div>
    ))
  ) : null}
</div>


    </div>
  )
}

export default Offer
