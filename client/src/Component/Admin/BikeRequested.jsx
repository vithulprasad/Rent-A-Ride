import { Table, Button,Drawer,Input } from "antd";
import { bikeDetails } from "../../Apis/connections/admin";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import {partnerBikeReject} from '../../Apis/connections/admin'

function BikeManagement({requested}) {
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [id,setId] = useState('');
  const [again,setAgain] = useState(false);
  const purchaseDetails = (id) => {
    toast.success(`details${id}`);
  };

  const AcceptHandler = async(id) => {
    toast.success(`accepted${id}`);
    const data ={
      bikeId:id,
      message:message,
      type:"completed"
     }
     await partnerBikeReject(data).then((res)=>{
      if(res.data.success===true){
        toast.success('updated successfully')
        if(again===true){
          setAgain(false)
        }else{
          setAgain(true)
        }
        setOpen(false);
        requested("dafadfe")
      }else{
        toast.error('something went wrong')
      }
     })
  };
  const RejectHandler = (id) => {
    toast.success(`rejected${id}`);
    setId(id)
    setOpen(true);
  };

const sent =async()=>{
    
     const data ={
      bikeId:id,
      message:message,
      type:"rejected"
     }
     await partnerBikeReject(data).then((res)=>{
      if(res.data.success===true){
        toast.success('updated successfully')
        setMessage("")
        if(again===true){
          setAgain(false)
        }else{
          setAgain(true)
        }
        requested()
        setOpen(false);
      }else{
        toast.error('something went wrong')
      }
     })
}

  const { TextArea } = Input;

  const columns = [
    {
      title: "Image",
      dataIndex: "image", // Access the 'image' property directly
      key: "Image",
      render: (text, record) => (
        <img
          src={text[0]}
          alt={record.name}
          style={{ width: "70px", height: "50px" }}
        />
      ),
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="font-mono font-bold">{text}</a>,
      width: 200,
    },
    {
      title: "Brand Name",
      dataIndex: "_id",
      key: "BrandName",
      width: 200,
      render: (data) => (
        <h1 className="font-mono font-bold">
          <Button
            onClick={() => {
              purchaseDetails(data);
            }}
          >
            {" "}
            Details
          </Button>
        </h1>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: 200,
      render: (data) => <h1 className="font-mono font-bold">{data}</h1>,
    },
    {
      title: "Status",
      dataIndex: "requestStatus",
      key: "companyName",
      render: (data) =>
        data === "requested" ? (
          <div className="w-full h-[40px] flex justify-center font-mono font-bold">
            <div className="w-full bg-yellow-300 h-[50px] flex justify-center items-center">
              <h1>Requested</h1>
            </div>
          </div>
        ) : (
          <div className="w-full h-[50px] flex justify-center font-mono font-bold">
            <div className="w-full bg-orange-500 h-[50px] flex justify-center items-center">
              <h1>Re Requested</h1>
            </div>
          </div>
        ),
      width: 200, // Change this key to 'companyName'
    },
    {
      title: "Details",
      dataIndex: "_id", // Access the 'image' property directly
      key: "details",
      render: (record) => (
        <div>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => AcceptHandler(record)}
            onCancel={()=>{message.error("Cancel")}}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-lime-400 font-mono">Accept</Button>
          </Popconfirm>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => RejectHandler(record)}
            onCancel={()=>{message.error("cancel");  setOpen(false);}}
            okText="Yes"
            cancelText="No"
          >
            <Button   className="bg-red-500 font-mono">Reject</Button>
          </Popconfirm>
          <Drawer title="Reasons" placement="right"  open={open}>
     
             <TextArea onChange={(e)=>{setMessage(e.target.value)}} rows={4} />
       

            <Button onClick={()=>{setOpen(false)}}>close</Button>
            <Button className="bg-orange-300 font-mono" onClick={sent}>Sent</Button>
          </Drawer>
        
        </div>
      ),
      width: 200,
      font: "mono",
    },
  ];
  const [bikes, setBikes] = useState();
  useEffect(() => {
    const getBikes = async () => {
      await bikeDetails().then((res) => {
        if (res.data.success === true) {
          const data = res.data.bikes;
          const newData = data.filter((bike) => {
            return (
              bike.requestStatus === "requested" ||
              bike.requestStatus === "requestingAgain"
            );
          });
          console.log(data);
          setBikes(newData);
        } else {
          toast.error("something went wrong!");
        }
      });
    };
    getBikes();
  }, [again]);
  return (
    <div>
      <Table columns={columns} dataSource={bikes} />
    </div>
  );
}

export default BikeManagement;
