import { Fragment, useState,useEffect,useCallback } from "react"

import { profileEditDataDetails } from "../../Apis/connections/user";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ProfileComponent() {

 
  const [imageUrl1,setImageUrl1] = useState('https://i.pinimg.com/564x/3e/01/66/3e01667b4c12daee9ea2a1cfabe58e2d.jpg')
  const [imageUrl2,setImageUrl2] = useState('https://i.pinimg.com/564x/3e/01/66/3e01667b4c12daee9ea2a1cfabe58e2d.jpg')
  const [imageUrl3,setImageUrl3] = useState('https://i.pinimg.com/564x/3e/01/66/3e01667b4c12daee9ea2a1cfabe58e2d.jpg')
  const [imageUrl4,setImageUrl4] = useState('https://i.pinimg.com/564x/3e/01/66/3e01667b4c12daee9ea2a1cfabe58e2d.jpg')

  const [firstName, setFirstName] = useState("no Data");
  const [lastName, setLastName] = useState("no Data");
  const [email, setEmail] = useState("no Data");
  const [phone, setPhone] = useState("no Data");
  const [state, setState] = useState("no Data");
  const [district, setDistrict] = useState("no Data");
  const [street, setStreet] = useState("no Data");
  const [post, setPost] = useState("no Data");
  const [pin, setPin] = useState("no Data");

  const user = useSelector((state) => state?.userAuth.token);
  const getData = useCallback(async () => {
    try {
      const res = await profileEditDataDetails(user);
      if (res.data.success === true) {
        const uData = res.data.user;
        setFirstName(uData.firstName);
        setLastName(uData.lastName);
        setEmail(uData.email);
        setPhone(uData.phone);
        setState(uData.address.state);
        setDistrict(uData.address.district);
        setStreet(uData.address.localArea);
        setPost(uData.address.post);
        setPin(uData.address.pin);
       
        setImageUrl1(uData.license.front);
        setImageUrl2(uData.license.back);
        setImageUrl3(uData.userInfo.front);
        setImageUrl4(uData.userInfo.back);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Fragment>
        <div className="w-full">
          <div className="w-[900px] h-[580px]" >
             <div className="w-[100%] h-[100%] flex">
                <div className="w-[50%] h-[100%] p-3">


                   <div className="w-[100%] h-[80px] flex justify-center items-center font-mono font-bold text-2xl m-3"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                    <h1>USER PROFILE </h1>
                   </div>

                   <div className="w-[100%] h-[35px] flex border mt-3 mb-3">
                        <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1> Name:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{firstName} {lastName}</span>
                        </div>
                   </div>
                 
                   <div className="w-[100%] h-[35px] flex border mt-3 mb-3">
                   <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>Email:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{email}</span>
                        </div>
                   </div>

                   <div className="w-[100%] h-[35px] flex border mt-3 mb-3">
                   <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>Phone :</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{phone}</span>
                        </div>
                   </div>

                    <div className="w-[100%] h-[35px] flex border mt-3 mb-3">
                    <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>State:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{state}</span>
                        </div>
                   </div>

                  <div className="w-[100%] h-[35px] flex border  mt-3 mb-3">
                  <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>District</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{district}</span>
                        </div>
                   </div>

                <div className="w-[100%] h-[35px] flex border  mt-3 mb-3">
                <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>Street:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{street}</span>
                        </div>
                   </div>

                   <div className="w-[100%] h-[35px] flex border  mt-3 mb-3">
                   <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>Post:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{post}</span>
                        </div>
                   </div>

                    <div className="w-[100%] h-[35px] flex border  mt-3 mb-3">
                    <div className="w-[30%] h-[100%] flex justify-center items-center font-mono text-lg">
                          <h1>pin:</h1>
                        </div>
                        <div className="w-[70%] h-[100%] flex justify-center items-center font-mono font-bold text-base"style={{boxShadow:" inset 0 -1em 1em rgba(0, 0, 0, 0.1),0 0 0 1px rgb(255, 255, 255),0.1em 0.1em 1em rgba(0, 0, 0, 0.1)"}}>
                          <span>{pin}</span>
                        </div>
                   </div>
                </div>




                <div className="w-[50%] h-[100%]  ml-10 border border-red-300">
                  
                     <div className="w-full h-[25%] flex">
                        <div className="w-[25%] h-full  flex justify-center items-center  font-mono text-lg">
                           <h1>License <br />Front</h1>
                        </div>
                        <div className="w-[75%] h-full  p-3">
                            <div className="w-full h-full "   style={{
                                backgroundImage: `url(${imageUrl1})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}>
                                            
                            </div>
                        </div>
                     </div>
                     <div className="w-full h-[25%]  flex">
                     <div className="w-[25%] h-full  flex justify-center items-center  font-mono text-lg">
                        <h1>License <br />Back</h1>
                        </div>
                        <div className="w-[75%] h-full  p-3">

                            <div className="w-full h-full "   style={{
                                backgroundImage: `url(${imageUrl2})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}>
                                            
                            </div>
                        </div>
                     </div>
                     <div className="w-full h-[25%]  flex">
                     <div className="w-[25%] h-full  flex justify-center items-center  font-mono text-lg">
                       <h1>Personal <br /> Info <br />Front</h1>
                     </div>
                     <div className="w-[75%] h-full  p-3">

                            <div className="w-full h-full "   style={{
                                backgroundImage: `url(${imageUrl3})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}>
                                            
                            </div>
                        </div>
                     </div>
                     <div className="w-full h-[25%]  flex">
                     <div className="w-[25%] h-full  flex justify-center items-center  font-mono text-lg">
                         <h1>Personal <br />Info <br />Back</h1>
                     </div>
                     <div className="w-[75%] h-full  p-3">

                            <div className="w-full h-full "   style={{
                                backgroundImage: `url(${imageUrl4})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                              }}>
                                            
                            </div>
                        </div>
                     </div>
                </div>
             </div>
          </div>
        </div>
    </Fragment>
  )
}

export default ProfileComponent
