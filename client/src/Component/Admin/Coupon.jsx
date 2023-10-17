import { Fragment, useState } from "react"
import AddCoupon from "./AddCoupon"
import CouponList from "./CouponList"
function Coupon() {
    const [add,setAdd] = useState(false)
  return (
    <Fragment>
          <button className="w-[150px] h-10 mb-10 bg-red-200 rounded  shadow" onClick={()=>{add===false?setAdd(true):setAdd(false)}}>{add===false ?<h1>Add Coupon  <i className= "icon large  arrow alternate circle right"></i></h1> :<h1> <i className="icon large arrow alternate circle left"></i>Coupon List</h1>}</button>
          <div className="w-full h-[700px] ">
          {add===true ?<AddCoupon/> :<CouponList/> }
          </div>
       
        
    </Fragment>
       
       
    
  )
}

export default Coupon
