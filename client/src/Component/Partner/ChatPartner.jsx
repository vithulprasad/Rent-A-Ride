import { useEffect, useRef, useState } from "react";
import { chat, chatSave ,socketCall} from "../../Apis/connections/partner";
import toast from "react-hot-toast";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { chatObject } from '../../Redux/storeSlices/Chat';
import { io } from "socket.io-client";



function ChatPartner() {
  const [chatPerson, setChatPerson] = useState([]);
  const [select, setSelect] = useState(-1);
  const [id, setId] = useState();
  const [idp, setIdp] = useState();
  const [singleChat, setSingleChat] = useState([]);
  const [loading,setLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [details,setDetails] = useState({})
  const socket = io('https://rent-a-ride-ten.vercel.app');
  const chatContainerRef = useRef(null);


  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('receiveMessage', () => {
      toast.success("message sent")
      if(id){
       const data = {
        user:id,
        partner:idp
       }
          socketCall(data).then((res)=>{
            if(res.data.success == true){
             const data = res.data.chat.message
             setSingleChat(data);
            }
         })
      }else{
        toast.error("no idea")
      }
    });
    const fetchData = async () => {
      try {
        const response = await chat();
        const data = response.data.communication;
        setChatPerson(data);
        dispatch(chatObject(data));
        console.log("use effect 1");
      } catch (err) {
        toast.error(`${err.message}`);
      }
    }
    fetchData();
    return () => {
      socket.off('receiveMessage');
    };
  },[singleChat,select])


  const chatSingle = useSelector((data) => {
    return data.chat;
  });

  const handleWhichPartner = (index) => {
    setSelect(index);
    const find = chatSingle.find((_, id) => { return id === index });
    setDetails(find)
    setId(find.user);
    setIdp(find.partner)
    setSingleChat(find.message);
  };

  const handleMessage = () => {
    setLoading(true)
    if (singleChat) {
      if (message !== "") {
        const data = {
          user: id,
          message: message,
        };
        chatSave(data)
          .then((res) => {
            if (res.data.success === true) {
              const data = res.data.chat.message
              setSingleChat(data);
              toast.success('Message sent');
              setMessage('');
              socket.emit('sentMessage');
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
              setLoading(false)
            }
          })
          .catch((err) => {
            setLoading(false)
            toast.error(`${err.message}`);
          });
      } else {
        setLoading(false)
        toast.error('Please enter a message');
      }
    } else {
      setLoading(false)
      toast.error('Please select a user');
    }
  }

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
 
  }, [singleChat]);

  return (
    <div className="w-full h-[600px] flex justify-around">
    
      <div className="w-[30%] h-full pt-3">
        {chatPerson ?
          <>
            {chatPerson.map((data, index) => (
              <div
                key={index}
                onClick={() => handleWhichPartner(index)}
                className={
                  select !== index
                    ? 'w-full h-20 border mb-1 flex hover:shadow-lg hover:bg-slate-200'
                    : 'bg-slate-200 shadow-lg w-full h-20 border mb-1 flex'
                }
              >
                {data.partnerImage === '' ?
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg) `, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '-9px' }}></div> :
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(${data.userImage}) `, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div>
                }
                <div className="w-[300px] h-full pl-5 "> 
                  <div className="font-mono font-bold">{data.userName} {data.userNameLast}</div>
                  <div>{data.lastMessage}</div>
                </div>
                
              </div>
            ))}
          </>
          : null}
      </div>
      <div className="w-[65%] h-full p-3">
        {details.userName ? 
        <div className="w-full h-20 flex border border-black p-2">
          <div className="w-20 h-full rounded-full bg-blue-400"style={{ backgroundImage: `url(${details.userImage}) `, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionX: "-9px" }}></div>
          <div className="w-full h-full flex items-center font-mono text-2xl pl-10 font-bold">{details.userName} {details.userNameLast}</div>
        </div>
        :null}
        <div className="w-full h-[80%] overflow-y-auto py-3" ref={chatContainerRef}>
           {loading == true ?    
         <div className="bg-gray-200 h-full flex justify-center items-center">
              <LoadingOutlined
                style={{
                  fontSize: 44,
                }}
                spin
              />
         </div>:
          <>
          {singleChat ?
            singleChat.map((data, index) => (
              <div className="w-full h-14 my-2" key={index}>
                {data.partner === '' ?
                  <div className="w-full h-[40px] ">
                    <div className="w-full h-full flex justify-start">
                      <div className="px-2 bg-gray-300 py-1 flex flex-col rounded-lg font-mono font-bold">
                        {data.user}
                        <span className="font-thin text-xs text-end">
                          {new Date(data.date).getMinutes()}:{new Date(data.date).getSeconds()}{' '}
                          {new Date(data.date).getHours() < 12 ? 'AM' : 'PM'}
                        </span>
                      </div>
                    </div>
                  </div> :
                  <div>
                    <div className="w-full h-[40px] flex justify-end">
                      <div className="px-2 bg-green-300 py-1 flex flex-col rounded-lg font-mono font-bold">{data.partner}
                        <span className="font-thin text-xs text-end">
                          {new Date(data.date).getMinutes()}:{new Date(data.date).getSeconds()}{' '}
                          {new Date(data.date).getHours() < 12 ? 'AM' : 'PM'}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                }
              </div>
            ))
            : null}
            </>
            }
        </div>
        <div className="w-full h-[10%] flex">
          <div className="w-[80%] h-full flex items-center">
            <input placeholder="Enter message 👉" onChange={(x) => { setMessage(x.target.value) }} value={message} type="text" className="w-full pl-3 h-2/3 ml-2 border text-lg font-mono border-black rounded-md" />
          </div>
          <div className="w-[20%] h-full flex items-center p-2">
            <div onClick={handleMessage} className="h-full w-16 bg-green-400 rounded-full flex justify-center items-center" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPartner;
