import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userApi } from "../../Apis/api";
import { toast } from "react-hot-toast";
import useCountDown from "./customHook/countDown";


const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [button, setButton] = useState(true);
  const [data, setData] = useState("");
  const inputRefs = useRef([]);
  const Navigate = useNavigate();
  const location = useLocation();
  const values = location?.state.data;
const {secondLeft,start}=useCountDown()

  const handleInputChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    if (/^\d+$/.test(e.target.value) && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    setOtp(newOtp);
  };


  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      inputRefs.current[index - 1].focus();
      setOtp(newOtp);
    }
  };
  // -------------------------------- otp form submitting -------------------------------//
  const SubmitEvent = (e) => {
    e.preventDefault();
    setButton(false);

      axios
        .post(`${userApi}otp`, { data: values, otp: otp })
        .then((response) => {
          if (response.data.success == false) {
            setTimeout(()=>{
              setData("");
            },3000)
            setButton(true);
            setData("this otp is invalid please enter a valid otp");
          } else {
            Navigate("/login");
            toast.success("Registration has been successful");
          }
        });
 
  };
  // Focus on the first input field when the component mounts
  useEffect(() => {
    start(59)
    inputRefs.current[0].focus();
  }, []);
  //-----------------------------------------resent Otp------------------------------------------------
  const resentOtp =()=>{
    console.log("resenting otp.......");
        start(59)
        axios.get(`${userApi}otpGenerate?data=${encodeURIComponent(values.email)}`).then((response)=>{
          if(response.data.success===true){
            toast.success("otp has been resented to your email")
          }else{
            toast.error("something went wrong")
          }
       })
  }
  // #################################################################   function end #################################################################
  return (
    <div className="container-fluid flex justify-center items-center min-h-screen">
      <div
        style={{
          boxShadow:
            " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
        }}
        className="w-92 h-96  flex justify-center p-4 border-2 bg-slate-300 border-pink-100 shadow-md"
      >
        <div className="mt-">
          <h2 className="mb-3 text-center font-bold font-sans text-red-600">
            {data}
          </h2>
          <h2 className="mb-3 text-center font-bold font-sans">
            Verification code
          </h2>
          <p className="text-center font-mono">
            Please enter the verification code sent to Email
          </p>
          <p className="text-center font-mono">{values.email}</p>
          <form onSubmit={SubmitEvent} className="mx-8 mt-4">
            <div className="flex justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center border mx-1"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              ))}
            </div>
            <div id="notification" className="mb-4">
              {/* Render your message here */}
            </div>
            <div className="flex justify-center">
              {button ? (
                <button
                  style={{
                    color: "black",
                    boxShadow:
                      " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                  }}
                  className="font-mono mt-7 text-lg btn w-1/2 h-12 bg-slate-250 rounded"
                  type="submit"
                >
                  Submit
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    color: "black",
                    boxShadow:
                      " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                  }}
                  className=" font-mono mt-7 text-lg btn w-1/2 h-12 bg-slate-250 rounded"
                  type="submit"
                >
                  Processing...
                </button>
              )}
            </div>
          
          </form>
          <div className="flex justify-center">
            {secondLeft>0 ? <div className="flex text-red-600 justify-center"><h3 className=" flex mt-6">Resent Otp in <span className="ml-5 font-bold">{`00:${secondLeft}`}</span> </h3></div> : 
             <button3
              onClick={()=>{resentOtp()}}
                  style={{
                    color: "rgb(255, 255, 204)",
                    background:'',
                    backgroundColor: "rgb(153, 102, 153)",
                   
                  }}
                  className="font-mono mt-7 text-lg btn w-[120px] h-[30px]  rounded flex justify-center"
                  type="submit"
                >
                  Resent Otp
                </button3>}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
