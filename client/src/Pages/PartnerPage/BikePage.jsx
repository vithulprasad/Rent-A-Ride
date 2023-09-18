import { Fragment, useEffect, useState } from "react";
import Navbar from "../../Component/Partner/navbar";
import Footer from "../../Component/Partner/footer";
import AddBike from "../../Component/Partner/AddBike"; // Import the AddBike component
import EditVehicles from "../../Component/Partner/EditBike"; // Import the EditVehicle component
import ListVehicles from "../../Component/Partner/ListBIke"; // Import the ListVehicle component

function BikePage() {
  const [key, setKey] = useState(3);
  const [receivedData, setReceivedData] = useState(false);

  const AddVehicle = () => {
    setKey(1);
  };

  const EditVehicle = () => {
    setKey(2);
  };

  const ListVehicle = () => {
    setKey(3);
  };
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
  return (
    <Fragment>
      <Navbar />
      <div className="flex mt-2 ">
        <div className="w-[600px] bg-grey-100 flex justify-around">
          <div
            className="w-[260px] h-[400px] p-5 mt-7 rounded"
            style={{
              boxShadow:
                "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="w-full ">
              <h1 className="text-center mt-8 mb-8 font-mono font-bold text-2xl text-slate-700">
                Vehicle Management
              </h1>
            </div>
            <div className="w-full h-[80px] flex justify-center">
              <button
                style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  AddVehicle();
                }}
                className="group bg-blue-50 h-12 w-full border-gray-300 rounded-lg transition duration-300 hover:border-green-400 focus:bg-cyan-600 active:bg-green-900"
              >
                ADD Vehicle
              </button>
            </div>
            <div className="w-full h-[80px] flex justify-center">
              <button
                 style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  ListVehicle();
                }}
               
                className="bg-blue-50 group h-12 w-full  border-gray-300 rounded-lg transition duration-300 hover:border-blue-400 focus:bg-cyan-600 active:bg-blue-100"
              >
                Active Bikes
              </button>
            </div>
            <div className="w-full h-[80px] flex justify-center">
              <button
                 style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => {
                  EditVehicle();
                }}
                className="bg-blue-50 group h-12 w-full  border-gray-300 rounded-lg transition duration-300 hover:border-blue-400 focus:bg-cyan-600 active:bg-blue-100"
              >
                UnListed Bikes
              </button>
            </div>
          </div>
        </div>
        <div className="w-full   h-[800px]" style={{borderLeft:"solid 1px grey"}}>
                {key === 1 && <AddBike onDataReceived={handleChildData}  />}
                {key === 2 && <EditVehicles />}
                {key === 3 && <ListVehicles />}
        </div>
      </div>
      {/* Use conditional rendering */}
      
      <Footer />
    </Fragment>
  );
}

export default BikePage;
