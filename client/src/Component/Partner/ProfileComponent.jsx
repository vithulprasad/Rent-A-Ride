import { useSelector } from "react-redux";
import { PartnerDetails } from "../../Apis/connections/partner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfileComponent() {
  const [image, setImage] = useState("");
  const [partnerInformation, setPartnerInformation] = useState({
    name: "no data",
    phone: "no data",
    age: "no data",
    companyName: "no data",
    area: "no data",
    post: "no data",
    pin: "no data",
    district: "no data",
    state: "no data",
    email: "no data",
    gender: "no data"
  });
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await PartnerDetails(partner).then((res) => {
        if (res.data.success === true) {
          const partner = res.data.partner;
          console.log(partner);
          setPartnerInformation({
            name: partner.name,
            phone: partner.phone,
            age: partner.address[0].age,
            companyName: partner.company,
            area: partner.address[0].localArea,
            post: partner.address[0].post,
            pin: partner.address[0].pin,
            district: partner.address[0].district,
            state: partner.address[0].state,
            email: partner.email,
            gender: partner.gender
          });
      
          if (partner.image) {
            setImage(partner.image);
          } else {
            setImage(
              `https://i.pinimg.com/564x/cf/c8/a7/cfc8a77cecf698e50890d8ab4a566e34.jpg`
            );
          }
         
        } else {
          toast.error("something went wrong in getData");
        }
      });
    } catch (error) {
      toast.error("something went wrong in get the details");
    }
  };
  
  return (
    <div className="w-full h-[600px] flex">
         <div className='w-[20%] h-full p-2'>
            <div className='w-full h-full flex  flex-col '>
              <div className='w-full flex justify-center pt-2'>
                <div className='w-[180px] h-[180px] p-1 border border-black' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                <div className='w-[170px] h-[170px] ' style={{backgroundImage: `url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                </div>
                </div>
              </div>
                 <div className='w-full h-10 pt-2  font-mono text-center items-center font-bold'>
                    <h1>{partnerInformation.name}</h1>
                 </div>
            </div>
          </div>
        <div className="w-[80%] h-full">
           <div className="w-[70%] h-[500px]">
                <div className="w-full h-[10%] border border-gray-700 flex justify-center items-center font-mono text-2xl"> <h1>Partner Profile</h1></div>
                <div className="w-full h-full flex">
                   <div className="w-[50%] h-full p-2">
                   <div className="flex w-full h-[10%] border border-gray-500 my-3">
                          <div className="w-[50%] h-full flex justify-center items-center font-mono ">
                            <h1>Name:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.name}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>Email:</h1>
                          </div>
                          <div className="w-[30%] h-full flex justify-center items-center  font-mono font-bold">
                            <span >{partnerInformation.email}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>Phone:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.phone}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>age:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.age}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>State:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.state}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>Gender:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.gender}</span>
                          </div>
                        </div>
                   </div>
                   <div className="w-[50%] h-full  p-2">
                   <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>Company Name:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.companyName}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>Area:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.area}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>post:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.post}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>pin:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.pin}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                            <h1>District:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>{partnerInformation.district}</span>
                          </div>
                        </div>
                        <div className="flex w-full h-[10%] border border-gray-500 my-3">
                        <div className="w-[50%] h-full flex justify-center items-center  font-mono">
                            <h1>Account status:</h1>
                          </div>
                          <div className="w-[50%] h-full flex justify-center items-center  font-mono font-bold">
                            <span>Active</span>
                          </div>
                        </div>
                   </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default ProfileComponent
