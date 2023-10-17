import { Table, Button,Drawer,Input,Modal } from "antd";
import { bikeDetails } from "../../Apis/connections/admin";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import {partnerBikeReject} from '../../Apis/connections/admin'
import Loading from '../../Component/Loading/loading'
import PropTypes from 'prop-types';


function BikeManagement({requested}) {
  const [loading,setLoading] = useState(false)
const [single,setSingle] = useState({})
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [id,setId] = useState('');
  const [again,setAgain] = useState(false);
  const purchaseDetails = (id) => {
    toast.success(`details${id}`);
    setIsModalOpen(true);
  };

  const AcceptHandler = async(id) => {
    setLoading(true)
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
        setLoading(false)
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
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
const sent =async()=>{
  setLoading(true)
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
        setLoading(false)
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
      render: (data,text) => (
        <h1 className="font-mono font-bold">
          <Button
            onClick={() => {
              purchaseDetails(text);
            }}
          >
            {" "}
            Details
          </Button>
          <Modal width={600} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="w-[200px] h-40 flex justify-center items-center">
              {console.log(text.image)}
              {text.image.length > 0 ? text.image.map((value,index)=>(<div key={index} className="w-[150px] h-[150px]" style={{backgroundImage:`url(${value})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}>

</div> )) :null}
                 
            </div>
        <p> Bike Name :<span className="font-mono font-bold ">{text.name}</span></p>
        <p> BrandName  :<span className="font-mono font-bold ">{text.BrandName}</span></p>
        <p>Rent per day :<span className="font-mono font-bold ">{text.rentPerHour}</span></p>
        <p>Category :<span className="font-mono font-bold ">{text.NormalCategory}</span></p>
        <p>cc :<span className="font-mono font-bold ">{text.cc}</span></p>
        <p>PlateNumber :<span className="font-mono font-bold ">{text.PlateNumber}</span></p>
        <p>companyName :<span className="font-mono font-bold ">{text.companyName}</span></p>
        <p>owner Name :<span className="font-mono font-bold ">{text.partnerId.name}</span></p>


      </Modal>
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
            title="Are you sure "
            description="Are you sure to accept the request?"
            onConfirm={() => AcceptHandler(record)}
            onCancel={()=>{message.error("Cancel")}}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-lime-400 font-mono">Accept</Button>
          </Popconfirm>
          <Popconfirm
            title="take an action "
            description="Are you sure to take the action ?"
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
      setLoading(true)
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
          setLoading(false)
        } else {
          toast.error("something went wrong!");
        }
      });
    };
    getBikes();
  }, [again]);
  return (
    <div>
      {loading ? (<Loading/>) : (<> <Table columns={columns} dataSource={bikes} /></>)}
     
    </div>
  );
}
BikeManagement.propTypes = {
  requested: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired, 
};

export default BikeManagement;
