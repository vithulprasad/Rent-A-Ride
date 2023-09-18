import { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types';
import Navbar from '../../Component/User/Navbar'
import Footer from '../../Component/User/Footer'
import Profile from '../../Component/User/ProfileComponent'
import { useNavigate } from 'react-router-dom';
import { Tabs,Button } from 'antd';
import EditProfileComponent from '../../Component/User/EditProfileComponent';
function ProfilePage({authorized}) {
    const navigate= useNavigate()
  
    useEffect(()=>{
        console.log(authorized,'--------------------------------');
        if(!authorized){
          navigate('/')
        }
      },[])
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
          label:  <Button className="text-white bg-green-500" type="primary">
          Edit Profile
           </Button>,
          children: <EditProfileComponent/>,
        },
        {
          key: '3',
          label:  <Button className="text-white bg-red-400" type="primary">
        Wallet
           </Button>,
          children: 'THis is the wallet page ',
        },
      ];
   
  return (
    <Fragment>
        <Navbar/>
        <div className='flex h-[600px]'>
          <div className='w-[20%] h-full p-2'>
            <div className='w-full h-full flex  flex-col '>
              <div className='w-full flex justify-center pt-2'>
                <div className='w-[180px] h-[180px] p-1 border border-black' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
                <div className='w-[170px] h-[170px] bg-red-100 ' style={{backgroundImage:"url(https://i.pinimg.com/564x/cf/c8/a7/cfc8a77cecf698e50890d8ab4a566e34.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                </div>
                </div>
              </div>
                 <div className='w-full h-10 pt-2  font-mono text-center items-center font-bold'>
                    <h1>Vidhul Prasad</h1>
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
        <Footer/>
    </Fragment>
  )
}

export default ProfilePage
ProfilePage.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };