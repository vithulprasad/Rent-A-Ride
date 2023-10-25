import { useEffect, useRef, useState } from "react";
import { chat, chatSave, socketCall } from "../../Apis/connections/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { LoadingOutlined } from '@ant-design/icons';

function Chat() {
  const [chatPerson, setChatPerson] = useState([]);
  const [select, setSelect] = useState(-1);
  const [conversation, setConversation] = useState({});
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false)
  const changeRef = useRef(null); // Ref attached to the chat container
  const location = useNavigate();
  const data = import.meta.env.VITE_SocketIo;
  const socket = io(data);

 

  useEffect(() => {
    socket.on('receiveMessage', () => {
      if (conversation.user) {
        toast.success("sending message");
     
        const data = {
          user: conversation.user,
          partner: conversation.partner
        };
        socketCall(data).then((res) => {
          if (res.data.success === true) {
            const data = res.data.chat;
            setConversation(data);
            socket.off('receiveMessage');
            socket.disconnect()
          }
        });
      }
    });
    chat()
    .then((res) => {
      const data = res.data.communication;
      setChatPerson(data);
    })
    .catch((err) => {
      toast.error(`${err.message}`);
    });
    return () => {
      socket.off('receiveMessage');
    };
  },[conversation])


  useEffect(() => {
    // Scroll to the bottom of the chat container when conversation changes
    changeRef.current.scrollTop = changeRef.current.scrollHeight;
  }, [conversation]);

  const handleWhichPartner = (index) => {
    const find = chatPerson.find((data, key) => { return key === index });
    setConversation(find);
    setSelect(index);
  };

  const handleMessage = () => {
    setLoading(true)
    if (conversation.partner) {
      if (message !== "") {
        const partner = conversation.partner;
        const data = {
          partner: partner,
          message: message,
        };
        chatSave(data)
          .then((res) => {
            if (res.data.success === true) {
              const data = res.data.chat;
              setConversation(data);
              socket.emit('sentMessage');
              setMessage('');
              setLoading(false)
            }
          })
          .catch((err) => {
            toast.error(`${err.message}`);
            setLoading(false)
          });
      } else {
        toast.error("please enter anything in the field");
        setLoading(false)
      }
    } else {
      toast.error("please choose a partner");
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-[600px] flex justify-around">
      <div className="w-[30%] h-full pt-3">
        <div onClick={() => { location('/myRide') }} className="w-1/3 h-14 rounded-lg border mb-1 flex justify-center items-center bg-green-200 hover:bg-green-400">
          <div className="">GO BACK</div>
        </div>
        {chatPerson ?
          <>
            {chatPerson.map((data, index) => (
              <div
                key={index}
                onClick={() => handleWhichPartner(index)}
                className={select !== index ? "w-full h-20 border mb-1 flex hover:shadow-lg hover:bg-slate-200" : "bg-slate-200 shadow-lg w-full h-20 border mb-1 flex"}
              >
                {data.partnerImage == "" ?
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg) `, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionX: "-9px" }}></div> :
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(${data.partnerImage}) `, backgroundRepeat: "no-repeat", backgroundSize: "contain" }}></div>}
                <div className="w-[300px] h-full  pl-5"><div className="font-mono font-bold text-lg">{data.partnerName}</div><div>{data.lastMessage}</div></div>
              
              </div>
            ))}
          </>
          : null}
      </div>

      <div className="w-[65%] h-full p-3">
        {conversation.partner?
        <div className="w-full h-20 flex border border-black p-2">
           {conversation.partnerImage == "" ?
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg) `, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionX: "-9px" }}></div> :
                  <div className="w-20 h-full rounded-full" style={{ backgroundImage: `url(${conversation.partnerImage}) `, backgroundRepeat: "no-repeat", backgroundSize: "contain" }}></div>}

          <div className="w-full h-full flex items-center font-mono text-2xl pl-10 font-bold">{conversation.partnerName}</div>
        </div>
        :null}
        <div className="w-full h-[80%] overflow-y-auto px-3" ref={changeRef}>
          {loading==true ?   
           <div className="bg-gray-200 h-full flex justify-center items-center">
              <LoadingOutlined
                style={{
                  fontSize: 44,
                }}
                spin
              />
         </div> :
          <>
          {conversation.user ?
            conversation.message.map((data, index) => (
              <div className="w-full h-14 my-2" key={index}>
                {data.partner == "" ?
                  <div className="w-full h-[40px] ">
                    <div className="w-full h-full flex justify-end ">
                      <div className="px-2 bg-green-300 py-1 flex flex-col rounded-lg font-mono font-bold">
                        {data.user}
                        <span className="font-thin text-xs text-end">
                          {new Date(data.date).getMinutes()}:{new Date(data.date).getSeconds()}{" "}
                          {new Date(data.date).getHours() < 12 ? "AM" : "PM"}
                        </span>
                      </div>
                    </div>
                  </div> :
                  <div>
                    <div className="w-full h-[40px] flex justify-start ">
                      <div className="px-2 bg-gray-300 py-1 flex flex-col rounded-lg">{data.partner}
                        <span className="font-thin text-xs text-end">
                          {new Date(data.date).getMinutes()}:{new Date(data.date).getSeconds()}{" "}
                          {new Date(data.date).getHours() < 12 ? "AM" : "PM"}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>}
              </div>
            ))
            : null}
            </>
            }
        </div>
        <div className="w-full h-[10%] flex">
          <div className="w-[80%] h-full flex items-center" >
            <input placeholder="Enter message 👉"  onChange={(e) => { setMessage(e.target.value) }} value={message} type="text" className="w-full text-lg font-mono pl-3 h-2/3 ml-2 border border-black rounded-md" />
          </div>
          <div className="w-[20%] h-full flex items-center p-2" >
            <div onClick={handleMessage} className="h-full w-16 bg-green-400 rounded-full flex justify-center items-center" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
