import { Fragment,useEffect, useState,useCallback } from 'react'
import PropTypes from 'prop-types';
import Navbar from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer'
import Profile from '../../Component/User/ProfileComponent'
import { useNavigate } from 'react-router-dom';
import { Tabs,Button } from 'antd';
import EditProfileComponent from '../../Component/User/EditProfileComponent';
import { profileEditDataDetails } from "../../Apis/connections/user";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loading from '../../Component/Loading/loading'
import Wallet from '../../Component/User/Wallet'
function ProfilePage({authorized}) {
  const [firstName,setFirstName] = useState("no name")
  const [lastName,setLastName] = useState("no name")
  const [imageurl,setImageUrl] = useState("")
  const [refresh,setRefresh] = useState(true);
  const [loading,setLoading] = useState(true);
    const navigate= useNavigate()
  console.log("this is the parent comonent");
    useEffect(()=>{
        if(!authorized){
          navigate('/')
        }
      },[])

      const user = useSelector((state) => state?.userAuth.token);
  const getData = useCallback(async () => {
    try {
      const res = await profileEditDataDetails(user);
      if (res.data.success === true) {
        const uData = res.data.user;
        setFirstName(uData.firstName);
        setLastName(uData.lastName);
        if(uData.Profile==""){
          setImageUrl("https://i.pinimg.com/564x/cf/c8/a7/cfc8a77cecf698e50890d8ab4a566e34.jpg")
        }else{
          setImageUrl(uData.Profile)
        }
        setLoading(false)
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
  }, [getData,refresh]);


  const receiveDataFromChild=(data)=>{
    if(refresh===false){
      console.log(data);
     setRefresh(true);
    }else{
     setRefresh(false)
    }
}

      const items = [
        {
          key: '1',
          label:  <Button className="text-white bg-green-700" type="primary">
          Profile
           </Button>,
          children: <Profile/>,
        },
        {
          key: '2',
          label: <Button className="text-white bg-green-500" type="primary">
            Edit Profile
          </Button>,
          children: <EditProfileComponent sendDataToParent={receiveDataFromChild} />,
        },
        {
          key: '3',
          label:  <Button className="text-white bg-red-400" type="primary">
           Wallet
           </Button>,
          children:<Wallet/>,
        },
      ];
   
  return (
    <Fragment>
        <Navbar/>
        {loading ? (<Loading/>): (<>
          <div className='flex h-[700px]'>
          <div className='w-[20%] h-full p-2'>
            <div className='w-full h-full flex  flex-col '>
              <div className='w-full flex justify-center pt-2'>
                <div className='w-[180px] h-[180px] p-1 border border-black' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                <div className='w-[170px] h-[170px] bg-red-100 ' style={{backgroundImage: `url(${imageurl})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                </div>
                </div>
              </div>
                 <div className='w-full h-10 pt-2  font-mono text-center items-center font-bold'>
                    <h1>{firstName} {lastName}</h1>
                 </div>
            </div>
          </div>
      
        <div className='w-[80%]'>
        <Tabs
            defaultActiveKey="1"
            items={items}
            indicatorSize={(origin) => origin - 16}
        />
        </div>
      </div>
        </>)}
 
        <Footer/>
    </Fragment>
  )
}

export default ProfilePage
ProfilePage.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };