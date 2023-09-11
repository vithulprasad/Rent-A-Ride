
import { Button, Popover, Space } from 'antd';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import{partnerLogOut} from '../../../Redux/storeSlices/PartnerAuth'
import "../ANT/ANT.css"
import {useEffect,useState} from 'react'
import axios from 'axios';
import { partnerApi } from '../../../Apis/api';
const App = () => {
const dispatch = useDispatch()
const[partner,setPartner] =useState('')
const LogotHandle=()=>{
  localStorage.removeItem('partnerInformation');
  dispatch(partnerLogOut())
}

const datas = useSelector((state)=>{return state.partnerAuth})

useEffect(()=>{
  const token = datas.PartnerToken
  console.log(token);
  axios.get(`${partnerApi}navProfileDetails?id=${encodeURIComponent(token)}`).then((res)=>{
    if(res.data.success===true){
      setPartner(res.data.data.company)
    }
  })
},[])
  const content = (
    <div> 
        <div >
          <div className='flex justify-around'>
            <h3 className=' font-mono font-bold' >UserName :</h3>
            <p>{datas.user}</p>
          </div>
          <br />
          <div className='flex justify-around'>
            <h3 className=' font-mono font-bold' >Company name :</h3>
            <p>{partner}</p>
          </div>
          <br />
          <div className='flex justify-around'>
            <button className="bg-red-400  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-red-700 transition-colors" onClick={()=>{LogotHandle()}} >Logout</button>

            <button className="bg-blue-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">View Profile</button>
          </div>
          <br />

          <div className='flex justify-around'>
            <button className="bg-green-400  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">Wallet</button>
            <button className="bg-yellow-400  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">payments</button>

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
