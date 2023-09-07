import FormJoinComponent from "../../Component/User/FormJoinPartner"
import { Fragment,useState } from "react"
function Join() {
  const [form,setForm] = useState(false)
  const handleForm = ()=>{
      setForm(true);
  }
  return (
    <Fragment>
      {!form ? <div>

<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div>
    <button className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={()=>{handleForm()}}>Applay for partner</button>
</div>
  
</div> :<FormJoinComponent/> }
       
    </Fragment>
   
  )
}

export default Join
