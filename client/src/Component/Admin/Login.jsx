
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import{adminDetails} from '../../Redux/storeSlices/AdminAuth'
import { useNavigate } from "react-router-dom";
import {login} from '../../Apis/connections/admin'

function Login() {
  // FOR HANDLING EYE VISIBILITY
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);

  };
 
  //-------------------------------
  const onSubmit = async(data) => {
    console.log(data,'------------------ submitting--------------');
     await login(data).then((res)=>{
      if(res.data.success===true){
        let information = res.data.obj
        localStorage.setItem('adminInformation', JSON.stringify(res.data.obj));
        dispatch(adminDetails(information))
        navigate('/admin')
        toast.success("welcome back admin")
      }else{
        toast.error("data was not found")
      }
     })
    
  };

  // ####################################################################################################################################

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        style={{ width: "1000px" }}
        className="bg-white p-8 rounded shadow-md flex w-900 h-200"
      >
        {/* Company Image */}
        <img
          src="https://i.pinimg.com/564x/64/9c/82/649c82dcbc08f320895e483b5cfe86be.jpg" // Replace with the actual image source
          alt="Company Logo"
          className="w-150 h-200 mr-4"
        />

        <div className="w-300" style={{ paddingLeft: "20px", width: "100%" }}>
          <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-950">
            Login Admin
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 relative mt-7">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                id="email"
                type="email"
                name="email"
                className="peer rounded-md h-10 w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="Email" // Corrected placeholder text
                style={{ height: "50px" }}
              />
              <label className="px-2 absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-black-600 peer-focus:text-lg">
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
                className="peer h-10 rounded-md   w-full border-2 px-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600"
                placeholder="Password"
                style={{ height: "50px" }}
              />
              <label
                htmlFor="password"
                className="px-2  absolute left-0 -top-6 text-black-600 transition-all peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6  peer-focus:text-black-600 peer-focus:text-lg"
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
            <div className="mt-16 grid space-y-4">
              <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with Google
                  </span>
                </div>
              </button>
            </div>

            <div className="flex justify-between items-center mt-10">
              <a
                href="#"
                className="inline-block text-blue-500 hover:text-blue-800 hover:underline"
              >
                Forget password
              </a>
              <button
                type="submit"
                className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              >
                LOG-IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
