import { useEffect, useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userLogOut } from '../../../Redux/storeSlices/userAuth';
import PropTypes from 'prop-types'; // Import PropTypes
import "../ANT/ANT.css"

const App = (props) => {
  const [logouting,setLogouting] = useState(false)
const [popup,setPopup] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (logouting) {
      console.log('try for another logout');
      setPopup(false); // Set popup to false when logging out
      setLogouting(false);
    }
  }, [logouting]);

  useEffect(() => {
    // Update popup based on props.data.find
    setPopup(props?.data?.find);
  }, [props.data.find]);

  function logout() {
    dispatch(userLogOut());
    setLogouting(true);
    navigate('/')
  }

  function login() {
    navigate('/login');
  }


  const content = (
    <div> 
      {popup ? (
        <div key={logouting}>
          <div className='flex justify-around'>
            <h3 className=' font-mono font-bold' >UserName :</h3>
            <h3>{props.data.name}</h3>
          </div>
          <br />
          <div className='flex justify-around'>
            <button className="  text-black font-bold w-full py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={()=>{navigate('/profile')}} style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>View Profile</button>
          </div>
          <br />
     
          <div className='flex justify-center'>
            <button onClick={()=>{navigate("/myRide")}} className="   text-black font-bold w-full py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>My Ride</button>
          </div>
          <br />
          <div className='flex justify-center'>
            <button className=" text-black font-bold w-full py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}} onClick={()=>{navigate('/profile')}}>Wallet</button>
          </div>
          <br />
          <div className='flex justify-center'>
          <button className=" text-black font-bold w-full py-2 rounded focus:outline-none shadow hover:bg-red-700 transition-colors"style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}} onClick={() => {
              localStorage.removeItem('information');
              logout();
            }}>Logout</button>
          </div>
          <br />
          <div>
            <a className='font-mono underline text-green-600' href="#">Offers for you</a>
          </div>
          <br />
          <div>
            <a className='font-mono underline text-green-600' href="#">Purchase Details</a>
          </div>
        </div>
      ) : (
        <div key={logouting}>
          <div className='flex justify-around'>
            <h3 className=' font-mono font-bold'>to manage and make orders, please login ..</h3>
          </div>
          <br />
          <div className='flex justify-around'>
            <button className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover-bg-blue-700 transition-colors" onClick={login}>Login/signUp</button>
          </div>
          <br />
          <div>
            <a className='font-mono underline text-green-600' href="#">Offers for you</a>
          </div>
          <br />
        </div>
      )}
    </div>
  );

  return (
    <Space wrap>
      <Popover content={content} title="Profile" trigger="click">
        <Button className='rounded-full p-0 m-0 flex h-14 w-14'>
          <div className="w-14 h-14 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/16/44/24/164424f8266e393b5874e72ac9c997d8.jpg")', backgroundPosition: 'center -14px', backgroundSize: '65px', boxShadow: " inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)" }}></div>
        </Button>
      </Popover>
    </Space>
  );
};

export default App;
App.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    find: PropTypes.bool,
  }),
};