import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userApi } from "../../Apis/api";
import { toast } from "react-hot-toast";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [button, setButton] = useState(true);
  const [data, setData] = useState("");
  const inputRefs = useRef([]);
  const Navigate = useNavigate();
  const location = useLocation();
  const values = location?.state.data;


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
    setTimeout(() => {
      axios
        .post(`${userApi}otp`, { data: values, otp: otp })
        .then((response) => {
          if (response.data.success == false) {
            setButton(true);
            setData("this otp is invalid please enter a valid otp");
          } else {
            Navigate("/login");
            toast.success("Successfully toasted!");
          }
        });
    }, 2000);
  };
  // Focus on the first input field when the component mounts
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
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
        <div className="mt-10">
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
        </div>
      </div>
    </div>
  );
};

export default Otp;
