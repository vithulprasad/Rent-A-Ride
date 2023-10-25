import { useEffect, useState } from "react"
import {listBike} from '../../Apis/connections/partner'
import { useSelector } from "react-redux"
import toast from "react-hot-toast";
import  "../Partner/ANT/ANT.css"
import Loading from '../../Component/Loading/loading'
import {unlist}  from '../../Apis/connections/partner'
import {  Modal } from 'antd';

function ListBike() {
  const [loading,setLoading] = useState(true)
  const [refresh,setRefresh] = useState(true)
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });

  const [bike, setBike] = useState([]);

  useEffect(() => {
    const listedBike=async()=>{

   await listBike().then((res) => {
        if (res.data.success) {
          setBike(res.data.bikes);
          setLoading(false)
        } else {
          toast.error("Something went wrong");
        }
      });
    }
    listedBike()
  }, [partner,refresh]);


  const unlistHandler=(id)=>{
    unlist(id)
    .then((res)=>{
      if(res.data.success===true){
        if(res.data.message=="the bike was booked"){
          toast.error("cannot unlist ! bike in the users hand")
        }else{
          toast.success("unlisted successfully")
        }
        if(refresh === true){
          setRefresh(false);
        }else{
          setRefresh(false)
        }
    
      }else{
        toast.error('something went wrong in unlisting')
      }
     
    })
  }
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-6">
      {loading ? (<Loading/>) : (<>
        <div className="grid grid-cols-3 gap-4">
        {bike.length > 0 ? (
          bike.map((data) =>
            data.requestStatus === "completed" && data.available===true ? (
              <div
                key={data._id}
                className="w-[280px] h-[350px] p-2 bg-slate-50"
                style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
              >
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
                  <h1 className="font font-semibold font-mono">
                    Bike:<span className="ml-10 font-bold text-lg">{data.name}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="font font-semibold font-mono">
                    Brand-Name:{data.BrandName}
                  </h1>
                </div>
                <div>
                  <h1 className="font font-semibold font-mono">
                    RentPer:<span className="ml-10"><i className="icon  rupee sign "></i>{data.rentPerHour}</span>
                  </h1>
                </div>
                <div className="flex justify-around">
                  <button onClick={()=>{unlistHandler(data._id)}} className="bg-cyan-500 text-white font-mono font-semibold px-5 py-2 rounded focus:outline-none shadow hover:bg-cyan-900 transition-colors">
                    Unlist
                  </button>
                  <button onClick={()=>{setIsModalOpen(true)}} className="bg-green-500 text-white font-mono font-semibold px-5 py-2 rounded focus:outline-none shadow hover:bg-green-700 transition-colors">
                    Details
                  </button>
                  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className="w-[300px]h-[300px]">
                 
                    <img
                      className="w-full h-full object-cover"
                      src={data.image[0]}
                      alt="image"
                    />
                    </div>
                    <p>name:{data.name}</p>
                    <p>name:{data.BrandName}</p>
                    <p>name:{data.rentPerHour}</p>
                    <p>name:{data.NormalCategory}</p>
                    <p>name:{data.cc}</p>
                    <p>name:{data.companyName}</p>
                    <p>name:{data.isBooked}</p>
                  

                  </Modal>
                </div>
              </div>
            ) : null
          )
        ) : (
          <div className="w-[700px] h-[200px] flex justify-center items-center">
            <div
              className="animated-box"
              style={{
                boxShadow:
                  "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                backgroundImage:
                  'url(https://i.pinimg.com/564x/65/20/5f/65205f3ee1b5dd65b91d3fa279990927.jpg)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "300px",
                height: "250px",
              }}
            ></div>
          </div>
        )}
      </div>
      </>)}
     
    </div>
  );
  
}

export default ListBike;
