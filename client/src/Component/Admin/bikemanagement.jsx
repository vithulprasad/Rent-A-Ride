import {  Table,Button } from 'antd';
import {bikeDetails} from '../../Apis/connections/admin'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function BikeManagement() {
    const purchaseDetails = (name)=>{
          console.log(name);
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
          render: (record) => (
            <Button className='bg-lime-400 font-mono' onClick={() => purchaseDetails(record)}>Bike Details</Button>
          ),
          width: 200,
          font:"mono",
        },
      ];
    const [bikes,setBikes] = useState()
    useEffect(()=>{
        const getBikes=async()=>{
            await bikeDetails().then((res)=>{
                if(res.data.success===true){
                    const data= res.data.bikes
                    console.log(data);
                    setBikes(data)
                }else{
                    toast.error("something went wrong!")
                }
            })
        }
        getBikes();
      
    },[])
  return (
    <div>
         <Table columns={columns} dataSource={bikes} />
    </div>
  )
}

export default BikeManagement
