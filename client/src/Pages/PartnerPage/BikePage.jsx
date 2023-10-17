import { Fragment, useEffect, useState } from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import AddBike from "../../Component/Partner/AddBike"; // Import the AddBike component
import EditVehicles from "../../Component/Partner/EditBike"; // Import the EditVehicle component
import ListVehicles from "../../Component/Partner/ListBIke"; // Import the ListVehicle component
import Request from "../../Component/Partner/Request";
import { Badge } from 'antd';
import {listBike} from '../../Apis/connections/partner'
import { useSelector } from "react-redux"
import toast from "react-hot-toast";

function BikePage() {
  const [key, setKey] = useState(3);
  const [receivedData, setReceivedData] = useState(false);
  const [bike, setBike] = useState(0);
  const [refresh,setRefresh] = useState(false)

  const AddVehicle = () => {
    setKey(1);
  };

  const EditVehicle = () => {
    setKey(2);
  };

  const ListVehicle = () => {
    setKey(3);
  };

  const RequestHandler = ()=>{
    setKey(4);
  }
// -------------------------------handle child-------------------//
const handleChildData = ()=>{
  if(receivedData===false){
    setReceivedData(true)
  }else{
    setReceivedData(false)
  }
  
}

useEffect(()=>{
  setKey(3)
},[receivedData])
  // Use conditional rendering within the return statement
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });


  useEffect(() => {
    const listedBike=async()=>{
   await listBike().then((res) => {
    if (res.data.success) {
      const bikes = res.data.bikes
      console.log(bikes);
      const result = bikes.filter((value)=>{
         return value.requestStatus ==="rejected"
      })
           setBike(result.length);
         } else {
           toast.error("Something went wrong");
         }
      });
    }
    listedBike()
  }, [partner,refresh]);

  const handleReject=()=>{
    console.log("enterign to the parent refresh");
    if(refresh===true){
      setRefresh(false)
    }else{
      setRefresh(true)
    }
  }
  return (
    <Fragment>
      <Navbar />
      <div className="flex mt-2 ">
        <div className="w-[600px] bg-grey-100 flex justify-around">
          <div
            className="w-[260px] h-[300px] p-5 mt-7 border"
           
          >
            <div className="w-full h-16">
              <h1 className="text-center mt-8 mb-8 font-mono font-bold text-2xl text-slate-700">
                Vehicle Management
              </h1>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <button
                style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  AddVehicle();
                }}
                className="font-mono font-bold group bg-blue-50  h-12  w-full border-gray-300  transition duration-300 hover:border-green-400 focus:bg-cyan-600 active:bg-green-900"
              >
                ADD Vehicle
              </button>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <button
                 style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  ListVehicle();
                }}
               
                className="font-mono font-bold bg-blue-50 group  h-12   w-full  border-gray-300  transition duration-300 hover:border-blue-400 focus:bg-cyan-600 active:bg-blue-100"
              >
                Active Bikes
              </button>
            </div>
            <div className="w-full h-[50px] flex justify-center">
              <button
                 style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  EditVehicle();
                }}
                className="font-mono font-bold bg-blue-50 group h-12  w-full  border-gray-300  transition duration-300 hover:border-blue-400 focus:bg-cyan-600 active:bg-blue-100"
              >
                UnListed Bikes
              </button>
            </div>
            <div className="w-full h-[40px] flex justify-center">
         
             
    
              <button
                 style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  RequestHandler();
                }}
                className="bg-blue-50 group  h-12  w-full  border-gray-300  transition duration-300 hover:border-blue-400 focus:bg-cyan-600 active:bg-blue-100"
              >
              <Badge className="p-2 font-mono font-bold" count={bike}>
                      Request
              </Badge>
              </button>
           
            </div>
          </div>
        </div>
        <div className="w-full   h-[900px]" style={{borderLeft:"solid 1px grey"}}>
                {key === 1 && <AddBike onDataReceived={handleChildData}  />}
                {key === 2 && <EditVehicles />}
                {key === 3 && <ListVehicles />}
                {key === 4  && <Request refreshed={handleReject}/>}
        </div>
      </div>
      {/* Use conditional rendering */}
      
      <Footer />
    </Fragment>
  );
}

export default BikePage;
