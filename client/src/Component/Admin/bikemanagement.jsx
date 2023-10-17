import {  Table,Button ,Modal} from 'antd';
import {bikeDetails} from '../../Apis/connections/admin'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Component/Loading/loading'


function BikeManagement() {
  const [loading,setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const purchaseDetails = (name)=>{
          console.log(name);
          setIsModalOpen(true)
    }
    const columns = [
        {
          title: 'Image',
          dataIndex: 'image', // Access the 'image' property directly
          key: 'Image',
          render: (text, record) => (
            <img src={text[0]} alt={record.name} style={{ width: '70px', height: '50px' }} />
          ),
          width: 200
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a className='font-mono font-bold'>{text}</a>,
          width: 200
        },
        {
          title: 'Brand Name',
          dataIndex: 'BrandName',
          key: 'BrandName',
          width: 200,
          render: (data) => (  
            <h1 className='font-mono font-bold' >{data}</h1>
  ),
        },
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName', 
          width: 200,
          render: (data) => (  
                    <h1 className='font-mono font-bold'>{data}</h1>
          ),
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'companyName',
            render: () => (
                <div className='w-full h-[50px] flex justify-center font-mono font-bold'>
                    <div className='w-full bg-green-100 h-[50px] flex justify-center items-center'>
                        <h1>*Active</h1>
                    </div>
                </div>
              ),
              width: 200 // Change this key to 'companyName'
          },
        {
          title: 'Details',
          dataIndex: 'name', // Access the 'image' property directly
          key: 'details',
          render: (record,text) => (
            <div>
            <Button className='bg-lime-400 font-mono' onClick={() => purchaseDetails(record)}>Bike Details</Button>
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
            </div>

          ),
          width: 200,
          font:"mono",
        },
      ];
    const [bikes,setBikes] = useState()
    useEffect(()=>{
        const getBikes=async()=>{
          setLoading(true)
            await bikeDetails().then((res)=>{
                if(res.data.success===true){
                    const data= res.data.bikes
                    const newData = data.filter((bike)=>{
                      return bike.requestStatus==="completed"
                    })
                    console.log(data);
                    setBikes(newData)
                    setLoading(false)
                }else{
                    toast.error("something went wrong!")
                }
            })
        }
        getBikes();
      
    },[])
  return (
    <div>
      {loading ? (<div className='w-full h-[500px] flex justify-center items-center'><Loading/></div>) : (<> <Table columns={columns} dataSource={bikes} /></>)}
        
    </div>
  )
}

export default BikeManagement
