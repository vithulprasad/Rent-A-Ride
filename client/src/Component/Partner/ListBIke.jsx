import { useEffect, useState } from "react"
import axios from "axios"
import { partnerApi } from "../../Apis/api"
import { useSelector } from "react-redux"
import toast from "react-hot-toast";

function ListBike() {
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });

  const [bike, setBike] = useState([]);

  useEffect(() => {
    axios.get(`${partnerApi}listBike?token=${encodeURIComponent(partner)}`).then((res) => {
      if (res.data.success) {
        setBike(res.data.bikes);
      } else {
        toast.error("Something went wrong");
      }
    });
  }, [partner]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
     
        {bike.map((data) => (
          <div key={data._id} className="w-[280px] h-[350px] p-2 bg-slate-50" style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
         <div className="w-full h-48">
            <div className="h-full">
              <img
                className="w-full h-full object-cover"
                src={data.image[0]}
                alt="image"
              />
            </div>
          </div>
            <div>
              <h1 className="font font-semibold font-mono">Bike:<span className="ml-10 font-bold text-lg">{data.name}</span></h1>
            </div>
            <div>
              <h1 className="font font-semibold font-mono">Brand-Name:{data.BrandName}</h1>
            </div>
            <div>
              <h1 className="font font-semibold font-mono">RentPer:<span className="ml-10">{data.rentPerHour}</span></h1>
            </div>
            <div className="flex justify-around">
              <button  className="bg-cyan-500  text-white font-mono font-semibold px-5 py-2 rounded focus:outline-none shadow hover:bg-cyan-900 transition-colors">ListBike</button>
              <button  className="bg-green-500 text-white font-mono font-semibold px-5 py-2 rounded focus:outline-none shadow hover:bg-green-700 transition-colors">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListBike;
