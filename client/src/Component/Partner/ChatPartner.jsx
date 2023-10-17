import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import io from 'socket.io-client';

function ChatPartner() {
    const [members, setMembers] = useState([]);
    const [user,setUser] = useState()
    const [message,setMessage] = useState([])
    const socket = io('http://localhost:4000/', {
        transports: ['websocket'],
      });
    const partner = useSelector((state) => {
        return state.partnerAuth.PartnerToken
      });
      const sentMessage =()=>{
        
      }
      const sent= ()=>{
        toast.success("working")
        socket.emit('findPartner',{partner:partner})
        
        socket.on('findPartnerData',(value) => {
            console.log(value);
            setMembers(value)
        });
        
    }
      useEffect(() => {
        sent()
        
        const socket = io('http://localhost:4000');
 
        socket.on('connect', () => {
          console.log('Connected to Socket.IO server');
        });
        

        socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
        });
        
        socket.on('connect_timeout', (timeout) => {
          console.error('Connection timeout:', timeout);
        });
        

 
     socket.on('responseUser',(value) => {
         console.log(value);
        
     });
     
     return () => {
       socket.disconnect();
     };
   }, []);

const setUserData = (x)=>{
    setUser(x)
    socket.emit('userOneTextFind',{user:x,partner:partner})
    socket.on('usersChat',(value)=>{
        setMessage(value.chat)
    })

    toast.success(x)
}

   console.log(members,'this is the members of the partner');
  return (
    <div className="container mx-auto">
    <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
      <div className="border-r border-gray-300 lg:col-span-1">
        <div className="mx-3 my-3">
          <div className="relative text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-300"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="search"
              className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
              name="search"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <ul className="overflow-auto h-[32rem]">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          {members.length > 0 ? 
          members.map((data,index)=>(
            <li key={index}>
            <a onClick={()=>{setUserData(data.user._id)}}  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={data.user.Profile}
                alt="username"
              />
              
              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span className="block ml-2 font-semibold text-gray-600">{data.user.firstName} {data.user.lastName}</span>
                  <span className="block ml-2 text-sm text-gray-600">25 minutes</span>
                </div>
                <span className="block ml-2 text-sm text-gray-600">bye</span>
              </div>
            </a>
            {/* Add more chat items here */}
          </li>
          )):null}
         
        </ul>
      </div>

{message.length>0}
      <div className="hidden lg:col-span-2 lg:block">
        <div className="w-full">
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
              alt="username"
            />
            <span className="block ml-2 font-bold text-gray-600">Emma</span>
            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
          </div>
          <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
            <ul className="space-y-2">
              <li className="flex justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span className="block">Hi</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">Hiiii</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex  w-full p-3 border-t border-gray-300 ">
            <div className="w-20 h16">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            </div>
      
            <div className="w-1/2 h-11 rounded-full " >
              <input  className="border border-black h-full w-full pl-4 rounded-full"/>
            </div>
          
            <div className="w-[200px] h-full flex items-center justify-center rounded-full " >
              <button onClick={sentMessage} className="w-24 h-9 rounded-xl bg-green-400 font-mono font-bold text-white">sent</button>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
  )
}

export default ChatPartner
