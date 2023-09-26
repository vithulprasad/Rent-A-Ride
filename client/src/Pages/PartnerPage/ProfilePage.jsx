import { Fragment, useState } from 'react';
import Navbar from '../../Component/Partner/navbar';
import Footer from '../../Component/Partner/footer';
import Profile from '../../Component/Partner/ProfileComponent';
import EditProfile from '../../Component/Partner/EditProfile';

function ProfilePage() {
  const [change, setChange] = useState(1);
  const color = {
    backgroundColor:" hsl(89, 43%, 51%",
    boxShadow:"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
    
  }
  const noColor = {
    backgroundColor:"white"
  }

  return (
    <Fragment>
      <Navbar />
      <div className='w-full h-10'>
        <div className='w-[25%] h-full flex justify-around p-2'>
          <button onClick={() => setChange(1)} className='border border-black w-24' style={change===1 ? color :noColor}>Profile</button>
          <button onClick={() => setChange(2)} className='border border-black w-24 ' style={change===2 ? color :noColor}>EditProfile</button>
        </div>
      </div>
      <div>
      {
      change===1 ? <Profile/> : <EditProfile/>
    }
      </div>
   
      <Footer />
    </Fragment>
  );
}

export default ProfilePage;
