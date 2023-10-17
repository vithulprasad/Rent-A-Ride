import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import {paymentSuccess} from  '../../Apis/connections/user'
import toast from "react-hot-toast";
import { useEffect } from "react";
function Success() {
  const navigate = useNavigate();

  useEffect(()=>{
    paymentSuccess().then(()=>{
      toast.success('payment completed successfully')
    })
    .catch((err)=>{toast.error(`error occured :${err.message}`)})
  },[])
  
  return (
    <div>
      <Result
        status="success"
        title="Successfully Booked  Bike from rent a ride!"
        subTitle="your booking is completed successfully and the bike will be approach thank you for corperating with us"
        extra={[
          <Button
          className="bg-green-500"
            type="primary"
            key="console"
            onClick={() => {
              navigate("/");
            }}
          >
            Go To Home Page
          </Button>,
          <Button key="buy">Download invoice</Button>,
        ]}
      />
    </div>
  );
}

export default Success;
