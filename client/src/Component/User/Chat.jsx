import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Chat() {
  const messagesRef = useRef(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = io('http://localhost:4000/', {
    transports: ['websocket'],
  });
  const user = useSelector((value)=>{return value.userAuth.token})
  const messageRef = useRef();
  const location = useLocation()
  const mydata = location?.state?.data
















  const sent= ()=>{
    toast.success("working")
    socket.emit('dataForward',{user:user,partner:mydata})
    
    socket.on('data',(value) => {
        console.log(value);
        setReceivedMessages(value.chat)
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
        setReceivedMessages(value.chat)
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);






  const handleMessage = () => {
    mydata ? toast.success(`partner data found${mydata}`):toast.error("partner data not found");
    if (message.trim() !== '') {
      socket.emit('sent_message', {message:message,user:user,partner:mydata});
      setMessage('');
      socket.on('responseUser',(value) => {
        console.log(value,'data response resposed');
        setReceivedMessages(value.chat)
    });
    }
  };
  if (messagesRef.current) {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }




























  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-[650px]">
     <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        {/* User Information */}
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Anderson Vanhron</span>
            </div>
            <span className="text-lg text-gray-600">Junior Developer</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          {/* Add more action buttons here */}
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        ref={messagesRef}
      >
        {receivedMessages.map((msg, index) => (
          <div className="chat-message " key={index}>
            {msg.user =="" ?  
            
            <div className="flex items-end">
             
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    {msg.user}
                   
                  </span>
                </div>
              </div>
            </div>
            :   
            
            <div className="flex justify-end">
        
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-400 text-gray-600">
                  {msg.user}
                 
                </span>
              </div>
            </div>
          </div>}
          
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              {/* Add attachment icon or other options */}
            </button>
          </span>
          <input
            type="text"
            ref={messageRef}
            placeholder="Write your message!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              {/* Add more message input buttons here */}
            </button>
            <button
              onClick={handleMessage}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
