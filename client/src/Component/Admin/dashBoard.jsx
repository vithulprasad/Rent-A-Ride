import App from '../Admin/charts/App'
import App2 from '../Admin/charts/App2'
import {dashboardData} from '../../Apis/connections/admin'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
function DashBoard() {
    const [values,setValues] =useState(0)
    const [values1,setValues1] =useState(0)
    const [values2,setValues2] =useState(0)
    const [values3,setValues3] =useState(0)

   useEffect(()=>{
    dashboardData().then((val)=>{
        if(val.data.success ===true){
            setValues(val.data.user)
            setValues1(val.data.partners)
            setValues2(val.data.bookings)
            setValues3(val.data.complete_transaction)
        }else{
            toast.error("something went wrong")
        }
    })
    setValues()
   },[])
  return (
    <div className='w-full h-[700px] overflow-y-scroll'>
        <div className='w-full h-[400px] flex justify-around'>
            
            <App/>
            <App2/>
        </div>
        <div className='w-full h-20  flex justify-around font-mono font-bold pt-3' >
            <div className=' pt-5 w-[200px] h-full border border-black text-center'>
                <span>Users:</span>
                <span>{values}</span>
            </div>
            <div className='pt-5 w-[200px] h-full border border-black text-center'>
                <span>partners:</span>
                <span>{values1}</span>
            </div>
            <div className='w-[200px] pt-5 h-full border border-black text-center'>
                <span>total booking:</span>
                <span>{values2}</span>
            </div>
            <div className='w-[250px] pt-5 h-full border border-black text-center'>
                 <span>total transaction:</span>
                <span>{values3}</span>
            </div>
        </div>
    </div>
  )
}

export default DashBoard

