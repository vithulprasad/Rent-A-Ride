import {Fragment} from 'react'
import Navbar from '../../Component/User/Navbar'
import  Footer  from '../../Component/User/Footer'
import JoinComponent from '../../Component/User/JoinComponent'


function Join(){
  return (
   <Fragment>
       <Navbar />
       <JoinComponent/>
        <Footer/>
   </Fragment>
  )
}

export default Join
