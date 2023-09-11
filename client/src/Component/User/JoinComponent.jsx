import { Fragment, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import FormJoinComponent from '../../Component/User/ANT/FormJoinPartner';
import { userApi } from '../../Apis/api';

function Join() {
  const [form, setForm] = useState(false);
  const [applayButton, setApplayButton] = useState(true);
  const [email, setEmail] = useState('');
  const [information, setInformation] = useState(true);

  const handleForm = () => {
    if (form) {
      setForm(false);
    } else {
      setForm(true);
    }
  };
  const informatioHandle = ()=>{
    if(information){
        setInformation(false)
    }else{
      setInformation(true)
    }
  }
  const handleFormSubmit = (data) => {
    setForm(false);
    console.log('Entering to the axios from companyRegistration', data);

    axios.post(`${userApi}companyRegistration`, { data: data }).then((res) => {
      if (res.data.success) {
        setEmail(res.data.email);
        setApplayButton(false);
        toast.success(`Successfully registered THANK YOU ${res.data.name}`);
      } else {
        console.log('Something went wrong------');
        toast.error(`This email is already registered or invalid E-mail! -${res.data.name}`);
      }
    });
  };

  return (
    <Fragment>
      {!form ? (
        <div>
          {applayButton ? (
            <div className='flex justify-center'>
            <button
              className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              onClick={handleForm}
            >
              Apply for partner
            </button>
            </div>
          ) : information ? (
            <div className="flex justify-center pb-12 ">
              <div className="mt-20 w-[600px] h-[300px] bg-slate-100 ">
                <div className='flex w-full justify-center mt-10'>
                  <h2 style={{borderBottom:"solid 1px gray "}} className='font-mono '>Registration has been successful</h2>
                </div>
                <div className='flex justify-around mt-4'>
                  <h3 className=' font-mono mt-1'> We will respond to you later </h3>
                  <p className='pr-20'>please cooperate with us</p>
                </div>
                <div className='flex justify-center mt-4'>
                  <h1>Response will be sent to your E-mail:<p className="text-green-500 font-mono font-bold">{email}</p></h1>
                  
                </div>
                <div className='flex justify-center mt-6 border-black' >
                  <button onClick={informatioHandle}  className="bg-green-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">More information</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pb-10 ">
            <div className="mt-20 w-[670px] h-[700px] bg-slate-100 ">
              <div className='flex w-full justify-around mt-10 '>
                <h2 style={{borderBottom:"solid 1px gray "}} className='font-mono '>More information about Registration</h2>
              </div>
              <div className='flex justify-around pl-4 mt-4'>
                <h3 className=' font-mono mt-1'> Thank you for registering as a partner in our platform  Rent-A-Ride, <br /> procedure working as, we will sent you the details of every thing, <br /><br /> the Email and Password and the partner sign up url <br /> please enter the currect url and enter our login page <br /><br />Email will sent you by cheking the entire information <br /> In the platform all your information are securely stored <br /><br /> you want to provide more information to getting the url, provide id and license <br /><br />after that sent information to emil{email}</h3>

              </div>
              <div className='flex justify-center mt-4 '>
                <h1>Response will be sent to your E-mail:<p className="text-green-500 font-mono font-bold">{email}</p></h1>
                
              </div>
              <div className='flex justify-center mt-4' >
              <button  className="bg-amber-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={informatioHandle}> back..</button>
            </div>
            </div>
           
          </div>
            
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center mt-20 pb-20">
          <div style={{ width: '600px',height:"800px" }} className="pt-10 flex justify-center bg-gray-200 pb-10">
            {/* Pass the onFormSubmit callback to FormJoinComponent */}
            <FormJoinComponent onFormSubmit={handleFormSubmit} />
          </div>
          <div>
            <button
              onClick={handleForm}
              className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Join;

