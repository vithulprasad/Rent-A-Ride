import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { userApi } from "../../Apis/api";
function Register() {
 

  //------------------------------------------------------ FOR HANDLING EYE VISIBILITY------------------------------------//
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [button,setButton]= useState(true)
  const [matchPassword,setMatchPassword] = useState("");
  const {register, handleSubmit,formState: { errors },} = useForm();
  const navigate = useNavigate()


  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
    
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1((prevState) => !prevState);
  };
  //-------------------------------Form Data is submitted to backend  otp and email verify-----------------------//
  const onSubmit = (data) => {
    if(data.confirmPassword===data.password){
      setMatchPassword("")
      setButton(false);
        axios.get(`${userApi}otpGenerate?data=${encodeURIComponent(data.email)}`).then((response)=>{
          console.log("response id in register page:---",response.data);
           if(response.data.success==true){
            navigate('/otp',{state:{data}})
           }else{
            setMatchPassword("email is already in use")
            setButton(true)
           }
        })
      setTimeout(()=>{
        setMatchPassword("")
      },3000)
    }else{
      setMatchPassword("password is not matching")
    }
  };
  const isNoSpaces = (value) => !/\s/.test(value);
  const isNoSpaces1 = (value) => !/\s/.test(value);




  // ###########################################################end function #########################################################################

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div
        style={{ width: "1000px" }}
        className="bg-white p-8 rounded shadow-md flex w-900 h-200  relative"
      >
        {/* Company Image */}
        <img
          src="https://i.pinimg.com/564x/4b/f4/d4/4bf4d4fd605b9a269dd353e54f1d829a.jpg" // Replace with the actual image source
          alt="Company Logo"
          className="w-150 h-200 mr-4 object-contain"
        />

        <div className="w-300" style={{ paddingLeft: "20px", width: "100%" }}>
        <h4 className="text-center text-red-600 font-sans">{matchPassword}</h4>
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 relative">
              <input
                {...register("firstName", {
                  required: true, // Make the field required
                  validate: {
                    noSpaces: isNoSpaces1, // Use custom validation rule
                  },
                })}
                id="First-name"
                type="text"
                name="firstName"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder=" First Name"
              />
              <label
                htmlFor="First-name"
                className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg"
              >
                First Name
              </label>
              {errors.firstName && errors.firstName.type === "required" && (
                <p className="text-red-600">First Name is required</p>
              )}
              {errors.firstName && errors.firstName.type === "noSpaces" && (
                <p className="text-red-600">First Name cannot contain spaces</p>
              )}
            </div>


            
            <div className="mt-4 relative mt-7">
              <input
                {...register("lastName", {
                  required: true, // Make the field required
                  validate: {
                    noSpaces: isNoSpaces, // Use custom validation rule
                  },
                })}
                id="Last-name"
                type="text"
                name="lastName"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="Last Name"
              />
              <label
                htmlFor="Last-name"
                className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg"
              >
                Last Name
              </label>
              {errors.lastName && errors.lastName.type === "required" && (
                <p className="text-red-600">Last Name is required</p>
              )}
              {errors.lastName && errors.lastName.type === "noSpaces" && (
                <p className="text-red-600 ">Last Name cannot contain spaces</p>
              )}
            </div>

            <div className="mt-4 relative mt-7">
              <input
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]{10}$/, // Custom pattern validation for 10 numbers
                })}
                id="phone"
                type="tel" // Use "tel" for phone numbers
                name="phone"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="Phone Number"
              />
              <label htmlFor="phone" className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg">
                Phone Number
              </label>
              {errors.phone && errors.phone.type === "required" && (
                <p className="text-red-600">Phone number is required</p>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <p className="text-red-600">
                  Phone number must contain exactly 10 numbers
                </p>
              )}
            </div>

            <div className="mt-4 relative mt-7">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                id="email"
                
                name="email"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="E-mail" // Corrected placeholder text
              />
              <label htmlFor="email" className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg">
                E-mail
              </label>
              {errors.email && (
                <p className="text-red-600">
                  Email is required and must be valid
                </p>
              )}
            </div>

            <div className="mt-4 relative mt-7">
              <input
                {...register("password", { required: true })}
                id="password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg"
              >
                Password
              </label>
              {errors.password && (
                <p className=" text-red-600">Password is required</p>
              )}
              <div
                className="absolute right-5 top-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </div>
            </div>

            <div className="mt-4 relative mt-7">
              <input
              {...register("confirmPassword", { required: true })}
                id="confirmPassword"
                type={passwordVisible1 ? "text" : "password"}
                name="confirmPassword"
                className="peer h-10   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="confirmPassword"
              />
              <label
                htmlFor="confirmPassword"
                className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg"
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className=" text-red-600">confirm-Password is required</p>
              )}
              <div
                className="absolute right-5 top-2 cursor-pointer"
                onClick={togglePasswordVisibility1}
              >
                {passwordVisible1 ? (
                  <i className="fa fa-eye "></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-10">
              <a
                onClick={()=>{navigate('/login')}}
                className="inline-block text-blue-500 hover:text-blue-800 hover:underline"
              >
                Login
              </a>
              {button ?  <button
                type="submit"
                className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>: <button
                disabled
                type="submit"
                className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              >
                Processing...
              </button>}
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register
